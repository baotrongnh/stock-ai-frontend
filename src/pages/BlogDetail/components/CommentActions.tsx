import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { CommentService } from "@/apis/comments";
import { toast } from "react-hot-toast";
import type { Comment } from "../types";

interface CommentActionsProps {
    comment: Comment;
    refetchComments: () => Promise<void>;
}

export function CommentActions({ comment, refetchComments }: CommentActionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [content, setContent] = useState(comment.content);

    // Current user ID to check if user can edit/delete this comment
    const currentUserId = localStorage.getItem('userId');
    const canManageComment = currentUserId === comment.userId?.toString();

    // Don't render anything if the user can't manage this comment
    if (!canManageComment) {
        return null;
    }

    const handleUpdate = async () => {
        try {
            await CommentService.updateCommentById(comment.commentId, {
                content: content,
                isEdited: true
            });
            toast.success("Comment updated successfully");
            setIsEditOpen(false);
            await refetchComments();
        } catch (err) {
            toast.error(`Failed to update comment: ${err}`);
        }
    };

    const handleDelete = async () => {
        try {
            await CommentService.deleteCommentById(comment.commentId);
            toast.success("Comment deleted");
            await refetchComments();
        } catch (err) {
            toast.error(`Failed to delete comment: ${err}`);
        }
    };

    return (
        <div>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 shadow-none cursor-pointer font-medium outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 w-8 p-0"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36 shadow-lg">
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="cursor-pointer text-blue-600 hover:text-white hover:bg-blue-600 font-medium">
                                    Edit Comment
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-white hover:bg-red-600 font-medium">
                                    Delete Comment
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit Dialog */}
                    <DialogContent className="max-w-md w-full">
                        <DialogHeader>
                            <DialogTitle>Edit Comment</DialogTitle>
                        </DialogHeader>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border p-2 rounded mb-3 h-32"
                            placeholder="Comment content"
                        />

                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white w-full"
                            onClick={handleUpdate}
                            disabled={!content.trim()}
                        >
                            Save Changes
                        </Button>
                    </DialogContent>

                    {/* Delete Alert Dialog */}
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your comment.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={handleDelete}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Dialog>
        </div>
    );
}
