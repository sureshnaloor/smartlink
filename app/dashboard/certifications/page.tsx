"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, FileText, Download, Trash2, Edit, Calendar, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function CertificationsPage() {
  const { toast } = useToast()
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      issueDate: "2023-05-15",
      expiryDate: "2025-05-15",
      status: "active",
      documentUrl: "#",
    },
    {
      id: 2,
      name: "OHSAS 18001",
      issuer: "Occupational Health and Safety Assessment Series",
      issueDate: "2022-08-10",
      expiryDate: "2025-08-10",
      status: "active",
      documentUrl: "#",
    },
    {
      id: 3,
      name: "API Certification",
      issuer: "American Petroleum Institute",
      issueDate: "2021-11-20",
      expiryDate: "2024-11-20",
      status: "expiring-soon",
      documentUrl: "#",
    },
  ])

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [certificationToDelete, setCertificationToDelete] = useState<number | null>(null)

  const handleDelete = () => {
    if (certificationToDelete !== null) {
      setCertifications(certifications.filter((cert) => cert.id !== certificationToDelete))
      toast({
        title: "Certification deleted",
        description: "The certification has been removed successfully.",
      })
      setIsDeleteDialogOpen(false)
      setCertificationToDelete(null)
    }
  }

  const confirmDelete = (id: number) => {
    setCertificationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-gray-500">Manage your company certifications and compliance documents</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
          <Link href="/dashboard/certifications/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Certification
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{cert.name}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Open menu</span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                      >
                        <path
                          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/certifications/edit/${cert.id}`} className="flex w-full cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={cert.documentUrl} className="flex w-full cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => confirmDelete(cert.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Issue Date:</span>
                  </div>
                  <span className="text-sm">{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Expiry Date:</span>
                  </div>
                  <span className="text-sm">{new Date(cert.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>Status:</span>
                  </div>
                  {cert.status === "active" ? (
                    <Badge className="bg-emerald-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  ) : cert.status === "expiring-soon" ? (
                    <Badge variant="outline" className="text-amber-600 border-amber-600">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Expiring Soon
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Expired
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this certification? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
