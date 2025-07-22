import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Clock, Eye, ArrowUp, Loader, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { UserServices } from '@/apis/user';
import { StockServices } from '@/apis/stocks';
import { Button } from "@/components/ui/button";
import { CreatePostModal } from "@/pages/BlogList/components/CreatePostModal";

interface UserPost {
    postId: number;
    title: string;
    content: string;
    expertId: string;
    stockId: number;
    sourceUrl: string;
    viewCount: number;
    session: number;
    likeCount: number;
    upvoteCount: number;
    downvoteCount: number;
    favoriteCount: number;
    reportCount: number;
    createdAt: string;
    updatedAt: string;
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    level: string;
    topic: string | null;
    status: string;
    stock?: {
        stockId: number;
        symbol: string;
        companyName: string;
        stockExchangeId: number | null;
        url: string;
    };
}

interface StockSymbolBadgeProps {
    stockId: number;
    fetchStockSymbol: (stockId: number) => Promise<string>;
}

const StockSymbolBadge = ({ stockId, fetchStockSymbol }: StockSymbolBadgeProps) => {
    const [symbol, setSymbol] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getSymbol = async () => {
            setLoading(true);
            try {
                const stockSymbol = await fetchStockSymbol(stockId);
                if (isMounted) {
                    setSymbol(stockSymbol);
                    setLoading(false);
                }
            } catch {
                // Ignore the error and just set loading to false
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getSymbol();

        // Cleanup function
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stockId]); // Intentionally omitting fetchStockSymbol from deps

    if (loading) {
        return (
            <Badge variant="outline" className="border-gray-300 text-gray-700">
                Loading...
            </Badge>
        );
    }

    return (
        <Badge variant="outline" className="border-gray-300 text-gray-700">
            {symbol || `Stock #${stockId}`}
        </Badge>
    );
};

export const UserPosts = () => {
    const [userPosts, setUserPosts] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [stockSymbols, setStockSymbols] = useState<Record<number, string>>({});
    const postsPerPage = 6;
    const navigate = useNavigate();

    const fetchUserPosts = async (page: number) => {
        try {
            setLoading(true);
            const response = await UserServices.getCurrentUser();
            if (response.error === false && response.data && response.data.posts) {
                // Filter active posts only
                const activePosts = response.data.posts.filter((post: UserPost) => post.status === "ACTIVE");

                // Get all posts and sort them by createdAt (most recent first)
                const allPosts = [...activePosts].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );

                // Set total posts count
                const totalPosts = allPosts.length;
                setTotalPosts(totalPosts);

                // Calculate total pages
                const calculatedTotalPages = Math.ceil(totalPosts / postsPerPage);
                setTotalPages(calculatedTotalPages);

                // Apply pagination manually
                const startIndex = (page - 1) * postsPerPage;
                const endIndex = startIndex + postsPerPage;
                const paginatedPosts = allPosts.slice(startIndex, endIndex);

                setUserPosts(paginatedPosts);
            } else {
                throw new Error(response.message || 'Failed to load user data');
            }
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

    const fetchStockSymbol = async (stockId: number) => {
        if (stockSymbols[stockId] !== undefined) {
            return stockSymbols[stockId];
        }

        try {
            const response = await StockServices.getStockById(stockId);
            if (response.error === false && response.data) {
                const symbol = response.data.symbol;
                const newSymbols = { ...stockSymbols, [stockId]: symbol };
                setStockSymbols(newSymbols);
                return symbol;
            } else {
                // Store a null value to avoid repeated failed requests
                setStockSymbols(prev => ({ ...prev, [stockId]: '' }));
            }
        } catch (error) {
            console.error(`Error fetching stock symbol for ID ${stockId}:`, error);
            // Store a null value to avoid repeated failed requests
            setStockSymbols(prev => ({ ...prev, [stockId]: '' }));
        }
        return '';
    };

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
                <CreatePostModal onPostCreated={() => fetchUserPosts(1)} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Posts ({totalPosts})</h2>
                <CreatePostModal onPostCreated={() => fetchUserPosts(currentPage)} />
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
                            {post.sourceUrl && (
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    <img
                                        src={post.sourceUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
                                        }}
                                    />
                                </div>
                            )}
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
                                {post.stockId && !post.stock && (
                                    <StockSymbolBadge stockId={post.stockId} fetchStockSymbol={fetchStockSymbol} />
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
