import { PostServices } from "@/apis/posts"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreatePostModal } from "./components/CreatePostModal.tsx"
import { useEffect, useState } from "react"
import { Link } from "react-router"

const DEFAULT_IMAGE =
     "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"

export default function BlogPage() {
     const [posts, setPosts] = useState<any[]>([])
     const [loading, setLoading] = useState(true)
     const [page, setPage] = useState(1)
     const [totalPages, setTotalPages] = useState(1)
     const pageSize = 9
     const userId = localStorage.getItem('userId')

     const fetchPosts = async () => {
          setLoading(true)
          try {
               const res = await PostServices.getPosts(page, pageSize)
               const allPosts = res.data?.data || []
               // console.log(allPosts)
               const sortedPosts = allPosts.sort(
                    (a: any, b: any) =>
                         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
               )

               setPosts(sortedPosts)
               // console.log(sortedPosts)
               setTotalPages(res.data?.pagination?.totalPages || 1)
          } catch (err) {
               console.error("Failed to fetch posts", err)
               setPosts([])
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          fetchPosts()
     }, [page])

     return (
          <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg flex justify-between items-center">
                         <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                              📚 Market Insights Blog
                         </h1>
                         {userId ?
                              <CreatePostModal onPostCreated={fetchPosts} />
                              :
                              <></>
                         }
                    </div>

                    {/* Post Grid */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                         {loading ? (
                              <div className="text-center text-gray-600">Loading...</div>
                         ) : posts.length === 0 ? (
                              <div className="text-center text-gray-600">No articles found</div>
                         ) : (
                              <>
                                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {posts.map((post) => (
                                             <Link to={`/blog/${post.postId}`} key={post.postId}>
                                                  <Card className="cursor-pointer hover:shadow-xl transition h-full flex flex-col">
                                                       <CardContent className="p-4 flex flex-col h-full">
                                                            <img
                                                                 src={post.sourceUrl || DEFAULT_IMAGE}
                                                                 alt={post.title}
                                                                 className="w-full h-40 object-cover rounded mb-3"
                                                            />
                                                            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                                                            <p className="text-gray-700 mb-2 line-clamp-3 flex-grow">
                                                                 {post.content}
                                                            </p>
                                                            <div className="mt-auto text-xs text-gray-500 space-y-1">
                                                                 <div>
                                                                      Created:{" "}
                                                                      {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                                                                 </div>
                                                                 <div className="flex items-center gap-2">
                                                                      <span>Views: {post.viewCount ?? 0}</span>
                                                                      <span>Likes: {post.likeCount ?? 0}</span>
                                                                 </div>
                                                            </div>
                                                       </CardContent>
                                                  </Card>
                                             </Link>
                                        ))}
                                   </div>

                                   {/* Pagination */}
                                   <div className="flex justify-center mt-6 gap-2">
                                        <Button
                                             disabled={page === 1}
                                             variant="outline"
                                             onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                        >
                                             Previous
                                        </Button>
                                        <span className="self-center text-sm font-medium">
                                             Page {page} of {totalPages}
                                        </span>
                                        <Button
                                             disabled={page === totalPages}
                                             variant="outline"
                                             onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                                        >
                                             Next
                                        </Button>
                                   </div>
                              </>
                         )}
                    </div>
               </div>
          </div>
     )
}
