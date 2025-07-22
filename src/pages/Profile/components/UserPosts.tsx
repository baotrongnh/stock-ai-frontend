import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock, Eye, ArrowUp, Loader, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import type { FavoritePost } from "../types";
import { PostServices } from '@/apis/posts';
import { Button } from "@/components/ui/button";

export const UserPosts = () => {
    const [userPosts, setUserPosts] = useState<FavoritePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 6;
    const navigate = useNavigate();

    const fetchUserPosts = async (page: number) => {
        try {
            setLoading(true);
            const response = await PostServices.getUserPosts(page, postsPerPage);
            setUserPosts(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
            setTotalPosts(response.data.pagination.total);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user posts:', err);
            setError('Failed to load your posts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts(currentPage);
    }, [currentPage]);

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
                <span className="ml-2 text-lg">Loading your posts...</span>
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

    if (userPosts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
                <p className="mb-6">You haven't created any posts yet.</p>
                <Button
                    onClick={() => navigate('/create-post')}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                    Create Your First Post
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Posts ({totalPosts})</h2>
                <Button
                    onClick={() => navigate('/create-post')}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                    Create New Post
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPosts.map((post) => (
                    <Card
                        key={post.postId}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 bg-white/90"
                        onClick={() => handlePostClick(post.postId)}
                    >
                        <CardHeader className="p-4 pb-2 bg-white/80">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold line-clamp-2">{post.title}</CardTitle>
                                <Badge className={`ml-2 ${getSentimentColor(post.sentiment)}`}>
                                    <span className="flex items-center">
                                        {getSentimentIcon(post.sentiment)}
                                        <span className="ml-1">{post.sentiment.toLowerCase()}</span>
                                    </span>
                                </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <p className="text-sm text-gray-600 mb-3">
                                {truncateContent(post.content)}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 space-x-4">
                                <div className="flex items-center">
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    <span>{post.viewCount} views</span>
                                </div>
                                <div className="flex items-center">
                                    <ArrowUp className="h-3.5 w-3.5 mr-1" />
                                    <span>{post.upvoteCount} upvotes</span>
                                </div>
                                {post.stock && (
                                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                                        {post.stock.symbol}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <span className="text-sm text-gray-500">
                            Page {currentPage} of {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
