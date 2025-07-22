import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Clock, Eye, ArrowUp } from "lucide-react"
import { useNavigate } from "react-router"
import { useMemo } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import stockImage from "@/assets/stock.jpg"

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
    upvoteCount: number
    downvoteCount: number
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

interface FeaturedPostsCarouselProps {
    posts: Post[]
}

export function FeaturedPostsCarousel({ posts }: FeaturedPostsCarouselProps) {
    const navigate = useNavigate()

    const plugin = React.useRef(
        Autoplay({ delay: 500, stopOnInteraction: true, stopOnMouseEnter: true })
    )

    const featuredPosts = useMemo(() => {
        // Filter posts that have images first and sort by newest
        let postsWithImages = posts.filter(post =>
            (post.thumbnail && post.thumbnail.trim() !== '') ||
            (post.sourceUrl && post.sourceUrl.trim() !== '')
        )

        // Always sort by newest
        postsWithImages = postsWithImages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        // Return up to 10 posts with images to have better variety
        return postsWithImages.slice(0, 10)
    }, [posts])

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

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content
        return content.substring(0, maxLength) + '...'
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    const handlePostClick = (postId: number) => {
        navigate(`/blog/${postId}`)
    }

    if (featuredPosts.length === 0) {
        return null
    }

    return (
        <div className="w-full mb-8">
            {/* Single Post Carousel */}
            <div className="relative">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                        slidesToScroll: 1,
                    }}
                >
                    <CarouselContent>
                        {featuredPosts.map((post) => (
                            <CarouselItem key={post.postId}>
                                <div
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group overflow-hidden"
                                    onClick={() => handlePostClick(post.postId)}
                                >
                                    {/* Image */}
                                    <div className="relative h-64 md:h-80 overflow-hidden">
                                        <img
                                            src={post.thumbnail || post.sourceUrl || stockImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.src = stockImage
                                            }}
                                        />
                                        {/* Sentiment Badge */}
                                        <div className="absolute top-4 left-4">
                                            <Badge className={`${getSentimentColor(post.sentiment)} text-sm font-medium`}>
                                                {getSentimentIcon(post.sentiment)}
                                                <span className="ml-1">{post.sentiment}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Stock Symbol */}
                                        {post.stocks && post.stocks.length > 0 && (
                                            <Badge className="bg-red-100 text-red-800 text-sm mb-3">
                                                {post.stocks[0].symbol}
                                            </Badge>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        {/* Content Preview */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {truncateContent(post.content, 150)}
                                        </p>

                                        {/* Footer Stats */}
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {formatDate(post.createdAt)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {post.viewCount || 0}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ArrowUp className="h-4 w-4" />
                                                <span className="font-medium">{(post.upvoteCount || 0) - (post.downvoteCount || 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 bg-white border-gray-200 text-gray-600 hover:bg-gray-50" />
                    <CarouselNext className="right-4 bg-white border-gray-200 text-gray-600 hover:bg-gray-50" />
                </Carousel>
            </div>
        </div>
    )
}
