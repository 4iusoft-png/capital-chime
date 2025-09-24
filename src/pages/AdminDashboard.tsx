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
  Wallet,
  Shield,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  Settings,
  Activity,
  TrendingUp,
  UserPlus,
  BarChart3
} from "lucide-react";

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const analytics = useAdminAnalytics();
  const [verifications, setVerifications] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch pending verifications with user profiles
      const { data: verificationsData } = await supabase
        .from('identity_verifications')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('submitted_at', { ascending: false });

      // Fetch wallets with user profiles
      const { data: walletsData } = await supabase
        .from('user_wallets')
        .select(`
          *,
          profiles!inner(email, first_name, last_name, is_active)
        `)
        .order('created_at', { ascending: false });

      // Fetch recent transactions
      const { data: transactionsData } = await supabase
        .from('wallet_transactions')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      setVerifications(verificationsData || []);
      setWallets(walletsData || []);
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

  const handleVerificationUpdate = async (verificationId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('identity_verifications')
        .update({
          verification_status: status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id
        })
        .eq('id', verificationId);

      if (error) throw error;

      toast({
        title: "Verification updated",
        description: `Verification ${status} successfully`,
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error updating verification:', error);
      toast({
        title: "Error",
        description: "Failed to update verification",
        variant: "destructive",
      });
    }
  };

  const handleTransactionUpdate = async (transactionId: string, status: string) => {
    try {
      const transaction = transactions.find(t => t.id === transactionId);
      if (!transaction) return;

      // Update transaction status
      const { error: transactionError } = await supabase
        .from('wallet_transactions')
        .update({ status })
        .eq('id', transactionId);

      if (transactionError) throw transactionError;

      // If approving a deposit, update wallet balance
      if (status === 'completed' && transaction.transaction_type === 'deposit') {
        const { data: currentWallet } = await supabase
          .from('user_wallets')
          .select('balance')
          .eq('id', transaction.wallet_id)
          .single();
        
        if (currentWallet) {
          const newBalance = parseFloat(currentWallet.balance.toString()) + parseFloat(transaction.amount.toString());
          const { error: walletError } = await supabase
            .from('user_wallets')
            .update({ balance: newBalance })
            .eq('id', transaction.wallet_id);

          if (walletError) throw walletError;
        }
      }

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
                PayForce Admin
              </h1>
              <p className="text-muted-foreground">System Administration Panel - {user?.email}</p>
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
        {/* Admin Stats Overview */}
        {analytics.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </Card>
            ))}
          </div>
        ) : analytics.error ? (
          <Card className="p-6 mb-8 border-red-500/50 bg-red-500/5">
            <p className="text-red-500">Error loading analytics: {analytics.error}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            <Card className="p-6 bg-gradient-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-primary-foreground">
                    {analytics.totalUsers.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary-foreground/60" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-chart-bull animate-price-pulse">
                    {analytics.activeUsers.toLocaleString()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-chart-bull" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Balance</p>
                  <p className="text-2xl font-bold text-chart-bull">
                    ${analytics.totalWalletBalance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-chart-bull" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Pending Verifications</p>
                  <p className="text-2xl font-bold text-accent">
                    {analytics.pendingVerifications || 0}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Pending Payments</p>
                  <p className="text-2xl font-bold text-accent">
                    {analytics.pendingTransactions || 0}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </Card>
          </div>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="wallets">Wallet Overview</TabsTrigger>
            <TabsTrigger value="verifications">Identity Verifications</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">User Management</h3>
                <Button className="bg-gradient-primary">Add New User</Button>
              </div>
              
              {analytics.loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
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
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-primary">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary-foreground">{analytics.totalUsers}</p>
                        <p className="text-primary-foreground/80 text-sm">Total Users</p>
                      </div>
                    </Card>
                    <Card className="p-4 border-chart-bull/50">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-chart-bull">{analytics.activeUsers}</p>
                        <p className="text-muted-foreground text-sm">Active Users</p>
                      </div>
                    </Card>
                    <Card className="p-4 border-chart-bear/50">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-chart-bear">{analytics.inactiveUsers}</p>
                        <p className="text-muted-foreground text-sm">Inactive Users</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{analytics.adminUsers}</p>
                        <p className="text-muted-foreground text-sm">Admin Users</p>
                      </div>
                    </Card>
                  </div>
                  
                  <UserList />
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="wallets" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="h-5 w-5" />
                <h3 className="text-lg font-semibold">User Wallets</h3>
              </div>
              
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <div key={wallet.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{wallet.profiles.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {wallet.profiles.first_name} {wallet.profiles.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${wallet.balance}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={wallet.profiles.is_active ? "default" : "destructive"}
                          className={wallet.profiles.is_active ? "bg-chart-bull" : ""}
                        >
                          {wallet.profiles.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Identity Verifications</h3>
              </div>
              
              <div className="space-y-4">
                {verifications.map((verification) => (
                  <div key={verification.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium">{verification.profiles.email}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {verification.document_type.replace('_', ' ')} • 
                          Submitted {new Date(verification.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          verification.verification_status === 'approved' 
                            ? 'default' 
                            : verification.verification_status === 'rejected' 
                            ? 'destructive' 
                            : 'outline'
                        }
                        className={verification.verification_status === 'approved' ? "bg-chart-bull" : ""}
                      >
                        {verification.verification_status}
                      </Badge>
                    </div>
                    
                    {verification.verification_status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-chart-bull"
                          onClick={() => handleVerificationUpdate(verification.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleVerificationUpdate(verification.id, 'rejected', 'Documents do not meet requirements')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    
                    {verification.admin_notes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded">
                        <p className="text-sm"><strong>Admin Notes:</strong> {verification.admin_notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Transaction Monitoring</h3>
              
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.transaction_type === 'deposit' 
                          ? 'bg-chart-bull/10 text-chart-bull' 
                          : 'bg-chart-bear/10 text-chart-bear'
                      }`}>
                        {transaction.transaction_type === 'deposit' ? '+' : '-'}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.profiles.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${transaction.amount}</p>
                        <Badge 
                          variant={
                            transaction.status === 'completed' 
                              ? 'default' 
                              : transaction.status === 'failed' 
                              ? 'destructive' 
                              : 'outline'
                          }
                          className={transaction.status === 'completed' ? "bg-chart-bull" : ""}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      {transaction.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            className="bg-chart-bull"
                            onClick={() => handleTransactionUpdate(transaction.id, 'completed')}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleTransactionUpdate(transaction.id, 'failed')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}