import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Loader2, ShieldAlert } from "lucide-react"
import { getReportedPosts, blockPost } from "@/apis/admin"
import toast from "react-hot-toast"

// Define interface for reported posts from API

// Define interface for reported posts from API
interface ReportedPost {
     postId: number;
     title: string;
     content?: string;
     createdAt: string;
     level?: string;
     sentiment?: string;
     status: string;
     topic?: string;
     updatedAt?: string;
}

export function ComplaintsManagement() {
     // We don't need to use mockComplaints anymore, focusing on the actual reported posts
     const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([])
     const [loading, setLoading] = useState(false)
     const [searchTerm, setSearchTerm] = useState("")
     const [statusFilter, setStatusFilter] = useState("all")
     const [blockingPostId, setBlockingPostId] = useState<number | null>(null)

     useEffect(() => {
          fetchReportedPosts();
     }, []);

     const fetchReportedPosts = async () => {
          setLoading(true);
          try {
               // Add a timestamp parameter to avoid caching
               const timestamp = new Date().getTime();
               const response = await getReportedPosts();
               console.log(`Reported posts API response (${timestamp}):`, response.data);

               if (response.data && response.data.data && response.data.data.posts) {
                    setReportedPosts(response.data.data.posts);
               } else {
                    console.error("API response is not in the expected format:", response.data);
               }
          } catch (error) {
               console.error("Failed to fetch reported posts:", error);
               toast.error("Failed to load reported posts");
          } finally {
               setLoading(false);
          }
     };

     const getStatusBadge = (status: string) => {
          // Normalize status to lowercase for comparison
          const normalizedStatus = status.toLowerCase();

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

          // Use normalized status for lookup
          const config = statusConfig[normalizedStatus as keyof typeof statusConfig] ||
               statusConfig['pending']; // Default to pending if not found

          const Icon = config.icon
          return (
               <Badge className={config.className}>
                    <Icon className="w-3 h-3 mr-1" />
                    {config.label}
               </Badge>
          )
     }

     // Removed unused functions

     const handleStatusChange = (itemId: number | string, newStatus: string) => {
          // Handle reported posts (API data)
          // In a real implementation, you would make an API call to update the status
          // For now, just update the local state
          const updatedPost = reportedPosts.find((post) => post.postId === itemId);
          if (updatedPost) {
               console.log(`Updating reported post ${itemId} status to ${newStatus.toUpperCase()}`);
               // In a real implementation, make API call here to update the post status

               // Update local state - note we're storing status in UPPERCASE to match the API
               setReportedPosts(
                    reportedPosts.map((post) =>
                         post.postId === itemId ? { ...post, status: newStatus.toUpperCase() } : post
                    )
               );

               toast.success(`Post status updated to ${newStatus}`);
          } else {
               toast.error("Post not found");
          }
     }

     const handleBlockPost = async (postId: number) => {
          if (!postId) {
               toast.error("Invalid post ID");
               return;
          }

          setBlockingPostId(postId);
          try {
               await blockPost(postId);
               // Refresh the reported posts list after blocking
               await fetchReportedPosts();
               toast.success("Post blocked successfully!");
          } catch (error) {
               console.error("Failed to block post:", error);
               toast.error("Failed to block post. Please try again.");
          } finally {
               setBlockingPostId(null);
          }
     }

     // Filtering is now done inline in the JSX

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
                              <CardTitle className="text-sm font-medium text-red-900">Total Reported Posts</CardTitle>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{reportedPosts.length}</div>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-yellow-900">Pending</CardTitle>
                              <Clock className="h-4 w-4 text-yellow-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-yellow-900">
                                   {reportedPosts.filter((p) => p.status === "PENDING").length}
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
                                   {reportedPosts.filter((p) => p.status === "INVESTIGATING").length}
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
                                   {reportedPosts.filter((p) => p.status === "RESOLVED").length}
                              </div>
                         </CardContent>
                    </Card>
               </div>

               {/* Search and Filters for Reported Posts */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">Search Reported Posts</CardTitle>
                         <CardDescription className="text-red-700">Search and filter reported posts</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center space-x-4 mb-6">
                              <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                   <Input
                                        placeholder="Search reported posts..."
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
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="INVESTIGATING">Investigating</SelectItem>
                                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>

                         <Button
                              onClick={() => fetchReportedPosts()}
                              variant="outline"
                              className="mb-4 border-red-200 text-red-900 hover:bg-red-50"
                         >
                              <Loader2 className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                              Refresh Posts
                         </Button>
                    </CardContent>
               </Card>

               {/* Reported Posts */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div>
                              <CardTitle className="text-red-900">Reported Posts</CardTitle>
                              <CardDescription className="text-red-700">Review posts reported by users</CardDescription>
                         </div>
                         <Button
                              onClick={() => fetchReportedPosts()}
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-900 hover:bg-red-50"
                              disabled={loading}
                         >
                              <Loader2 className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                              Refresh
                         </Button>
                    </CardHeader>
                    <CardContent>
                         {loading ? (
                              <div className="flex justify-center items-center py-8">
                                   <Loader2 className="animate-spin h-8 w-8 text-red-600 mr-2" />
                                   <p className="text-red-800 font-medium">Loading reported posts...</p>
                              </div>
                         ) : (
                              <div className="w-full rounded-md border border-red-200">
                                   {reportedPosts && reportedPosts.length > 0 ? (
                                        <Table>
                                             <TableHeader>
                                                  <TableRow className="bg-red-50">
                                                       <TableHead className="text-red-900">Post Title</TableHead>
                                                       <TableHead className="text-red-900">Content</TableHead>
                                                       <TableHead className="text-red-900">Topic</TableHead>
                                                       <TableHead className="text-red-900">Status</TableHead>
                                                       <TableHead className="text-red-900">Created At</TableHead>
                                                       <TableHead className="text-red-900">Actions</TableHead>
                                                  </TableRow>
                                             </TableHeader>
                                             <TableBody>
                                                  {reportedPosts
                                                       .filter(post => {
                                                            const matchesSearch = searchTerm === "" ||
                                                                 post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                 (post.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                 (post.topic || '').toLowerCase().includes(searchTerm.toLowerCase());

                                                            const matchesStatus = statusFilter === "all" || post.status === statusFilter;
                                                            return matchesSearch && matchesStatus;
                                                       })
                                                       .map((post) => (
                                                            <TableRow key={post.postId} className="hover:bg-red-50">
                                                                 <TableCell className="font-medium text-red-900 max-w-xs truncate">
                                                                      {post.title}
                                                                 </TableCell>
                                                                 <TableCell className="text-red-800 max-w-xs truncate">
                                                                      {post.content?.substring(0, 50) || 'No content'}
                                                                      {post.content && post.content.length > 50 ? '...' : ''}
                                                                 </TableCell>
                                                                 <TableCell className="text-red-800">
                                                                      {post.topic || 'N/A'}
                                                                 </TableCell>
                                                                 <TableCell>{getStatusBadge(post.status || 'PENDING')}</TableCell>
                                                                 <TableCell className="text-red-800">
                                                                      {new Date(post.createdAt).toLocaleDateString()}
                                                                 </TableCell>
                                                                 <TableCell>
                                                                      <DropdownMenu>
                                                                           <DropdownMenuTrigger asChild>
                                                                                <Button variant="ghost" className="h-8 w-8 p-0" disabled={blockingPostId === post.postId}>
                                                                                     {blockingPostId === post.postId ? (
                                                                                          <Loader2 className="h-4 w-4 animate-spin" />
                                                                                     ) : (
                                                                                          <MoreHorizontal className="h-4 w-4" />
                                                                                     )}
                                                                                </Button>
                                                                           </DropdownMenuTrigger>
                                                                           <DropdownMenuContent align="end">
                                                                                <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          // Prevent error by checking if the postId exists
                                                                                          if (post.postId) {
                                                                                               window.open(`/posts/${post.postId}`, '_blank');
                                                                                          } else {
                                                                                               toast.error("Post ID not found");
                                                                                          }
                                                                                     }}
                                                                                >
                                                                                     <Eye className="mr-2 h-4 w-4" />
                                                                                     View Post
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          handleStatusChange(post.postId, 'INVESTIGATING');
                                                                                          toast.success("Post marked as investigating");
                                                                                     }}
                                                                                >
                                                                                     <Eye className="mr-2 h-4 w-4" />
                                                                                     Mark as Investigating
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          handleStatusChange(post.postId, 'RESOLVED');
                                                                                          toast.success("Post marked as resolved");
                                                                                     }}
                                                                                >
                                                                                     <CheckCircle className="mr-2 h-4 w-4" />
                                                                                     Mark as Resolved
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          handleStatusChange(post.postId, 'REJECTED');
                                                                                          toast.success("Post report rejected");
                                                                                     }}
                                                                                >
                                                                                     <XCircle className="mr-2 h-4 w-4" />
                                                                                     Reject Report
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                     onClick={() => handleBlockPost(post.postId)}
                                                                                     className="text-red-600 focus:text-red-600"
                                                                                >
                                                                                     <ShieldAlert className="mr-2 h-4 w-4" />
                                                                                     Block Post
                                                                                </DropdownMenuItem>
                                                                           </DropdownMenuContent>
                                                                      </DropdownMenu>
                                                                 </TableCell>
                                                            </TableRow>
                                                       ))}
                                             </TableBody>
                                        </Table>
                                   ) : (
                                        <div className="py-8 text-center">
                                             <p className="text-red-700">No reported posts found.</p>
                                        </div>
                                   )}
                              </div>
                         )}
                    </CardContent>
               </Card>
          </div>
     )
}
