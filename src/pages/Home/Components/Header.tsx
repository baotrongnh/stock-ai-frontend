import { Button } from "@/components/ui/button"
import { Brain, Sparkles, ArrowRight, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useState } from "react"

export function Header() {
     const location = useLocation()
     const pathname = location.pathname
     const [isMenuOpen, setIsMenuOpen] = useState(false)

     const navigation = [
          { name: "Features", href: "/features" },
          { name: "Solutions", href: "/solutions" },
          { name: "Pricing", href: "/pricing" },
          { name: "Resources", href: "/resources" },
          { name: "Contact", href: "/contact" },
     ]

     return (
          <header className="border-b bg-white/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
               <div className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                         <Link to="/" className="flex items-center space-x-3">
                              <div className="relative">
                                   <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Brain className="w-7 h-7 text-white" />
                                   </div>
                                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-2 h-2 text-white" />
                                   </div>
                              </div>
                              <div>
                                   <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-rose-800 bg-clip-text text-transparent">
                                        Stock AI
                                   </span>
                                   <div className="text-xs text-gray-500 font-medium">Powered by AI</div>
                              </div>
                         </Link>

                         {/* Desktop Navigation */}
                         <div className="hidden lg:flex items-center space-x-8">
                              {navigation.map((item) => (
                                   <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`transition-all duration-300 font-medium ${pathname === item.href
                                             ? "text-red-600 border-b-2 border-red-600 pb-1"
                                             : "text-gray-600 hover:text-red-600"
                                             }`}
                                   >
                                        {item.name}
                                   </Link>
                              ))}
                         </div>

                         {/* Desktop Actions */}
                         <div className="hidden lg:flex items-center space-x-4">
                              <Link to="/login">
                                   <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium">
                                        Sign In
                                   </Button>
                              </Link>
                              <Link to="/register">
                                   <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                                        Start Free Trial
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                   </Button>
                              </Link>
                         </div>

                         {/* Mobile Menu Button */}
                         <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </button>
                    </nav>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                         <div className="lg:hidden mt-4 pb-4 border-t">
                              <div className="flex flex-col space-y-4 pt-4">
                                   {navigation.map((item) => (
                                        <Link
                                             key={item.name}
                                             to={item.href}
                                             className={`transition-all duration-300 font-medium ${pathname === item.href ? "text-red-600" : "text-gray-600 hover:text-red-600"
                                                  }`}
                                             onClick={() => setIsMenuOpen(false)}
                                        >
                                             {item.name}
                                        </Link>
                                   ))}
                                   <div className="flex flex-col space-y-2 pt-4">
                                        <Button
                                             variant="ghost"
                                             className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium justify-start"
                                        >
                                             Sign In
                                        </Button>
                                        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium justify-start">
                                             Start Free Trial
                                             <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </header>
     )
}
