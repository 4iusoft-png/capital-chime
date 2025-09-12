import { useState } from "react";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { StockCard } from "@/components/StockCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockStocks, mockPortfolioData, mockUserHoldings } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function UserDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrade = (symbol: string, action: 'buy' | 'sell') => {
    toast({
      title: `${action.toUpperCase()} Order Submitted`,
      description: `Your ${action} order for ${symbol} has been placed successfully.`,
      className: action === 'buy' ? "border-chart-bull" : "border-chart-bear",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TradeForce
              </h1>
              <p className="text-muted-foreground">Welcome back, Trader</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline">Account Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Portfolio Overview */}
        <PortfolioOverview data={mockPortfolioData} />

        <Tabs defaultValue="watchlist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="watchlist">Market Watchlist</TabsTrigger>
            <TabsTrigger value="holdings">My Holdings</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist" className="space-y-6">
            {/* Search Bar */}
            <Card className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks by symbol or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            {/* Stock Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStocks.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <StockCard stock={stock} onTrade={handleTrade} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="holdings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Holdings</h3>
              <div className="space-y-4">
                {mockUserHoldings.map((holding) => (
                  <div key={holding.symbol} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold">{holding.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${holding.totalValue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        {holding.gainLoss > 0 ? (
                          <TrendingUp className="h-4 w-4 text-chart-bull" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-chart-bear" />
                        )}
                        <span className={cn(
                          "text-sm font-medium",
                          holding.gainLoss > 0 ? "text-chart-bull" : "text-chart-bear"
                        )}>
                          {holding.gainLoss > 0 && "+"}{holding.gainLossPercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-chart-bull">BUY</Badge>
                    <span className="font-medium">AAPL</span>
                    <span className="text-muted-foreground">10 shares @ $185.50</span>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">SELL</Badge>
                    <span className="font-medium">MSFT</span>
                    <span className="text-muted-foreground">5 shares @ $379.20</span>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}