import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import { UserList } from "@/components/UserList";
import { 
  Users, 
  Shield,
  LogOut,
  CheckCircle,
  XCircle,
  Settings,
  Activity
} from "lucide-react";

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const analytics = useAdminAnalytics();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch transactions with user profiles
      const { data: transactionsData } = await supabase
        .from('wallet_transactions')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      setTransactions(transactionsData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const handleTransactionStatusUpdate = async (transactionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('wallet_transactions')
        .update({ status })
        .eq('id', transactionId);

      if (error) throw error;

      toast({
        title: "Transaction updated",
        description: `Transaction ${status} successfully`,
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to update transaction",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">User Analytics & Payment Management - {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Shield className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="statistics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="statistics">User Statistics</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <h3 className="text-lg font-semibold">User Analytics</h3>
              </div>
              
              {analytics.loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-20 bg-muted rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold text-chart-bull">{analytics.activeUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Inactive Users</p>
                      <p className="text-2xl font-bold text-chart-bear">{analytics.inactiveUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Admin Users</p>
                      <p className="text-2xl font-bold">{analytics.adminUsers}</p>
                    </div>
                  </div>
                  
                  <UserList />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Payment Transaction History</h3>
              </div>
              
              {transactions.length === 0 ? (
                <div className="text-center py-12 border border-border rounded-lg">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No payment transactions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium">User</th>
                        <th className="text-left p-4 text-sm font-medium">Type</th>
                        <th className="text-left p-4 text-sm font-medium">Amount</th>
                        <th className="text-left p-4 text-sm font-medium">Method</th>
                        <th className="text-left p-4 text-sm font-medium">Status</th>
                        <th className="text-left p-4 text-sm font-medium">Date</th>
                        <th className="text-left p-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t border-border">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{transaction.profiles.email}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.profiles.first_name} {transaction.profiles.last_name}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 capitalize">{transaction.transaction_type}</td>
                          <td className="p-4 font-medium">${Number(transaction.amount).toFixed(2)}</td>
                          <td className="p-4 capitalize">{transaction.payment_method}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                transaction.status === 'completed' 
                                  ? 'default' 
                                  : transaction.status === 'rejected' 
                                  ? 'destructive' 
                                  : 'outline'
                              }
                              className={transaction.status === 'completed' ? "bg-chart-bull" : ""}
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {transaction.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="bg-chart-bull"
                                  onClick={() => handleTransactionStatusUpdate(transaction.id, 'completed')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleTransactionStatusUpdate(transaction.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}