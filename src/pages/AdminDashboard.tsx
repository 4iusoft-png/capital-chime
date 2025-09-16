import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockStocks } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import { UserList } from "@/components/UserList";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  UserPlus,
  BarChart3,
  Settings,
  Shield,
  LogOut
} from "lucide-react";

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const analytics = useAdminAnalytics();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
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
                TradeForce Admin
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
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
                  <p className="text-muted-foreground text-sm font-medium">Admin Users</p>
                  <p className="text-2xl font-bold text-chart-bull animate-price-pulse">
                    {analytics.adminUsers.toLocaleString()}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-chart-bull" />
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
                  <p className="text-muted-foreground text-sm font-medium">Inactive Users</p>
                  <p className="text-2xl font-bold text-chart-bear">
                    {analytics.inactiveUsers.toLocaleString()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-chart-bear" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">New This Week</p>
                  <p className="text-2xl font-bold">
                    +{analytics.newUsersThisWeek.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">New Users Today</p>
                  <p className="text-2xl font-bold text-chart-bull animate-bounce-subtle">
                    +{analytics.newUsersToday}
                  </p>
                </div>
                <UserPlus className="h-8 w-8 text-chart-bull" />
              </div>
            </Card>

            <Card className="p-6 border-chart-bull/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">New This Month</p>
                  <p className="text-2xl font-bold text-chart-bull">
                    +{analytics.newUsersThisMonth}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-chart-bull" />
              </div>
            </Card>
          </div>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="stocks">Stock Management</TabsTrigger>
            <TabsTrigger value="trades">Trade Monitoring</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
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

          <TabsContent value="stocks" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Stock Management</h3>
                <Button className="bg-gradient-success">Add Stock</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockStocks.slice(0, 6).map((stock) => (
                  <div key={stock.symbol} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{stock.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <Badge variant="outline">Listed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${stock.price.toFixed(2)}</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trades" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Recent Trade Activity</h3>
              <div className="space-y-3">
                {[
                  { user: "john@example.com", symbol: "AAPL", action: "BUY", quantity: 100, price: 185.92, time: "2 min ago" },
                  { user: "jane@example.com", symbol: "MSFT", action: "SELL", quantity: 50, price: 378.85, time: "5 min ago" },
                  { user: "bob@example.com", symbol: "TSLA", action: "BUY", quantity: 25, price: 248.42, time: "8 min ago" },
                  { user: "alice@example.com", symbol: "GOOGL", action: "SELL", quantity: 75, price: 141.68, time: "12 min ago" }
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded">
                    <div className="flex items-center gap-3">
                      <Badge className={trade.action === 'BUY' ? "bg-chart-bull" : "bg-chart-bear"}>
                        {trade.action}
                      </Badge>
                      <span className="font-medium">{trade.symbol}</span>
                      <span className="text-muted-foreground">
                        {trade.quantity} @ ${trade.price}
                      </span>
                      <span className="text-sm text-muted-foreground">by {trade.user}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{trade.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>API Server</span>
                    <Badge className="bg-chart-bull">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge className="bg-chart-bull">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Market Data Feed</span>
                    <Badge className="bg-chart-bull">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Trade Engine</span>
                    <Badge className="bg-chart-bull">Active</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Server Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CPU Usage</span>
                    <span className="text-chart-bull">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <span className="text-accent">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disk Usage</span>
                    <span className="text-chart-bull">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Network I/O</span>
                    <span className="text-chart-bull">Normal</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}