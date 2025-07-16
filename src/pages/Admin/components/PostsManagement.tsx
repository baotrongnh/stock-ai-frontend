"use client"

import { useEffect, useState } from "react"
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
} from "@/components/ui/dialog"
import { Search, MoreHorizontal, Eye, Trash2, Loader2, RotateCcw } from "lucide-react"
import { getAllPosts, deletePost, getDetailPost, restorePost } from "@/apis/admin"
import toast from "react-hot-toast"

export function PostsManagement() {
     // Định nghĩa kiểu dữ liệu cho Post
     interface Post {
          postId: number;
          title: string;
          content?: string;
          status: string;
          sourceUrl?: string;
          createdAt?: string;
          updatedAt?: string;
          likeCount?: number;
          commentCount?: number;
          stock?: {
               symbol: string;
               companyName: string;
          };
          user?: {
               username: string;
               email: string;
          };
     }

     const [posts, setPosts] = useState<Post[]>([])
     const [blockedPosts, setBlockedPosts] = useState<Post[]>([])
     const [searchTerm, setSearchTerm] = useState("")
     const [statusFilter, setStatusFilter] = useState("all")
     const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "most_liked" | "most_commented">("newest")
     const [dateRange, setDateRange] = useState<"all" | "today" | "week" | "month">("all")
     const [blockedSearchTerm, setBlockedSearchTerm] = useState("")
     const [blockedStatusFilter, setBlockedStatusFilter] = useState<string>("all")
     const [detailPost, setDetailPost] = useState<Post | null>(null)
     const [openDetail, setOpenDetail] = useState(false)
     const [loadingDelete, setLoadingDelete] = useState(false)
     const [loading, setLoading] = useState(false)
     const [loadingDetail, setLoadingDetail] = useState(false)
     const [openBlocked, setOpenBlocked] = useState(false)
     const [restoringId, setRestoringId] = useState<number | null>(null)

     // Fetch active posts
     const fetchListPosts = async () => {
          setLoading(true)
          try {
               const { data } = await getAllPosts('ACTIVE')
               if (data?.data?.posts) {
                    setPosts(data.data.posts)
               }
          } finally {
               setLoading(false)
          }
     }

     // Fetch blocked posts
     const fetchBlockedPosts = async () => {
          setLoading(true)
          try {
               const { data } = await getAllPosts('BLOCKED')
               if (data?.data?.posts) {
                    setBlockedPosts(data.data.posts)
               }
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          fetchListPosts()
     }, [])

     // Status badge
     const getStatusBadge = (status: string) => {
          if (status === "ACTIVE")
               return <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
          if (status === "pending")
               return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
          if (status === "rejected")
               return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
          if (status === "BLOCKED")
               return <Badge className="bg-gray-200 text-gray-800 border-gray-300">Blocked</Badge>
          if (status === "draft")
               return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Draft</Badge>
          return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>
     }

     // Actions
     const handleDeletePost = async (postId: number) => {
          setLoadingDelete(true)
          try {
               await deletePost(postId)
               await fetchListPosts()
               toast.success("Delete post successfully!")
          } catch (error) {
               console.error("Failed to delete post:", error)
               toast.error("Delete failed!")
          }
          setLoadingDelete(false)
     }

     const handleViewDetail = async (postId: number) => {
          setLoadingDetail(true)
          setOpenDetail(true)
          try {
               const { data } = await getDetailPost(postId)
               setDetailPost(data?.data)
               toast.success("Loaded post detail!")
          } catch (error) {
               console.error("Failed to fetch post detail:", error)
               setDetailPost(null)
               toast.error("Cannot fetch post detail!")
          }
          setLoadingDetail(false)
     }

     const handleRestorePost = async (postId: number) => {
          setRestoringId(postId)
          try {
               await restorePost(postId)
               await fetchBlockedPosts()
               await fetchListPosts()
               toast.success("Restore post successfully!")
          } catch (error) {
               console.error("Failed to restore post:", error)
               toast.error("Restore failed!")
          }
          setRestoringId(null)
     }

     // Filtered posts
     const filteredPosts = posts.filter((post) => {
          // Search filter
          const matchesSearch = (post?.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
               (post?.stock?.symbol?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
               (post?.stock?.companyName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
               (post?.user?.username?.toLowerCase() || "").includes(searchTerm.toLowerCase());

          // Status filter
          const matchesStatus = statusFilter === "all" || post?.status === statusFilter;

          // Date range filter
          let matchesDateRange = true;
          if (dateRange !== "all" && post?.createdAt) {
               const postDate = new Date(post.createdAt);
               const today = new Date();
               today.setHours(0, 0, 0, 0);

               if (dateRange === "today") {
                    const startOfDay = new Date(today);
                    matchesDateRange = postDate >= startOfDay;
               } else if (dateRange === "week") {
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
                    matchesDateRange = postDate >= startOfWeek;
               } else if (dateRange === "month") {
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    matchesDateRange = postDate >= startOfMonth;
               }
          }

          return matchesSearch && matchesStatus && matchesDateRange;
     });

     // Sort the filtered posts
     const sortedPosts = [...filteredPosts].sort((a, b) => {
          if (sortOrder === "newest") {
               return new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime();
          } else if (sortOrder === "oldest") {
               return new Date(a?.createdAt || 0).getTime() - new Date(b?.createdAt || 0).getTime();
          } else if (sortOrder === "most_liked") {
               return (b?.likeCount || 0) - (a?.likeCount || 0);
          } else if (sortOrder === "most_commented") {
               return (b?.commentCount || 0) - (a?.commentCount || 0);
          }
          return 0;
     });

     // Filtered blocked posts
     const filteredBlockedPosts = blockedPosts.filter(
          (post) => {
               // Apply search term filter
               const matchesSearch = blockedSearchTerm === "" ||
                    (post?.title?.toLowerCase() || "").includes(blockedSearchTerm.toLowerCase()) ||
                    (post?.stock?.symbol?.toLowerCase() || "").includes(blockedSearchTerm.toLowerCase()) ||
                    (post?.stock?.companyName?.toLowerCase() || "").includes(blockedSearchTerm.toLowerCase()) ||
                    (post?.user?.username?.toLowerCase() || "").includes(blockedSearchTerm.toLowerCase());

               // Apply status filter
               const matchesStatus = blockedStatusFilter === "all" || post?.status === blockedStatusFilter;

               return matchesSearch && matchesStatus;
          }
     )

     return (
          <div className="w-full max-w-none space-y-6 bg-white text-gray-900">
               <div className="mb-6 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                         <h1 className="text-3xl font-bold text-red-900 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-red-800" viewBox="0 0 20 20" fill="currentColor">
                                   <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              Posts Management
                         </h1>
                         <p className="text-red-700 mt-2 ml-10">Review and manage all posts from users</p>
                    </div>
                    <Button
                         variant="outline"
                         className="border-red-200 text-red-900 hover:bg-red-50 shadow-sm"
                         onClick={() => {
                              fetchBlockedPosts()
                              setOpenBlocked(true)
                         }}
                    >
                         <RotateCcw className="w-4 h-4 mr-2" />
                         View Blocked Posts
                         <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">{blockedPosts.length || 0}</Badge>
                    </Button>
               </div>

               {/* Loading overlay */}
               {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
                         <div className="flex flex-col items-center">
                              <Loader2 className="animate-spin h-10 w-10 text-red-600 mb-2" />
                              <p className="text-red-800 font-medium">Loading posts...</p>
                         </div>
                    </div>
               )}

               {/* Stats Cards */}
               <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-red-200 bg-white shadow-sm hover:shadow-md transition-all">
                         <CardHeader className="pb-2">
                              <CardTitle className="text-red-900 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                   </svg>
                                   Total Posts
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{posts?.length || 0}</div>
                              <div className="text-xs text-red-700 mt-1">All posts in the system</div>
                         </CardContent>
                    </Card>
                    <Card className="border-green-200 bg-white shadow-sm hover:shadow-md transition-all">
                         <CardHeader className="pb-2">
                              <CardTitle className="text-green-900 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                   </svg>
                                   Active
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-green-900">
                                   {posts?.filter((p) => p?.status === "active").length}
                              </div>
                              <div className="text-xs text-green-700 mt-1">Currently visible posts</div>
                         </CardContent>
                    </Card>
                    <Card className="border-yellow-200 bg-white shadow-sm hover:shadow-md transition-all">
                         <CardHeader className="pb-2">
                              <CardTitle className="text-yellow-900 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                   </svg>
                                   Pending
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-yellow-900">
                                   {posts?.filter((p) => p?.status === "pending").length}
                              </div>
                              <div className="text-xs text-yellow-700 mt-1">Awaiting review</div>
                         </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-white shadow-sm hover:shadow-md transition-all">
                         <CardHeader className="pb-2">
                              <CardTitle className="text-red-900 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                   </svg>
                                   Rejected
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">
                                   {posts?.filter((p) => p?.status === "rejected").length}
                              </div>
                              <div className="text-xs text-red-700 mt-1">Did not meet standards</div>
                         </CardContent>
                    </Card>
               </div>

               {/* Search and Table */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">All Posts</CardTitle>
                         <CardDescription className="text-red-700">Manage and moderate posts</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-col space-y-4 mb-6">
                              {/* Search bar */}
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                   <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                        <Input
                                             placeholder="Search posts, stock symbol, or company name..."
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             className="pl-10 border-red-200 focus:border-red-400 bg-white text-gray-900"
                                        />
                                   </div>
                                   <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <span>Found {filteredPosts.length} posts</span>
                                        {(searchTerm || statusFilter !== "all" || dateRange !== "all") && (
                                             <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-8 px-2 text-red-600"
                                                  onClick={() => {
                                                       setSearchTerm("");
                                                       setStatusFilter("all");
                                                       setDateRange("all");
                                                       setSortOrder("newest");
                                                  }}
                                             >
                                                  Reset Filters
                                             </Button>
                                        )}
                                   </div>
                              </div>

                              {/* Advanced filters */}
                              <div className="flex flex-col md:flex-row gap-4">
                                   {/* Status filter */}
                                   <div className="w-full md:w-1/4">
                                        <label className="text-xs font-medium text-red-700 mb-1 block">Status</label>
                                        <select
                                             value={statusFilter}
                                             onChange={(e) => setStatusFilter(e.target.value)}
                                             className="w-full h-10 pl-3 pr-10 rounded-md border border-red-200 focus:border-red-400 bg-white text-gray-900 focus:outline-none"
                                        >
                                             <option value="all">All Statuses</option>
                                             <option value="active">Active Only</option>
                                             <option value="pending">Pending Only</option>
                                             <option value="rejected">Rejected Only</option>
                                        </select>
                                   </div>

                                   {/* Date filter */}
                                   <div className="w-full md:w-1/4">
                                        <label className="text-xs font-medium text-red-700 mb-1 block">Date Range</label>
                                        <select
                                             value={dateRange}
                                             onChange={(e) => setDateRange(e.target.value as "all" | "today" | "week" | "month")}
                                             className="w-full h-10 pl-3 pr-10 rounded-md border border-red-200 focus:border-red-400 bg-white text-gray-900 focus:outline-none"
                                        >
                                             <option value="all">All Time</option>
                                             <option value="today">Today</option>
                                             <option value="week">This Week</option>
                                             <option value="month">This Month</option>
                                        </select>
                                   </div>

                                   {/* Sort order */}
                                   <div className="w-full md:w-1/4">
                                        <label className="text-xs font-medium text-red-700 mb-1 block">Sort By</label>
                                        <select
                                             value={sortOrder}
                                             onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest" | "most_liked" | "most_commented")}
                                             className="w-full h-10 pl-3 pr-10 rounded-md border border-red-200 focus:border-red-400 bg-white text-gray-900 focus:outline-none"
                                        >
                                             <option value="newest">Newest First</option>
                                             <option value="oldest">Oldest First</option>
                                             <option value="most_liked">Most Liked</option>
                                             <option value="most_commented">Most Commented</option>
                                        </select>
                                   </div>

                                   {/* Stats */}
                                   <div className="w-full md:w-1/4 flex flex-col">
                                        <label className="text-xs font-medium text-red-700 mb-1 block">Filter Stats</label>
                                        <div className="flex-1 flex items-center space-x-2 bg-red-50 p-2 rounded-md">
                                             <div className="text-xs text-gray-700">
                                                  {statusFilter !== "all" && (
                                                       <Badge className="mr-1 bg-red-100 text-red-800">
                                                            {statusFilter}
                                                       </Badge>
                                                  )}
                                                  {dateRange !== "all" && (
                                                       <Badge className="mr-1 bg-blue-100 text-blue-800">
                                                            {dateRange === "today" ? "Today" :
                                                                 dateRange === "week" ? "This Week" : "This Month"}
                                                       </Badge>
                                                  )}
                                                  {!statusFilter && !dateRange && (
                                                       <span>No filters applied</span>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="rounded-md border border-red-200 bg-white overflow-x-auto">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900 w-1/4">Title</TableHead>
                                             <TableHead className="text-red-900 w-1/5">Stock</TableHead>
                                             <TableHead className="text-red-900 w-1/6">Status</TableHead>
                                             <TableHead className="text-red-900 w-1/6">Engagement</TableHead>
                                             <TableHead className="text-red-900 w-1/6">Created</TableHead>
                                             <TableHead className="text-red-900 w-1/12">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {sortedPosts.length === 0 ? (
                                             <TableRow>
                                                  <TableCell colSpan={6} className="h-32 text-center">
                                                       <div className="flex flex-col items-center justify-center text-red-800">
                                                            <Search className="h-8 w-8 text-red-300 mb-2" />
                                                            <p className="text-sm font-medium">No posts found</p>
                                                            <p className="text-xs text-red-600 mt-1">
                                                                 {searchTerm || statusFilter !== "all" || dateRange !== "all"
                                                                      ? "Try adjusting your filters"
                                                                      : "No posts available"}
                                                            </p>
                                                       </div>
                                                  </TableCell>
                                             </TableRow>
                                        ) : (
                                             sortedPosts.map((post) => (
                                                  <TableRow key={post?.postId} className="bg-white hover:bg-red-50">
                                                       <TableCell className="font-medium text-red-900">
                                                            <div className="flex items-center">
                                                                 {post?.sourceUrl ? (
                                                                      <div className="w-8 h-8 bg-red-100 rounded mr-2 overflow-hidden flex-shrink-0">
                                                                           <img
                                                                                src={post.sourceUrl}
                                                                                alt=""
                                                                                className="w-full h-full object-cover"
                                                                                onError={(e) => {
                                                                                     e.currentTarget.style.display = 'none';
                                                                                }}
                                                                           />
                                                                      </div>
                                                                 ) : (
                                                                      <div className="w-8 h-8 bg-red-100 rounded mr-2 flex items-center justify-center flex-shrink-0">
                                                                           <span className="text-red-800 text-xs">Post</span>
                                                                      </div>
                                                                 )}
                                                                 <div className="max-w-xs truncate">
                                                                      <span className="hover:text-red-700 cursor-pointer" onClick={() => handleViewDetail(post?.postId)}>
                                                                           {post?.title}
                                                                      </span>
                                                                      {post?.user?.username && (
                                                                           <div className="text-xs text-gray-500 mt-1">
                                                                                by {post.user.username}
                                                                           </div>
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       </TableCell>
                                                       <TableCell className="text-red-800">
                                                            <div>
                                                                 <span className="font-semibold">{post?.stock?.symbol}</span>
                                                                 <span className="ml-2 text-xs text-gray-500 block md:inline">{post?.stock?.companyName}</span>
                                                            </div>
                                                       </TableCell>
                                                       <TableCell>{getStatusBadge(post?.status)}</TableCell>
                                                       <TableCell className="text-red-800">
                                                            <div className="flex items-center space-x-4">
                                                                 <div className="flex items-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                           <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                                      </svg>
                                                                      <span>{post?.likeCount ?? 0}</span>
                                                                 </div>
                                                                 <div className="flex items-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                           <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                      </svg>
                                                                      <span>{post?.commentCount ?? 0}</span>
                                                                 </div>
                                                            </div>
                                                       </TableCell>
                                                       <TableCell className="text-red-800">
                                                            <div className="flex flex-col">
                                                                 <span>{post?.createdAt
                                                                      ? new Date(post.createdAt).toLocaleDateString()
                                                                      : ""}
                                                                 </span>
                                                                 <span className="text-xs text-gray-500">
                                                                      {post?.createdAt
                                                                           ? new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                           : ""}
                                                                 </span>
                                                            </div>
                                                       </TableCell>
                                                       <TableCell>
                                                            <div className="flex items-center space-x-1">
                                                                 <Button
                                                                      variant="ghost"
                                                                      size="icon"
                                                                      className="h-8 w-8 p-0 hover:bg-red-100 bg-white"
                                                                      onClick={() => handleViewDetail(post?.postId)}
                                                                 >
                                                                      <Eye className="h-4 w-4 text-red-600" />
                                                                 </Button>
                                                                 <DropdownMenu>
                                                                      <DropdownMenuTrigger asChild>
                                                                           <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-100 bg-white">
                                                                                <MoreHorizontal className="h-4 w-4 text-red-600" />
                                                                           </Button>
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent
                                                                           align="end"
                                                                           className="bg-white border border-red-200 shadow-lg"
                                                                           style={{ color: "#222" }}
                                                                      >
                                                                           <DropdownMenuItem
                                                                                onClick={() => handleViewDetail(post?.postId)}
                                                                                className="hover:bg-red-50 text-gray-900"
                                                                           >
                                                                                <Eye className="mr-2 h-4 w-4" />
                                                                                View Details
                                                                           </DropdownMenuItem>
                                                                           <DropdownMenuItem
                                                                                onClick={() => handleDeletePost(post?.postId)}
                                                                                className="text-red-600 focus:text-red-600 hover:bg-red-50"
                                                                           >
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                {loadingDelete ? "Deleting..." : "Delete Post"}
                                                                           </DropdownMenuItem>
                                                                      </DropdownMenuContent>
                                                                 </DropdownMenu>
                                                            </div>
                                                       </TableCell>
                                                  </TableRow>
                                             ))
                                        )}
                                   </TableBody>
                              </Table>
                         </div>
                    </CardContent>
               </Card>

               {/* Detail Dialog */}
               <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                    <DialogContent className="border-red-200 max-w-4xl p-0 bg-white text-gray-900">
                         <DialogHeader className="sticky top-0 z-10 bg-white p-6 border-b border-red-100">
                              <div className="flex justify-between items-center">
                                   <DialogTitle className="text-xl font-bold text-red-900">Post Details</DialogTitle>
                                   {detailPost && (
                                        <Badge className="ml-2 px-3 py-1 text-sm">
                                             {getStatusBadge(detailPost?.status)}
                                        </Badge>
                                   )}
                              </div>
                              <DialogDescription className="text-red-700 mt-1">
                                   Detailed information about the post
                              </DialogDescription>
                         </DialogHeader>
                         <div className="max-h-[70vh] overflow-y-auto p-6 bg-white text-gray-900">
                              {loadingDetail ? (
                                   <div className="flex items-center justify-center py-10">
                                        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
                                   </div>
                              ) : detailPost ? (
                                   <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             <div>
                                                  <h3 className="text-lg font-semibold text-red-900 mb-4">Post Information</h3>
                                                  <div className="space-y-4">
                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-sm font-medium text-red-900 block mb-1">Title:</label>
                                                            <p className="text-red-800 font-medium">{detailPost?.title}</p>
                                                       </div>

                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-sm font-medium text-red-900 block mb-1">Stock:</label>
                                                            <div className="flex items-center">
                                                                 <span className="text-red-800 font-bold">{detailPost?.stock?.symbol}</span>
                                                                 <span className="ml-2 text-red-700">{detailPost?.stock?.companyName}</span>
                                                            </div>
                                                       </div>

                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-sm font-medium text-red-900 block mb-1">User Info:</label>
                                                            <div className="flex items-center">
                                                                 <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mr-2">
                                                                      <span className="text-red-800 font-bold">{detailPost?.user?.username?.charAt(0)?.toUpperCase() || 'U'}</span>
                                                                 </div>
                                                                 <div>
                                                                      <p className="text-red-800 font-medium">{detailPost?.user?.username || 'Anonymous'}</p>
                                                                      <p className="text-xs text-red-700">{detailPost?.user?.email || 'No email'}</p>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>

                                             <div>
                                                  <h3 className="text-lg font-semibold text-red-900 mb-4">Stats & Metadata</h3>
                                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-xs font-medium text-red-700 block">Likes</label>
                                                            <p className="text-xl font-bold text-red-900">{detailPost?.likeCount || 0}</p>
                                                       </div>
                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-xs font-medium text-red-700 block">Comments</label>
                                                            <p className="text-xl font-bold text-red-900">{detailPost?.commentCount || 0}</p>
                                                       </div>
                                                  </div>

                                                  <div className="space-y-4">
                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-sm font-medium text-red-900 block mb-1">Created:</label>
                                                            <p className="text-red-800">{detailPost?.createdAt ? new Date(detailPost.createdAt).toLocaleString() : ""}</p>
                                                       </div>

                                                       <div className="bg-red-50 p-4 rounded-md">
                                                            <label className="text-sm font-medium text-red-900 block mb-1">Updated:</label>
                                                            <p className="text-red-800">{detailPost?.updatedAt ? new Date(detailPost.updatedAt).toLocaleString() : "Never updated"}</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="mt-4">
                                             <div className="bg-red-50 p-4 rounded-md">
                                                  <label className="text-sm font-medium text-red-900 block mb-2">Content:</label>
                                                  <div className="bg-white p-4 rounded border border-red-200 max-h-60 overflow-y-auto">
                                                       <p className="text-red-800 text-sm whitespace-pre-line">{detailPost?.content}</p>
                                                  </div>
                                             </div>
                                        </div>

                                        {detailPost?.sourceUrl && (
                                             <div className="mt-4">
                                                  <div className="bg-red-50 p-4 rounded-md">
                                                       <label className="text-sm font-medium text-red-900 block mb-2">Image:</label>
                                                       <div className="flex justify-center bg-white p-2 rounded border border-red-200">
                                                            <img
                                                                 src={detailPost.sourceUrl}
                                                                 alt="post"
                                                                 className="max-w-full max-h-80 object-contain rounded"
                                                                 onClick={() => window.open(detailPost.sourceUrl, '_blank')}
                                                                 style={{ cursor: 'pointer' }}
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        )}

                                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-red-100">
                                             <Button
                                                  variant="outline"
                                                  className="border-red-300 text-red-800 hover:bg-red-50"
                                                  onClick={() => setOpenDetail(false)}
                                             >
                                                  Close
                                             </Button>
                                             <Button
                                                  variant="destructive"
                                                  className="bg-red-600 hover:bg-red-700"
                                                  onClick={() => {
                                                       handleDeletePost(detailPost?.postId);
                                                       setOpenDetail(false);
                                                  }}
                                                  disabled={loadingDelete}
                                             >
                                                  {loadingDelete ? "Deleting..." : "Delete Post"}
                                             </Button>
                                        </div>
                                   </div>
                              ) : (
                                   <div className="text-gray-500">No data</div>
                              )}
                         </div>
                    </DialogContent>
               </Dialog>

               {/* Blocked/Deleted Posts Modal */}
               <Dialog open={openBlocked} onOpenChange={setOpenBlocked}>
                    <DialogContent className="border-red-200 max-w-5xl bg-white text-gray-900 p-0">
                         <DialogHeader className="sticky top-0 z-10 bg-white p-6 border-b border-red-100">
                              <div className="flex justify-between items-center">
                                   <DialogTitle className="text-xl font-bold text-red-900 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-800" viewBox="0 0 20 20" fill="currentColor">
                                             <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                        </svg>
                                        Blocked/Deleted Posts
                                   </DialogTitle>
                                   <Badge className="ml-2 px-3 py-1 text-sm bg-red-100 text-red-800">
                                        {filteredBlockedPosts.length} / {blockedPosts.length} posts
                                   </Badge>
                              </div>
                              <DialogDescription className="text-red-700 mt-1">
                                   Restore posts that have been blocked or deleted
                              </DialogDescription>
                         </DialogHeader>

                         <div className="p-6 pt-0 border-b border-red-100">
                              <div className="flex flex-col md:flex-row gap-4 mt-6">
                                   {/* Search bar */}
                                   <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                        <Input
                                             placeholder="Search by title, stock, or username..."
                                             value={blockedSearchTerm}
                                             onChange={(e) => setBlockedSearchTerm(e.target.value)}
                                             className="pl-10 border-red-200 focus:border-red-400 bg-white text-gray-900"
                                        />
                                   </div>

                                   {/* Status filter */}
                                   <div className="w-full md:w-48">
                                        <select
                                             value={blockedStatusFilter}
                                             onChange={(e) => setBlockedStatusFilter(e.target.value)}
                                             className="w-full h-10 pl-3 pr-10 rounded-md border border-red-200 focus:border-red-400 bg-white text-gray-900 focus:outline-none"
                                        >
                                             <option value="all">All Statuses</option>
                                             <option value="blocked">Blocked Only</option>
                                             <option value="rejected">Rejected Only</option>
                                             <option value="draft">Draft Only</option>
                                        </select>
                                   </div>

                                   {/* Clear filters button */}
                                   {(blockedSearchTerm || blockedStatusFilter !== "all") && (
                                        <Button
                                             variant="outline"
                                             size="default"
                                             className="border-red-200 text-red-800 hover:bg-red-50"
                                             onClick={() => {
                                                  setBlockedSearchTerm("");
                                                  setBlockedStatusFilter("all");
                                             }}
                                        >
                                             Clear Filters
                                        </Button>
                                   )}
                              </div>

                              {/* Filter stats */}
                              <div className="mt-4 flex items-center justify-between">
                                   <div className="text-sm text-gray-600">
                                        {filteredBlockedPosts.length === 0 ? (
                                             <span>No posts match your filters</span>
                                        ) : (
                                             <span>Showing {filteredBlockedPosts.length} of {blockedPosts.length} posts</span>
                                        )}
                                   </div>

                                   {/* Status distribution */}
                                   <div className="flex gap-2">
                                        {blockedPosts.some(post => post.status === "blocked") && (
                                             <Badge className="bg-gray-200 text-gray-800 border-gray-300">
                                                  Blocked: {blockedPosts.filter(p => p.status === "blocked").length}
                                             </Badge>
                                        )}
                                        {blockedPosts.some(post => post.status === "rejected") && (
                                             <Badge className="bg-red-100 text-red-800 border-red-300">
                                                  Rejected: {blockedPosts.filter(p => p.status === "rejected").length}
                                             </Badge>
                                        )}
                                        {blockedPosts.some(post => post.status === "draft") && (
                                             <Badge className="bg-gray-100 text-gray-800 border-gray-300">
                                                  Draft: {blockedPosts.filter(p => p.status === "draft").length}
                                             </Badge>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="max-h-[50vh] overflow-y-auto p-6">
                              {loading ? (
                                   <div className="flex items-center justify-center py-10">
                                        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
                                   </div>
                              ) : (
                                   <div className="rounded-md border border-red-200 bg-white overflow-hidden">
                                        <Table>
                                             <TableHeader>
                                                  <TableRow className="bg-red-50">
                                                       <TableHead className="text-red-900 w-2/5">Title</TableHead>
                                                       <TableHead className="text-red-900 w-1/5">Stock</TableHead>
                                                       <TableHead className="text-red-900 w-1/5">Status</TableHead>
                                                       <TableHead className="text-red-900 w-1/5">Blocked Date</TableHead>
                                                       <TableHead className="text-red-900 w-1/5">Actions</TableHead>
                                                  </TableRow>
                                             </TableHeader>
                                             <TableBody>
                                                  {filteredBlockedPosts.length === 0 ? (
                                                       <TableRow>
                                                            <TableCell colSpan={5} className="h-32 text-center">
                                                                 <div className="flex flex-col items-center justify-center text-red-800">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-200 mb-2" viewBox="0 0 20 20" fill="currentColor">
                                                                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                                      </svg>
                                                                      <p className="text-sm font-medium">No blocked or deleted posts</p>
                                                                      <p className="text-xs text-red-600 mt-1">
                                                                           {blockedPosts.length > 0
                                                                                ? "Try adjusting your filters"
                                                                                : "All posts are currently active"}
                                                                      </p>
                                                                 </div>
                                                            </TableCell>
                                                       </TableRow>
                                                  ) : (
                                                       filteredBlockedPosts.map((post) => (
                                                            <TableRow key={post?.postId} className="bg-white hover:bg-red-50">
                                                                 <TableCell className="font-medium text-red-900 max-w-xs">
                                                                      <div className="flex items-center">
                                                                           {post?.sourceUrl ? (
                                                                                <div className="w-8 h-8 bg-red-100 rounded mr-2 overflow-hidden flex-shrink-0">
                                                                                     <img
                                                                                          src={post.sourceUrl}
                                                                                          alt=""
                                                                                          className="w-full h-full object-cover"
                                                                                          onError={(e) => {
                                                                                               e.currentTarget.style.display = 'none';
                                                                                          }}
                                                                                     />
                                                                                </div>
                                                                           ) : (
                                                                                <div className="w-8 h-8 bg-red-100 rounded mr-2 flex items-center justify-center flex-shrink-0">
                                                                                     <span className="text-red-800 text-xs">Post</span>
                                                                                </div>
                                                                           )}
                                                                           <div className="truncate">
                                                                                {post?.title}
                                                                                {post?.user?.username && (
                                                                                     <div className="text-xs text-gray-500 mt-1">
                                                                                          by {post.user.username}
                                                                                     </div>
                                                                                )}
                                                                           </div>
                                                                      </div>
                                                                 </TableCell>
                                                                 <TableCell className="text-red-800">
                                                                      <div>
                                                                           <span className="font-semibold">{post?.stock?.symbol}</span>
                                                                           <span className="ml-2 text-xs text-gray-500 block md:inline">{post?.stock?.companyName}</span>
                                                                      </div>
                                                                 </TableCell>
                                                                 <TableCell>{getStatusBadge(post?.status)}</TableCell>
                                                                 <TableCell className="text-red-800">
                                                                      <div className="flex flex-col">
                                                                           <span>{post?.updatedAt
                                                                                ? new Date(post.updatedAt).toLocaleDateString()
                                                                                : ""}
                                                                           </span>
                                                                           <span className="text-xs text-gray-500">
                                                                                {post?.updatedAt
                                                                                     ? new Date(post.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                                     : ""}
                                                                           </span>
                                                                      </div>
                                                                 </TableCell>
                                                                 <TableCell>
                                                                      <Button
                                                                           size="sm"
                                                                           variant="outline"
                                                                           className="border-green-300 text-green-800 hover:bg-green-50 w-full"
                                                                           disabled={restoringId === post?.postId}
                                                                           onClick={() => handleRestorePost(post?.postId)}
                                                                      >
                                                                           {restoringId === post?.postId ? (
                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                           ) : (
                                                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                                           )}
                                                                           {restoringId === post?.postId ? "Restoring..." : "Restore"}
                                                                      </Button>
                                                                 </TableCell>
                                                            </TableRow>
                                                       ))
                                                  )}
                                             </TableBody>
                                        </Table>
                                   </div>
                              )}
                              <div className="flex justify-end mt-6">
                                   <Button
                                        variant="outline"
                                        className="border-red-200 text-red-800 hover:bg-red-50"
                                        onClick={() => {
                                             setOpenBlocked(false);
                                             setBlockedSearchTerm("");
                                             setBlockedStatusFilter("all");
                                        }}
                                   >
                                        Close
                                   </Button>
                              </div>
                         </div>
                    </DialogContent>
               </Dialog>
          </div>
     )
}
