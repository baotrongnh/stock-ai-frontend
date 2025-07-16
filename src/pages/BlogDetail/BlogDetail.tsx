import { PostServices } from "@/apis/posts";
import { CommentService } from "@/apis/comments";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router";
import type { Post, Comment } from "./types";
import { PostHeader } from "./components/PostHeader";
import { PostFooter } from "./components/PostFooter";
import { CommentsSection } from "./components/Comments";

const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";

export default function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [normalizedContent, setNormalizedContent] = useState("");
    const [isFavorited, setIsFavorited] = useState(false);
    const [userVote, setUserVote] = useState<"UPVOTE" | "DOWNVOTE" | null>(null);
    const [isVoting, setIsVoting] = useState(false);
    const [isFavoriting, setIsFavoriting] = useState(false);
    const userId = Number(localStorage.getItem('userId'));

    const fetchPost = useCallback(async (showLoading = true) => {
        if (showLoading) {
            setLoading(true);
        }
        try {
            const res = await PostServices.getPostById(Number(id));
            console.log('Post response:', res);

            if (!res.error) {
                const postData = res.result || res.data;

                // Update post with received data
                setPost(postData);

                // Set initial states directly to avoid delay
                if (postData) {
                    // Set favorite state
                    const hasFavorite = postData.userHasFavorited ?? postData.isFavorited ?? false;
                    setIsFavorited(hasFavorite);

                    // Set vote state
                    if (postData.userHasVoted && postData.userVoteType) {
                        setUserVote(postData.userVoteType);
                    } else {
                        setUserVote(postData.userVote || null);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            setPost(null);
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    }, [id]);

    useEffect(() => {
        fetchPost(true);
    }, [id, fetchPost]);

    useEffect(() => {
        if (post && !isVoting) {
            // Use the new API fields if available, otherwise fallback to the old fields
            setIsFavorited(post.userHasFavorited ?? post.isFavorited ?? false);

            // Only update vote state from the API if we're not in the middle of a voting action
            // Use userVoteType if available, or fall back to userVote
            const apiVoteState = post.userHasVoted ? (post.userVoteType || post.userVote || null) : null;
            setUserVote(apiVoteState);

            console.log('Initial vote state set from API:', {
                userHasVoted: post.userHasVoted,
                userVoteType: post.userVoteType,
                userVote: post.userVote,
                finalState: apiVoteState
            });
        }
    }, [post, isVoting]);

    const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE") => {
        if (!post || isVoting) return;

        setIsVoting(true);
        // Store the initial vote state for error handling
        const initialVoteState = post.userVoteType || userVote;
        // Flag to track if this is an unvote action
        const isUnvote = initialVoteState === voteType;

        try {
            // Immediately update UI state for responsiveness
            if (isUnvote) {
                // If clicking the same button, remove the vote (toggle off)
                setUserVote(null);
            } else {
                // If changing vote or adding new vote
                setUserVote(voteType);
            }

            // Call votePost API - it handles toggling on the backend
            await PostServices.votePost(post.postId, voteType);

            // Show appropriate toast message
            if (isUnvote) {
                toast.success("Unvoted Post", {
                    duration: 3000,
                    style: {
                        background: '#4B5563',
                        color: '#fff',
                    },
                });
            } else {
                toast.success(
                    voteType === "UPVOTE"
                        ? "Voted Up"
                        : "Voted Down",
                    {
                        duration: 3000,
                        style: {
                            background: voteType === "UPVOTE" ? '#10B981' : '#EF4444',
                            color: '#fff',
                        },
                    }
                );
            }

            // Refresh post data to get updated vote count
            const res = await PostServices.getPostById(Number(id));
            if (!res.error) {
                const updatedPost = res.result || res.data;

                // Update post but preserve our local vote state
                setPost(prev => {
                    if (!prev) return updatedPost;

                    // Create a new post object with updated fields
                    const newPost = {
                        ...updatedPost,
                        // Explicitly set vote states based on our local state after action
                        userVoteType: isUnvote ? null : voteType,
                        userHasVoted: !isUnvote,
                        userVote: isUnvote ? null : voteType
                    };

                    console.log('Updated post vote state:', {
                        userVoteType: newPost.userVoteType,
                        userHasVoted: newPost.userHasVoted,
                        action: isUnvote ? 'unvote' : 'vote'
                    });

                    return newPost;
                });
            }
        } catch (error) {
            console.error('Error voting on post:', error);
            // If error occurs, revert the local state change
            setUserVote(initialVoteState);
            toast.error("Failed to vote on post");
        } finally {
            setIsVoting(false);
        }
    };

    const handleFavorite = async () => {
        if (!post || isFavoriting) return;

        setIsFavoriting(true);
        // Store initial favorite state for error handling
        const initialFavoriteState = isFavorited;

        try {
            if (isFavorited) {
                // Update state BEFORE API call for responsive UI
                setIsFavorited(false);

                // Unfavorite the post
                await PostServices.unfavoritePost(post.postId);
                toast.success("Post removed from favorites!", {
                    duration: 3000,
                    style: {
                        background: '#4B5563',
                        color: '#fff',
                    },
                });
            } else {
                // Update state BEFORE API call for responsive UI
                setIsFavorited(true);

                // Favorite the post
                await PostServices.favoritePost(post.postId);
                toast.success("Post added to favorites!", {
                    duration: 3000,
                    style: {
                        background: '#FBBF24',
                        color: '#78350F',
                        fontWeight: 'bold',
                    },
                });
            }

            // Refresh the post data
            const res = await PostServices.getPostById(Number(id));
            if (!res.error) {
                const updatedPost = res.result || res.data;

                // Update post but preserve our local favorite state
                setPost(prev => {
                    if (!prev) return updatedPost;
                    return {
                        ...updatedPost,
                        // Keep our current favorite state
                        userHasFavorited: !initialFavoriteState,
                        isFavorited: !initialFavoriteState
                    };
                });
            }
        } catch (error) {
            console.error('Error favoriting post:', error);
            // Revert local state if API call fails
            setIsFavorited(initialFavoriteState);
            toast.error("Failed to update favorites");
        } finally {
            setIsFavoriting(false);
        }
    };

    const refreshPost = useCallback(() => {
        return fetchPost(true);
    }, [fetchPost]);

    const fetchComments = useCallback(async () => {
        if (!post) return;

        setLoadingComments(true);
        try {
            const res = await CommentService.getCommentsByPostId(post.postId);
            console.log('Comments API response:', res);

            if (!res.error) {
                // Handle the nested data structure from the API
                const commentData = res.data?.data || [];
                console.log('Comment data:', commentData);

                // Defensive check to make sure it's an array
                if (Array.isArray(commentData)) {
                    setComments(commentData);
                } else {
                    console.error('Comments data is not an array:', commentData);
                    setComments([]);
                }
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        } finally {
            setLoadingComments(false);
        }
    }, [post]);

    useEffect(() => {
        if (post) {
            fetchComments();
        }
    }, [post, fetchComments]);

    const handleAddComment = async () => {
        if (!newComment.trim() || !post) return;

        setAddingComment(true);
        try {
            const commentData = {
                postId: post.postId,
                userId: userId,
                content: newComment.trim()
            };

            const response = await CommentService.createComment(commentData);
            console.log("Comment response:", response);

            // Handle different response formats
            if (response?.message === "Comment created successfully" || !response?.error) {
                // Make toast more noticeable with custom styling
                toast.success("Comment posted successfully!", {
                    duration: 4000,
                    style: {
                        background: '#4CAF50',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '16px',
                        borderRadius: '10px',
                    },
                    icon: '✅'
                });
                setNewComment("");
                // Refresh comments
                await fetchComments();
            } else {
                toast.error("Failed to post comment", {
                    duration: 4000,
                    style: {
                        background: '#F44336',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '16px',
                        borderRadius: '10px',
                    },
                    icon: '❌'
                });
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error("Failed to post comment");
        } finally {
            setAddingComment(false);
        }
    };

    useEffect(() => {
        if (post?.content) {
            const normalized = post.content.replace(/\\n/g, '\n');
            setNormalizedContent(normalized);
        }
    }, [post]);

    const openImage = () => {
        setIsImageOpen(true);
    };

    if (loading) return (
        <div className="flex w-full min-h-screen justify-center items-center text-center">
            Loading...
        </div>
    );

    if (!post) return (
        <div className="flex w-full min-h-screen justify-center items-center text-center">
            Post not found
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/blog">
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Article Content */}
                <div className="flex-1 overflow-y-auto">
                    <article className="max-w-4xl mx-auto p-6">
                        {/* Post Header */}
                        <PostHeader post={post} openImage={openImage} />

                        {/* Article Body */}
                        <div className="prose prose-lg max-w-none mb-12">
                            <div className="prose prose-lg max-w-none mb-12 text-gray-800 leading-relaxed">
                                {normalizedContent.split('\n').map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Post Footer (Votes, Favorites) */}
                        <PostFooter
                            post={post}
                            userVote={userVote}
                            isFavorited={isFavorited}
                            isVoting={isVoting}
                            isFavoriting={isFavoriting}
                            commentCount={comments.length}
                            userId={userId}
                            handleVote={handleVote}
                            handleFavorite={handleFavorite}
                            refreshPost={refreshPost}
                        />

                        {/* Comments Section */}
                        <CommentsSection
                            comments={comments}
                            loadingComments={loadingComments}
                            addingComment={addingComment}
                            newComment={newComment}
                            setNewComment={setNewComment}
                            handleAddComment={handleAddComment}
                        />
                    </article>
                </div>
            </div>

            {/* Full Image Modal */}
            {isImageOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                    onClick={() => setIsImageOpen(false)}
                >
                    <img
                        src={post.sourceUrl || DEFAULT_IMAGE}
                        alt="Full Size"
                        className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
                    />
                </div>
            )}

            <Toaster position="top-right" />
        </div>
    );
}
