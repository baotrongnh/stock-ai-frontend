import { deletePost, getDetailPost, getReportedPosts } from "@/apis/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, CheckCircle, Clock, Eye, Loader2, MoreHorizontal, Search, ShieldAlert, Trash2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// Define interface for reported posts from API

// Define interface for reported posts from API
interface ReportedPost {
     postId: number;
     id?: number; // Some API responses might use id instead of postId
     title: string;
     content?: string;
     createdAt: string;
     level?: string;
     sentiment?: string;
     status: string;
     topic?: string;
     updatedAt?: string;
     authorId?: number;
     authorName?: string;
     reportCount?: number;
     reportReason?: string;
}

export function ComplaintsManagement() {
     // We don't need to use mockComplaints anymore, focusing on the actual reported posts
     const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([])
     const [loading, setLoading] = useState(false)
     const [searchTerm, setSearchTerm] = useState("")
     const [statusFilter, setStatusFilter] = useState("all")
     const [blockingPostId] = useState<number | null>(null)
     const [deletingPostId, setDeletingPostId] = useState<number | null>(null)
     const [loadingDetail, setLoadingDetail] = useState(false)
     const [detailPost, setDetailPost] = useState<ReportedPost | null>(null)
     const [openDetail, setOpenDetail] = useState(false)

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
               pending: { label: "Waiting", className: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Clock },
               active: { label: "Active", className: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle },
               investigating: { label: "Investigating", className: "bg-blue-100 text-blue-800 border-blue-300", icon: Eye },
               resolved: {
                    label: "Resolved",
                    className: "bg-green-100 text-green-800 border-green-300",
                    icon: CheckCircle,
               },
               rejected: { label: "Rejected", className: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
               blocked: { label: "Deleted", className: "bg-gray-100 text-gray-800 border-gray-300", icon: ShieldAlert },
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

     const handleStatusChange = async (itemId: number | string, newStatus: string) => {
          try {
               // Find the post to update
               const updatedPost = reportedPosts.find((post) => post.postId === itemId);
               if (!updatedPost) {
                    toast.error("Post not found");
                    return;
               }

               console.log(`Updating reported post ${itemId} status to ${newStatus.toUpperCase()}`);

               // Update local state immediately for better UX
               setReportedPosts(
                    reportedPosts.map((post) =>
                         post.postId === itemId ? { ...post, status: newStatus.toUpperCase() } : post
                    )
               );

               // In a real implementation, make API call here to update the post status
               // await updatePostStatus(itemId, newStatus);

               // Refresh the data to ensure consistency
               await fetchReportedPosts();

               toast.success(`Post status updated to ${newStatus}`);
          } catch (error) {
               console.error("Failed to update post status:", error);
               toast.error("Failed to update post status. Please try again.");
               // Revert local changes by refreshing
               await fetchReportedPosts();
          }
     }

     // const handleBlockPost = async (postId: number) => {
     //      if (!postId) {
     //           toast.error("Invalid post ID");
     //           return;
     //      }

     //      setBlockingPostId(postId);
     //      try {
     //           await blockPost(postId);
     //           // Automatically refresh the reported posts list after blocking
     //           await fetchReportedPosts();
     //           toast.success("Post deleted successfully!");
     //      } catch (error) {
     //           console.error("Failed to delete post:", error);
     //           toast.error("Failed to delete post. Please try again.");
     //      } finally {
     //           setBlockingPostId(null);
     //      }
     // }

     const handleDeletePost = async (postId: number) => {
          if (!postId) {
               toast.error("Invalid post ID");
               return;
          }

          setDeletingPostId(postId);
          try {
               await deletePost(postId);
               // Automatically refresh the reported posts list after deletion
               await fetchReportedPosts();
               toast.success("Post deleted successfully!");
          } catch (error) {
               console.error("Failed to delete post:", error);
               toast.error("Failed to delete post. Please try again.");
          } finally {
               setDeletingPostId(null);
          }
     }

     const handleViewDetail = async (postId: number) => {
          if (!postId) {
               toast.error("Invalid post ID");
               return;
          }

          setLoadingDetail(true);
          setOpenDetail(true);
          try {
               const response = await getDetailPost(postId);
               if (response && response.data && response.data.data) {
                    setDetailPost(response.data.data);
               } else {
                    toast.error("Failed to load post details");
                    setOpenDetail(false);
               }
          } catch (error) {
               console.error("Failed to fetch post details:", error);
               toast.error("Failed to load post details. Please try again.");
               setOpenDetail(false);
          } finally {
               setLoadingDetail(false);
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
                              <CardTitle className="text-sm font-medium text-yellow-900">Waiting</CardTitle>
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
                              <CardTitle className="text-sm font-medium text-green-900">Active</CardTitle>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-green-900">
                                   {reportedPosts.filter((p) => p.status === "ACTIVE").length}
                              </div>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-gray-900">Deleted</CardTitle>
                              <ShieldAlert className="h-4 w-4 text-gray-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-gray-900">
                                   {reportedPosts.filter((p) => p.status === "BLOCKED").length}
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
                                        <SelectItem value="PENDING">Waiting</SelectItem>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INVESTIGATING">Investigating</SelectItem>
                                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                        <SelectItem value="BLOCKED">Deleted</SelectItem>
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
                              <CardDescription className="text-red-700">Review posts reported by users. Click on any row to view details.</CardDescription>
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
                                                            <TableRow
                                                                 key={post.postId}
                                                                 className={`hover:bg-red-50 cursor-pointer transition-colors ${blockingPostId === post.postId || deletingPostId === post.postId
                                                                           ? 'opacity-50 cursor-not-allowed'
                                                                           : ''
                                                                      }`}
                                                                 onClick={() => {
                                                                      if (blockingPostId !== post.postId && deletingPostId !== post.postId) {
                                                                           handleViewDetail(post.postId);
                                                                      }
                                                                 }}
                                                            >
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
                                                                 <TableCell>{getStatusBadge(post.status)}</TableCell>
                                                                 <TableCell className="text-red-800">
                                                                      {new Date(post.createdAt).toLocaleDateString()}
                                                                 </TableCell>
                                                                 <TableCell className="relative" onClick={(e) => e.stopPropagation()}>
                                                                      <DropdownMenu>
                                                                           <DropdownMenuTrigger asChild>
                                                                                <Button
                                                                                     variant="outline"
                                                                                     className="h-8 w-8 p-0 border-2 bg-white hover:bg-red-100 rounded-md shadow-sm"
                                                                                     disabled={blockingPostId === post.postId}
                                                                                >
                                                                                     {blockingPostId === post.postId ? (
                                                                                          <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                                                                                     ) : (
                                                                                          <MoreHorizontal className="h-4 w-4 text-red-600" />
                                                                                     )}
                                                                                </Button>
                                                                           </DropdownMenuTrigger>
                                                                           <DropdownMenuContent
                                                                                align="end"
                                                                                className="bg-white border-2 rounded-md shadow-xl min-w-[200px] z-[100] p-1"
                                                                                sideOffset={5}
                                                                                avoidCollisions={true}
                                                                           >
                                                                                {/* <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          // Prevent error by checking if the postId exists
                                                                                          if (post.postId) {
                                                                                               window.open(`/posts/${post.postId}`, '_blank');
                                                                                          } else {
                                                                                               toast.error("Post ID not found");
                                                                                          }
                                                                                     }}
                                                                                     className="cursor-pointer bg-white hover:bg-red-100 text-red-900 focus:text-red-900 focus:bg-red-100 py-2 px-2 rounded-md m-1"
                                                                                >
                                                                                     <Eye className="mr-2 h-4 w-4" />
                                                                                     View Post
                                                                                </DropdownMenuItem> */}

                                                                                <DropdownMenuItem
                                                                                     onClick={() => {
                                                                                          handleStatusChange(post.postId, 'REJECTED');
                                                                                          toast.success("Post report rejected");
                                                                                     }}
                                                                                     className="cursor-pointer bg-white hover:bg-gray-100 text-gray-700 focus:text-gray-800 focus:bg-gray-100 py-2 px-2 rounded-md m-1"
                                                                                >
                                                                                     <XCircle className="mr-2 h-4 w-4" />
                                                                                     Reject Report
                                                                                </DropdownMenuItem>

                                                                                <DropdownMenuItem
                                                                                     onClick={() => handleDeletePost(post.postId)}
                                                                                     className="cursor-pointer bg-red-50 hover:bg-red-200 text-red-700 focus:text-red-800 focus:bg-red-200 font-medium py-2 px-2 rounded-md m-1"
                                                                                     disabled={deletingPostId === post.postId}
                                                                                >
                                                                                     {deletingPostId === post.postId ? (
                                                                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                     ) : (
                                                                                          <Trash2 className="mr-2 h-4 w-4" />
                                                                                     )}
                                                                                     Delete Post Permanently
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

               {/* Post Detail Dialog */}
               <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                    <DialogContent className="max-w-4xl bg-white border-red-200 shadow-lg max-h-[90vh] overflow-y-auto">
                         <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b border-red-100">
                              <div className="flex justify-between items-center">
                                   <DialogTitle className="text-xl font-bold text-red-900">Post Details</DialogTitle>
                                   {detailPost && (
                                        <div>{getStatusBadge(detailPost.status || 'PENDING')}</div>
                                   )}
                              </div>
                         </DialogHeader>
                         {loadingDetail ? (
                              <div className="flex justify-center items-center py-8">
                                   <Loader2 className="animate-spin h-8 w-8 text-red-600 mr-2" />
                                   <p className="text-red-800 font-medium">Loading post details...</p>
                              </div>
                         ) : detailPost ? (
                              <div className="space-y-6 pt-4">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-red-900 flex items-center">
                                                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                       </svg>
                                                       Post Title
                                                  </h3>
                                                  <p className="text-red-800 font-medium">{detailPost.title}</p>
                                             </div>
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-red-900 flex items-center">
                                                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                                       </svg>
                                                       Topic
                                                  </h3>
                                                  <p className="text-red-800">{detailPost.topic || 'N/A'}</p>
                                             </div>
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-red-900 flex items-center">
                                                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                       </svg>
                                                       Created At
                                                  </h3>
                                                  <p className="text-red-800">{new Date(detailPost.createdAt).toLocaleString()}</p>
                                             </div>
                                        </div>
                                        <div className="space-y-4">
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-red-900 flex items-center">
                                                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                                                       </svg>
                                                       Status
                                                  </h3>
                                                  <div>{getStatusBadge(detailPost.status || 'PENDING')}</div>
                                             </div>
                                             {detailPost.updatedAt && (
                                                  <div className="space-y-2">
                                                       <h3 className="font-semibold text-red-900 flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                            </svg>
                                                            Last Updated
                                                       </h3>
                                                       <p className="text-red-800">{new Date(detailPost.updatedAt).toLocaleString()}</p>
                                                  </div>
                                             )}
                                             {detailPost.level && (
                                                  <div className="space-y-2">
                                                       <h3 className="font-semibold text-red-900 flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            Severity Level
                                                       </h3>
                                                       <p className="text-red-800 font-medium">{detailPost.level}</p>
                                                  </div>
                                             )}
                                             {detailPost.sentiment && (
                                                  <div className="space-y-2">
                                                       <h3 className="font-semibold text-red-900 flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                                                            </svg>
                                                            Sentiment
                                                       </h3>
                                                       <p className="text-red-800">{detailPost.sentiment}</p>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   <div className="space-y-2">
                                        <h3 className="font-semibold text-red-900 flex items-center">
                                             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                             </svg>
                                             Content
                                        </h3>
                                        <div className="bg-red-50 p-4 rounded-md border border-red-100 max-h-40 overflow-y-auto">
                                             <p className="text-red-800 whitespace-pre-wrap leading-relaxed">{detailPost.content || 'No content available'}</p>
                                        </div>
                                   </div>

                                   <div className="flex justify-end space-x-3 pt-6 border-t border-red-100">
                                        <Button
                                             variant="outline"
                                             className="border-red-200 text-red-900 hover:bg-red-50"
                                             onClick={() => setOpenDetail(false)}
                                        >
                                             Close
                                        </Button>
                                        <Button
                                             variant="outline"
                                             className="border-blue-200 text-blue-900 hover:bg-blue-50"
                                             onClick={() => {
                                                  if (detailPost.postId) {
                                                       window.open(`/posts/${detailPost.postId}`, '_blank');
                                                  }
                                             }}
                                        >
                                             <Eye className="mr-2 h-4 w-4" />
                                             View Original Post
                                        </Button>
                                        <Button
                                             variant="destructive"
                                             className="bg-red-600 hover:bg-red-700 text-white font-medium"
                                             onClick={() => {
                                                  handleDeletePost(detailPost.postId);
                                                  setOpenDetail(false);
                                             }}
                                        >
                                             <Trash2 className="mr-2 h-4 w-4" />
                                             Delete Post
                                        </Button>
                                   </div>
                              </div>
                         ) : (
                              <div className="py-8 text-center">
                                   <p className="text-red-700">No post details available.</p>
                              </div>
                         )}
                    </DialogContent>
               </Dialog>
          </div>
     )
}
