import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock, Eye, ArrowUp, Loader } from "lucide-react";
import { useNavigate } from "react-router";
import type { FavoritePost } from "../types";
import { getFavorites } from '@/apis/favorites';

export const FavoritesList = () => {
    const [favorites, setFavorites] = useState<FavoritePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await getFavorites();
                setFavorites(response.data.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Failed to load favorite posts');
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handlePostClick = (postId: number) => {
        // Use navigate with state to preserve navigation history
        navigate(`/blog/${postId}`, {
            state: { from: '/profile' }
        });
    };

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return <TrendingUp className="h-4 w-4 text-green-500" />;
            case 'NEGATIVE':
                return <TrendingDown className="h-4 w-4 text-red-500" />;
            case 'NEUTRAL':
                return <Minus className="h-4 w-4 text-gray-500" />;
            default:
                return null;
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-100 text-green-800';
            case 'NEGATIVE':
                return 'bg-red-100 text-red-800';
            case 'NEUTRAL':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="h-8 w-8 animate-spin text-red-500" />
                <span className="ml-2 text-lg">Loading favorites...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg text-red-500">{error}</p>
                <p className="text-sm mt-2">Please try again later</p>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg">You haven't added any posts to your favorites yet</p>
                <p className="text-sm mt-2">Browse some posts and bookmark the ones you like</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((post) => (
                <Card
                    key={post.postId}
                    className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => handlePostClick(post.postId)}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg leading-tight line-clamp-2">
                                {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {getSentimentIcon(post.sentiment)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={`${getSentimentColor(post.sentiment)} text-xs`}>
                                {post.sentiment}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {post.stock.symbol}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {post.sourceUrl && (
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={post.sourceUrl || "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
                                    }}
                                />
                            </div>
                        )}

                        <p className="text-sm text-gray-600 line-clamp-3">
                            {truncateContent(post.content)}
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
                                    <ArrowUp className="h-3 w-3" />
                                    {(post.upvoteCount || 0) - (post.downvoteCount || 0)}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
