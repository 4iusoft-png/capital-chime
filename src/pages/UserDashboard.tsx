import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletCard } from "@/components/WalletCard";
import { WhatsAppPayment } from "@/components/WhatsAppPayment";
import { IdentityVerification } from "@/components/IdentityVerification";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Bell, LogOut, History, Shield } from "lucide-react";

export function UserDashboard() {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch wallet
      const { data: walletData } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch transactions
      const { data: transactionData } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch verification status
      const { data: verificationData } = await supabase
        .from('identity_verifications')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setWallet(walletData);
      setTransactions(transactionData || []);
      setVerification(verificationData);
    } catch (error) {
      console.error('Error fetching user data:', error);
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

  const handleDepositSuccess = () => {
    fetchUserData();
  };

  const handleVerificationSuccess = () => {
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
                PayForce
              </h1>
              <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
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
        {/* Wallet Overview */}
        <div className="mb-8">
          <WalletCard
            balance={wallet?.balance || 0}
            currency={wallet?.currency || 'USD'}
            onDeposit={() => {}}
            onViewTransactions={() => {}}
          />
        </div>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wallet">Wallet & Payments</TabsTrigger>
            <TabsTrigger value="verification">Identity Verification</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-6">
            <WhatsAppPayment onSuccess={handleDepositSuccess} />
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <IdentityVerification onSuccess={handleVerificationSuccess} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <History className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Transaction History</h3>
              </div>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No transactions yet</p>
                  <p className="text-sm">Your payment history will appear here</p>
                </div>
              ) : (
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
                          <p className="font-medium capitalize">{transaction.transaction_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.transaction_type === 'deposit' 
                            ? 'text-chart-bull' 
                            : 'text-chart-bear'
                        }`}>
                          {transaction.transaction_type === 'deposit' ? '+' : '-'}${transaction.amount}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}