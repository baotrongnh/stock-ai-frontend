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
import { PostServices } from "@/apis/posts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

interface Post {
    postId: number;
    title: string;
    content: string;
    stockId?: number;
    // Add other fields as needed for your use case
}

export function PostActions({
    post,
    refetchPost,
}: {
    post: Post;
    refetchPost: () => Promise<void>;
}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [file, setFile] = useState<File | undefined>();
    const navigate = useNavigate()

    const handleUpdate = async () => {
        try {
            const res = await PostServices.updatePostById(post.postId, title, content, post.stockId ?? 0, file);
            console.log(res)
            toast.success("Post updated successfully");
            setIsEditOpen(false);
            await refetchPost();
        } catch (err) {
            toast.error(`Failed to update post: ${err}`);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await PostServices.deletePostById(post.postId);
            console.log(res)
            toast.success("Post deleted");
            navigate(`/blog`)
        } catch (err) {
            toast.error(`Failed to delete post: ${err}`);
        }
    };

    return (
        <div>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36">
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Edit Post</DropdownMenuItem>
                            </DialogTrigger>

                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-red-600">Delete Post</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit Dialog */}
                    <DialogContent className="max-w-2xl w-full">
                        <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                        </DialogHeader>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Post title"
                        />

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border p-2 rounded mb-3 h-40"
                            placeholder="Post content"
                        />

                        <div className="mb-4">
                            <label htmlFor="fileInput" className="block mb-2 font-medium text-gray-700">
                                Choose image (optional)
                            </label>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="fileInput"
                                    className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded text-sm"
                                >
                                    {file ? file.name : "Choose File"}
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </div>
                        </div>

                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white w-full"
                            onClick={handleUpdate}
                        >
                            Save Changes
                        </Button>
                    </DialogContent>

                    {/* Delete Alert Dialog */}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post.
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
