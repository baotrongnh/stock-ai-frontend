import { PostServices } from "@/apis/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
     ArrowLeft,
     Bookmark,
     Calendar,
     Eye,
     MessageSquare,
     Send,
     Share2,
     ThumbsUp,
     User
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

interface Comment {
     id: string
     author: string
     content: string
     timestamp: string
     likes: number
}

const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"

function getViewCount(post: any) {
     return typeof post.viewCount === "number" ? post.viewCount : 0;
}

export default function BlogDetail() {
     const { id } = useParams()
     const [post, setPost] = useState<any>(null)
     const [loading, setLoading] = useState(true)
     const [newComment, setNewComment] = useState("")
     const [comments, setComments] = useState<Comment[]>([
          {
               id: "1",
               author: "Nguyễn Văn A",
               content:
                    "Bài viết rất hay và có tính thực tiễn cao. Cảm ơn tác giả đã chia sẻ những phân tích sâu sắc về thị trường.",
               timestamp: "2 giờ trước",
               likes: 12,
          },
          {
               id: "2",
               author: "Trần Thị B",
               content: "Mình đã áp dụng một số chiến lược được đề cập trong bài và thấy hiệu quả tích cực. Rất hữu ích!",
               timestamp: "5 giờ trước",
               likes: 8,
          },
     ])
     const [isImageOpen, setIsImageOpen] = useState(false)
     const [normalizedContent, setNormalizedContent] = useState("")


     useEffect(() => {
          const fetchPost = async () => {
               setLoading(true)
               try {
                    const res = await PostServices.getPostById(Number(id))
                    console.log(res)
                    // console.log(res.result)
                    setPost(res.data)
               } catch {
                    setPost(null)
               } finally {
                    setLoading(false)
               }
          }
          fetchPost()
     }, [id])



     const handleAddComment = () => {
          if (!newComment.trim()) return

          const comment: Comment = {
               id: Date.now().toString(),
               author: "Bạn",
               content: newComment,
               timestamp: "Vừa xong",
               likes: 0,
          }

          setComments([comment, ...comments])
          setNewComment("")
     }

     useEffect(() => {
          if (post?.content) {
               const normalized = post.content.replace(/\\n/g, '\n')
               setNormalizedContent(normalized)
          }
     }, [post])


     if (loading) return <div>Loading...</div>
     if (!loading && !post) return <div>Post not found</div>

     return (
          <div className="flex h-screen bg-gray-50">
               {/* Main Content */}
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 p-6">
                         <div className="flex items-center gap-4 mb-4">
                              <Link to="/blog">
                                   <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Blog
                                   </Button>
                              </Link>
                              <div className="flex items-center gap-2">
                                   <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                   </Button>
                                   <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                                        <Bookmark className="w-4 h-4 mr-2" />
                                        Save
                                   </Button>
                              </div>
                         </div>
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 overflow-y-auto">
                         <article className="max-w-4xl mx-auto p-6">
                              {/* Article Header */}
                              <div className="mb-8">
                                   <div className="flex items-center gap-2 mb-4">
                                        <Badge className="bg-red-100 text-red-700">{post.category}</Badge>
                                        {post.tags?.map((tag: string) => (
                                             <Badge key={tag} variant="outline" className="text-xs">
                                                  {tag}
                                             </Badge>
                                        ))}
                                   </div>

                                   <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                                   <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2">
                                             <User className="w-4 h-4" />
                                             {post.author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Calendar className="w-4 h-4" />
                                             {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Eye className="w-4 h-4" />
                                             {getViewCount(post)} views
                                        </div>
                                   </div>

                                   <img
                                        src={post.sourceUrl || DEFAULT_IMAGE}
                                        alt={post.title}
                                        onClick={() => setIsImageOpen(true)}
                                        className="w-full h-64 object-cover rounded-lg mb-8 cursor-pointer transition-transform hover:scale-105"
                                   />

                              </div>

                              {/* Article Body */}

                              <div className="prose prose-lg max-w-none mb-12">
                                   <div className="prose prose-lg max-w-none mb-12 text-gray-800 leading-relaxed">
                                        {normalizedContent.split('\n').map((line, index) => (
                                             <p key={index}>{line}</p>
                                        ))}
                                   </div>

                              </div>



                              {/* Article Footer */}
                              <div className="border-t border-gray-200 pt-6 mb-8">
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                             <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                                  <ThumbsUp className="w-4 h-4 mr-2" />
                                                  Like Article
                                             </Button>
                                             <div className="flex items-center gap-2 text-sm text-gray-600">
                                                  <MessageSquare className="w-4 h-4" />
                                                  {comments.length} comments
                                             </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Button variant="outline" size="sm">
                                                  <Share2 className="w-4 h-4 mr-2" />
                                                  Share
                                             </Button>
                                             <Button variant="outline" size="sm">
                                                  <Bookmark className="w-4 h-4 mr-2" />
                                                  Save
                                             </Button>
                                        </div>
                                   </div>
                              </div>

                              {/* Comments Section */}
                              <div className="border-t border-gray-200 pt-8">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-6">Comments ({comments.length})</h3>

                                   {/* Add Comment */}
                                   <Card className="mb-6">
                                        <CardContent className="p-4">
                                             <div className="flex gap-4">
                                                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                       <User className="w-5 h-5 text-gray-600" />
                                                  </div>
                                                  <div className="flex-1">
                                                       <Textarea
                                                            placeholder="Write your comment..."
                                                            value={newComment}
                                                            onChange={(e) => setNewComment(e.target.value)}
                                                            className="mb-3 border-gray-300 focus:border-red-500 focus:ring-red-500"
                                                       />
                                                       <Button
                                                            onClick={handleAddComment}
                                                            disabled={!newComment.trim()}
                                                            className="bg-red-500 hover:bg-red-600 text-white"
                                                       >
                                                            <Send className="w-4 h-4 mr-2" />
                                                            Post Comment
                                                       </Button>
                                                  </div>
                                             </div>
                                        </CardContent>
                                   </Card>

                                   {/* Comments List */}
                                   <div className="space-y-4">
                                        {comments.map((comment) => (
                                             <Card key={comment.id}>
                                                  <CardContent className="p-4">
                                                       <div className="flex gap-4">
                                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                                 <User className="w-5 h-5 text-gray-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                 <div className="flex items-center gap-2 mb-2">
                                                                      <span className="font-medium text-gray-900">{comment.author}</span>
                                                                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                                                                 </div>
                                                                 <p className="text-gray-800 mb-3">{comment.content}</p>
                                                                 <div className="flex items-center gap-4">
                                                                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                                                           <ThumbsUp className="w-4 h-4 mr-1" />
                                                                           {comment.likes}
                                                                      </Button>
                                                                      <Button variant="ghost" size="sm" className="text-gray-600">
                                                                           Reply
                                                                      </Button>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </CardContent>
                                             </Card>
                                        ))}
                                   </div>
                              </div>
                         </article>
                    </div>
               </div >
               {isImageOpen && (
                    <div
                         className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                         onClick={() => setIsImageOpen(false)}
                    >
                         <img
                              src={post.sourceUrl || DEFAULT_IMAGE}
                              alt="Full Size"
                              className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
                         />
                    </div>
               )
               }


          </div >
     )
}
