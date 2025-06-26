import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
     ArrowLeft,
     Bookmark,
     Calendar,
     Clock,
     Eye,
     MessageSquare,
     Send,
     Share2,
     ThumbsUp,
     User
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

interface Comment {
     id: string
     author: string
     content: string
     timestamp: string
     likes: number
}

export default function BlogDetail() {
     const [newComment, setNewComment] = useState("")
     const [comments, setComments] = useState<Comment[]>([
          {
               id: "1",
               author: "Vua Đu Đỉnh",
               content:
                    "Bài viết rất hay và có tính thực tiễn cao. Cảm ơn tác giả đã chia sẻ những phân tích sâu sắc về thị trường.",
               timestamp: "2 giờ trước",
               likes: 12,
          },
          {
               id: "2",
               author: "Chiến Thần Thổi Nến",
               content: "Mình đã áp dụng một số chiến lược được đề cập trong bài và thấy hiệu quả tích cực. Rất hữu ích!",
               timestamp: "5 giờ trước",
               likes: 8,
          },
     ])

     const blogPost = {
          id: 2,
          title: "Đầu Tư Tài Chính Cho Thế Hệ Tương Lai Việt Nam",
          content: `
# Đầu Tư Tài Chính Cho Thế Hệ Tương Lai Việt Nam

Trong bối cảnh kinh tế toàn cầu đang có những biến động mạnh mẽ, việc đầu tư tài chính thông minh đã trở thành một yếu tố quan trọng quyết định đến sự thành công của thế hệ trẻ Việt Nam.

## Tại Sao Đầu Tư Tài Chính Quan Trọng?

Thế hệ trẻ Việt Nam hiện tại đang đối mặt với nhiều thách thức về tài chính:

- **Lạm phát gia tăng**: Giá trị đồng tiền giảm dần theo thời gian
- **Chi phí sinh hoạt tăng cao**: Nhà ở, giáo dục, y tế ngày càng đắt đỏ
- **Hệ thống lương hưu không đảm bảo**: Cần có kế hoạch tài chính cá nhân

## Các Chiến Lược Đầu Tư Hiệu Quả

### 1. Đầu Tư Chứng Khoán

Thị trường chứng khoán Việt Nam đang có những tín hiệu tích cực:

- VN-Index đã tăng trưởng ổn định trong những năm gần đây
- Nhiều doanh nghiệp có tiềm năng tăng trưởng mạnh
- Thanh khoản thị trường được cải thiện đáng kể

### 2. Đầu Tư Bất Động Sản

Bất động sản vẫn là kênh đầu tư được ưa chuộng:

- Giá trị tăng trưởng ổn định theo thời gian
- Có thể tạo ra dòng tiền thụ động từ cho thuê
- Đa dạng hóa danh mục đầu tư

### 3. Đầu Tư Vàng và Kim Loại Quý

Vàng được xem là kênh đầu tư an toàn:

- Bảo toàn giá trị trong thời kỳ lạm phát
- Dễ dàng thanh khoản khi cần thiết
- Không bị ảnh hưởng bởi biến động chính trị

## Lời Khuyên Cho Nhà Đầu Tư Trẻ

1. **Bắt đầu sớm**: Thời gian là yếu tố quan trọng nhất trong đầu tư
2. **Đa dạng hóa**: Không đặt tất cả trứng vào một giỏ
3. **Học hỏi liên tục**: Kiến thức tài chính là chìa khóa thành công
4. **Kiên nhẫn**: Đầu tư là cuộc chơi dài hạn

## Kết Luận

Đầu tư tài chính không chỉ là cách để tăng tài sản mà còn là cách để đảm bảo tương lai tài chính ổn định. Thế hệ trẻ Việt Nam cần trang bị cho mình những kiến thức và kỹ năng cần thiết để có thể đưa ra những quyết định đầu tư thông minh.

*Lưu ý: Bài viết này chỉ mang tính chất tham khảo. Nhà đầu tư cần cân nhắc kỹ lưỡng và tham khảo ý kiến chuyên gia trước khi đưa ra quyết định đầu tư.*
    `,
          author: "Đầu Tư Chứng Khoán",
          publishDate: "24/06/2025",
          readTime: "5 min read",
          views: 1250,
          comments: comments.length,
          category: "Investment",
          image: "https://i.ex-cdn.com/taichinhdoanhnghiep.net.vn/files/content/2024/06/12/co-phieu-chung-khoan-tang-0646.jpg",
          tags: ["Đầu tư", "Tài chính", "Chứng khoán", "Thế hệ trẻ"],
     }

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

     return (
          <div className="">
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
                                        <Badge className="bg-red-100 text-red-700">{blogPost.category}</Badge>
                                        {blogPost.tags.map((tag) => (
                                             <Badge key={tag} variant="outline" className="text-xs">
                                                  {tag}
                                             </Badge>
                                        ))}
                                   </div>

                                   <h1 className="text-4xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>

                                   <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2">
                                             <User className="w-4 h-4" />
                                             {blogPost.author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Calendar className="w-4 h-4" />
                                             {blogPost.publishDate}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Clock className="w-4 h-4" />
                                             {blogPost.readTime}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <Eye className="w-4 h-4" />
                                             {blogPost.views} views
                                        </div>
                                   </div>

                                   <img
                                        src={blogPost.image || "/placeholder.svg"}
                                        alt={blogPost.title}
                                        className="w-full h-64 object-cover rounded-lg mb-8"
                                   />
                              </div>

                              {/* Article Body */}
                              <div className="prose prose-lg max-w-none mb-12">
                                   <div className="whitespace-pre-line text-gray-800 leading-relaxed">{blogPost.content}</div>
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
                                                  {blogPost.comments} comments
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
               </div>
          </div>
     )
}
