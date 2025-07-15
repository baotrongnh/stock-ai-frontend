import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
     BookOpen,
     Video,
     FileText,
     Download,
     ArrowRight,
     Clock,
     User,
     TrendingUp,
     Brain,
     Shield,
     BarChart3,
} from "lucide-react"

export default function ResourcesPage() {
     return (
          <div className="min-h-screen bg-white">
               {/* Hero Section */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <BookOpen className="w-4 h-4 mr-2" />
                                   Learning Resources
                              </Badge>

                              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                   <span className="text-gray-900">Master AI-Powered</span>
                                   <br />
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Investing</span>
                              </h1>

                              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                   Comprehensive guides, tutorials, and insights to help you maximize your investment potential with Stock
                                   AI.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Featured Resources */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Resources</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Start with these essential guides to get the most out of Stock AI
                              </p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-red-50 overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                  <Brain className="w-8 h-8 text-white" />
                                             </div>
                                             <div>
                                                  <Badge className="bg-red-100 text-red-700 mb-2">Getting Started</Badge>
                                                  <h3 className="text-2xl font-bold text-gray-900">Complete Beginner's Guide to AI Investing</h3>
                                             </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Learn the fundamentals of AI-powered investing, from basic concepts to advanced strategies. Perfect
                                             for investors new to algorithmic trading and AI analysis.
                                        </p>
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                  <div className="flex items-center space-x-1">
                                                       <Clock className="w-4 h-4" />
                                                       <span>45 min read</span>
                                                  </div>
                                                  <div className="flex items-center space-x-1">
                                                       <User className="w-4 h-4" />
                                                       <span>Beginner</span>
                                                  </div>
                                             </div>
                                             <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                                                  Read Guide
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                  <Video className="w-8 h-8 text-white" />
                                             </div>
                                             <div>
                                                  <Badge className="bg-blue-100 text-blue-700 mb-2">Video Tutorial</Badge>
                                                  <h3 className="text-2xl font-bold text-gray-900">Setting Up Your First AI Portfolio</h3>
                                             </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Step-by-step video walkthrough showing you how to create, configure, and optimize your first
                                             AI-managed investment portfolio using Stock AI.
                                        </p>
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                  <div className="flex items-center space-x-1">
                                                       <Clock className="w-4 h-4" />
                                                       <span>25 min video</span>
                                                  </div>
                                                  <div className="flex items-center space-x-1">
                                                       <User className="w-4 h-4" />
                                                       <span>Beginner</span>
                                                  </div>
                                             </div>
                                             <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                                  Watch Video
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Resource Categories */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Browse by Category</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Find the resources that match your experience level and interests
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {/* Tutorials */}
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <BookOpen className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Tutorials & Guides</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Step-by-step tutorials covering everything from basic setup to advanced trading strategies.
                                        </p>
                                        <div className="space-y-3 mb-6">
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Getting Started Guide</span>
                                                  <Badge className="bg-green-100 text-green-700">New</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Portfolio Optimization</span>
                                                  <Badge className="bg-blue-100 text-blue-700">Popular</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Risk Management</span>
                                                  <Badge className="bg-gray-100 text-gray-700">Essential</Badge>
                                             </div>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                             Browse Tutorials
                                        </Button>
                                   </CardContent>
                              </Card>

                              {/* Video Library */}
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Video className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Library</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Comprehensive video courses and webinars from investment experts and AI specialists.
                                        </p>
                                        <div className="space-y-3 mb-6">
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">AI Trading Masterclass</span>
                                                  <Badge className="bg-red-100 text-red-700">Premium</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Market Analysis Webinar</span>
                                                  <Badge className="bg-blue-100 text-blue-700">Live</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Platform Walkthrough</span>
                                                  <Badge className="bg-green-100 text-green-700">Free</Badge>
                                             </div>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                                             Watch Videos
                                        </Button>
                                   </CardContent>
                              </Card>

                              {/* Documentation */}
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <FileText className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Documentation</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Technical documentation, API references, and detailed feature explanations.
                                        </p>
                                        <div className="space-y-3 mb-6">
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">API Documentation</span>
                                                  <Badge className="bg-gray-100 text-gray-700">Technical</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Feature Reference</span>
                                                  <Badge className="bg-blue-100 text-blue-700">Updated</Badge>
                                             </div>
                                             <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-700">Integration Guide</span>
                                                  <Badge className="bg-purple-100 text-purple-700">Advanced</Badge>
                                             </div>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                                             View Docs
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Latest Articles */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Stay updated with the latest insights, market analysis, and AI investing trends
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-red-50">
                                   <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                                             <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">How AI is Revolutionizing Market Analysis</h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                             Discover how artificial intelligence is transforming the way we analyze markets and make investment
                                             decisions.
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                             <span>Dec 15, 2024</span>
                                             <span>8 min read</span>
                                        </div>
                                        <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
                                             Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50">
                                   <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                             <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Management in the Age of AI</h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                             Learn advanced risk management techniques that leverage AI to protect and grow your investment
                                             portfolio.
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                             <span>Dec 12, 2024</span>
                                             <span>12 min read</span>
                                        </div>
                                        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                                             Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50">
                                   <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                                             <BarChart3 className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Building Your First AI-Powered Portfolio</h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                             A comprehensive guide to creating and managing your first AI-optimized investment portfolio.
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                             <span>Dec 10, 2024</span>
                                             <span>15 min read</span>
                                        </div>
                                        <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                                             Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Downloads Section */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Downloads & Tools</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Free resources, templates, and tools to enhance your investment strategy
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                                   <CardContent className="p-8">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                                  <Download className="w-7 h-7 text-white" />
                                             </div>
                                             <div>
                                                  <h3 className="text-xl font-bold text-gray-900">Investment Strategy Template</h3>
                                                  <p className="text-gray-600">Excel template for planning your AI investment strategy</p>
                                             </div>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                                             Download Template
                                             <Download className="w-4 h-4 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                                   <CardContent className="p-8">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                  <Download className="w-7 h-7 text-white" />
                                             </div>
                                             <div>
                                                  <h3 className="text-xl font-bold text-gray-900">Risk Assessment Calculator</h3>
                                                  <p className="text-gray-600">Tool to evaluate your risk tolerance and capacity</p>
                                             </div>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                             Download Calculator
                                             <Download className="w-4 h-4 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                         <h2 className="text-4xl font-bold mb-6">Ready to put your knowledge into action?</h2>
                         <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                              Start applying what you've learned with Stock AI's powerful investment platform.
                         </p>
                         <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                              Start Free Trial
                              <ArrowRight className="w-5 h-5 ml-2" />
                         </Button>
                    </div>
               </section>
          </div>
     )
}
