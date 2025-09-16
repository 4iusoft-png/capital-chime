import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, UserX, Shield, User } from 'lucide-react';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  country: string | null;
  is_active: boolean;
  user_roles: { role: string }[];
}

export function UserList() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First, get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (profilesError) throw profilesError;

      // Then, get user roles for these users
      const userIds = profiles?.map(p => p.user_id) || [];
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds);

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        user_roles: roles?.filter(role => role.user_id === profile.user_id) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserActivation = async (userId: string, currentStatus: boolean) => {
    try {
      setUpdatingUserId(userId);
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !currentStatus })
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.user_id === userId 
          ? { ...user, is_active: !currentStatus }
          : user
      ));
      
      toast({
        title: "User status updated",
        description: `User has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });
    } catch (err) {
      console.error('Error updating user status:', err);
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded"></div>
                <div className="h-3 w-48 bg-muted rounded"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-muted rounded"></div>
              <div className="h-8 w-20 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-500/50 bg-red-500/5">
        <p className="text-red-500">Error loading users: {error}</p>
        <Button onClick={fetchUsers} className="mt-2" variant="outline">
          Retry
        </Button>
      </Card>
    );
  }

  const getDisplayName = (user: UserProfile) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.first_name) {
      return user.first_name;
    }
    return user.email;
  };

  const getUserRole = (user: UserProfile) => {
    return user.user_roles?.[0]?.role || 'user';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Showing {users.length} recent users
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-chart-bull"></div>
            <span className="text-muted-foreground">
              Active: {users.filter(u => u.is_active).length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-chart-bear"></div>
            <span className="text-muted-foreground">
              Inactive: {users.filter(u => !u.is_active).length}
            </span>
          </div>
        </div>
      </div>
      
      {users.map((user) => (
        <div key={user.id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
          user.is_active 
            ? 'border-border hover:bg-muted/30' 
            : 'border-chart-bear/30 bg-chart-bear/5 hover:bg-chart-bear/10'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
              user.is_active ? 'bg-gradient-primary' : 'bg-muted'
            }`}>
              {getDisplayName(user).charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-medium ${!user.is_active ? 'text-muted-foreground' : ''}`}>
                  {getDisplayName(user)}
                </h4>
                {user.is_active ? (
                  <UserCheck className="h-4 w-4 text-chart-bull" />
                ) : (
                  <UserX className="h-4 w-4 text-chart-bear" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                </span>
                {user.country && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{user.country}</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">•</span>
                <Badge 
                  variant={user.is_active ? "default" : "secondary"}
                  className={`text-xs ${user.is_active ? 'bg-chart-bull/20 text-chart-bull' : 'bg-chart-bear/20 text-chart-bear'}`}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge 
              variant={getUserRole(user) === 'admin' ? 'default' : 'secondary'}
              className={getUserRole(user) === 'admin' ? 'bg-gradient-primary' : ''}
            >
              {getUserRole(user) === 'admin' ? (
                <><Shield className="h-3 w-3 mr-1" />Admin</>
              ) : (
                <><User className="h-3 w-3 mr-1" />User</>
              )}
            </Badge>
            
            <Button 
              variant={user.is_active ? "outline" : "default"} 
              size="sm"
              onClick={() => toggleUserActivation(user.user_id, user.is_active)}
              disabled={updatingUserId === user.user_id}
              className={user.is_active ? '' : 'bg-chart-bull hover:bg-chart-bull/90'}
            >
              {updatingUserId === user.user_id ? (
                "Updating..."
              ) : user.is_active ? (
                "Deactivate"
              ) : (
                "Activate"
              )}
            </Button>
          </div>
        </div>
      ))}
      
      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No users found
        </div>
      )}
    </div>
  );
}