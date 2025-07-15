import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalPosts: number
    postsPerPage: number
}

export function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
    totalPosts,
    postsPerPage
}: PaginationControlsProps) {
    if (totalPages <= 1) {
        return null
    }

    const startPost = (currentPage - 1) * postsPerPage + 1
    const endPost = Math.min(currentPage * postsPerPage, totalPosts)

    return (
        <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-500">
                Showing {startPost} to {endPost} of {totalPosts} posts
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>

                <div className="flex items-center gap-1">
                    {/* First page */}
                    {currentPage > 3 && (
                        <>
                            <Button
                                variant={1 === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(1)}
                                className="w-8 h-8 p-0"
                            >
                                1
                            </Button>
                            {currentPage > 4 && (
                                <span className="text-gray-500 px-2">...</span>
                            )}
                        </>
                    )}

                    {/* Pages around current page */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page =>
                            page >= currentPage - 2 &&
                            page <= currentPage + 2
                        )
                        .map(page => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page)}
                                className="w-8 h-8 p-0"
                            >
                                {page}
                            </Button>
                        ))}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                        <>
                            {currentPage < totalPages - 3 && (
                                <span className="text-gray-500 px-2">...</span>
                            )}
                            <Button
                                variant={totalPages === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(totalPages)}
                                className="w-8 h-8 p-0"
                            >
                                {totalPages}
                            </Button>
                        </>
                    )}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
