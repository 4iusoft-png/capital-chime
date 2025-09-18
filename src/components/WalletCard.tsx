import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, ArrowUpDown } from "lucide-react";

interface WalletCardProps {
  balance: number;
  currency: string;
  onDeposit: () => void;
  onViewTransactions: () => void;
}

export function WalletCard({ balance, currency, onDeposit, onViewTransactions }: WalletCardProps) {
  return (
    <Card className="p-6 bg-gradient-primary">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary-foreground" />
          <h3 className="text-lg font-semibold text-primary-foreground">Wallet Balance</h3>
        </div>
        <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
          {currency}
        </Badge>
      </div>
      
      <div className="mb-6">
        <p className="text-3xl font-bold text-primary-foreground">
          {currency === 'USD' ? '$' : '€'}{balance.toFixed(2)}
        </p>
        <p className="text-primary-foreground/80 text-sm">Available Balance</p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onDeposit}
          className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Money
        </Button>
        <Button 
          variant="outline" 
          onClick={onViewTransactions}
          className="flex-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          History
        </Button>
      </div>
    </Card>
  );
}