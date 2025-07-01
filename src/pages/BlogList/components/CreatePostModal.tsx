import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PostServices } from '@/apis/posts'
import { useNavigate } from 'react-router'

interface CreatePostModalProps {
    onPostCreated?: () => void
}

export function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [stockId, setStockId] = useState('')
    const [file, setFile] = useState<File | undefined>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!title || !stockId) return

        setIsSubmitting(true)
        try {
            const response = await PostServices.createPost(title, content, parseInt(stockId), file)
            setTitle('')
            setContent('')
            setStockId('')
            setFile(undefined)


            console.log(response)
            if (response.saved) {
                if (onPostCreated) {
                    onPostCreated()
                }
                setIsOpen(false)
                navigate('/')
            }

        } catch (error) {
            // Silently fail
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer"
                >
                    Create new Post
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="stockId">Stock ID</Label>
                        <Input
                            id="stockId"
                            placeholder="e.g. 123"
                            type="number"
                            value={stockId}
                            onChange={(e) => setStockId(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="file">Upload Image/File (optional)</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
