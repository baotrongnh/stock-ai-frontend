import { useState, useEffect, useCallback } from 'react'
import { PostServices } from '@/apis/posts'
import { StockServices } from '@/apis/stocks'

interface Post {
    postId: number
    title: string
    content: string
    thumbnail?: string
    sourceUrl?: string
    sentiment: string
    createdAt: string
    viewCount: number
    likeCount: number
    session: number
    level: string
    topic: string
    status: string
    expert: {
        userId: string
        fullName: string
        avatarUrl?: string
    }
    stocks: Array<{
        stockId: number
        symbol: string
        companyName: string
    }>
    stock?: {
        stockId: number
        symbol: string
        companyName: string
    }
    stockId?: number
}

interface Stock {
    stockId: number
    symbol: string
    companyName: string
}

export function useBlogFilters() {
    // State for posts and stocks
    const [posts, setPosts] = useState<Post[]>([])
    const [stocks, setStocks] = useState<Stock[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Filter states
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStock, setSelectedStock] = useState("all")
    const [selectedSentiment, setSelectedSentiment] = useState("all")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedSession, setSelectedSession] = useState("all")
    const [selectedLevel, setSelectedLevel] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [showFilters, setShowFilters] = useState(false)
    const [sessionWarning, setSessionWarning] = useState("")

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9

    // Dynamic filter options
    const [availableStocks, setAvailableStocks] = useState<Stock[]>([])
    const [availableSentiments, setAvailableSentiments] = useState<string[]>([])
    const [availableLevels, setAvailableLevels] = useState<string[]>([])
    const [availableSessions, setAvailableSessions] = useState<number[]>([])
    const [availableDates, setAvailableDates] = useState<string[]>([])

    // Date picker states
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1)
    })// Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [postsResponse, stocksResponse] = await Promise.all([
                    PostServices.getPosts(1, 1000),
                    StockServices.getStocks(1, 1000)
                ])

                // console.log('Posts API response:', postsResponse) // Debug log
                // console.log('Stocks API response:', stocksResponse) // Debug log

                // Handle posts response - try multiple possible structures
                let postsData = []
                if (postsResponse.data?.data && Array.isArray(postsResponse.data.data)) {
                    postsData = postsResponse.data.data
                } else if (postsResponse.data && Array.isArray(postsResponse.data)) {
                    postsData = postsResponse.data
                } else if (postsResponse.result && Array.isArray(postsResponse.result)) {
                    postsData = postsResponse.result
                } else if (Array.isArray(postsResponse)) {
                    postsData = postsResponse
                }

                // console.log('Processed posts data:', postsData) // Debug log
                setPosts(postsData)

                // Handle stocks response - try multiple possible structures
                let stocksData = []
                if (stocksResponse.data?.data && Array.isArray(stocksResponse.data.data)) {
                    stocksData = stocksResponse.data.data
                } else if (stocksResponse.data && Array.isArray(stocksResponse.data)) {
                    stocksData = stocksResponse.data
                } else if (stocksResponse.result && Array.isArray(stocksResponse.result)) {
                    stocksData = stocksResponse.result
                } else if (Array.isArray(stocksResponse)) {
                    stocksData = stocksResponse
                }

                // console.log('Processed stocks data:', stocksData) // Debug log
                setStocks(stocksData)
            } catch (err) {
                setError('Failed to fetch data')
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Dynamic filter calculation based on current filters
    const calculateAvailableOptions = useCallback(() => {
        // Start with all posts
        let filteredForOptions = posts

        // Apply current filters to get the context for available options
        if (searchTerm) {
            filteredForOptions = filteredForOptions.filter(post =>
                post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (selectedStock !== "all") {
            filteredForOptions = filteredForOptions.filter(post =>
                (post.stocks && post.stocks.some(stock => stock.stockId.toString() === selectedStock)) ||
                (post.stock && post.stock.stockId && post.stock.stockId.toString() === selectedStock) ||
                (post.stockId && post.stockId.toString() === selectedStock)
            )
        }

        if (selectedSentiment !== "all") {
            filteredForOptions = filteredForOptions.filter(post => post.sentiment === selectedSentiment)
        }

        if (selectedLevel !== "all") {
            filteredForOptions = filteredForOptions.filter(post => post.level === selectedLevel)
        }

        if (selectedDate) {
            filteredForOptions = filteredForOptions.filter(post =>
                formatDateForInput(new Date(post.createdAt)) === selectedDate
            )
        }

        if (selectedSession !== "all") {
            filteredForOptions = filteredForOptions.filter(post => post.session?.toString() === selectedSession)
        }

        // Calculate available stocks
        const stocksInData = new Set<number>()
        filteredForOptions.forEach(post => {
            if (post.stocks) {
                post.stocks.forEach(stock => stocksInData.add(stock.stockId))
            }
            if (post.stock?.stockId) {
                stocksInData.add(post.stock.stockId)
            }
            if (post.stockId) {
                stocksInData.add(post.stockId)
            }
        })
        setAvailableStocks(stocks.filter(stock => stocksInData.has(stock.stockId)))

        // Calculate available sentiments
        const sentimentsInData = new Set(filteredForOptions.map(post => post.sentiment).filter(Boolean))
        setAvailableSentiments(Array.from(sentimentsInData))

        // Calculate available levels
        const levelsInData = new Set(filteredForOptions.map(post => post.level).filter(Boolean))
        setAvailableLevels(Array.from(levelsInData))

        // Calculate available dates
        const datesInData = new Set(filteredForOptions.map(post => formatDateForInput(new Date(post.createdAt))))
        setAvailableDates(Array.from(datesInData).sort())

        // Calculate available sessions (only if date is selected)
        if (selectedDate) {
            const sessionsInData = new Set(
                filteredForOptions
                    .filter(post => formatDateForInput(new Date(post.createdAt)) === selectedDate)
                    .map(post => post.session)
                    .filter(session => session !== undefined && session !== null)
            )
            setAvailableSessions(Array.from(sessionsInData).sort())
        } else {
            setAvailableSessions([])
        }

    }, [posts, stocks, searchTerm, selectedStock, selectedSentiment, selectedLevel, selectedDate, selectedSession])

    // Update available options whenever filters change
    useEffect(() => {
        calculateAvailableOptions()
    }, [calculateAvailableOptions])

    // Date picker helper functions
    const formatDateForInput = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const getCalendarDays = () => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startDay = firstDay.getDay()

        const days = []

        // Add previous month days
        for (let i = startDay - 1; i >= 0; i--) {
            days.push(new Date(year, month, -i))
        }

        // Add current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }

        // Add next month days to complete the calendar
        const remainingDays = 42 - days.length
        for (let i = 1; i <= remainingDays; i++) {
            days.push(new Date(year, month + 1, i))
        }

        return days
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(formatDateForInput(date))
        setShowDatePicker(false)
    }

    // Filter and sort posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStock = selectedStock === "all" ||
            (post.stocks && post.stocks.some(stock => stock.stockId.toString() === selectedStock)) ||
            (post.stock && post.stock.stockId && post.stock.stockId.toString() === selectedStock) ||
            (post.stockId && post.stockId.toString() === selectedStock)

        const matchesSentiment = selectedSentiment === "all" || post.sentiment === selectedSentiment

        const matchesDate = !selectedDate ||
            formatDateForInput(new Date(post.createdAt)) === selectedDate

        const matchesSession = selectedSession === "all" || post.session?.toString() === selectedSession

        const matchesLevel = selectedLevel === "all" || post.level === selectedLevel

        return matchesSearch && matchesStock && matchesSentiment && matchesDate && matchesSession && matchesLevel
    })

    // Debug logging
    // console.log('Raw posts:', posts.length)
    // console.log('Filtered posts:', filteredPosts.length)
    // console.log('Current filters:', {
    //     searchTerm,
    //     selectedStock,
    //     selectedSentiment,
    //     selectedDate,
    //     sortBy
    // })
    // if (posts.length > 0) {
    //     console.log('Sample post structure:', posts[0])
    // }

    // Sort posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            case 'most-viewed':
                return (b.viewCount || 0) - (a.viewCount || 0)
            case 'most-liked':
                return (b.likeCount || 0) - (a.likeCount || 0)
            default:
                return 0
        }
    })

    // Pagination
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage)

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedStock, selectedSentiment, selectedDate, selectedSession, selectedLevel, sortBy])

    // Handle session filter warning
    const handleSessionChange = (session: string) => {
        if (session !== "all" && !selectedDate) {
            setSessionWarning("Please select a specific date first to enable filtering by session.")
            return
        }
        setSessionWarning("")
        setSelectedSession(session)
    }

    // Check if filters are active
    const hasActiveFilters = Boolean(searchTerm || selectedStock !== 'all' || selectedSentiment !== 'all' || selectedDate || selectedSession !== 'all' || selectedLevel !== 'all' || sortBy !== 'newest')

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchTerm("")
        setSelectedStock("all")
        setSelectedSentiment("all")
        setSelectedDate("")
        setSelectedSession("all")
        setSelectedLevel("all")
        setSortBy("newest")
        setCurrentPage(1)
        setSessionWarning("")
    }, [])

    return {
        // Data
        posts: paginatedPosts,
        stocks,
        loading,
        error,

        // Filter states
        searchTerm,
        setSearchTerm,
        selectedStock,
        setSelectedStock,
        selectedSentiment,
        setSelectedSentiment,
        selectedDate,
        setSelectedDate,
        selectedSession,
        setSelectedSession,
        selectedLevel,
        setSelectedLevel,
        sortBy,
        setSortBy,
        showFilters,
        setShowFilters,

        // Available options for dynamic filtering
        availableStocks,
        availableSentiments,
        availableLevels,
        availableSessions,
        availableDates,

        // Pagination
        currentPage,
        setCurrentPage,
        totalPages,
        postsPerPage,
        totalPosts: sortedPosts.length,

        // Date picker
        showDatePicker,
        setShowDatePicker,
        currentMonth,
        setCurrentMonth,
        getCalendarDays,
        formatDateForInput,
        handleDateSelect,

        // Session handling
        handleSessionChange,
        sessionWarning,

        // Helpers
        hasActiveFilters,
        clearFilters
    }
}
