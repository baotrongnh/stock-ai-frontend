import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface FilterBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    showFilters: boolean
    setShowFilters: (show: boolean) => void
    hasActiveFilters: boolean
    clearFilters: () => void
}

export function FilterBar({
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    hasActiveFilters,
    clearFilters
}: FilterBarProps) {
    return (
        <div className="flex gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Search articles, stocks, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white"
                />
            </div>

            {/* Filter Toggle */}
            <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ${hasActiveFilters ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white'}`}
            >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && <Badge className="ml-2 bg-red-500 text-white">!</Badge>}
            </Button>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 bg-white transition-all duration-200"
                >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                </Button>
            )}
        </div>
    )
}
