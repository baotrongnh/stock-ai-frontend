
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
     Calendar,
     ChevronLeft,
     ChevronRight,
     Clock,
     Eye,
     Filter,
     Play,
     PlayCircle,
     Search,
     User,
     Volume2
} from "lucide-react"
import { useState } from "react"

interface Video {
     id: string
     title: string
     description: string
     thumbnail: string
     duration: string
     views: number
     publishDate: string
     channel: string
     category: string
     type: "video" | "podcast"
     featured: boolean
}

export default function Podcast() {
     const [searchQuery, setSearchQuery] = useState("")
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [selectedCategory, setSelectedCategory] = useState("all")
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [selectedType, setSelectedType] = useState("all")

     const videos: Video[] = [
          {
               id: "1",
               title: "GVR Quý 1/2025: Lợi nhuận tăng mạnh, đồng tiền đổi dao",
               description: "Phân tích chi tiết kết quả kinh doanh quý 1/2025 của GVR và triển vọng đầu tư",
               thumbnail: "https://bloganchoi.com/wp-content/uploads/2022/09/rick-roll-696x467.jpg",
               duration: "15:32",
               views: 12500,
               publishDate: "2 ngày trước",
               channel: "Đầu Tư Chứng Khoán",
               category: "Stock Analysis",
               type: "video",
               featured: true,
          },
          {
               id: "2",
               title: "Top 3 ngành hàng lớn nhất Việt Nam năm 2024 - Dựa theo tổng tài sản mới nhất",
               description: "Khám phá 3 ngành hàng có tổng tài sản lớn nhất tại Việt Nam và cơ hội đầu tư",
               thumbnail: "https://bloganchoi.com/wp-content/uploads/2022/09/rick-roll-696x467.jpg",
               duration: "22:45",
               views: 8900,
               publishDate: "3 ngày trước",
               channel: "Đầu Tư Chứng Khoán",
               category: "Market Analysis",
               type: "video",
               featured: true,
          },
          {
               id: "3",
               title: "Phân tích kỹ thuật bức tranh kinh doanh của Vinamilk trong 3 năm gần đây",
               description: "Đánh giá toàn diện về tình hình kinh doanh và triển vọng của Vinamilk",
               thumbnail: "https://bloganchoi.com/wp-content/uploads/2022/09/rick-roll-696x467.jpg",
               duration: "18:20",
               views: 15600,
               publishDate: "1 tuần trước",
               channel: "Đầu Tư Chứng Khoán",
               category: "Company Analysis",
               type: "video",
               featured: true,
          },
          {
               id: "4",
               title: "Podcast: Chiến lược đầu tư dài hạn cho thế hệ Z",
               description: "Thảo luận về các phương pháp đầu tư phù hợp với thế hệ trẻ hiện nay",
               thumbnail: "/placeholder.svg?height=200&width=350",
               duration: "45:12",
               views: 6700,
               publishDate: "4 ngày trước",
               channel: "Finance Talk",
               category: "Investment Strategy",
               type: "podcast",
               featured: false,
          },
          {
               id: "5",
               title: "Tác động của lãi suất Fed đến thị trường chứng khoán Việt Nam",
               description: "Phân tích mối liên hệ giữa chính sách tiền tệ Mỹ và TTCK Việt Nam",
               thumbnail: "/placeholder.svg?height=200&width=350",
               duration: "12:30",
               views: 9800,
               publishDate: "5 ngày trước",
               channel: "Market Insights",
               category: "Economic Policy",
               type: "video",
               featured: false,
          },
          {
               id: "6",
               title: "Podcast: Bí quyết quản lý rủi ro trong đầu tư chứng khoán",
               description: "Chia sẻ kinh nghiệm và phương pháp quản lý rủi ro hiệu quả",
               thumbnail: "/placeholder.svg?height=200&width=350",
               duration: "38:45",
               views: 4200,
               publishDate: "1 tuần trước",
               channel: "Risk Management Pro",
               category: "Risk Management",
               type: "podcast",
               featured: false,
          },
     ]

     const filteredVideos = videos.filter((video) => {
          const matchesSearch =
               video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               video.description.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
          const matchesType = selectedType === "all" || video.type === selectedType
          return matchesSearch && matchesCategory && matchesType
     })

     const featuredVideos = filteredVideos.filter((video) => video.featured)
     const regularVideos = filteredVideos.filter((video) => !video.featured)

     return (
          <div className="flex h-screen bg-gray-50">
               {/* Main Content */}
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 p-6">
                         <div className="flex items-center justify-between mb-6">
                              <div>
                                   <h1 className="text-3xl font-bold text-gray-900">Videos & Podcasts</h1>
                                   <p className="text-gray-600 mt-1">
                                        Watch expert analysis and listen to market insights from top financial professionals
                                   </p>
                              </div>
                              <div className="flex items-center gap-2">
                                   <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        <Play className="w-3 h-3 mr-1" />
                                        {filteredVideos.filter((v) => v.type === "video").length} Videos
                                   </Badge>
                                   <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        <Volume2 className="w-3 h-3 mr-1" />
                                        {filteredVideos.filter((v) => v.type === "podcast").length} Podcasts
                                   </Badge>
                              </div>
                         </div>

                         {/* Search and Filter */}
                         <div className="flex gap-4">
                              <div className="flex-1 relative">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                   <Input
                                        placeholder="Search videos and podcasts..."
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
                         {/* Featured Content */}
                         {featuredVideos.length > 0 && (
                              <div className="mb-8">
                                   <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Featured Content</h2>
                                        <div className="flex items-center gap-2">
                                             <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-600">
                                                  <ChevronLeft className="w-4 h-4" />
                                             </Button>
                                             <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-600">
                                                  <ChevronRight className="w-4 h-4" />
                                             </Button>
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {featuredVideos.map((video) => (
                                             <Card
                                                  key={video.id}
                                                  className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                                             >
                                                  <div className="relative">
                                                       <img
                                                            src={video.thumbnail || "/placeholder.svg"}
                                                            alt={video.title}
                                                            className="w-full h-48 object-cover"
                                                       />
                                                       <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                 {video.type === "podcast" ? (
                                                                      <Volume2 className="w-8 h-8 text-white" />
                                                                 ) : (
                                                                      <Play className="w-8 h-8 text-white ml-1" />
                                                                 )}
                                                            </div>
                                                       </div>
                                                       <div className="absolute top-3 left-3">
                                                            <Badge className="bg-red-500 text-white">Featured</Badge>
                                                       </div>
                                                       <div className="absolute bottom-3 right-3">
                                                            <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs">
                                                                 <Clock className="w-3 h-3 mr-1" />
                                                                 {video.duration}
                                                            </Badge>
                                                       </div>
                                                  </div>
                                                  <CardContent className="p-4">
                                                       <div className="flex items-center gap-2 mb-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                 {video.category}
                                                            </Badge>
                                                            <Badge
                                                                 variant="outline"
                                                                 className={`text-xs ${video.type === "podcast" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                                                      }`}
                                                            >
                                                                 {video.type === "podcast" ? (
                                                                      <Volume2 className="w-3 h-3 mr-1" />
                                                                 ) : (
                                                                      <Play className="w-3 h-3 mr-1" />
                                                                 )}
                                                                 {video.type}
                                                            </Badge>
                                                       </div>
                                                       <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                                                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                                                       <div className="flex items-center justify-between text-xs text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                 <User className="w-3 h-3" />
                                                                 {video.channel}
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                 <div className="flex items-center gap-1">
                                                                      <Eye className="w-3 h-3" />
                                                                      {video.views.toLocaleString()}
                                                                 </div>
                                                                 <div className="flex items-center gap-1">
                                                                      <Calendar className="w-3 h-3" />
                                                                      {video.publishDate}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </CardContent>
                                             </Card>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {/* Regular Content */}
                         <div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Content</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                   {regularVideos.map((video) => (
                                        <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                                             <div className="relative">
                                                  <img
                                                       src={video.thumbnail || "/placeholder.svg"}
                                                       alt={video.title}
                                                       className="w-full h-32 object-cover"
                                                  />
                                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                                       <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {video.type === "podcast" ? (
                                                                 <Volume2 className="w-6 h-6 text-white" />
                                                            ) : (
                                                                 <Play className="w-6 h-6 text-white ml-0.5" />
                                                            )}
                                                       </div>
                                                  </div>
                                                  <div className="absolute bottom-2 right-2">
                                                       <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {video.duration}
                                                       </Badge>
                                                  </div>
                                             </div>
                                             <CardContent className="p-3">
                                                  <div className="flex items-center gap-1 mb-2">
                                                       <Badge
                                                            variant="outline"
                                                            className={`text-xs ${video.type === "podcast" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                                                 }`}
                                                       >
                                                            {video.type === "podcast" ? (
                                                                 <Volume2 className="w-3 h-3 mr-1" />
                                                            ) : (
                                                                 <Play className="w-3 h-3 mr-1" />
                                                            )}
                                                            {video.type}
                                                       </Badge>
                                                  </div>
                                                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">{video.title}</h3>
                                                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                       <div className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {video.channel}
                                                       </div>
                                                  </div>
                                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                                       <div className="flex items-center gap-1">
                                                            <Eye className="w-3 h-3" />
                                                            {video.views.toLocaleString()}
                                                       </div>
                                                       <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {video.publishDate}
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   ))}
                              </div>
                         </div>

                         {filteredVideos.length === 0 && (
                              <div className="text-center py-12">
                                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <PlayCircle className="w-8 h-8 text-gray-400" />
                                   </div>
                                   <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                                   <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}
