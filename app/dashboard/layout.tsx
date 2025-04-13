import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Upload,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-1">
      {/* Mobile Sidebar Toggle */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 py-4 font-semibold text-xl">
              <Image 
                src="/images/vendorhub-logo.jpg" 
                alt="VendorHub Logo" 
                width={28} 
                height={28}
                className="rounded-sm" 
              />
              <span>VendorHub</span>
            </div>
            <nav className="flex-1 space-y-1 py-4">
              <MobileNavLinks />
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50">
        <div className="p-4 border-b flex items-center gap-2">
          <Image 
            src="/images/vendorhub-logo.jpg" 
            alt="VendorHub Logo" 
            width={24} 
            height={24}
            className="rounded-sm" 
          />
          <span className="font-semibold">VendorHub</span>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <DesktopNavLinks />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

function DesktopNavLinks() {
  return (
    <>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/profile">
          <FileText className="mr-2 h-4 w-4" />
          Company Profile
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/certifications">
          <FileText className="mr-2 h-4 w-4" />
          Certifications
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/experience">
          <Users className="mr-2 h-4 w-4" />
          Past Experience
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/financials">
          <FileText className="mr-2 h-4 w-4" />
          Financial Information
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/personnel">
          <Users className="mr-2 h-4 w-4" />
          Key Personnel
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/documents">
          <Upload className="mr-2 h-4 w-4" />
          Documents
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/messages">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/dashboard/settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </Button>
    </>
  )
}

function MobileNavLinks() {
  return (
    <>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/profile">
          <FileText className="mr-2 h-4 w-4" />
          Company Profile
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/certifications">
          <FileText className="mr-2 h-4 w-4" />
          Certifications
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/experience">
          <Users className="mr-2 h-4 w-4" />
          Past Experience
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/financials">
          <FileText className="mr-2 h-4 w-4" />
          Financial Information
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/personnel">
          <Users className="mr-2 h-4 w-4" />
          Key Personnel
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/documents">
          <Upload className="mr-2 h-4 w-4" />
          Documents
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/messages">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/dashboard/settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </Button>
    </>
  )
}
