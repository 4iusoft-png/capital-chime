import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, BarChart3, Zap, Globe } from "lucide-react";
import heroImage from "@/assets/hero-trading.jpg";

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
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TradeUSAFX</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Features</a>
              <a href="#" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground text-sm mt-6 space-y-2">
            <p>© 2024 TradeUSAFX. All rights reserved. Trading involves risk of loss.</p>
            <p className="text-xs">
              We comply with GDPR, use cookies to enhance your experience, and protect your data with industry-standard security measures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
