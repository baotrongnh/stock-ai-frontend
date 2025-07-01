import { Button } from '@/components/ui/button'
import {
     Activity,
     ArrowUpRight,
     BarChart3,
     MessageSquare,
     PlayCircle,
     Plus,
     Sparkles
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

export default function NavbarUser() {
     const [currentTime, setCurrentTime] = useState(new Date())
     const navigate = useNavigate()
     const location = useLocation()

     const userId = localStorage.getItem('userId')

     useEffect(() => {
          const timer = setInterval(() => setCurrentTime(new Date()), 1000)
          return () => clearInterval(timer)
     }, [])

     // Helper to check if route is active
     const isActive = (path: string) => location.pathname === path

     return (
          <div className="fixed top-0 left-0 w-80 h-full bg-white/80 backdrop-blur-xl border-r border-red-100/50 flex flex-col shadow-xl">
               {/* Header */}
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

               {/* Navigation */}
               <div className="p-4 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                         <Plus className="w-4 h-4 mr-2" />
                         New Analysis
                         <Sparkles className="w-4 h-4 ml-auto" />
                    </Button>

                    <div className="space-y-2">
                         <Link to="/chat">
                              <Button
                                   variant="ghost"
                                   className={`w-full justify-start group ${isActive('/chat')
                                        ? 'text-red-700 bg-red-50'
                                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                        }`}
                              >
                                   <MessageSquare className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                                   AI Chat
                                   <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Button>
                         </Link>

                         <Link to="/blog">
                              <Button
                                   variant="ghost"
                                   className={`w-full justify-start group ${isActive('/blog')
                                        ? 'text-red-700 bg-red-50'
                                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                        }`}
                              >
                                   <BarChart3 className="w-4 h-4 mr-3 group-hover:animate-bounce" />
                                   Market Overview
                                   <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Button>
                         </Link>

                         <Link to="/podcast">
                              <Button
                                   variant="ghost"
                                   className={`w-full justify-start group ${isActive('/podcast')
                                        ? 'text-red-700 bg-red-50'
                                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                        }`}
                              >
                                   <Activity className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                                   Podcast
                                   <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Button>
                         </Link>
                         {userId ?
                              <Link to="/profile">
                                   <Button
                                        variant="ghost"
                                        className={`w-full justify-start group ${isActive('/profile')
                                             ? 'text-red-700 bg-red-50'
                                             : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                             }`}
                                   >
                                        <MessageSquare className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                                        Profile
                                        <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                   </Button>
                              </Link>
                              :
                              <></>
                         }
                    </div>
               </div>

               {/* Sign Out or In */}
               <div className="mt-auto p-4">
                    {userId ? (
                         <Button
                              onClick={() => {
                                   localStorage.removeItem('userId')
                                   navigate('/')
                              }}
                              className="w-full bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer"
                         >
                              Logout
                         </Button>
                    ) : (
                         <Link to="/login">
                              <Button className="w-full bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer">
                                   Sign In
                              </Button>
                         </Link>
                    )}
               </div>
          </div>
     )
}
