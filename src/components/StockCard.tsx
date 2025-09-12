import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

interface StockCardProps {
  stock: Stock;
  onTrade?: (symbol: string, action: 'buy' | 'sell') => void;
}

export function StockCard({ stock, onTrade }: StockCardProps) {
  const isPositive = stock.change > 0;
  const isNeutral = stock.change === 0;
  
  const getTrendIcon = () => {
    if (isNeutral) return <Minus className="h-4 w-4 text-chart-neutral" />;
    return isPositive ? 
      <TrendingUp className="h-4 w-4 text-chart-bull" /> : 
      <TrendingDown className="h-4 w-4 text-chart-bear" />;
  };

  const getChangeColor = () => {
    if (isNeutral) return "text-chart-neutral";
    return isPositive ? "text-chart-bull" : "text-chart-bear";
  };

  return (
    <Card className="p-6 hover:shadow-trading transition-all duration-300 animate-fade-in group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            {getTrendIcon()}
          </div>
          <p className="text-muted-foreground text-sm">{stock.name}</p>
        </div>
        <div className={cn(
          "text-right animate-price-pulse transition-colors duration-300",
          isPositive && "text-chart-bull",
          !isPositive && !isNeutral && "text-chart-bear"
        )}>
          <p className="font-bold text-xl">${stock.price.toFixed(2)}</p>
          <p className={cn("text-sm font-medium", getChangeColor())}>
            {isPositive && "+"}{stock.change.toFixed(2)} ({isPositive && "+"}{stock.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted-foreground text-sm">Volume: {stock.volume}</span>
      </div>
      
      {onTrade && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-chart-bull/20 hover:border-chart-bull"
            onClick={() => onTrade(stock.symbol, 'buy')}
          >
            Buy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-chart-bear/20 hover:border-chart-bear"
            onClick={() => onTrade(stock.symbol, 'sell')}
          >
            Sell
          </Button>
        </div>
      )}
    </Card>
  );
}