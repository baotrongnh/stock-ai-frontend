import { Badge } from "@/components/ui/badge";
import {
    ArrowUp,
    Calendar,
    Eye,
    User
} from "lucide-react";
import type { Post } from "../types";
import stockImage from "@/assets/stock.jpg";

interface PostHeaderProps {
    post: Post;
    openImage: () => void;
}

export function PostHeader({ post, openImage }: PostHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                {post.sentiment && (
                    <Badge className={`text-xs ${post.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-700' :
                        post.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {post.sentiment}
                    </Badge>
                )}
                {post.level && (
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                        {post.level === 'MARKET' ? 'Market Level' : 'Stock Level'}
                    </Badge>
                )}
                {post.topic && (
                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {post.topic}
                    </Badge>
                )}
                {post.stock && (
                    <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                        {post.stock.symbol}
                    </Badge>
                )}
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
                    {post.expert?.fullName || post.author || 'Unknown Author'}
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {post.viewCount || 0} views
                </div>
                <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4" />
                    {(post.upvoteCount || 0) - (post.downvoteCount || 0)} score
                </div>
                {post.session && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Session {post.session}</span>
                    </div>
                )}
            </div>

            <img
                src={post.sourceUrl || stockImage}
                alt={post.title}
                onClick={openImage}
                className="w-full h-64 object-cover rounded-lg mb-8 cursor-pointer transition-transform hover:scale-105"
                onError={(e) => {
                    e.currentTarget.src = stockImage
                }}
            />
        </div>
    );
}
