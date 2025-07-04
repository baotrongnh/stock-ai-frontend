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
     const [posts, setPosts] = useState<any[]>([])
     const [blockedPosts, setBlockedPosts] = useState<any[]>([])
     const [searchTerm, setSearchTerm] = useState("")
     const [detailPost, setDetailPost] = useState<any>(null)
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
               const { data } = await getAllPosts('active')
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
               const { data } = await getAllPosts('blocked')
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
          if (status === "active")
               return <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
          if (status === "pending")
               return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
          if (status === "rejected")
               return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
          if (status === "blocked")
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
          } catch (e) {
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
          } catch (e) {
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
          } catch (e) {
               toast.error("Restore failed!")
          }
          setRestoringId(null)
     }

     // Filtered posts
     const filteredPosts = posts.filter(
          (post) =>
               (post?.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
               (post?.stock?.symbol?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
               (post?.stock?.companyName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
     )

     return (
          <div className="w-full max-w-none space-y-6 bg-white text-gray-900">
               <div className="mb-6 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                         <h1 className="text-3xl font-bold text-red-900">Posts Management</h1>
                         <p className="text-red-700 mt-2">Review and manage all posts</p>
                    </div>
                    <Button
                         variant="outline"
                         className="border-red-200 text-red-900 hover:bg-red-50"
                         onClick={() => {
                              fetchBlockedPosts()
                              setOpenBlocked(true)
                         }}
                    >
                         <RotateCcw className="w-4 h-4 mr-2" />
                         View Blocked Posts
                    </Button>
               </div>

               {/* Loading overlay */}
               {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
                         <Loader2 className="animate-spin h-10 w-10 text-red-600" />
                    </div>
               )}

               {/* Stats Cards */}
               <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-red-900">Total Posts</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{posts?.length || 0}</div>
                         </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-green-900">Active</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-green-900">
                                   {posts?.filter((p) => p?.status === "active").length}
                              </div>
                         </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-yellow-900">Pending</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-yellow-900">
                                   {posts?.filter((p) => p?.status === "pending").length}
                              </div>
                         </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-red-900">Rejected</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">
                                   {posts?.filter((p) => p?.status === "rejected").length}
                              </div>
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
                         <div className="flex items-center space-x-4 mb-6">
                              <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                   <Input
                                        placeholder="Search posts, stock symbol, or company name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-red-200 focus:border-red-400 bg-white text-gray-900"
                                   />
                              </div>
                         </div>

                         <div className="rounded-md border border-red-200 bg-white overflow-x-auto">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900">Title</TableHead>
                                             <TableHead className="text-red-900">Stock</TableHead>
                                             <TableHead className="text-red-900">Status</TableHead>
                                             <TableHead className="text-red-900">Likes</TableHead>
                                             <TableHead className="text-red-900">Created</TableHead>
                                             <TableHead className="text-red-900">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {filteredPosts.map((post) => (
                                             <TableRow key={post?.postId} className="bg-white hover:bg-red-50">
                                                  <TableCell className="font-medium text-red-900 max-w-xs truncate">
                                                       {post?.title}
                                                  </TableCell>
                                                  <TableCell className="text-red-800">
                                                       <div>
                                                            <span className="font-semibold">{post?.stock?.symbol}</span>
                                                            <span className="ml-2 text-xs text-gray-500">{post?.stock?.companyName}</span>
                                                       </div>
                                                  </TableCell>
                                                  <TableCell>{getStatusBadge(post?.status)}</TableCell>
                                                  <TableCell className="text-red-800">{post?.likeCount ?? 0}</TableCell>
                                                  <TableCell className="text-red-800">
                                                       {post?.createdAt
                                                            ? new Date(post.createdAt).toLocaleDateString()
                                                            : ""}
                                                  </TableCell>
                                                  <TableCell>
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
                                                  </TableCell>
                                             </TableRow>
                                        ))}
                                   </TableBody>
                              </Table>
                         </div>
                    </CardContent>
               </Card>

               {/* Detail Dialog */}
               <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                    <DialogContent className="border-red-200 max-w-4xl p-0 bg-white text-gray-900">
                         <DialogHeader className="sticky top-0 z-10 bg-white p-6 border-b border-red-100">
                              <DialogTitle className="text-red-900">Post Details</DialogTitle>
                              <DialogDescription className="text-red-700">
                                   Detailed information about the post
                              </DialogDescription>
                         </DialogHeader>
                         <div className="max-h-[70vh] overflow-y-auto p-6 bg-white text-gray-900">
                              {loadingDetail ? (
                                   <div className="flex items-center justify-center py-10">
                                        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
                                   </div>
                              ) : detailPost ? (
                                   <div className="space-y-4">
                                        <div>
                                             <label className="text-sm font-medium text-red-900">Title:</label>
                                             <p className="text-red-800">{detailPost?.title}</p>
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-red-900">Stock:</label>
                                             <p className="text-red-800">{detailPost?.stock?.symbol} - {detailPost?.stock?.companyName}</p>
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-red-900">Content:</label>
                                             <p className="text-red-800 text-sm whitespace-pre-line">{detailPost?.content}</p>
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-red-900">Image:</label>
                                             {detailPost?.sourceUrl && (
                                                  <img src={detailPost.sourceUrl} alt="post" className="w-40 rounded border" />
                                             )}
                                        </div>
                                        <div>
                                             <label className="text-sm font-medium text-red-900">Created:</label>
                                             <p className="text-red-800">{detailPost?.createdAt ? new Date(detailPost.createdAt).toLocaleString() : ""}</p>
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
                    <DialogContent className="border-red-200 max-w-5xl bg-white text-gray-900">
                         <DialogHeader>
                              <DialogTitle className="text-red-900">Blocked/Deleted Posts</DialogTitle>
                              <DialogDescription className="text-red-700">
                                   Restore posts that have been blocked or deleted
                              </DialogDescription>
                         </DialogHeader>
                         <div className="max-h-[60vh] overflow-y-auto">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900">Title</TableHead>
                                             <TableHead className="text-red-900">Stock</TableHead>
                                             <TableHead className="text-red-900">Status</TableHead>
                                             <TableHead className="text-red-900">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {blockedPosts.length === 0 ? (
                                             <TableRow>
                                                  <TableCell colSpan={4} className="text-center text-gray-500">
                                                       No blocked/deleted posts.
                                                  </TableCell>
                                             </TableRow>
                                        ) : (
                                             blockedPosts.map((post) => (
                                                  <TableRow key={post?.postId} className="bg-white hover:bg-red-50">
                                                       <TableCell className="font-medium text-red-900 max-w-xs truncate">
                                                            {post?.title}
                                                       </TableCell>
                                                       <TableCell className="text-red-800">
                                                            <span className="font-semibold">{post?.stock?.symbol}</span>
                                                            <span className="ml-2 text-xs text-gray-500">{post?.stock?.companyName}</span>
                                                       </TableCell>
                                                       <TableCell>{getStatusBadge(post?.status)}</TableCell>
                                                       <TableCell>
                                                            <Button
                                                                 size="sm"
                                                                 variant="outline"
                                                                 className="border-green-300 text-green-800 hover:bg-green-50"
                                                                 disabled={restoringId === post?.postId}
                                                                 onClick={() => handleRestorePost(post?.postId)}
                                                            >
                                                                 <RotateCcw className="w-4 h-4 mr-2" />
                                                                 {restoringId === post?.postId ? "Restoring..." : "Restore"}
                                                            </Button>
                                                       </TableCell>
                                                  </TableRow>
                                             ))
                                        )}
                                   </TableBody>
                              </Table>
                         </div>
                    </DialogContent>
               </Dialog>
          </div>
     )
}
