import Link from "next/link"
import { Shield, CreditCard, PiggyBank, BarChart3, ArrowRight } from "lucide-react"

import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">SecureBank</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:underline">
              Personal
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Business
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Loans
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Investments
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Log In
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Banking made simple for everyone
              </h1>
              <p className="text-lg md:text-xl text-teal-50">
                Secure, reliable, and easy-to-use banking services to help you manage your finances with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                  Open an Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-teal-700"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Banking app interface"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why choose SecureBank?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a range of services designed to make your banking experience seamless and secure.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Banking</h3>
                <p className="text-muted-foreground">
                  Advanced security measures to protect your accounts and personal information.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Online Banking</h3>
                <p className="text-muted-foreground">
                  Manage your accounts, pay bills, and transfer money anytime, anywhere.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <PiggyBank className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Savings Accounts</h3>
                <p className="text-muted-foreground">Competitive interest rates to help your money grow faster.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Investment Options</h3>
                <p className="text-muted-foreground">
                  Diverse investment opportunities to build your financial future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-white p-8 shadow-lg border md:p-10">
              <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
                  <p className="mt-4 text-muted-foreground">
                    Open an account in minutes and experience banking designed for the modern world.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Open an Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Banking Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/placeholder.svg?height=500&width=400"
                alt="Mobile banking app"
                className="mx-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Banking in your pocket</h2>
              <p className="text-lg text-muted-foreground">
                Our mobile app gives you the freedom to bank whenever and wherever you want.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-teal-100 p-1">
                    <Shield className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">Secure Authentication</p>
                    <p className="text-sm text-muted-foreground">Biometric login and advanced security features</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-teal-100 p-1">
                    <CreditCard className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">Instant Transfers</p>
                    <p className="text-sm text-muted-foreground">Send money to anyone, anytime with just a few taps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-teal-100 p-1">
                    <BarChart3 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">Financial Insights</p>
                    <p className="text-sm text-muted-foreground">Track spending and set budgets with smart analytics</p>
                  </div>
                </li>
              </ul>
              <Button className="bg-teal-600 hover:bg-teal-700">Download the App</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
                <span className="text-xl font-bold">SecureBank</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Secure, reliable banking services for everyone.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Checking Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Savings Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Loans
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Mortgages
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Financial Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Mobile Banking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Security Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Rates & Fees
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Locations
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 SecureBank. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
