import type { ReactNode } from "react"
import Link from "next/link"
import {
  Building2,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Upload,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-30 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 py-4 font-semibold text-xl">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                    <span>VendorHub</span>
                  </div>
                  <nav className="flex-1 space-y-1 py-4">
                    <MobileNavLinks />
                  </nav>
                  <div className="border-t pt-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
              <Building2 className="h-6 w-6 text-emerald-600" />
              <span className="hidden md:inline">VendorHub</span>
            </Link>

            <div className="hidden md:flex md:w-80 lg:w-96">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="w-full bg-gray-50 pl-8" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout" className="flex w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50">
          <div className="flex flex-col gap-1 p-4">
            <DesktopNavLinks />
          </div>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
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
