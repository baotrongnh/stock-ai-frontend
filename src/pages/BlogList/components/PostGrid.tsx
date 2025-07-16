import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Clock, Eye, Heart } from "lucide-react"
import { useNavigate } from "react-router"
import { highlightText, highlightTextSubtle } from "../utils/highlightText"

interface Post {
    postId: number
    title: string
    content: string
    thumbnail?: string
    sourceUrl?: string
    sentiment: string
    createdAt: string
    viewCount: number
    likeCount: number
    session: number
    level: string
    topic: string
    status: string
    expert: {
        userId: string
        fullName: string
        avatarUrl?: string
    }
    stocks: Array<{
        stockId: number
        symbol: string
        companyName: string
    }>
}

interface PostGridProps {
    posts: Post[]
    searchTerm?: string
}

export function PostGrid({ posts, searchTerm = "" }: PostGridProps) {
    const navigate = useNavigate()

    const handlePostClick = (postId: number) => {
        console.log('Navigating to post:', postId)
        navigate(`/blog/${postId}`)
    }
    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return <TrendingUp className="h-4 w-4 text-green-500" />
            case 'NEGATIVE':
                return <TrendingDown className="h-4 w-4 text-red-500" />
            case 'NEUTRAL':
                return <Minus className="h-4 w-4 text-gray-500" />
            default:
                return null
        }
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-100 text-green-800'
            case 'NEGATIVE':
                return 'bg-red-100 text-red-800'
            case 'NEUTRAL':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content
        return content.substring(0, maxLength) + '...'
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                {searchTerm ? (
                    <>
                        <p className="text-lg">No posts found for "{searchTerm}"</p>
                        <p className="text-sm mt-2">Try adjusting your search term or clear your filters</p>
                    </>
                ) : (
                    <>
                        <p className="text-lg">No posts found matching your filters</p>
                        <p className="text-sm mt-2">Try adjusting your search criteria</p>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <Card
                    key={post.postId}
                    className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => handlePostClick(post.postId)}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg leading-tight line-clamp-2">
                                {highlightText(post.title, searchTerm)}
                            </CardTitle>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {getSentimentIcon(post.sentiment)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={`${getSentimentColor(post.sentiment)} text-xs`}>
                                {post.sentiment}
                            </Badge>
                            {post.stocks && post.stocks.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                    {post.stocks[0].symbol}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {(post.thumbnail || post.sourceUrl) && (
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={post.thumbnail || post.sourceUrl || "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                                    }}
                                />
                            </div>
                        )}

                        <p className="text-sm text-gray-600 line-clamp-3">
                            {highlightTextSubtle(truncateContent(post.content), searchTerm)}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(post.createdAt)}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {post.viewCount || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    {post.likeCount || 0}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
