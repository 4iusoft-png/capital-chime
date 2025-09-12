export const mockStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    change: 2.45,
    changePercent: 1.34,
    volume: "45.2M"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: -1.23,
    changePercent: -0.32,
    volume: "28.7M"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.68,
    change: 3.21,
    changePercent: 2.32,
    volume: "31.4M"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 151.94,
    change: -0.87,
    changePercent: -0.57,
    volume: "52.1M"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.42,
    change: 12.34,
    changePercent: 5.23,
    volume: "89.3M"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
    volume: "34.6M"
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 483.16,
    change: -4.32,
    changePercent: -0.89,
    volume: "19.8M"
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 592.84,
    change: 8.91,
    changePercent: 1.53,
    volume: "12.4M"
  }
];

export const mockPortfolioData = {
  totalValue: 125840.67,
  dayChange: 1247.23,
  dayChangePercent: 1.00,
  totalGainLoss: 8934.12,
  totalGainLossPercent: 7.64,
  cashBalance: 15623.45
};

export const mockUserHoldings = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgPrice: 165.20,
    currentPrice: 185.92,
    totalValue: 9296.00,
    gainLoss: 1036.00,
    gainLossPercent: 12.54
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 25,
    avgPrice: 385.50,
    currentPrice: 378.85,
    totalValue: 9471.25,
    gainLoss: -166.25,
    gainLossPercent: -1.73
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 100,
    avgPrice: 225.30,
    currentPrice: 248.42,
    totalValue: 24842.00,
    gainLoss: 2312.00,
    gainLossPercent: 10.26
  }
];

export const mockAdminStats = {
  totalUsers: 12547,
  totalTrades: 89623,
  totalVolume: "2.4B",
  activeUsers: 8934,
  newUsersToday: 234,
  tradesPerformanceToday: "+12.4%"
};