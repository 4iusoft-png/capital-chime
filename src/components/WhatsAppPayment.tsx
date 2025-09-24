import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Phone, CreditCard, Loader2 } from "lucide-react";

export function WhatsAppPayment({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a payment",
        variant: "destructive",
      });
      return;
    }

    if (!amount || !whatsappNumber) {
      toast({
        title: "Missing information",
        description: "Please enter both amount and WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get user's wallet
      const { data: wallet, error: walletError } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (walletError) {
        throw new Error("Failed to fetch wallet information");
      }

      // Generate reference ID
      const referenceId = `WA-${Date.now()}`;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user.id,
          wallet_id: wallet.id,
          amount: numericAmount,
          transaction_type: 'deposit',
          payment_method: 'whatsapp',
          whatsapp_number: whatsappNumber,
          status: 'pending',
          description: `WhatsApp payment deposit via ${whatsappNumber}`,
          reference_id: referenceId
        });

      if (transactionError) {
        throw new Error("Failed to create transaction");
      }

      // Create WhatsApp message with payment details
      const message = `Hello! I want to make a payment with the following details:
Amount: $${numericAmount}
Reference ID: ${referenceId}
My Contact: ${whatsappNumber}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/+17134542420?text=${encodedMessage}`;

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Redirecting to WhatsApp",
        description: "Your payment request has been submitted. Complete the payment via WhatsApp.",
      });

      setAmount("");
      setWhatsappNumber("");
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="h-5 w-5 text-chart-bull" />
        <h3 className="text-lg font-semibold">WhatsApp Payment</h3>
        <Badge variant="outline" className="ml-auto">Instant</Badge>
      </div>
      
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount (USD)</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+1234567890"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Include country code (e.g., +1 for US)
          </p>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Payment Instructions:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Submit your payment request</li>
            <li>Send payment to our WhatsApp number</li>
            <li>Include your reference ID in the message</li>
            <li>Your wallet will be credited once confirmed</li>
          </ol>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-primary" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Payment Request"
          )}
        </Button>
      </form>
    </Card>
  );
}