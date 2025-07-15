import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import {
     ArrowRight,
     BookOpen,
     FileText,
     Video,
     Download,
     ExternalLink,
     TrendingUp
} from "lucide-react"

export default function Resources() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
               <section className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-green-100 text-green-700 border-green-200 mb-6 px-4 py-2">
                                   <BookOpen className="w-4 h-4 mr-2" />
                                   Learning Resources
                              </Badge>
                              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                   Master the art of
                                   <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {" "}smart investing
                                   </span>
                              </h1>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Explore our comprehensive library of guides, tutorials, and market insights to become a better investor.
                              </p>
                         </div>

                         {/* Resource Categories */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-blue-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <BookOpen className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Guides</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Comprehensive guides covering everything from basic investing principles to advanced strategies.
                                        </p>
                                        <div className="space-y-3">
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Beginner's Guide to Stock Investing</span>
                                                  <Download className="w-4 h-4 text-blue-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Portfolio Diversification Strategies</span>
                                                  <Download className="w-4 h-4 text-blue-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Risk Management Essentials</span>
                                                  <Download className="w-4 h-4 text-blue-500" />
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Video className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Tutorials</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Step-by-step video tutorials to help you master our platform and improve your investing skills.
                                        </p>
                                        <div className="space-y-3">
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Getting Started with Stock AI</span>
                                                  <ExternalLink className="w-4 h-4 text-purple-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Reading AI Analysis Reports</span>
                                                  <ExternalLink className="w-4 h-4 text-purple-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Portfolio Optimization Tips</span>
                                                  <ExternalLink className="w-4 h-4 text-purple-500" />
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-orange-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <TrendingUp className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Research</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             In-depth market analysis, sector reports, and economic insights from our research team.
                                        </p>
                                        <div className="space-y-3">
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Q4 2024 Market Outlook</span>
                                                  <FileText className="w-4 h-4 text-orange-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">Tech Sector Analysis</span>
                                                  <FileText className="w-4 h-4 text-orange-500" />
                                             </div>
                                             <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                  <span className="text-gray-700">ESG Investment Trends</span>
                                                  <FileText className="w-4 h-4 text-orange-500" />
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* Featured Articles */}
                         <div className="mb-16">
                              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                   Featured Articles
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                                        <CardContent className="p-8">
                                             <Badge className="bg-green-100 text-green-700 mb-4">
                                                  AI Investing
                                             </Badge>
                                             <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                  How AI is Revolutionizing Investment Decisions
                                             </h3>
                                             <p className="text-gray-600 mb-4">
                                                  Discover how artificial intelligence is transforming the way investors analyze markets, assess risks, and make investment decisions in 2024.
                                             </p>
                                             <div className="flex items-center text-gray-500 text-sm mb-4">
                                                  <span>December 15, 2024</span>
                                                  <span className="mx-2">•</span>
                                                  <span>5 min read</span>
                                             </div>
                                             <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                                                  Read Article
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </CardContent>
                                   </Card>

                                   <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                                        <CardContent className="p-8">
                                             <Badge className="bg-blue-100 text-blue-700 mb-4">
                                                  Portfolio Management
                                             </Badge>
                                             <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                  The Ultimate Guide to Portfolio Rebalancing
                                             </h3>
                                             <p className="text-gray-600 mb-4">
                                                  Learn when and how to rebalance your investment portfolio to maintain optimal asset allocation and maximize returns.
                                             </p>
                                             <div className="flex items-center text-gray-500 text-sm mb-4">
                                                  <span>December 10, 2024</span>
                                                  <span className="mx-2">•</span>
                                                  <span>8 min read</span>
                                             </div>
                                             <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                                  Read Article
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </CardContent>
                                   </Card>

                                   <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                                        <CardContent className="p-8">
                                             <Badge className="bg-purple-100 text-purple-700 mb-4">
                                                  Risk Management
                                             </Badge>
                                             <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                  Understanding Market Volatility and Risk
                                             </h3>
                                             <p className="text-gray-600 mb-4">
                                                  A comprehensive guide to understanding market volatility, measuring risk, and protecting your investments during uncertain times.
                                             </p>
                                             <div className="flex items-center text-gray-500 text-sm mb-4">
                                                  <span>December 5, 2024</span>
                                                  <span className="mx-2">•</span>
                                                  <span>6 min read</span>
                                             </div>
                                             <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                                                  Read Article
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </CardContent>
                                   </Card>

                                   <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                                        <CardContent className="p-8">
                                             <Badge className="bg-orange-100 text-orange-700 mb-4">
                                                  Market Trends
                                             </Badge>
                                             <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                  2025 Investment Trends to Watch
                                             </h3>
                                             <p className="text-gray-600 mb-4">
                                                  Explore the key investment trends and opportunities that are expected to shape the market landscape in 2025.
                                             </p>
                                             <div className="flex items-center text-gray-500 text-sm mb-4">
                                                  <span>December 1, 2024</span>
                                                  <span className="mx-2">•</span>
                                                  <span>7 min read</span>
                                             </div>
                                             <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                                                  Read Article
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </CardContent>
                                   </Card>
                              </div>
                         </div>

                         {/* Newsletter Signup */}
                         <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                              <CardContent className="p-12 text-center">
                                   <h2 className="text-3xl font-bold mb-4">Stay Updated with Market Insights</h2>
                                   <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                                        Get weekly market analysis, investment tips, and exclusive content delivered to your inbox.
                                   </p>
                                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                                        <input
                                             type="email"
                                             placeholder="Enter your email"
                                             className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 whitespace-nowrap">
                                             Subscribe
                                             <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                   </div>
                              </CardContent>
                         </Card>

                         {/* CTA Section */}
                         <div className="text-center mt-20">
                              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                   Ready to put your knowledge to work?
                              </h2>
                              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Start applying what you've learned with our AI-powered investment platform.
                              </p>
                              <Link to="/register">
                                   <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold"
                                   >
                                        Start Investing Now
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                   </Button>
                              </Link>
                         </div>
                    </div>
               </section>
          </div>
     )
}
