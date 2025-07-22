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
import { useState, useEffect, useRef } from 'react'
import { PostServices } from '@/apis/posts'
import toast from 'react-hot-toast'
import { StockServices } from '@/apis/stocks'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface Stock {
    stockId: number;
    symbol: string;
    companyName: string;
}

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
    const [stocks, setStocks] = useState<Stock[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Use a ref to prevent multiple submissions
    const isSubmittingRef = useRef(false)

    useEffect(() => {
        const fetchStocks = async () => {
            setIsLoading(true)
            try {
                const response = await StockServices.getStocks(1, 100)
                if (response && response.data && response.data.data) {
                    setStocks(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch stocks:', error)
                toast.error('Failed to load stocks')
            } finally {
                setIsLoading(false)
            }
        }

        if (isOpen) {
            fetchStocks()
        }
    }, [isOpen])

    // Add event capture for debugging
    useEffect(() => {
        // Function to intercept form submissions
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            console.log('Page is about to unload/reload')
            if (isSubmittingRef.current) {
                console.log('Unload detected during form submission!')
                // This will show a confirmation dialog to the user
                // which helps us identify if a page reload is happening
                e.preventDefault()
                e.returnValue = ''
            }
        }

        // Function to log navigation attempts
        const logNavigation = () => {
            console.log('Navigation detected')
        }

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('popstate', logNavigation)

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('popstate', logNavigation)
        }
    }, [])

    const resetForm = () => {
        setTitle('')
        setContent('')
        setStockId('')
        setFile(undefined)
    }

    const handleCreatePost = async (e: React.MouseEvent) => {
        console.log('Create post button clicked')
        // Stop any default behavior and propagation
        e.preventDefault()
        e.stopPropagation()

        console.log('Default prevented and propagation stopped')

        // Check if already submitting to prevent double submission
        if (isSubmittingRef.current) {
            console.log('Submission already in progress, ignoring click')
            return
        }

        // Validate fields
        if (!title || !stockId) {
            console.log('Validation failed - missing required fields')
            toast.error('Please fill in all required fields')
            return
        }

        // Set submitting state
        console.log('Setting submission state and beginning post creation')
        setIsSubmitting(true)
        isSubmittingRef.current = true

        try {
            // Create the post
            console.log('Calling PostServices.createPost with:', {
                title,
                contentLength: content.length,
                stockId: parseInt(stockId),
                hasFile: !!file
            })

            // Capture the start time
            const startTime = Date.now()

            const response = await PostServices.createPost(
                title,
                content, parseInt(stockId),
                file
            )

            // Calculate response time
            const endTime = Date.now()
            console.log(`API call completed in ${endTime - startTime}ms`)

            // Handle the response
            console.log('Post creation response received:', response)

            if (response && response.error === false) {
                console.log('Post created successfully, closing dialog')

                // Call the callback immediately to ensure data refresh
                if (onPostCreated) {
                    console.log('Calling onPostCreated callback to refresh posts')
                    onPostCreated()
                }

                // Close dialog and reset form
                console.log('Closing dialog with setIsOpen(false)')
                setIsOpen(false)

                console.log('Resetting form')
                // Reset the form
                resetForm()

                console.log('Showing success message')
                // Show success message
                toast.success(response.message || 'Post created successfully!')

                console.log('Post creation process completed successfully')
            } else {
                console.log('Failed to create post - response:', response)
                toast.error(response.message || 'Failed to create post')
            }
        } catch (error) {
            console.error('Error during post creation:', error)
            const errorMessage = error instanceof Error ? error.message : String(error)
            console.log('Error message:', errorMessage)
            toast.error(`Error: ${errorMessage}`)
        } finally {
            console.log('Resetting submission state in finally block')
            // Reset submission state
            setIsSubmitting(false)
            isSubmittingRef.current = false
            console.log('Submission state reset complete')
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                console.log('Dialog onOpenChange triggered, open:', open, 'isSubmitting:', isSubmittingRef.current);

                // Don't allow closing while submitting
                if (isSubmittingRef.current && !open) {
                    console.log('Preventing dialog close during submission');
                    return;
                }

                // Update open state
                console.log('Setting dialog open state to:', open);
                setIsOpen(open);

                // Reset form when closing
                if (!open) {
                    console.log('Dialog closing, resetting form');
                    resetForm();
                }
            }}
        >
            <DialogTrigger asChild>
                <Button
                    className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(true)
                    }}
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
                        <Label htmlFor="stockId">Select Stock</Label>
                        {isLoading ? (
                            <div>Loading stocks...</div>
                        ) : (
                            <Select onValueChange={setStockId} value={stockId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stocks.map((stock) => (
                                        <SelectItem
                                            key={stock.stockId}
                                            value={stock.stockId.toString()}
                                        >
                                            {stock.symbol} - {stock.companyName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
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
                        type="button"
                        onClick={handleCreatePost}
                        disabled={isSubmitting}
                        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}