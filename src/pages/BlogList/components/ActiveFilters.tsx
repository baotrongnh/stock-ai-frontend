import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface Stock {
    stockId: number
    symbol: string
    companyName: string
}

interface ActiveFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedStock: string
    setSelectedStock: (stock: string) => void
    selectedSentiment: string
    setSelectedSentiment: (sentiment: string) => void
    selectedDate: string
    setSelectedDate: (date: string) => void
    sortBy: string
    setSortBy: (sort: string) => void
    stocks: Stock[]
}

export function ActiveFilters({
    searchTerm,
    setSearchTerm,
    selectedStock,
    setSelectedStock,
    selectedSentiment,
    setSelectedSentiment,
    selectedDate,
    setSelectedDate,
    sortBy,
    setSortBy,
    stocks
}: ActiveFiltersProps) {
    // Helper function to get stock display name
    const getStockDisplayName = (stockId: string) => {
        const stock = stocks.find(s => s.stockId.toString() === stockId)
        return stock ? `${stock.symbol} - ${stock.companyName}` : stockId
    }

    // Helper function to get sentiment display name
    const getSentimentDisplayName = (sentiment: string) => {
        const sentimentMap: { [key: string]: string } = {
            'POSITIVE': 'Positive',
            'NEGATIVE': 'Negative',
            'NEUTRAL': 'Neutral'
        }
        return sentimentMap[sentiment] || sentiment
    }

    // Helper function to get sort display name
    const getSortDisplayName = (sort: string) => {
        const sortMap: { [key: string]: string } = {
            'newest': 'Newest first',
            'oldest': 'Oldest first',
            'most-viewed': 'Most viewed',
            'most-liked': 'Most liked'
        }
        return sortMap[sort] || sort
    }

    const hasActiveFilters = searchTerm || selectedStock !== 'all' || selectedSentiment !== 'all' || selectedDate || sortBy !== 'newest'

    if (!hasActiveFilters) {
        return null
    }

    return (
        <div className="flex flex-wrap gap-2 p-4 bg-red-50 rounded-lg border border-red-100">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>

            {searchTerm && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                    Search: {searchTerm}
                    <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="ml-2 p-0.5 hover:bg-red-200 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {selectedStock !== 'all' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                    Stock: {getStockDisplayName(selectedStock)}
                    <button
                        type="button"
                        onClick={() => setSelectedStock('all')}
                        className="ml-2 p-0.5 hover:bg-red-200 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {selectedSentiment !== 'all' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                    Sentiment: {getSentimentDisplayName(selectedSentiment)}
                    <button
                        type="button"
                        onClick={() => setSelectedSentiment('all')}
                        className="ml-2 p-0.5 hover:bg-red-200 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {selectedDate && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                    Date: {new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    <button
                        type="button"
                        onClick={() => setSelectedDate("")}
                        className="ml-2 p-0.5 hover:bg-red-200 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {sortBy !== 'newest' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                    Sort: {getSortDisplayName(sortBy)}
                    <button
                        type="button"
                        onClick={() => setSortBy('newest')}
                        className="ml-2 p-0.5 hover:bg-red-200 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
        </div>
    )
}
