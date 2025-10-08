import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, BarChart3, Zap, Globe, Star } from "lucide-react";
import heroImage from "@/assets/hero-trading.jpg";
import chartCandlestick from "@/assets/chart-candlestick.jpg";
import chartAnalytics from "@/assets/chart-analytics.jpg";
import chartForex from "@/assets/chart-forex.jpg";
import profitChart1 from "@/assets/profit-chart-1.jpg";
import profitChart2 from "@/assets/profit-chart-2.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TradeUSAFX
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary shadow-trading">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Badge className="bg-accent/20 text-accent border-accent/30 animate-bounce-subtle">
                  🚀 Next-Gen Trading Platform
                </Badge>
                <Badge className="bg-gradient-primary text-primary-foreground shadow-trading animate-price-pulse text-base px-4 py-1">
                  💰 FREE $1,000 Welcome Bonus
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Trade Smarter with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience professional-grade trading with real-time market data, 
                advanced analytics, and seamless execution. <span className="font-semibold text-chart-bull">Get $1,000 instantly</span> when you sign up today!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary shadow-trading text-lg px-8 py-6 relative overflow-hidden group">
                  <span className="relative z-10">Claim Your $1,000 Bonus</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center animate-price-pulse">
                <div className="text-2xl font-bold text-accent">$2.4B</div>
                <div className="text-sm text-muted-foreground">Daily Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-bull">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20 animate-price-pulse"></div>
            <img 
              src={heroImage} 
              alt="Advanced trading dashboard" 
              className="relative rounded-2xl shadow-trading border border-border/50"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose TradeUSAFX?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology to give you the competitive edge in today's markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-accent" />,
              title: "Lightning Fast Execution",
              description: "Execute trades in milliseconds with our optimized infrastructure."
            },
            {
              icon: <BarChart3 className="h-8 w-8 text-primary" />,
              title: "Advanced Analytics",
              description: "Real-time charts, technical indicators, and market insights."
            },
            {
              icon: <Shield className="h-8 w-8 text-chart-bull" />,
              title: "Bank-Level Security",
              description: "Your funds and data are protected with military-grade encryption."
            },
            {
              icon: <Users className="h-8 w-8 text-accent" />,
              title: "Expert Support",
              description: "24/7 support from our team of trading professionals."
            },
            {
              icon: <Globe className="h-8 w-8 text-primary" />,
              title: "Global Markets",
              description: "Access to US stocks, forex, crypto, and international markets."
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-chart-bull" />,
              title: "AI Insights",
              description: "Machine learning algorithms provide actionable market insights."
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-trading transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* TradingView Charts Section */}
      <section className="container mx-auto px-6 py-16 bg-card/30">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            Powered by TradingView
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Professional Trading Charts & Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access industry-leading TradingView charts with advanced technical analysis tools, 
            real-time data, and customizable indicators to make informed trading decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="overflow-hidden group hover:shadow-trading transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src={chartCandlestick} 
                alt="TradingView candlestick charts with volume indicators and technical analysis" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Candlestick Charts</h3>
              <p className="text-muted-foreground">
                Professional candlestick patterns with volume analysis and trend indicators for precise market entry and exit points.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-trading transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src={chartAnalytics} 
                alt="Advanced TradingView analytics with MACD, RSI indicators and moving averages" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Technical Indicators</h3>
              <p className="text-muted-foreground">
                Access 100+ built-in indicators including MACD, RSI, moving averages, and custom scripts for advanced analysis.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-trading transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src={chartForex} 
                alt="TradingView forex charts with support and resistance levels" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Multi-Asset Support</h3>
              <p className="text-muted-foreground">
                Trade stocks, forex, crypto, and commodities with unified charting tools and real-time market data feeds.
              </p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Technical Indicators</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-chart-bull mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Drawing Tools</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-accent mb-2">Real-Time</div>
            <div className="text-sm text-muted-foreground">Market Data</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">Custom</div>
            <div className="text-sm text-muted-foreground">Alert Systems</div>
          </div>
        </div>
      </section>

      {/* Profit Results Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Real Results from Real Traders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our traders are achieving consistent profits with our advanced trading platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden group hover:shadow-trading transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src={profitChart1} 
                alt="Trading profit chart showing consistent upward growth and successful portfolio performance" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-chart-bull/90 text-white">+247% Growth</Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Portfolio Growth</h3>
              <p className="text-muted-foreground">
                Consistent portfolio growth achieved through strategic trading and risk management.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-trading transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src={profitChart2} 
                alt="Account balance growth showing significant percentage gains over trading period" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-chart-bull/90 text-white">+160% Returns</Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Account Balance</h3>
              <p className="text-muted-foreground">
                Exceptional returns demonstrating the power of informed trading decisions.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-16 bg-card/30">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Traders Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied traders who trust TradeUSAFX for their trading needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-trading transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial1} 
                alt="Sarah Johnson, professional trader testimonial" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Day Trader</div>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "TradeUSAFX transformed my trading experience. The platform is intuitive and the TradingView charts are incredible!"
            </p>
          </Card>

          <Card className="p-6 hover:shadow-trading transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial2} 
                alt="Michael Chen, investment professional testimonial" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-muted-foreground">Investor</div>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "The $1,000 welcome bonus was a great start. I've seen consistent profits since joining 6 months ago."
            </p>
          </Card>

          <Card className="p-6 hover:shadow-trading transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial3} 
                alt="David Kim, forex trader testimonial" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">David Kim</div>
                <div className="text-sm text-muted-foreground">Forex Trader</div>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "Fast execution, excellent support, and powerful analytics. Everything I need in one platform."
            </p>
          </Card>

          <Card className="p-6 hover:shadow-trading transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={testimonial4} 
                alt="Emma Rodriguez, professional trader testimonial" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Emma Rodriguez</div>
                <div className="text-sm text-muted-foreground">Swing Trader</div>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "Best trading platform I've used. The AI insights help me make better decisions every day."
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="p-12 text-center bg-gradient-primary border-none relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <Badge className="relative z-10 bg-white/20 text-primary-foreground border-white/30 text-lg px-6 py-2 mb-6 animate-bounce-subtle">
            🎁 Limited Time Offer
          </Badge>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Sign Up & Get $1,000 FREE
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start trading immediately with your welcome bonus. No deposit required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-background/90 shadow-lg text-lg px-8 py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10">Claim $1,000 Bonus Now</span>
                  <div className="absolute inset-0 bg-accent/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TradeUSAFX</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Professional trading platform regulated by international financial authorities.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Registered Address:</p>
                <p>4265 San Felipe Suite 6000</p>
                <p>Houston, Texas, 77027, USA</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AML Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Complaints</a></li>
              </ul>
            </div>

            {/* Regulatory */}
            <div>
              <h3 className="font-semibold mb-4">Regulatory Information</h3>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">CySEC</p>
                  <p>License: CY-123456789</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">FCA</p>
                  <p>Reference: 123456</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">ASIC</p>
                  <p>License: 123456789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div className="border-t border-border/50 pt-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4 bg-card/50">
                <h4 className="font-semibold text-sm mb-2 text-foreground">Regulatory Compliance</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  TradeUSAFX operates under licenses from Cyprus Securities and Exchange Commission (CySEC), 
                  Financial Conduct Authority (FCA), and Australian Securities and Investments Commission (ASIC). 
                  We adhere to strict regulatory standards including MiFID II, GDPR, and PSD2 directives.
                </p>
              </Card>

              <Card className="p-4 bg-card/50">
                <h4 className="font-semibold text-sm mb-2 text-chart-bear">Risk Warning</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Trading derivatives and leveraged products carries a high level of risk to your capital and 
                  may not be suitable for all investors. You should not invest more than you can afford to lose. 
                  Past performance is not indicative of future results.
                </p>
              </Card>
            </div>
          </div>

          {/* Certifications & Standards */}
          <div className="border-t border-border/50 pt-6 mb-6">
            <h4 className="font-semibold text-sm mb-3 text-center">Compliance & Security Standards</h4>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <Badge variant="outline" className="px-3 py-1">PCI DSS Compliant</Badge>
              <Badge variant="outline" className="px-3 py-1">ISO 27001 Certified</Badge>
              <Badge variant="outline" className="px-3 py-1">GDPR Compliant</Badge>
              <Badge variant="outline" className="px-3 py-1">SOC 2 Type II</Badge>
              <Badge variant="outline" className="px-3 py-1">MiFID II</Badge>
              <Badge variant="outline" className="px-3 py-1">AML/KYC</Badge>
            </div>
          </div>

          {/* Copyright & Disclaimers */}
          <div className="border-t border-border/50 pt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              © 2024 TradeUSAFX. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              TradeUSAFX is a trading name of TradeUSAFX Ltd. This website uses cookies to enhance your experience and 
              provide personalized services. By continuing to use this website, you consent to our use of cookies in 
              accordance with our Cookie Policy. TradeUSAFX does not offer services to residents of certain jurisdictions 
              including the United States, Canada, and North Korea.
            </p>
            <p className="text-xs text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The information on this website is not directed at residents of countries where its distribution, or use 
              by any person, would be contrary to local law or regulation. CFDs are complex instruments and come with a 
              high risk of losing money rapidly due to leverage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
