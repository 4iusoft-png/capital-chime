import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Cookie, Database, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: October 6, 2025</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 space-y-8 border border-border/50">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At TradeUSAFX, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our trading platform and services.
              </p>
            </section>

            {/* Data Collection */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Data Collection
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                  <p className="leading-relaxed">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Identity verification documents (passport, national ID, etc.)</li>
                    <li>Financial information for trading and transactions</li>
                    <li>WhatsApp number for payment processing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Automatically Collected Information</h3>
                  <p className="leading-relaxed">
                    When you access our platform, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, features used, time spent)</li>
                    <li>Trading activity and transaction history</li>
                    <li>Location data based on IP address</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                Cookie Policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our platform and store certain information.
                </p>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Types of Cookies We Use</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-foreground">Essential Cookies:</strong> Required for the platform to function properly, including authentication and security</li>
                    <li><strong className="text-foreground">Performance Cookies:</strong> Help us understand how you use our platform to improve user experience</li>
                    <li><strong className="text-foreground">Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong className="text-foreground">Analytics Cookies:</strong> Collect information about your usage patterns</li>
                  </ul>
                </div>
                <p className="leading-relaxed">
                  You can control cookies through your browser settings, but disabling certain cookies may affect platform functionality.
                </p>
              </div>
            </section>

            {/* GDPR Compliance */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                GDPR Compliance
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). You have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-foreground">Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-foreground">Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong className="text-foreground">Right to Data Portability:</strong> Receive your data in a structured format</li>
                  <li><strong className="text-foreground">Right to Object:</strong> Object to processing of your personal data</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="leading-relaxed">We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and maintain our trading platform</li>
                  <li>Process transactions and manage your wallet</li>
                  <li>Verify your identity and prevent fraud</li>
                  <li>Send important notifications about your account</li>
                  <li>Improve our services and develop new features</li>
                  <li>Comply with legal obligations and regulations</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When your account is closed, we will delete or anonymize your data within 90 days, except where we are required to retain it by law.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with third-party service providers who help us operate our platform, including payment processors, identity verification services, and cloud hosting providers. These parties are contractually obligated to protect your data and use it only for the purposes we specify.
              </p>
            </section>

            {/* International Transfers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </section>

            {/* Contact Us */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                <p className="font-medium">Email: privacy@tradeusafx.com</p>
                <p className="font-medium">Address: 4265, San Felipe Suite 6000, Houston, Texas 77027 USA</p>
              </div>
            </section>

            {/* Updates */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
