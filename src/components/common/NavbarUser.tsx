import { Button } from '@/components/ui/button'
import { Activity, ArrowUpRight, BarChart3, MessageSquare, PlayCircle, Plus, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function NavbarUser() {
     const [currentTime, setCurrentTime] = useState(new Date())

     // const location = useLocation()

     // const tailwindClass = {
     //      unselected: "w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700",
     //      selected: "w-full justify-start bg-red-50 text-red-700 hover:bg-red-100"
     // }

     useEffect(() => {
          const timer = setInterval(() => setCurrentTime(new Date()), 1000)
          return () => clearInterval(timer)
     }, [])

     return (
          <div className="fixed top-0 left-0 w-80 h-full bg-white/80 backdrop-blur-xl border-r border-red-100/50 flex flex-col shadow-xl">
               {/* Animated Header */}
               <div className="p-6 border-b border-red-100/50 bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <div className="flex items-center space-x-3 mb-4">
                         <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                              <BarChart3 className="w-7 h-7 text-white" />
                         </div>
                         <div>
                              <h1 className="text-2xl font-bold">StockGPT</h1>
                              <p className="text-red-100 text-sm">AI-Powered Analysis</p>
                         </div>
                    </div>
                    <div className="text-xs text-red-100 mb-2">Live Market Time</div>
                    <div className="text-sm font-mono">{currentTime.toLocaleTimeString()}</div>
               </div>

               {/* Enhanced Navigation */}
               <div className="p-4 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                         <Plus className="w-4 h-4 mr-2" />
                         New Analysis
                         <Sparkles className="w-4 h-4 ml-auto" />
                    </Button>

                    <div className="space-y-2">
                         <Link to='/chat'>
                              <Button
                                   variant="default"
                                   className="w-full justify-start bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                              >
                                   <MessageSquare className="w-4 h-4 mr-3" />
                                   AI Chat
                              </Button>
                         </Link>

                         <Button variant="default" className="justify-start w-full justify-start bg-red-50 text-red-700 hover:bg-red-100">
                              <PlayCircle className="w-4 h-4 mr-3" />
                              Videos & Podcasts
                         </Button>

                         <Link to='/blog'>
                              <Button
                                   variant="ghost"
                                   className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700 group"
                              >
                                   <BarChart3 className="w-4 h-4 mr-3 group-hover:animate-bounce" />
                                   Market Overview
                                   <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Button>
                         </Link>
                         <Link to='/podcast'>
                              <Button
                                   variant="ghost"
                                   className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700 group"
                              >
                                   <Activity className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                                   Podcast
                                   <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Button>
                         </Link>
                    </div>
               </div>
          </div>
     )
}
