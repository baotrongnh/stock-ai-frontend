import { FilterBar, FilterPanel, ActiveFilters, PostGrid, PaginationControls, CreatePostModal } from "./components"
import { useBlogFilters } from "./hooks/useBlogFilters"
// PostServices import removed as it's no longer needed

export default function BlogPage() {
     const {
          posts,
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
               <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20 items-center justify-center">
                    <div className="text-center">
                         <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                         <p className="text-gray-600">{error}</p>
                    </div>
               </div>
          )
     }

     return (
          <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                         <div className="flex justify-between items-center mb-4">
                              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                   📚 Market Insights Blog
                              </h1>
                              <CreatePostModal onPostCreated={refreshPosts} />
                         </div>

                         {/* Filter Controls */}
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

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                         {loading ? (
                              <div className="text-center py-12">
                                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                                   <p className="text-gray-600 mt-4">Loading posts...</p>
                              </div>
                         ) : (
                              <div className="space-y-6">
                                   {totalPosts > 0 && (
                                        <div className="text-sm text-gray-600">
                                             Showing {posts.length} of {totalPosts} posts
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
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}