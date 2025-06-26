import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
     ArrowRight,
     BookOpen,
     Calendar,
     Clock,
     Eye,
     Filter,
     MessageSquare,
     Search,
     Sparkles,
     Star,
     User,
     Zap
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
     trending: boolean
}

export default function BlogPage() {
     const [searchQuery, setSearchQuery] = useState("")
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [selectedCategory, setSelectedCategory] = useState("all")

     const blogPosts: BlogPost[] = [
          {
               id: "1",
               title: "🚀 Đầu Tư Tài Chính Cho Thế Hệ Tương Lai Việt Nam",
               excerpt:
                    "Khám phá những chiến lược đầu tư thông minh cho thế hệ trẻ Việt Nam trong bối cảnh kinh tế hiện đại. Từ chứng khoán đến crypto, tất cả đều có ở đây!",
               author: "Đầu Tư Chứng Khoán",
               publishDate: "24/06/2025",
               readTime: "5 min read",
               views: 1250,
               comments: 23,
               category: "Investment",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: true,
               trending: true,
          },
          {
               id: "2",
               title: "📊 Ngành Hàng Việt Nam Phân Hóa Dưới Áp Lực Thuế Quan Mỹ",
               excerpt:
                    "Phân tích sâu sắc về tác động của chính sách thuế quan Mỹ đối với các ngành hàng xuất khẩu chủ lực của Việt Nam và cơ hội đầu tư tiềm năng.",
               author: "Market Analyst Pro",
               publishDate: "23/06/2025",
               readTime: "7 min read",
               views: 2100,
               comments: 45,
               category: "Market Analysis",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: true,
               trending: false,
          },
          {
               id: "3",
               title: "💰 Fed Giữ Nguyên Lãi Suất: Cơ Hội Vàng Cho Nhà Đầu Tư",
               excerpt:
                    "Quyết định mới nhất của Fed về lãi suất và những tác động tích cực đến thị trường chứng khoán toàn cầu. Đây có phải là thời điểm vàng để đầu tư?",
               author: "Economic Insights",
               publishDate: "22/06/2025",
               readTime: "6 min read",
               views: 1800,
               comments: 67,
               category: "Economic Policy",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: true,
               trending: true,
          },
          {
               id: "4",
               title: "⚡ Cổ Phiếu Dầu Khí 2025: Chu Kỳ Mới Bắt Đầu",
               excerpt: "Triển vọng ngành dầu khí trong năm 2025 và những cơ hội đầu tư tiềm năng cho nhà đầu tư thông minh.",
               author: "Energy Sector Expert",
               publishDate: "21/06/2025",
               readTime: "8 min read",
               views: 950,
               comments: 28,
               category: "Sector Analysis",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: false,
               trending: false,
          },
          {
               id: "5",
               title: "🎯 Chiến Lược Trading Ngắn Hạn Cho Người Mới Bắt Đầu",
               excerpt: "Hướng dẫn từ A-Z về các chiến lược trading ngắn hạn hiệu quả, phù hợp cho nhà đầu tư mới vào nghề.",
               author: "Trading Master",
               publishDate: "20/06/2025",
               readTime: "10 min read",
               views: 3200,
               comments: 89,
               category: "Trading Strategy",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: false,
               trending: true,
          },
          {
               id: "6",
               title: "🌟 Việt Nam Và Cơ Hội Nâng Hạng Thị Trường MSCI",
               excerpt:
                    "Phân tích khả năng Việt Nam được nâng hạng trong bảng xếp hạng MSCI và tác động tích cực đến thị trường chứng khoán.",
               author: "MSCI Analyst",
               publishDate: "19/06/2025",
               readTime: "4 min read",
               views: 1650,
               comments: 34,
               category: "Market News",
               image: "https://amis.misa.vn/wp-content/uploads/2024/10/bctc-fpt-6.png",
               featured: false,
               trending: false,
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
     const trendingPosts = filteredPosts.filter((post) => post.trending)
     const regularPosts = filteredPosts.filter((post) => !post.featured)

     return (
          <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
               {/* Enhanced Main Content */}
               <div className="flex-1 flex flex-col">
                    {/* Floating Header */}
                    <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                         <div className="flex items-center justify-between mb-6">
                              <div>
                                   <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                        📚 Market Insights Blog
                                   </h1>
                                   <p className="text-gray-600 mt-2 text-lg">Discover the latest trends, analysis, and expert opinions</p>
                              </div>
                              <div className="flex items-center gap-3">
                                   <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        {filteredPosts.length} Live Articles
                                   </Badge>
                                   <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        <Star className="w-3 h-3 mr-1" />
                                        Premium Content
                                   </Badge>
                              </div>
                         </div>

                         <div className="flex gap-4">
                              <div className="flex-1 relative">
                                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                   <Input
                                        placeholder="Search for insights, strategies, analysis..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-xl bg-white/60 backdrop-blur-sm text-base"
                                   />
                              </div>
                              <Button
                                   variant="outline"
                                   className="h-12 px-6 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                              >
                                   <Filter className="w-4 h-4 mr-2" />
                                   Advanced Filter
                              </Button>
                         </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                         {/* Hero Featured Post */}
                         {featuredPosts.length > 0 && (
                              <div className="relative">
                                   <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                             <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                                             Featured Stories
                                        </h2>
                                   </div>

                                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Main Featured */}
                                        <div className="lg:col-span-2">
                                             <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 backdrop-blur-sm">
                                                  <div className="relative">
                                                       <img
                                                            src={featuredPosts[0].image || "/placeholder.svg"}
                                                            alt={featuredPosts[0].title}
                                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                                       />
                                                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                                       <div className="absolute top-4 left-4 flex gap-2">
                                                            <Badge className="bg-red-500 text-white animate-pulse">🔥 Featured</Badge>
                                                            {featuredPosts[0].trending && <Badge className="bg-yellow-500 text-white">⚡ Trending</Badge>}
                                                       </div>
                                                       <div className="absolute bottom-4 left-4 right-4 text-white">
                                                            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{featuredPosts[0].title}</h3>
                                                            <p className="text-sm opacity-90 line-clamp-2">{featuredPosts[0].excerpt}</p>
                                                       </div>
                                                  </div>
                                                  <CardContent className="p-6">
                                                       <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                 <div className="flex items-center gap-1">
                                                                      <User className="w-4 h-4" />
                                                                      {featuredPosts[0].author}
                                                                 </div>
                                                                 <div className="flex items-center gap-1">
                                                                      <Calendar className="w-4 h-4" />
                                                                      {featuredPosts[0].publishDate}
                                                                 </div>
                                                                 <div className="flex items-center gap-1">
                                                                      <Eye className="w-4 h-4" />
                                                                      {featuredPosts[0].views.toLocaleString()}
                                                                 </div>
                                                            </div>
                                                            <Link to={`/blog/${featuredPosts[0].id}`}>
                                                                 <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                                                                      Read More
                                                                      <ArrowRight className="w-4 h-4 ml-2" />
                                                                 </Button>
                                                            </Link>
                                                       </div>
                                                  </CardContent>
                                             </Card>
                                        </div>

                                        {/* Side Featured */}
                                        <div className="space-y-4">
                                             {featuredPosts.slice(1, 3).map((post) => (
                                                  <Card
                                                       key={post.id}
                                                       className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm"
                                                  >
                                                       <div className="flex">
                                                            <img
                                                                 src={post.image || "/placeholder.svg"}
                                                                 alt={post.title}
                                                                 className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                            <CardContent className="p-4 flex-1">
                                                                 <div className="flex items-center gap-2 mb-2">
                                                                      <Badge variant="outline" className="text-xs">
                                                                           {post.category}
                                                                      </Badge>
                                                                      {post.trending && <Badge className="bg-yellow-500 text-white text-xs">🔥</Badge>}
                                                                 </div>
                                                                 <h4 className="font-semibold text-sm line-clamp-2 mb-2">{post.title}</h4>
                                                                 <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                      <Eye className="w-3 h-3" />
                                                                      {post.views.toLocaleString()}
                                                                      <MessageSquare className="w-3 h-3 ml-2" />
                                                                      {post.comments}
                                                                 </div>
                                                            </CardContent>
                                                       </div>
                                                  </Card>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         )}

                         {/* Trending Section */}
                         {trendingPosts.length > 0 && (
                              <div>
                                   <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        <Zap className="w-6 h-6 mr-2 text-yellow-500" />🔥 Trending Now
                                   </h2>
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {trendingPosts.map((post) => (
                                             <Card
                                                  key={post.id}
                                                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-yellow-50/30"
                                             >
                                                  <div className="relative">
                                                       <img
                                                            src={post.image || "/placeholder.svg"}
                                                            alt={post.title}
                                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                       />
                                                       <Badge className="absolute top-3 left-3 bg-yellow-500 text-white animate-bounce">
                                                            🔥 Trending
                                                       </Badge>
                                                  </div>
                                                  <CardContent className="p-5">
                                                       <Badge variant="outline" className="mb-3 text-xs">
                                                            {post.category}
                                                       </Badge>
                                                       <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                                       <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                                                       <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                 <div className="flex items-center gap-1">
                                                                      <Eye className="w-3 h-3" />
                                                                      {post.views.toLocaleString()}
                                                                 </div>
                                                                 <div className="flex items-center gap-1">
                                                                      <MessageSquare className="w-3 h-3" />
                                                                      {post.comments}
                                                                 </div>
                                                            </div>
                                                            <Link to={`/blog/${post.id}`}>
                                                                 <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                                                      Read More
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
                              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                   <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                                   Latest Articles
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                   {regularPosts.map((post, index) => (
                                        <Card
                                             key={post.id}
                                             className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 bg-white/70 backdrop-blur-sm"
                                             style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                             <div className="relative">
                                                  <img
                                                       src={post.image || "/placeholder.svg"}
                                                       alt={post.title}
                                                       className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                                  />
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                             </div>
                                             <CardContent className="p-4">
                                                  <div className="flex items-center gap-2 mb-2">
                                                       <Badge variant="outline" className="text-xs">
                                                            {post.category}
                                                       </Badge>
                                                       <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime}
                                                       </div>
                                                  </div>
                                                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                                       <div className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {post.author}
                                                       </div>
                                                       <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1">
                                                                 <Eye className="w-3 h-3" />
                                                                 {post.views.toLocaleString()}
                                                            </div>
                                                            <Link to={`/blog/${post.id}`}>
                                                                 <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 text-xs h-6">
                                                                      Read →
                                                                 </Button>
                                                            </Link>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   ))}
                              </div>
                         </div>

                         {filteredPosts.length === 0 && (
                              <div className="text-center py-16">
                                   <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-red-400" />
                                   </div>
                                   <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                                   <p className="text-gray-600 text-lg">Try adjusting your search or explore different categories</p>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}
