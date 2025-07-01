import { PostServices } from "@/apis/posts";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"; // Place this image in your public folder



export default function BlogPage() {
    
     const [posts, setPosts] = useState<any[]>([])
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const fetchData = async () => {
               setLoading(true)
               try {
                    const res = await PostServices.getPosts(1, 10)
                    setPosts(res.data.data || [])
               } catch (err: any) {
                    setPosts([])
                    throw new Error("Error", err)
               }
               setLoading(false)
          }
          fetchData()
     }, [])


     return (
          <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
               <div className="flex-1 flex flex-col">
                    <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                         <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                              📚 Market Insights Blog
                         </h1>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                         {loading ? (
                              <div>Loading...</div>
                         ) : posts.length === 0 ? (
                              <div>No articles found</div>
                         ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                   {posts.map((post) => (
                                        <Link to={`/blog/${post.postId}`} key={post.postId}>
                                             <Card className="cursor-pointer hover:shadow-xl transition">
                                                  <CardContent className="p-4">
                                                       <img
                                                            src={post.sourceUrl || DEFAULT_IMAGE}
                                                            alt={post.title}
                                                            className="w-full h-40 object-cover rounded mb-3"
                                                       />
                                                       <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                                                       <p className="text-gray-700 mb-2 line-clamp-3">{post.content}</p>
                                                       <div className="text-xs text-gray-500 mb-1">
                                                            Created: {new Date(post.createdAt).toLocaleString()}
                                                       </div>
                                                       <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span>Views: {post.viewCount ?? 0}</span>
                                                            <span>Likes: {post.likeCount ?? 0}</span>
                                                       </div>
                                                  </CardContent>
                                             </Card>
                                        </Link>
                                   ))}
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}
