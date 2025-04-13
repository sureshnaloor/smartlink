import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, FileText, MessageSquare, BarChart3 } from "lucide-react"
import { getSession } from "@/lib/session"
import { AuthStatus } from "@/components/auth/auth-status"

export default async function Home() {
  const session = await getSession()
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span>VendorHub</span>
          </div>
          <AuthStatus user={session?.user ?? null} />
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Streamline Your Vendor Management Process
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A comprehensive platform for vendor registration, prequalification, and ongoing management. Connect
                  with qualified vendors and simplify your procurement process.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={session ? "/dashboard" : "/signup"}>
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      {session ? "Go to Dashboard" : "Get Started"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Request Demo
                    </Button>
                  </Link>
                </div>
                
                {/* Sign-in options */}
                <div className="flex flex-col pt-2">
                  <p className="text-sm text-gray-500 mb-2">Sign in options:</p>
                  <div className="flex gap-3">
                    <Link href="/signin">
                      <Button size="sm" variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/google-signin">
                      <Button size="sm" variant="ghost" className="text-blue-600">
                        Google Sign In
                      </Button>
                    </Link>
                    <Link href="/linkedin-signin">
                      <Button size="sm" variant="ghost" className="text-blue-800">
                        LinkedIn Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 rounded-lg overflow-hidden border shadow-lg">
                <img
                  src="/images/vendormanagement.jpg?height=400&width=600"
                  alt="Vendor Management Dashboard"
                  className="aspect-video object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Comprehensive Vendor Management</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4 md:text-lg">
                Everything you need to manage your vendor relationships in one place
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Streamlined Onboarding",
                  description: "Simple registration process with social login options and guided profile completion.",
                  icon: <Users className="h-10 w-10 text-emerald-600" />,
                },
                {
                  title: "Comprehensive Profiles",
                  description:
                    "Capture detailed vendor information including certifications, experience, and capabilities.",
                  icon: <FileText className="h-10 w-10 text-emerald-600" />,
                },
                {
                  title: "Document Management",
                  description: "Secure storage for certificates, compliance documents, brochures, and catalogs.",
                  icon: <FileText className="h-10 w-10 text-emerald-600" />,
                },
                {
                  title: "Integrated Communication",
                  description: "Built-in messaging system for direct communication between vendors and buyers.",
                  icon: <MessageSquare className="h-10 w-10 text-emerald-600" />,
                },
                {
                  title: "Annual Compliance",
                  description: "Automated reminders and tracking for annual document submissions.",
                  icon: <CheckCircle className="h-10 w-10 text-emerald-600" />,
                },
                {
                  title: "Advanced Reporting",
                  description: "Comprehensive analytics on vendor onboarding, categories, and compliance status.",
                  icon: <BarChart3 className="h-10 w-10 text-emerald-600" />,
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 flex-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Building2 className="h-5 w-5 text-emerald-600" />
            <span>VendorHub</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 VendorHub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
