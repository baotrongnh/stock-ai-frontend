import { ActiveFilters, CreatePostModal, FilterBar, FilterPanel, PaginationControls, PostGrid } from "./components"
import { useBlogFilters } from "./hooks/useBlogFilters"
// PostServices import removed as it's no longer needed

export default function BlogPage() {
     const {
          posts,
          // allPosts,
          // setPosts removed as it's no longer needed
          stocks,
          loading,
          error,
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
          availableStocks,
          availableSentiments,
          availableLevels,
          availableSessions,
          availableDates,
          currentPage,
          setCurrentPage,
          totalPages,
          postsPerPage,
          totalPosts,
          refreshPosts,
          showDatePicker,
          setShowDatePicker,
          currentMonth,
          setCurrentMonth,
          getCalendarDays,
          formatDateForInput,
          handleDateSelect,
          handleSessionChange,
          sessionWarning,
          hasActiveFilters,
          clearFilters
     } = useBlogFilters()

     // userId variable removed as it's no longer needed

     if (error) {
          return (
               <div className="flex h-screen bg-gradient-to-br from-red-50 via-rose-50/30 to-pink-50/20 items-center justify-center">
                    <div className="text-center">
                         <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                         <p className="text-gray-600">{error}</p>
                    </div>
               </div>
          )
     }

     return (
          <div className="min-h-screen bg-gray-50">
               {/* Header */}
               <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex items-center justify-between h-16">
                              <div className="flex items-center space-x-3">
                                   <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                             </svg>
                                        </div>
                                   </div>
                                   <div>
                                        <h1 className="text-xl font-semibold text-gray-900">Market Insights</h1>
                                        <p className="text-sm text-gray-500">Expert analysis and market insights</p>
                                   </div>
                              </div>
                              <CreatePostModal onPostCreated={refreshPosts} />
                         </div>
                    </div>
               </header>

               {/* Main Content */}
               <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Featured Posts Carousel */}
                    {/* <FeaturedPostsCarousel posts={allPosts} /> */}

                    {/* Filter Controls */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
                         <div className="p-6">
                              <div className="space-y-4">
                                   <FilterBar
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        showFilters={showFilters}
                                        setShowFilters={setShowFilters}
                                        hasActiveFilters={hasActiveFilters}
                                        clearFilters={clearFilters}
                                   />

                                   {showFilters && (
                                        <FilterPanel
                                             availableStocks={availableStocks}
                                             availableSentiments={availableSentiments}
                                             availableLevels={availableLevels}
                                             availableSessions={availableSessions}
                                             availableDates={availableDates}
                                             selectedStock={selectedStock}
                                             setSelectedStock={setSelectedStock}
                                             selectedSentiment={selectedSentiment}
                                             setSelectedSentiment={setSelectedSentiment}
                                             selectedDate={selectedDate}
                                             setSelectedDate={setSelectedDate}
                                             selectedSession={selectedSession}
                                             selectedLevel={selectedLevel}
                                             setSelectedLevel={setSelectedLevel}
                                             sortBy={sortBy}
                                             setSortBy={setSortBy}
                                             showDatePicker={showDatePicker}
                                             setShowDatePicker={setShowDatePicker}
                                             currentMonth={currentMonth}
                                             setCurrentMonth={setCurrentMonth}
                                             getCalendarDays={getCalendarDays}
                                             formatDateForInput={formatDateForInput}
                                             handleDateSelect={handleDateSelect}
                                             handleSessionChange={handleSessionChange}
                                             sessionWarning={sessionWarning}
                                        />
                                   )}

                                   <ActiveFilters
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        selectedStock={selectedStock}
                                        setSelectedStock={setSelectedStock}
                                        selectedSentiment={selectedSentiment}
                                        setSelectedSentiment={setSelectedSentiment}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        selectedSession={selectedSession}
                                        setSelectedSession={setSelectedSession}
                                        selectedLevel={selectedLevel}
                                        setSelectedLevel={setSelectedLevel}
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        stocks={stocks}
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                         {loading ? (
                              <div className="text-center py-16">
                                   <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 transition ease-in-out duration-150">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading posts...
                                   </div>
                              </div>
                         ) : (
                              <>
                                   {totalPosts > 0 && (
                                        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
                                             <div className="text-sm text-gray-600">
                                                  Showing <span className="font-medium text-gray-900">{posts.length}</span> of <span className="font-medium text-gray-900">{totalPosts}</span> posts
                                             </div>
                                        </div>
                                   )}

                                   <PostGrid posts={posts} searchTerm={searchTerm} />

                                   <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                        totalPosts={totalPosts}
                                        postsPerPage={postsPerPage}
                                   />
                              </>
                         )}
                    </div>
               </main>
          </div>
     )
}