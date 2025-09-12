import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioData {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  cashBalance: number;
}

interface PortfolioOverviewProps {
  data: PortfolioData;
}

export function PortfolioOverview({ data }: PortfolioOverviewProps) {
  const isDayPositive = data.dayChange > 0;
  const isTotalPositive = data.totalGainLoss > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-primary">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Portfolio Value</p>
            <p className="text-2xl font-bold text-primary-foreground">
              ${data.totalValue.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-primary-foreground/60" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Today's Change</p>
            <p className={cn(
              "text-2xl font-bold animate-price-pulse",
              isDayPositive ? "text-chart-bull" : "text-chart-bear"
            )}>
              {isDayPositive && "+"}{data.dayChange.toFixed(2)}
            </p>
            <p className={cn(
              "text-sm font-medium",
              isDayPositive ? "text-chart-bull" : "text-chart-bear"
            )}>
              {isDayPositive && "+"}{data.dayChangePercent.toFixed(2)}%
            </p>
          </div>
          {isDayPositive ? (
            <TrendingUp className="h-8 w-8 text-chart-bull" />
          ) : (
            <TrendingDown className="h-8 w-8 text-chart-bear" />
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Total Gain/Loss</p>
            <p className={cn(
              "text-2xl font-bold",
              isTotalPositive ? "text-chart-bull" : "text-chart-bear"
            )}>
              {isTotalPositive && "+"}{data.totalGainLoss.toFixed(2)}
            </p>
            <p className={cn(
              "text-sm font-medium",
              isTotalPositive ? "text-chart-bull" : "text-chart-bear"
            )}>
              {isTotalPositive && "+"}{data.totalGainLossPercent.toFixed(2)}%
            </p>
          </div>
          <Percent className={cn(
            "h-8 w-8",
            isTotalPositive ? "text-chart-bull" : "text-chart-bear"
          )} />
        </div>
      </Card>

      <Card className="p-6 border-accent/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Cash Balance</p>
            <p className="text-2xl font-bold text-accent">
              ${data.cashBalance.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-accent/60" />
        </div>
      </Card>
    </div>
  );
}