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
    postViews: number
    likes: number
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
    const [sortBy, setSortBy] = useState("newest")
    const [showFilters, setShowFilters] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9     // Date picker states
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

                console.log('Posts API response:', postsResponse) // Debug log
                console.log('Stocks API response:', stocksResponse) // Debug log

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

                console.log('Processed posts data:', postsData) // Debug log
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

                console.log('Processed stocks data:', stocksData) // Debug log
                setStocks(stocksData)
            } catch (err) {
                setError('Failed to fetch data')
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])     // Date picker helper functions
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

    const getPostDates = () => {
        return posts.map(post => {
            const date = new Date(post.createdAt)
            return formatDateForInput(date)
        })
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

        return matchesSearch && matchesStock && matchesSentiment && matchesDate
    })

    // Debug logging
    console.log('Raw posts:', posts.length)
    console.log('Filtered posts:', filteredPosts.length)
    console.log('Current filters:', {
        searchTerm,
        selectedStock,
        selectedSentiment,
        selectedDate,
        sortBy
    })
    if (posts.length > 0) {
        console.log('Sample post structure:', posts[0])
    }

    // Sort posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            case 'most-viewed':
                return (b.postViews || 0) - (a.postViews || 0)
            case 'most-liked':
                return (b.likes || 0) - (a.likes || 0)
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
    }, [searchTerm, selectedStock, selectedSentiment, selectedDate, sortBy])     // Check if filters are active
    const hasActiveFilters = Boolean(searchTerm || selectedStock !== 'all' || selectedSentiment !== 'all' || selectedDate || sortBy !== 'newest')

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchTerm("")
        setSelectedStock("all")
        setSelectedSentiment("all")
        setSelectedDate("")
        setSortBy("newest")
        setCurrentPage(1)
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
        sortBy,
        setSortBy,
        showFilters,
        setShowFilters,

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
        getPostDates,
        formatDateForInput,
        handleDateSelect,

        // Helpers
        hasActiveFilters,
        clearFilters
    }
}
