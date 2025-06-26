import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
     ArrowRight,
     Calendar,
     Clock,
     Eye,
     Filter,
     MessageSquare,
     Search,
     User
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

interface BlogPost {
     id: string
     title: string
     excerpt: string
     author: string
     publishDate: string
     readTime: string
     views: number
     comments: number
     category: string
     image: string
     featured: boolean
}

export default function BloList() {
     const [searchQuery, setSearchQuery] = useState("")
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [selectedCategory, setSelectedCategory] = useState("all")

     const blogPosts: BlogPost[] = [
          {
               id: "1",
               title: "Đầu Tư Tài Chính Cho Thế Hệ Tương Lai Việt Nam",
               excerpt: "Khám phá những chiến lược đầu tư thông minh cho thế hệ trẻ Việt Nam trong bối cảnh kinh tế hiện đại...",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "24/06/2025",
               readTime: "5 min read",
               views: 1250,
               comments: 23,
               category: "Investment",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: true,
          },
          {
               id: "2",
               title: "Ngành Hàng Việt Nam Phân Hóa Dưới Áp Lực Thuế Quan Mỹ",
               excerpt:
                    "Phân tích tác động của chính sách thuế quan Mỹ đối với các ngành hàng xuất khẩu chủ lực của Việt Nam...",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "24/06/2025",
               readTime: "7 min read",
               views: 980,
               comments: 15,
               category: "Market Analysis",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: false,
          },
          {
               id: "3",
               title: "Fed Giữ Nguyên Lãi Suất Và Dự Báo Hạ Lãi Cắt Trong Năm 2025",
               excerpt: "Quyết định mới nhất của Fed về lãi suất và những tác động đến thị trường chứng khoán toàn cầu...",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "23/06/2025",
               readTime: "6 min read",
               views: 1450,
               comments: 31,
               category: "Economic Policy",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: true,
          },
          {
               id: "4",
               title: "Cổ Phiếu Dầu Khí 2025: Chu Kỳ Mới Bắt Đầu",
               excerpt: "Triển vọng ngành dầu khí trong năm 2025 và những cơ hội đầu tư tiềm năng cho nhà đầu tư...",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "22/06/2025",
               readTime: "8 min read",
               views: 2100,
               comments: 45,
               category: "Sector Analysis",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: false,
          },
          {
               id: "5",
               title: "Nhà Đầu Tư Trường Phái Trading Ngắn Hạn",
               excerpt: "Hướng dẫn chi tiết về các chiến lược trading ngắn hạn hiệu quả cho nhà đầu tư cá nhân...",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "21/06/2025",
               readTime: "10 min read",
               views: 1800,
               comments: 67,
               category: "Trading Strategy",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: false,
          },
          {
               id: "6",
               title: "Việt Nam Không Lọt Nhóm Thị Trường Frontier MSCI",
               excerpt: "Phân tích quyết định của MSCI và tác động đến thị trường chứng khoán Việt Nam trong tương lai...",
               author: "VnExpress",
               publishDate: "20/06/2025",
               readTime: "4 min read",
               views: 950,
               comments: 18,
               category: "Market News",
               image: "https://chungkhoan.com.vn/wp-content/uploads/2024/07/cong-ty-chung-khoa-fpts.jpg",
               featured: false,
          },
     ]

     const filteredPosts = blogPosts.filter((post) => {
          const matchesSearch =
               post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
          return matchesSearch && matchesCategory
     })

     const featuredPosts = filteredPosts.filter((post) => post.featured)
     const regularPosts = filteredPosts.filter((post) => !post.featured)

     return (
          <div className="flex h-screen bg-gray-50">
               {/* Main Content */}
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 p-6">
                         <div className="flex items-center justify-between mb-6">
                              <div>
                                   <h1 className="text-3xl font-bold text-gray-900">Market Insights Blog</h1>
                                   <p className="text-gray-600 mt-1">Stay updated with the latest market analysis and investment insights</p>
                              </div>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                   {filteredPosts.length} Articles
                              </Badge>
                         </div>

                         {/* Search and Filter */}
                         <div className="flex gap-4">
                              <div className="flex-1 relative">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                   <Input
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                                   />
                              </div>
                              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                   <Filter className="w-4 h-4 mr-2" />
                                   Filter
                              </Button>
                         </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                         {/* Featured Posts */}
                         {featuredPosts.length > 0 && (
                              <div className="mb-8">
                                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Articles</h2>
                                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {featuredPosts.map((post) => (
                                             <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow border-red-100">
                                                  <div className="aspect-video bg-gray-200 relative">
                                                       <img
                                                            src={post.image || "/placeholder.svg"}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover"
                                                       />
                                                       <Badge className="absolute top-4 left-4 bg-red-500 text-white">Featured</Badge>
                                                  </div>
                                                  <CardContent className="p-6">
                                                       <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                            <div className="flex items-center gap-1">
                                                                 <User className="w-4 h-4" />
                                                                 {post.author}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                 <Calendar className="w-4 h-4" />
                                                                 {post.publishDate}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                 <Clock className="w-4 h-4" />
                                                                 {post.readTime}
                                                            </div>
                                                       </div>
                                                       <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                                       <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                                                       <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                 <div className="flex items-center gap-1">
                                                                      <Eye className="w-4 h-4" />
                                                                      {post.views}
                                                                 </div>
                                                                 <div className="flex items-center gap-1">
                                                                      <MessageSquare className="w-4 h-4" />
                                                                      {post.comments}
                                                                 </div>
                                                            </div>
                                                            <Link to={`/blog/${post.id}`}>
                                                                 <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                                                      Read More
                                                                      <ArrowRight className="w-4 h-4 ml-1" />
                                                                 </Button>
                                                            </Link>
                                                       </div>
                                                  </CardContent>
                                             </Card>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {/* Regular Posts */}
                         <div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Articles</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                   {regularPosts.map((post) => (
                                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                             <div className="aspect-video bg-gray-200">
                                                  <img
                                                       src={post.image || "/placeholder.svg"}
                                                       alt={post.title}
                                                       className="w-full h-full object-cover"
                                                  />
                                             </div>
                                             <CardContent className="p-4">
                                                  <Badge variant="outline" className="mb-2 text-xs">
                                                       {post.category}
                                                  </Badge>
                                                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                                                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                       <div className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {post.author}
                                                       </div>
                                                       <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {post.publishDate}
                                                       </div>
                                                  </div>
                                                  <div className="flex items-center justify-between">
                                                       <div className="flex items-center gap-3 text-xs text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                 <Eye className="w-3 h-3" />
                                                                 {post.views}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                 <MessageSquare className="w-3 h-3" />
                                                                 {post.comments}
                                                            </div>
                                                       </div>
                                                       <Link to={`/blog/${post.id}`}>
                                                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 text-xs">
                                                                 Read More
                                                            </Button>
                                                       </Link>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   ))}
                              </div>
                         </div>

                         {filteredPosts.length === 0 && (
                              <div className="text-center py-12">
                                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                   </div>
                                   <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                                   <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}
