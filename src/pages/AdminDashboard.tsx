import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import { UserList } from "@/components/UserList";
import { 
  Shield,
  LogOut,
  CheckCircle,
  XCircle,
  Settings,
  Activity,
  FileText,
  Clock,
  User,
  Eye
} from "lucide-react";

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const analytics = useAdminAnalytics();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");

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

      // Fetch verifications with user profiles
      const { data: verificationsData } = await supabase
        .from('identity_verifications')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('submitted_at', { ascending: false });

      setTransactions(transactionsData || []);
      setVerifications(verificationsData || []);
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

  const handleVerificationUpdate = async (verificationId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('identity_verifications')
        .update({ 
          verification_status: status,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          admin_notes: notes || null
        })
        .eq('id', verificationId);

      if (error) throw error;

      toast({
        title: "Verification updated",
        description: `Verification ${status} successfully`,
      });

      setSelectedVerification(null);
      setAdminNotes("");
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

  const getDocumentUrl = (path: string) => {
    const { data } = supabase.storage
      .from('identity-documents')
      .getPublicUrl(path);
    return data.publicUrl;
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="statistics">User Statistics</TabsTrigger>
            <TabsTrigger value="verifications">Identity Verifications</TabsTrigger>
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

          <TabsContent value="verifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Identity Verification Submissions</h3>
              </div>
              
              {verifications.length === 0 ? (
                <div className="text-center py-12 border border-border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No verification submissions yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {verifications.map((verification) => (
                    <div key={verification.id} className="border border-border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{verification.profiles.email}</p>
                              <p className="text-sm text-muted-foreground">
                                {verification.profiles.first_name} {verification.profiles.last_name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="capitalize">{verification.document_type.replace('_', ' ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Submitted {new Date(verification.submitted_at).toLocaleDateString()}</span>
                            </div>
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

                          {verification.admin_notes && (
                            <div className="p-3 bg-muted/50 rounded text-sm">
                              <p className="font-medium mb-1">Admin Notes:</p>
                              <p className="text-muted-foreground">{verification.admin_notes}</p>
                            </div>
                          )}

                          {verification.reviewed_at && (
                            <div className="text-sm text-muted-foreground">
                              Reviewed on {new Date(verification.reviewed_at).toLocaleString()}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVerification(verification)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>

                      {verification.verification_status === 'pending' && (
                        <div className="flex gap-2 pt-2 border-t">
                          <Button 
                            size="sm" 
                            className="bg-chart-bull flex-1"
                            onClick={() => handleVerificationUpdate(verification.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedVerification(verification);
                              setAdminNotes("");
                            }}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Request More Info
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleVerificationUpdate(verification.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
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

      {/* Verification Detail Dialog */}
      <Dialog open={!!selectedVerification} onOpenChange={() => setSelectedVerification(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verification Details</DialogTitle>
          </DialogHeader>
          
          {selectedVerification && (
            <div className="space-y-6">
              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Verification Timeline
                </h4>
                <div className="space-y-3 pl-4 border-l-2 border-border">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">Document Submitted</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedVerification.submitted_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {selectedVerification.reviewed_at && (
                    <div className="flex items-start gap-3">
                      <div className={`h-2 w-2 rounded-full mt-2 ${
                        selectedVerification.verification_status === 'approved' 
                          ? 'bg-chart-bull' 
                          : 'bg-chart-bear'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {selectedVerification.verification_status === 'approved' ? 'Approved' : 'Rejected'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedVerification.reviewed_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div>
                <h4 className="font-semibold mb-2">User Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedVerification.profiles.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">
                      {selectedVerification.profiles.first_name} {selectedVerification.profiles.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Document Type</p>
                    <p className="font-medium capitalize">{selectedVerification.document_type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge 
                      variant={
                        selectedVerification.verification_status === 'approved' 
                          ? 'default' 
                          : selectedVerification.verification_status === 'rejected' 
                          ? 'destructive' 
                          : 'outline'
                      }
                      className={selectedVerification.verification_status === 'approved' ? "bg-chart-bull" : ""}
                    >
                      {selectedVerification.verification_status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Document Images */}
              <div>
                <h4 className="font-semibold mb-3">Document Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedVerification.document_front_url && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Front</p>
                      <img 
                        src={getDocumentUrl(selectedVerification.document_front_url)} 
                        alt="Document Front"
                        className="w-full rounded-lg border border-border"
                      />
                    </div>
                  )}
                  {selectedVerification.document_back_url && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Back</p>
                      <img 
                        src={getDocumentUrl(selectedVerification.document_back_url)} 
                        alt="Document Back"
                        className="w-full rounded-lg border border-border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              {selectedVerification.verification_status === 'pending' && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Request Additional Documents</h4>
                  <Textarea
                    placeholder="Enter notes or request additional information..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="bg-chart-bull flex-1"
                      onClick={() => handleVerificationUpdate(selectedVerification.id, 'approved', adminNotes)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleVerificationUpdate(selectedVerification.id, 'pending', adminNotes)}
                      disabled={!adminNotes}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Request More Info
                    </Button>
                    <Button 
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleVerificationUpdate(selectedVerification.id, 'rejected', adminNotes)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}