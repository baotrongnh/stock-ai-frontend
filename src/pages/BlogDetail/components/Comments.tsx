import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, User } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import type { Comment } from "../types";

interface CommentFormProps {
    newComment: string;
    setNewComment: (comment: string) => void;
    handleAddComment: () => Promise<void>;
    addingComment: boolean;
}

export function CommentForm({ newComment, setNewComment, handleAddComment, addingComment }: CommentFormProps) {
    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <Textarea
                            placeholder="Write your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="mb-3 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        />
                        <Button
                            onClick={handleAddComment}
                            disabled={!newComment.trim() || addingComment}
                            className="bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {addingComment ? 'Adding...' : 'Post Comment'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface CommentItemProps {
    comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
    // Format date as relative time
    const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

    return (
        <Card key={comment.commentId}>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {comment.user?.avatarUrl ? (
                            <img
                                src={comment.user.avatarUrl}
                                alt={comment.user.fullName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <User className="w-5 h-5 text-gray-600" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                                {comment.user?.fullName || 'Unknown User'}
                            </span>
                            <span className="text-sm text-gray-500">
                                {formattedDate}
                            </span>
                            {comment.isEdited && (
                                <span className="text-xs text-gray-400">(edited)</span>
                            )}
                        </div>
                        <p className="text-gray-800 mb-3">{comment.content}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface CommentListProps {
    comments: Comment[];
    loadingComments: boolean;
}

export function CommentsList({ comments, loadingComments }: CommentListProps) {
    if (loadingComments) {
        return (
            <div className="flex justify-center py-4">
                <span className="text-gray-500">Loading comments...</span>
            </div>
        );
    }

    if (!Array.isArray(comments)) {
        return (
            <div className="flex justify-center py-4">
                <span className="text-gray-500">Error loading comments</span>
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="flex justify-center py-4">
                <span className="text-gray-500">No comments yet. Be the first to comment!</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem key={comment.commentId} comment={comment} />
            ))}
        </div>
    );
}

interface CommentsProps {
    comments: Comment[];
    loadingComments: boolean;
    addingComment: boolean;
    newComment: string;
    setNewComment: (comment: string) => void;
    handleAddComment: () => Promise<void>;
}

export function CommentsSection({
    comments,
    loadingComments,
    addingComment,
    newComment,
    setNewComment,
    handleAddComment,
}: CommentsProps) {
    return (
        <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Comments ({comments.length})</h3>

            {/* Add Comment */}
            <CommentForm
                newComment={newComment}
                setNewComment={setNewComment}
                handleAddComment={handleAddComment}
                addingComment={addingComment}
            />

            {/* Comments List */}
            <CommentsList
                comments={comments}
                loadingComments={loadingComments}
            />
        </div>
    );
}
