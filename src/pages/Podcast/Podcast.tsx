import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
     Calendar,
     ChevronLeft,
     ChevronRight,
     Eye,
     Play,
     Search,
     User,
     Volume2,
     Pause
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
     getPublishedPodcasts,
     getFeaturedPodcasts,
     incrementPlayCount,
     formatDuration,
     formatRelativeTime,
     type Podcast as PodcastType,
     type PodcastListResponse
} from "@/apis/podcasts"

export default function Podcast() {
     const [searchQuery, setSearchQuery] = useState("")
     const [selectedCategory, setSelectedCategory] = useState("all")
     const [selectedType, setSelectedType] = useState("all")
     const [podcasts, setPodcasts] = useState<PodcastType[]>([])
     const [featuredPodcasts, setFeaturedPodcasts] = useState<PodcastType[]>([])
     const [loading, setLoading] = useState(true)
     const [currentPage, setCurrentPage] = useState(1)
     const [totalPages, setTotalPages] = useState(1)
     const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
     const [isPlaying, setIsPlaying] = useState(false)
     const [currentTime, setCurrentTime] = useState(0)
     const [duration, setDuration] = useState(0)
     const [volume, setVolume] = useState(1)
     const [playbackRate, setPlaybackRate] = useState(1)
     const audioRef = useRef<HTMLAudioElement>(null)

     // Helper function to normalize tags (handle both string and array cases)
     const normalizeTags = (tags: string | string[] | null | undefined): string[] => {
          if (!tags) return []
          if (typeof tags === 'string') {
               // If it's a single string, treat it as one tag
               return [tags]
          }
          if (Array.isArray(tags)) {
               return tags
          }
          return []
     }

     // Load podcasts on component mount
     useEffect(() => {
          const loadPodcasts = async () => {
               try {
                    setLoading(true)
                    const response: PodcastListResponse = await getPublishedPodcasts({
                         page: currentPage,
                         pageSize: 12
                    })

                    if (!response.error) {
                         setPodcasts(response.data.data)
                         setTotalPages(response.data.pagination.totalPages)
                    }
               } catch (error) {
                    console.error('Error loading podcasts:', error)
               } finally {
                    setLoading(false)
               }
          }

          const loadFeaturedPodcasts = async () => {
               try {
                    const response: PodcastListResponse = await getFeaturedPodcasts({
                         pageSize: 3
                    })

                    if (!response.error) {
                         setFeaturedPodcasts(response.data.data)
                    }
               } catch (error) {
                    console.error('Error loading featured podcasts:', error)
               }
          }

          const loadData = async () => {
               await loadPodcasts()
               await loadFeaturedPodcasts()
          }
          loadData()
     }, [currentPage])

     const handlePlayPodcast = async (podcast: PodcastType) => {
          try {
               // If same podcast is clicked, toggle play/pause
               if (currentlyPlaying === podcast.podcastId) {
                    if (isPlaying) {
                         audioRef.current?.pause()
                         setIsPlaying(false)
                    } else {
                         audioRef.current?.play()
                         setIsPlaying(true)
                    }
                    return
               }

               // Play new podcast
               setCurrentlyPlaying(podcast.podcastId)
               setIsPlaying(true)

               if (audioRef.current) {
                    audioRef.current.src = podcast.audioUrl
                    audioRef.current.volume = volume
                    audioRef.current.playbackRate = playbackRate
                    audioRef.current.play()
               }

               // Increment play count
               await incrementPlayCount(podcast.podcastId)

               // Update local state to reflect new play count
               setPodcasts(prev => prev.map(p =>
                    p.podcastId === podcast.podcastId
                         ? { ...p, playCount: p.playCount + 1 }
                         : p
               ))
               setFeaturedPodcasts(prev => prev.map(p =>
                    p.podcastId === podcast.podcastId
                         ? { ...p, playCount: p.playCount + 1 }
                         : p
               ))

          } catch (error) {
               console.error('Error playing podcast:', error)
          }
     }

     const handleAudioEnded = () => {
          setIsPlaying(false)
          setCurrentlyPlaying(null)
     }

     const handleAudioError = () => {
          setIsPlaying(false)
          setCurrentlyPlaying(null)
          console.error('Error playing audio')
     }

     const handleVolumeChange = (newVolume: number) => {
          setVolume(newVolume)
          if (audioRef.current) {
               audioRef.current.volume = newVolume
          }
     }

     const handlePlaybackRateChange = (newRate: number) => {
          setPlaybackRate(newRate)
          if (audioRef.current) {
               audioRef.current.playbackRate = newRate
          }
     }

     const handleTimeUpdate = (newTime: number) => {
          setCurrentTime(newTime)
          if (audioRef.current) {
               audioRef.current.currentTime = newTime
          }
     }

     // Filter podcasts based on search and filters
     const filteredPodcasts = podcasts.filter(podcast => {
          const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               podcast.description.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesType = selectedType === "all" || selectedType === "podcast"

          const normalizedTags = normalizeTags(podcast.tags)
          const matchesCategory = selectedCategory === "all" ||
               normalizedTags.some(tag =>
                    tag.toLowerCase().includes(selectedCategory.toLowerCase())
               )

          return matchesSearch && matchesType && matchesCategory
     })

     const handlePageChange = (page: number) => {
          setCurrentPage(page)
          window.scrollTo({ top: 0, behavior: 'smooth' })
     }

     return (
          <div className="min-h-screen bg-gray-50/30">
               {/* Hidden audio element for playing podcasts */}
               <audio
                    ref={audioRef}
                    onEnded={handleAudioEnded}
                    onError={handleAudioError}
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                    preload="metadata"
               />

               {/* Header */}
               <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="py-8">
                              <h1 className="text-3xl font-bold text-gray-900 mb-2">Thư viện Podcast</h1>
                              <p className="text-gray-600">Khám phá những nội dung audio chất lượng cao về đầu tư và tài chính</p>
                         </div>
                    </div>
               </div>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Featured Podcasts Section */}
                    {featuredPodcasts.length > 0 && (
                         <div className="mb-12">
                              <div className="flex items-center gap-2 mb-6">
                                   <Volume2 className="h-6 w-6 text-blue-600" />
                                   <h2 className="text-2xl font-bold text-gray-900">Podcast Nổi Bật</h2>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {featuredPodcasts.map((podcast) => (
                                        <Card key={podcast.podcastId} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                                             <div className="relative">
                                                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                                       <div className="text-white text-center">
                                                            <Volume2 className="h-12 w-12 mx-auto mb-2 opacity-80" />
                                                            <Badge className="bg-white/20 text-white text-xs">NỔI BẬT</Badge>
                                                       </div>
                                                  </div>
                                                  <div className="absolute top-2 right-2">
                                                       <Badge variant="secondary" className="text-xs">
                                                            {formatDuration(podcast.duration)}
                                                       </Badge>
                                                  </div>
                                                  <Button
                                                       onClick={() => handlePlayPodcast(podcast)}
                                                       className="absolute inset-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                                       variant="ghost"
                                                  >
                                                       {currentlyPlaying === podcast.podcastId && isPlaying ? (
                                                            <Pause className="h-12 w-12 text-white" />
                                                       ) : (
                                                            <Play className="h-12 w-12 text-white" />
                                                       )}
                                                  </Button>
                                             </div>
                                             <CardContent className="p-4">
                                                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">{podcast.title}</h3>
                                                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{podcast.description}</p>
                                                  <div className="flex items-center justify-between text-sm text-gray-500">
                                                       <div className="flex items-center gap-4">
                                                            <span className="flex items-center gap-1">
                                                                 <Eye className="h-4 w-4" />
                                                                 {podcast.playCount.toLocaleString()}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                 <Calendar className="h-4 w-4" />
                                                                 {formatRelativeTime(podcast.createdAt)}
                                                            </span>
                                                       </div>
                                                  </div>
                                                  <div className="flex items-center gap-1 mt-2">
                                                       <User className="h-4 w-4 text-gray-400" />
                                                       <span className="text-sm text-gray-600">{podcast.client.clientName}</span>
                                                  </div>
                                                  {podcast.tags && normalizeTags(podcast.tags).length > 0 && (
                                                       <div className="flex flex-wrap gap-1 mt-3">
                                                            {normalizeTags(podcast.tags).slice(0, 3).map((tag, index) => (
                                                                 <Badge key={index} variant="outline" className="text-xs">
                                                                      {tag}
                                                                 </Badge>
                                                            ))}
                                                       </div>
                                                  )}
                                             </CardContent>
                                        </Card>
                                   ))}
                              </div>
                         </div>
                    )}

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
                         <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 relative">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                   <Input
                                        type="text"
                                        placeholder="Tìm kiếm podcast..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                   />
                              </div>
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                   <SelectTrigger className="w-full md:w-48">
                                        <SelectValue placeholder="Chọn danh mục" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                                        <SelectItem value="investment">Đầu tư</SelectItem>
                                        <SelectItem value="finance">Tài chính</SelectItem>
                                        <SelectItem value="stock">Chứng khoán</SelectItem>
                                        <SelectItem value="market">Thị trường</SelectItem>
                                        <SelectItem value="analysis">Phân tích</SelectItem>
                                   </SelectContent>
                              </Select>
                              <Select value={selectedType} onValueChange={setSelectedType}>
                                   <SelectTrigger className="w-full md:w-48">
                                        <SelectValue placeholder="Loại nội dung" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="all">Tất cả</SelectItem>
                                        <SelectItem value="podcast">Podcast</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                         <div className="text-center py-12">
                              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                              <p className="mt-2 text-gray-600">Đang tải podcast...</p>
                         </div>
                    )}

                    {/* Podcast Grid */}
                    {!loading && (
                         <>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                   {filteredPodcasts.map((podcast) => (
                                        <Card key={podcast.podcastId} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                                             <div className="relative">
                                                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                                       <div className="text-gray-600 text-center">
                                                            <Volume2 className="h-10 w-10 mx-auto mb-1 opacity-80" />
                                                            <span className="text-xs opacity-80">PODCAST</span>
                                                       </div>
                                                  </div>
                                                  <div className="absolute top-2 right-2">
                                                       <Badge variant="secondary" className="text-xs">
                                                            {formatDuration(podcast.duration)}
                                                       </Badge>
                                                  </div>
                                                  <Button
                                                       onClick={() => handlePlayPodcast(podcast)}
                                                       className="absolute inset-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                                       variant="ghost"
                                                  >
                                                       {currentlyPlaying === podcast.podcastId && isPlaying ? (
                                                            <Pause className="h-12 w-12 text-white" />
                                                       ) : (
                                                            <Play className="h-12 w-12 text-white" />
                                                       )}
                                                  </Button>
                                                  {podcast.isFeatured && (
                                                       <div className="absolute top-2 left-2">
                                                            <Badge className="bg-blue-500 text-white text-xs">
                                                                 NỔI BẬT
                                                            </Badge>
                                                       </div>
                                                  )}
                                             </div>
                                             <CardContent className="p-4">
                                                  <h3 className="font-semibold line-clamp-2 mb-2">{podcast.title}</h3>
                                                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{podcast.description}</p>
                                                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                                       <span className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {podcast.playCount.toLocaleString()}
                                                       </span>
                                                       <span className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {formatRelativeTime(podcast.createdAt)}
                                                       </span>
                                                  </div>
                                                  <div className="flex items-center gap-1 mb-3">
                                                       <User className="h-4 w-4 text-gray-400" />
                                                       <span className="text-sm text-gray-600">{podcast.client.clientName}</span>
                                                  </div>
                                                  {podcast.tags && normalizeTags(podcast.tags).length > 0 && (
                                                       <div className="flex flex-wrap gap-1">
                                                            {normalizeTags(podcast.tags).slice(0, 2).map((tag, index) => (
                                                                 <Badge key={index} variant="outline" className="text-xs">
                                                                      {tag}
                                                                 </Badge>
                                                            ))}
                                                       </div>
                                                  )}
                                             </CardContent>
                                        </Card>
                                   ))}
                              </div>

                              {/* Empty State */}
                              {filteredPodcasts.length === 0 && !loading && (
                                   <div className="text-center py-12">
                                        <Volume2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Không tìm thấy podcast</h3>
                                        <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác</p>
                                   </div>
                              )}

                              {/* Pagination */}
                              {totalPages > 1 && (
                                   <div className="flex justify-center items-center gap-2">
                                        <Button
                                             variant="outline"
                                             size="sm"
                                             onClick={() => handlePageChange(currentPage - 1)}
                                             disabled={currentPage === 1}
                                        >
                                             <ChevronLeft className="h-4 w-4" />
                                             Trước
                                        </Button>

                                        <div className="flex gap-1">
                                             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                                                  return (
                                                       <Button
                                                            key={page}
                                                            variant={currentPage === page ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handlePageChange(page)}
                                                       >
                                                            {page}
                                                       </Button>
                                                  )
                                             })}
                                        </div>

                                        <Button
                                             variant="outline"
                                             size="sm"
                                             onClick={() => handlePageChange(currentPage + 1)}
                                             disabled={currentPage === totalPages}
                                        >
                                             Sau
                                             <ChevronRight className="h-4 w-4" />
                                        </Button>
                                   </div>
                              )}
                         </>
                    )}

                    {/* Currently Playing Indicator */}
                    {currentlyPlaying && (
                         <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-md w-full md:w-96">
                              <div className="flex items-center justify-between gap-3 mb-3">
                                   <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                             {isPlaying ? (
                                                  <div className="flex items-center gap-1">
                                                       <div className="w-1 h-4 bg-blue-600 animate-pulse"></div>
                                                       <div className="w-1 h-3 bg-blue-600 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                                       <div className="w-1 h-5 bg-blue-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                  </div>
                                             ) : (
                                                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                                                       <Play className="h-3 w-3 text-gray-600" />
                                                  </div>
                                             )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                             <p className="text-sm font-medium text-gray-900 truncate">
                                                  {podcasts.find(p => p.podcastId === currentlyPlaying)?.title || 'Đang phát podcast...'}
                                             </p>
                                             <p className="text-xs text-gray-500">
                                                  {isPlaying ? 'Đang phát' : 'Đã dừng'}
                                             </p>
                                        </div>
                                   </div>
                                   <div>
                                        <Button
                                             size="sm"
                                             variant="ghost"
                                             className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                                             onClick={() => {
                                                  if (isPlaying) {
                                                       audioRef.current?.pause();
                                                       setIsPlaying(false);
                                                  } else {
                                                       audioRef.current?.play();
                                                       setIsPlaying(true);
                                                  }
                                             }}
                                        >
                                             {isPlaying ? (
                                                  <Pause className="h-4 w-4 text-gray-700" />
                                             ) : (
                                                  <Play className="h-4 w-4 text-gray-700" />
                                             )}
                                        </Button>
                                   </div>
                              </div>

                              {/* Progress bar */}
                              <div className="mb-3">
                                   <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>{formatDuration(currentTime)}</span>
                                        <span>{formatDuration(duration)}</span>
                                   </div>
                                   <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                             className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                             style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                        ></div>
                                        <input
                                             type="range"
                                             min="0"
                                             max={duration || 100}
                                             value={currentTime}
                                             onChange={(e) => handleTimeUpdate(parseFloat(e.target.value))}
                                             className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                   </div>
                              </div>

                              {/* Playback controls */}
                              <div className="grid grid-cols-2 gap-3">
                                   <div>
                                        <p className="text-xs text-gray-500 mb-1">Âm lượng</p>
                                        <div className="flex items-center gap-2">
                                             <Volume2 className="h-4 w-4 text-gray-500" />
                                             <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                  <div
                                                       className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                                       style={{ width: `${volume * 100}%` }}
                                                  ></div>
                                                  <input
                                                       type="range"
                                                       min="0"
                                                       max="1"
                                                       step="0.1"
                                                       value={volume}
                                                       onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                                       className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <div>
                                        <p className="text-xs text-gray-500 mb-1">Tốc độ phát</p>
                                        <Select
                                             value={playbackRate.toString()}
                                             onValueChange={(value) => handlePlaybackRateChange(parseFloat(value))}
                                        >
                                             <SelectTrigger className="h-8 text-xs border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                                                  <SelectValue placeholder="Speed" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  <SelectItem value="0.5">0.5x</SelectItem>
                                                  <SelectItem value="0.75">0.75x</SelectItem>
                                                  <SelectItem value="1">1x</SelectItem>
                                                  <SelectItem value="1.25">1.25x</SelectItem>
                                                  <SelectItem value="1.5">1.5x</SelectItem>
                                                  <SelectItem value="2">2x</SelectItem>
                                             </SelectContent>
                                        </Select>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     )
}
