import Link from "next/link"
import { ArrowUpRight, FileText, Users, MessageSquare, Upload, CheckCircle, AlertCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Acme Inc.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            Complete Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="h-2 mt-2" />
            <p className="text-xs text-gray-500 mt-2">7 of 12 sections completed</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/profile" className="text-xs text-emerald-600 hover:underline flex items-center">
              Complete Profile
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Compliant</div>
            <p className="text-xs text-gray-500 mt-2">Last updated: April 10, 2025</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/compliance" className="text-xs text-emerald-600 hover:underline flex items-center">
              View Details
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
            <Upload className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-2">Documents requiring attention</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/documents" className="text-xs text-emerald-600 hover:underline flex items-center">
              Upload Documents
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-2">From 1 conversation</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/messages" className="text-xs text-emerald-600 hover:underline flex items-center">
              View Messages
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Renewals</CardTitle>
            <CardDescription>Documents that need to be renewed soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "ISO 9001 Certificate",
                  date: "May 15, 2025",
                  status: "warning",
                  icon: <AlertCircle className="h-4 w-4" />,
                },
                {
                  title: "Insurance Policy",
                  date: "June 22, 2025",
                  status: "info",
                  icon: <Clock className="h-4 w-4" />,
                },
                {
                  title: "Tax Compliance Certificate",
                  date: "July 10, 2025",
                  status: "info",
                  icon: <Clock className="h-4 w-4" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        item.status === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">Expires: {item.date}</div>
                    </div>
                  </div>
                  <Badge variant={item.status === "warning" ? "destructive" : "outline"}>
                    {item.status === "warning" ? "Urgent" : "Upcoming"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Documents
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest communications from buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  sender: "Global Construction Corp",
                  message: "We need additional information about your safety certifications for the upcoming project.",
                  time: "2 hours ago",
                  unread: true,
                },
                {
                  sender: "Tech Solutions Inc",
                  message: "Thank you for submitting your proposal. We have a few follow-up questions.",
                  time: "Yesterday",
                  unread: true,
                },
                {
                  sender: "Manufacturing Partners",
                  message: "Your annual compliance documents have been reviewed and approved.",
                  time: "3 days ago",
                  unread: false,
                },
              ].map((message, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    {message.sender.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender}</span>
                      {message.unread && <span className="h-2 w-2 rounded-full bg-emerald-500"></span>}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-gray-400">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Messages
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Completion Status</CardTitle>
            <CardDescription>Complete all sections to improve your vendor rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Basic Information", status: "complete", progress: 100 },
                { name: "Certifications & Compliance", status: "in-progress", progress: 75 },
                { name: "Past Experience", status: "in-progress", progress: 60 },
                { name: "Financial Information", status: "in-progress", progress: 40 },
                { name: "Key Personnel", status: "not-started", progress: 0 },
                { name: "Facilities & Equipment", status: "not-started", progress: 0 },
              ].map((section, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{section.name}</div>
                    <div className="text-sm">
                      {section.status === "complete" ? (
                        <span className="text-emerald-600">Complete</span>
                      ) : section.status === "in-progress" ? (
                        <span className="text-amber-600">In Progress</span>
                      ) : (
                        <span className="text-gray-500">Not Started</span>
                      )}
                    </div>
                  </div>
                  <Progress value={section.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Continue Profile Completion</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/documents/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/certifications/add">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Certification
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/personnel/add">
                  <Users className="mr-2 h-4 w-4" />
                  Add Key Personnel
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/messages/new">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Message
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
