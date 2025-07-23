import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Bookmark, MessageSquare } from "lucide-react";
import type { Post } from "../types";
import type { FC } from "react";
import { PostActions } from "./PostActions";
import { ReportButton } from "./ReportButton";

interface PostFooterProps {
    post: Post;
    userVote: "UPVOTE" | "DOWNVOTE" | null;
    isFavorited: boolean;
    isVoting: boolean;
    isFavoriting: boolean;
    commentCount: number;
    userId?: number | string;
    userIdRaw?: string | null;
    handleVote: (voteType: "UPVOTE" | "DOWNVOTE") => Promise<void>;
    handleFavorite: () => Promise<void>;
    refreshPost: () => Promise<void>;
}

export const PostFooter: FC<PostFooterProps> = ({
    post,
    userVote,
    isFavorited,
    isVoting,
    isFavoriting,
    commentCount,
    userId,
    userIdRaw,
    handleVote,
    handleFavorite,
    refreshPost
}) => {
    return (
        <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className={`border-green-200 hover:bg-green-50 transition-all duration-200 ${userVote === "UPVOTE"
                                ? "bg-green-700 text-white border-green-300 hover:bg-green-600 shadow-sm animate-pulse"
                                : "text-green-600"
                                }`}
                            onClick={() => handleVote("UPVOTE")}
                            disabled={isVoting}
                            title={userVote === "UPVOTE" ? "Click to unvote" : "Vote up"}
                        >
                            <ArrowUp className={`w-4 h-4 ${userVote === "UPVOTE" ? "fill-current stroke-2" : ""}`} />
                        </Button>

                        <span className="text-sm text-gray-600 font-medium">
                            {(post?.upvoteCount || 0) - (post?.downvoteCount || 0)}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            className={`border-red-200 hover:bg-red-50 transition-all duration-200 ${userVote === "DOWNVOTE"
                                ? "bg-red-700 text-white border-red-300 hover:bg-red-600 shadow-sm animate-pulse"
                                : "text-red-600"
                                }`}
                            onClick={() => handleVote("DOWNVOTE")}
                            disabled={isVoting}
                            title={userVote === "DOWNVOTE" ? "Click to unvote" : "Vote down"}
                        >
                            <ArrowDown className={`w-4 h-4 ${userVote === "DOWNVOTE" ? "fill-current stroke-2" : ""}`} />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        {commentCount} comments
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFavorite}
                        disabled={isFavoriting}
                        className={isFavorited
                            ? "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 transition-all duration-200"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        }
                        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Bookmark className={`w-4 h-4 mr-2 ${isFavorited ? "fill-yellow-600" : ""}`} />
                        {isFavoriting ? "Saving..." : (isFavorited ? "Saved" : "Save")}
                    </Button>
                    {/* Show PostActions if user is author, otherwise show ReportButton */}
                    {post.expertId && (userIdRaw || userId) &&
                        (String(userIdRaw).trim() === String(post.expertId).trim())
                        ? <PostActions post={post} refetchPost={refreshPost} />
                        : <ReportButton postId={post.postId} />
                    }
                </div>
            </div>
        </div>
    );
};
