import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, AlertTriangle, Scale } from "lucide-react";

const TermsConditions = () => {
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
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: October 6, 2025</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 space-y-8 border border-border/50">
            {/* Agreement */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using TradeUSAFX ("the Platform"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Platform.
              </p>
            </section>

            {/* Eligibility */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Eligibility</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="leading-relaxed">To use TradeUSAFX, you must:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                  <li>Have the legal capacity to enter into binding contracts</li>
                  <li>Not be prohibited from using financial services under applicable laws</li>
                  <li>Provide accurate and complete information during registration</li>
                  <li>Complete identity verification as required by regulations</li>
                </ul>
              </div>
            </section>

            {/* Account Registration */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Account Registration</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>
            </section>

            {/* Welcome Bonus */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">$1,000 Welcome Bonus</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  New users receive a $1,000 welcome bonus upon account creation. Terms:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Bonus is automatically credited to your wallet upon registration</li>
                  <li>One bonus per person, household, or IP address</li>
                  <li>Must complete identity verification to withdraw funds</li>
                  <li>Bonus may be subject to trading volume requirements</li>
                  <li>TradeUSAFX reserves the right to modify or discontinue the bonus program</li>
                  <li>Administrative accounts do not receive the welcome bonus</li>
                </ul>
              </div>
            </section>

            {/* Trading Activities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Trading Activities</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive mb-2">Risk Warning</p>
                    <p className="leading-relaxed text-sm">
                      Trading involves substantial risk of loss and is not suitable for all investors. You may lose some or all of your invested capital. Past performance does not guarantee future results.
                    </p>
                  </div>
                </div>
                <p className="leading-relaxed">You acknowledge that:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All trading decisions are your sole responsibility</li>
                  <li>Market volatility can result in significant losses</li>
                  <li>We do not provide investment advice</li>
                  <li>You should only invest what you can afford to lose</li>
                  <li>Technical issues may affect order execution</li>
                </ul>
              </div>
            </section>

            {/* Identity Verification */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Identity Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                To comply with anti-money laundering (AML) and know-your-customer (KYC) regulations, we require identity verification. You must submit valid government-issued identification documents. We may request additional documentation at any time. Failure to complete verification may result in account limitations or suspension.
              </p>
            </section>

            {/* Deposits and Withdrawals */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Deposits and Withdrawals</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">Regarding your funds:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Deposits are processed according to the chosen payment method</li>
                  <li>Withdrawal requests are subject to verification and security checks</li>
                  <li>Processing times vary by payment method</li>
                  <li>We may charge fees for deposits and withdrawals</li>
                  <li>Withdrawals can only be made to accounts in your name</li>
                  <li>Minimum and maximum transaction limits apply</li>
                </ul>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="leading-relaxed">You may not:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the Platform for illegal activities or money laundering</li>
                  <li>Manipulate markets or engage in fraudulent trading</li>
                  <li>Create multiple accounts to abuse promotions</li>
                  <li>Use automated trading bots without authorization</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the Platform</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the Platform, including text, graphics, logos, software, and data, is the property of TradeUSAFX or its licensors and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Platform without our express written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, TradeUSAFX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of the Platform. Our total liability shall not exceed the amount you paid to us in the twelve months preceding the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless TradeUSAFX, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            {/* Account Suspension and Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Account Suspension and Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time if:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You violate these Terms and Conditions</li>
                  <li>We suspect fraudulent or illegal activity</li>
                  <li>You fail to complete identity verification</li>
                  <li>Required by law or regulatory authorities</li>
                  <li>We cease operations or significantly modify our services</li>
                </ul>
                <p className="leading-relaxed">
                  Upon termination, you must cease using the Platform and may request withdrawal of your remaining balance, subject to verification and compliance requirements.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these Terms shall first be resolved through good-faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration authority, and you waive your right to participate in class actions.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TradeUSAFX operates, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of significant changes via email or platform notification. Your continued use of the Platform after changes constitute acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms and Conditions, please contact:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                <p className="font-medium">Email: legal@tradeusafx.com</p>
                <p className="font-medium">Address: 4265, San Felipe Suite 6000, Houston, Texas 77027 USA</p>
                <p className="font-medium">Phone: +1 (555) 123-4567</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  By using TradeUSAFX, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please discontinue use of the Platform immediately.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;
