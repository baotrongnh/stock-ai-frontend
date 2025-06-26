import { Button } from '@/components/ui/button'
import { BarChart3, MessageSquare, Plus, Settings, TrendingUp, User } from 'lucide-react'
import { Link } from 'react-router'

export default function NavbarUser() {
     return (
          <>
               <div className="fixed top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                         <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                   <TrendingUp className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                   <h1 className="font-bold text-xl text-gray-900">StockGPT</h1>
                                   <p className="text-sm text-gray-500">AI Stock Analyst</p>
                              </div>
                         </div>

                         <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                              <Plus className="w-4 h-4 mr-2" />
                              New Analysis
                         </Button>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                         <div className="space-y-2">
                              <Link to="/chat">
                                   <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700">
                                        <MessageSquare className="w-4 h-4 mr-3" />
                                        Chat
                                   </Button>
                              </Link>
                              <Link to="/blog">
                                   <Button variant="default" className="w-full justify-start bg-red-50 text-red-700 hover:bg-red-100">
                                        <BarChart3 className="w-4 h-4 mr-3" />
                                        Market Blog
                                   </Button>
                              </Link>
                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700">
                                   <TrendingUp className="w-4 h-4 mr-3" />
                                   Watchlist
                              </Button>
                         </div>
                    </div>



                    <div className="p-4 border-t border-gray-200">
                         <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                   <User className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                   <p className="text-sm font-medium text-gray-900">Investor</p>
                                   <p className="text-xs text-gray-500">Premium Plan</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                   <Settings className="w-4 h-4" />
                              </Button>
                         </div>
                    </div>
               </div>
          </>
     )
}
