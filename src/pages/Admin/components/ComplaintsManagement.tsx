"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Clock, AlertTriangle, User } from "lucide-react"

const mockComplaints = [
     {
          id: 1,
          title: "Spam in Comments",
          reporter: "John Doe",
          reportedUser: "Jane Smith",
          type: "spam",
          status: "pending",
          priority: "medium",
          description: "This user continuously posts spam links in comments",
          createdAt: "2024-01-15",
          evidence: "Screenshots of spam comments",
     },
     {
          id: 2,
          title: "Inappropriate Content",
          reporter: "Mike Johnson",
          reportedUser: "Sarah Wilson",
          type: "inappropriate",
          status: "resolved",
          priority: "high",
          description: "Post contains content inappropriate for the community",
          createdAt: "2024-01-14",
          evidence: "Link to violating post",
     },
     {
          id: 3,
          title: "User Harassment",
          reporter: "Tom Brown",
          reportedUser: "Lisa Davis",
          type: "harassment",
          status: "investigating",
          priority: "high",
          description: "This user continuously posts negative comments and harasses others",
          createdAt: "2024-01-13",
          evidence: "List of harassing comments",
     },
     {
          id: 4,
          title: "Content Plagiarism",
          reporter: "David Wilson",
          reportedUser: "Emma Johnson",
          type: "copyright",
          status: "rejected",
          priority: "low",
          description: "Post copied from another source without attribution",
          createdAt: "2024-01-12",
          evidence: "Original and copied post links",
     },
     {
          id: 5,
          title: "Fake Account",
          reporter: "Anna Smith",
          reportedUser: "Fake Celebrity",
          type: "fake_account",
          status: "pending",
          priority: "high",
          description: "This account is impersonating a celebrity",
          createdAt: "2024-01-11",
          evidence: "Comparison of real and fake profiles",
     },
]

// Logging functions
const logUpdateAction = (id: number, newData: Record<string, unknown>) => {
     console.log(`UPDATE ACTION - Complaint ID: ${id}`)
     console.log("New Data:", newData)
}

export function ComplaintsManagement() {
     const [complaints, setComplaints] = useState(mockComplaints)
     const [searchTerm, setSearchTerm] = useState("")
     const [statusFilter, setStatusFilter] = useState("all")

     const getStatusBadge = (status: string) => {
          const statusConfig = {
               pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Clock },
               investigating: { label: "Investigating", className: "bg-blue-100 text-blue-800 border-blue-300", icon: Eye },
               resolved: {
                    label: "Resolved",
                    className: "bg-green-100 text-green-800 border-green-300",
                    icon: CheckCircle,
               },
               rejected: { label: "Rejected", className: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
          }
          const config = statusConfig[status as keyof typeof statusConfig]
          const Icon = config.icon
          return (
               <Badge className={config.className}>
                    <Icon className="w-3 h-3 mr-1" />
                    {config.label}
               </Badge>
          )
     }

     const getPriorityBadge = (priority: string) => {
          const priorityConfig = {
               low: { label: "Low", className: "bg-gray-100 text-gray-800 border-gray-300" },
               medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
               high: { label: "High", className: "bg-red-100 text-red-800 border-red-300" },
          }
          const config = priorityConfig[priority as keyof typeof priorityConfig]
          return <Badge className={config.className}>{config.label}</Badge>
     }

     const getTypeLabel = (type: string) => {
          const typeLabels = {
               spam: "Spam",
               inappropriate: "Inappropriate Content",
               harassment: "Harassment",
               copyright: "Copyright Violation",
               fake_account: "Fake Account",
          }
          return typeLabels[type as keyof typeof typeLabels] || type
     }

     const handleStatusChange = (complaintId: number, newStatus: string) => {
          const updatedComplaint = complaints.find((complaint) => complaint.id === complaintId)
          if (updatedComplaint) {
               const newData = { ...updatedComplaint, status: newStatus }
               logUpdateAction(complaintId, { status: newStatus })
               setComplaints(complaints.map((complaint) => (complaint.id === complaintId ? newData : complaint)))
          }
     }

     const filteredComplaints = complaints.filter((complaint) => {
          const matchesSearch =
               complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               complaint.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
               complaint.reportedUser.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
          return matchesSearch && matchesStatus
     })

     return (
          <div className="w-full max-w-none space-y-6">
               <div className="mb-6 w-full">
                    <h1 className="text-3xl font-bold text-red-900">Complaints Management</h1>
                    <p className="text-red-700 mt-2">Handle and track user complaints</p>
               </div>

               {/* Stats Cards */}
               <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Total Complaints</CardTitle>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{complaints.length}</div>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-yellow-900">Pending</CardTitle>
                              <Clock className="h-4 w-4 text-yellow-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-yellow-900">
                                   {complaints.filter((c) => c.status === "pending").length}
                              </div>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-blue-900">Investigating</CardTitle>
                              <Eye className="h-4 w-4 text-blue-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-blue-900">
                                   {complaints.filter((c) => c.status === "investigating").length}
                              </div>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-green-900">Resolved</CardTitle>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-green-900">
                                   {complaints.filter((c) => c.status === "resolved").length}
                              </div>
                         </CardContent>
                    </Card>
               </div>

               {/* Search and Filters */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">All Complaints</CardTitle>
                         <CardDescription className="text-red-700">Process and track user complaints</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center space-x-4 mb-6">
                              <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                   <Input
                                        placeholder="Search complaints..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-red-200 focus:border-red-400"
                                   />
                              </div>
                              <Select value={statusFilter} onValueChange={setStatusFilter}>
                                   <SelectTrigger className="w-48 border-red-200">
                                        <SelectValue placeholder="Filter by status" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="investigating">Investigating</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>

                         <div className="w-full rounded-md border border-red-200">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900">Title</TableHead>
                                             <TableHead className="text-red-900">Reporter</TableHead>
                                             <TableHead className="text-red-900">Reported User</TableHead>
                                             <TableHead className="text-red-900">Type</TableHead>
                                             <TableHead className="text-red-900">Priority</TableHead>
                                             <TableHead className="text-red-900">Status</TableHead>
                                             <TableHead className="text-red-900">Created</TableHead>
                                             <TableHead className="text-red-900">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {filteredComplaints.map((complaint) => (
                                             <TableRow key={complaint.id} className="hover:bg-red-50">
                                                  <TableCell className="font-medium text-red-900 max-w-xs truncate">{complaint.title}</TableCell>
                                                  <TableCell className="text-red-800">
                                                       <div className="flex items-center">
                                                            <User className="w-4 h-4 mr-2 text-red-600" />
                                                            {complaint.reporter}
                                                       </div>
                                                  </TableCell>
                                                  <TableCell className="text-red-800">
                                                       <div className="flex items-center">
                                                            <User className="w-4 h-4 mr-2 text-red-600" />
                                                            {complaint.reportedUser}
                                                       </div>
                                                  </TableCell>
                                                  <TableCell className="text-red-800">{getTypeLabel(complaint.type)}</TableCell>
                                                  <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                                                  <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                                                  <TableCell className="text-red-800">{complaint.createdAt}</TableCell>
                                                  <TableCell>
                                                       <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                 <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-100">
                                                                      <MoreHorizontal className="h-4 w-4 text-red-600" />
                                                                 </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="border-red-200">
                                                                 <Dialog>
                                                                      <DialogTrigger asChild>
                                                                           <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                                <Eye className="mr-2 h-4 w-4" />
                                                                                View Details
                                                                           </DropdownMenuItem>
                                                                      </DialogTrigger>
                                                                      <DialogContent className="border-red-200 max-w-2xl">
                                                                           <DialogHeader>
                                                                                <DialogTitle className="text-red-900">Complaint Details</DialogTitle>
                                                                                <DialogDescription className="text-red-700">
                                                                                     Detailed information about the complaint
                                                                                </DialogDescription>
                                                                           </DialogHeader>
                                                                           <div className="space-y-4">
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                     <div>
                                                                                          <label className="text-sm font-medium text-red-900">Reporter:</label>
                                                                                          <p className="text-red-800">{complaint.reporter}</p>
                                                                                     </div>
                                                                                     <div>
                                                                                          <label className="text-sm font-medium text-red-900">Reported User:</label>
                                                                                          <p className="text-red-800">{complaint.reportedUser}</p>
                                                                                     </div>
                                                                                </div>
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                     <div>
                                                                                          <label className="text-sm font-medium text-red-900">Violation Type:</label>
                                                                                          <p className="text-red-800">{getTypeLabel(complaint.type)}</p>
                                                                                     </div>
                                                                                     <div>
                                                                                          <label className="text-sm font-medium text-red-900">Priority Level:</label>
                                                                                          <div className="mt-1">{getPriorityBadge(complaint.priority)}</div>
                                                                                     </div>
                                                                                </div>
                                                                                <div>
                                                                                     <label className="text-sm font-medium text-red-900">Description:</label>
                                                                                     <p className="text-red-800 text-sm mt-1">{complaint.description}</p>
                                                                                </div>
                                                                                <div>
                                                                                     <label className="text-sm font-medium text-red-900">Evidence:</label>
                                                                                     <p className="text-red-800 text-sm mt-1">{complaint.evidence}</p>
                                                                                </div>
                                                                                <div className="flex space-x-2 pt-4">
                                                                                     <Button
                                                                                          onClick={() => handleStatusChange(complaint.id, "investigating")}
                                                                                          className="bg-blue-600 hover:bg-blue-700"
                                                                                     >
                                                                                          Start Investigation
                                                                                     </Button>
                                                                                     <Button
                                                                                          onClick={() => handleStatusChange(complaint.id, "resolved")}
                                                                                          className="bg-green-600 hover:bg-green-700"
                                                                                     >
                                                                                          Mark Resolved
                                                                                     </Button>
                                                                                     <Button
                                                                                          onClick={() => handleStatusChange(complaint.id, "rejected")}
                                                                                          variant="outline"
                                                                                          className="border-red-300 text-red-700 hover:bg-red-50"
                                                                                     >
                                                                                          Reject
                                                                                     </Button>
                                                                                </div>
                                                                           </div>
                                                                      </DialogContent>
                                                                 </Dialog>

                                                                 {complaint.status === "pending" && (
                                                                      <DropdownMenuItem onClick={() => handleStatusChange(complaint.id, "investigating")}>
                                                                           <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                                                           Start Investigation
                                                                      </DropdownMenuItem>
                                                                 )}

                                                                 {complaint.status === "investigating" && (
                                                                      <DropdownMenuItem onClick={() => handleStatusChange(complaint.id, "resolved")}>
                                                                           <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                                           Mark as Resolved
                                                                      </DropdownMenuItem>
                                                                 )}

                                                                 <DropdownMenuItem
                                                                      onClick={() => handleStatusChange(complaint.id, "rejected")}
                                                                      className="text-red-600 focus:text-red-600"
                                                                 >
                                                                      <XCircle className="mr-2 h-4 w-4" />
                                                                      Reject Complaint
                                                                 </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                       </DropdownMenu>
                                                  </TableCell>
                                             </TableRow>
                                        ))}
                                   </TableBody>
                              </Table>
                         </div>
                    </CardContent>
               </Card>
          </div>
     )
}
