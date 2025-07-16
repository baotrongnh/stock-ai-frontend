import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import { useRef } from "react"

interface Stock {
    stockId: number
    symbol: string
    companyName: string
}

interface FilterPanelProps {
    availableStocks: Stock[]
    availableSentiments: string[]
    availableLevels: string[]
    availableSessions: number[]
    availableDates: string[]
    selectedStock: string
    setSelectedStock: (stock: string) => void
    selectedSentiment: string
    setSelectedSentiment: (sentiment: string) => void
    selectedDate: string
    setSelectedDate: (date: string) => void
    selectedSession: string
    selectedLevel: string
    setSelectedLevel: (level: string) => void
    sortBy: string
    setSortBy: (sort: string) => void
    showDatePicker: boolean
    setShowDatePicker: (show: boolean) => void
    currentMonth: Date
    setCurrentMonth: (month: Date) => void
    getCalendarDays: () => Date[]
    formatDateForInput: (date: Date) => string
    handleDateSelect: (date: Date) => void
    handleSessionChange: (session: string) => void
    sessionWarning: string
}

export function FilterPanel({
    availableStocks,
    availableSentiments,
    availableLevels,
    availableSessions,
    availableDates,
    selectedStock,
    setSelectedStock,
    selectedSentiment,
    setSelectedSentiment,
    selectedDate,
    setSelectedDate,
    selectedSession,
    selectedLevel,
    setSelectedLevel,
    sortBy,
    setSortBy,
    showDatePicker,
    setShowDatePicker,
    currentMonth,
    setCurrentMonth,
    getCalendarDays,
    formatDateForInput,
    handleDateSelect,
    handleSessionChange,
    sessionWarning
}: FilterPanelProps) {
    const datePickerRef = useRef<HTMLDivElement>(null)

    return (
        <div className="flex flex-wrap items-start gap-4 p-4 bg-white/50 rounded-lg border border-red-100">
            {/* Stock Filter */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="All stocks" />
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer">
                        <SelectItem value="all">All stocks</SelectItem>
                        {availableStocks.length > 0 ? availableStocks.map((stock) => (
                            <SelectItem key={stock.stockId} value={stock.stockId.toString()}>
                                {stock.symbol} - {stock.companyName}
                            </SelectItem>
                        )) : (
                            <SelectItem value="no-stocks" disabled>No stocks available</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Sentiment Filter */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sentiment</label>
                <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="All sentiments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All sentiments</SelectItem>
                        {availableSentiments.includes('POSITIVE') && (
                            <SelectItem value="POSITIVE">Positive</SelectItem>
                        )}
                        {availableSentiments.includes('NEGATIVE') && (
                            <SelectItem value="NEGATIVE">Negative</SelectItem>
                        )}
                        {availableSentiments.includes('NEUTRAL') && (
                            <SelectItem value="NEUTRAL">Neutral</SelectItem>
                        )}
                        {availableSentiments.length === 0 && (
                            <SelectItem value="no-sentiments" disabled>No sentiments available</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Level Filter */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        {availableLevels.includes('MARKET') && (
                            <SelectItem value="MARKET">Market Level</SelectItem>
                        )}
                        {availableLevels.includes('SYMBOL') && (
                            <SelectItem value="SYMBOL">Symbol Level</SelectItem>
                        )}
                        {availableLevels.length === 0 && (
                            <SelectItem value="no-levels" disabled>No levels available</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2" ref={datePickerRef}>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                    <button
                        type="button"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="w-full pl-10 pr-4 py-2 text-left border border-gray-300 rounded-md cursor-pointer hover:bg-red-50 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors min-h-[40px] bg-white"
                    >
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "Select date"}
                    </button>

                    {showDatePicker && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-80">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <h3 className="text-lg font-semibold">
                                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Calendar Days Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {getCalendarDays().map((date, index) => {
                                    const dateStr = formatDateForInput(date)
                                    const hasPost = availableDates.includes(dateStr)
                                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                                    const isSelected = selectedDate === dateStr
                                    const today = new Date()
                                    const todayStr = formatDateForInput(today)
                                    const isToday = dateStr === todayStr

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => hasPost ? handleDateSelect(date) : null}
                                            disabled={!hasPost}
                                            className={`
                                                            w-8 h-8 text-sm rounded-md transition-colors
                                                            ${!isCurrentMonth ? 'text-gray-300' : ''}
                                                            ${isSelected ? 'bg-blue-500 text-white' : ''}
                                                            ${hasPost && !isSelected ? 'bg-red-600 text-white hover:bg-red-700' : ''}
                                                            ${!hasPost && isCurrentMonth ? 'text-gray-400 cursor-not-allowed' : ''}
                                                            ${!hasPost && !isCurrentMonth ? 'text-gray-200 cursor-not-allowed' : ''}
                                                            ${isToday && !isSelected && hasPost ? 'ring-2 ring-red-400' : ''}
                                                            ${isToday && !isSelected && !hasPost ? 'ring-2 ring-gray-300' : ''}
                                                       `}
                                        >
                                            {date.getDate()}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Legend and Clear button */}
                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 bg-red-600 rounded mr-1"></span>
                                        Available dates
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-1"></span>
                                        No posts
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDate("")
                                        setShowDatePicker(false)
                                    }}
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Session Filter */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Session</label>
                <Select
                    value={selectedSession}
                    onValueChange={handleSessionChange}
                    disabled={!selectedDate}
                >
                    <SelectTrigger className={`cursor-pointer ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <SelectValue placeholder="All sessions" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All sessions</SelectItem>
                        {availableSessions.map(session => (
                            <SelectItem key={session} value={session.toString()}>
                                Session {session}
                            </SelectItem>
                        ))}
                        {availableSessions.length === 0 && selectedDate && (
                            <SelectItem value="no-sessions" disabled>No sessions available for this date</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {sessionWarning && (
                    <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{sessionWarning}</span>
                    </div>
                )}
            </div>

            {/* Sort By */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                        <SelectItem value="most-viewed">Most viewed</SelectItem>
                        <SelectItem value="most-liked">Most upvoted</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
