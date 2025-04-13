import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export const metadata: Metadata = {
  title: "Dashboard | VendorHub",
  description: "Manage your vendor account",
}

export default async function DashboardPage() {
  const session = await getSession()
  
  // Double-check authentication here, although middleware should handle this
  if (!session) {
    redirect("/signin")
  }
  
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name || session.user.email}</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Complete your profile to get the most out of VendorHub.
            </p>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-emerald-500 rounded-full w-1/3" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Profile completion: 33%</p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upcoming Renewals</h2>
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming document renewals in the next 30 days.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900 dark:text-gray-100">Account created</p>
                <p className="text-gray-500 dark:text-gray-400">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
