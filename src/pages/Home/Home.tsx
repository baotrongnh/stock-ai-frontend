import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import {
     ArrowRight,
     Award,
     BarChart3,
     Brain,
     Briefcase,
     Building2,
     CheckCircle,
     ChevronRight,
     Clock,
     Globe,
     LineChart,
     Play,
     Shield,
     Sparkles,
     Star,
     Target,
     TrendingUp,
     Users,
     Zap,
} from "lucide-react"

export default function StockAILanding() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
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

                              <div className="hidden lg:flex items-center space-x-8">
                                   <Link to="/features" className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium">
                                        Features
                                   </Link>
                                   <Link to="/solutions" className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium">
                                        Solutions
                                   </Link>
                                   <Link to="/pricing" className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium">
                                        Pricing
                                   </Link>
                                   <Link to="/resources" className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium">
                                        Resources
                                   </Link>
                                   <Link to="/contact" className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium">
                                        Contact
                                   </Link>
                              </div>

                              <div className="flex items-center space-x-4">
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
                         </nav>
                    </div>
               </header>

               {/* Hero Section */}
               <section className="relative py-24 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-rose-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/30 to-rose-300/30 rounded-full blur-3xl"></div>
                         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-red-300/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200 mb-8 px-4 py-2 text-sm font-medium">
                                   <Zap className="w-4 h-4 mr-2" />
                                   AI-Powered Investment Intelligence
                              </Badge>

                              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                                   <span className="block text-gray-900 mb-2">Unlock the Power of</span>
                                   <span className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 bg-clip-text text-transparent">
                                        Smart Investing
                                   </span>
                              </h1>

                              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                                   Transform complex market data into intelligent investment decisions with our cutting-edge AI platform.
                                   Make smarter trades, faster analysis, and better returns.
                              </p>

                              <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                                   <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-gray-700 font-medium">90% Faster Analysis</span>
                                   </div>
                                   <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-gray-700 font-medium">Real-time Insights</span>
                                   </div>
                                   <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                        <span className="text-gray-700 font-medium">Risk-Optimized</span>
                                   </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                                   <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
                                   >
                                        Start Free Trial
                                        <ArrowRight className="w-5 h-5 ml-3" />
                                   </Button>
                                   <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
                                   >
                                        <Play className="w-5 h-5 mr-3" />
                                        Watch Demo
                                   </Button>
                              </div>
                         </div>

                         {/* Dashboard Preview */}
                         <div className="relative max-w-7xl mx-auto">
                              <div className="relative">
                                   {/* Floating Elements */}
                                   <div className="absolute -top-8 -left-8 z-20">
                                        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                                            <TrendingUp className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <div className="text-2xl font-bold text-gray-900">+24.7%</div>
                                                            <div className="text-sm text-gray-600">Portfolio Growth</div>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>

                                   <div className="absolute -top-4 -right-12 z-20">
                                        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                                            <Zap className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <div className="text-2xl font-bold text-gray-900">0.3s</div>
                                                            <div className="text-sm text-gray-600">Analysis Time</div>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>

                                   {/* Main Dashboard */}
                                   <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl">
                                        <div className="bg-white rounded-2xl overflow-hidden">
                                             <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
                                                  <div className="flex items-center space-x-3">
                                                       <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                                       <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                                       <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                                  </div>
                                                  <div className="flex-1 bg-white rounded-lg mx-6 px-4 py-2 text-sm text-gray-600 text-center">
                                                       stockai.com/dashboard
                                                  </div>
                                                  <div className="text-sm text-gray-500">Live</div>
                                             </div>

                                             <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                                                  <div className="text-center mb-8">
                                                       <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                            <Brain className="w-10 h-10 text-white" />
                                                       </div>
                                                       <h3 className="text-3xl font-bold text-gray-900 mb-3">Stock AI Intelligence Dashboard</h3>
                                                       <p className="text-gray-600 text-lg">
                                                            Ask me anything about market analysis, portfolio optimization, or investment strategies.
                                                       </p>
                                                  </div>

                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                       <Card className="border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-red-50">
                                                            <CardContent className="p-6">
                                                                 <div className="flex items-center space-x-4 mb-4">
                                                                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                                                           <LineChart className="w-6 h-6 text-white" />
                                                                      </div>
                                                                      <div>
                                                                           <div className="font-bold text-gray-900">Technical Analysis: AAPL</div>
                                                                           <div className="text-sm text-gray-600">Real-time insights</div>
                                                                      </div>
                                                                 </div>
                                                                 <p className="text-gray-700">
                                                                      Strong bullish momentum detected with RSI at 65. Recommend entry at $175 with stop-loss at
                                                                      $170...
                                                                 </p>
                                                                 <div className="mt-4 flex items-center space-x-2">
                                                                      <Badge className="bg-green-100 text-green-700">Buy Signal</Badge>
                                                                      <Badge className="bg-blue-100 text-blue-700">High Confidence</Badge>
                                                                 </div>
                                                            </CardContent>
                                                       </Card>

                                                       <Card className="border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50">
                                                            <CardContent className="p-6">
                                                                 <div className="flex items-center space-x-4 mb-4">
                                                                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                                           <Target className="w-6 h-6 text-white" />
                                                                      </div>
                                                                      <div>
                                                                           <div className="font-bold text-gray-900">Portfolio Optimization</div>
                                                                           <div className="text-sm text-gray-600">AI-powered rebalancing</div>
                                                                      </div>
                                                                 </div>
                                                                 <p className="text-gray-700">
                                                                      Suggested reallocation: Reduce tech exposure by 5%, increase healthcare by 3% for optimal
                                                                      risk-return...
                                                                 </p>
                                                                 <div className="mt-4 flex items-center space-x-2">
                                                                      <Badge className="bg-purple-100 text-purple-700">Optimization</Badge>
                                                                      <Badge className="bg-orange-100 text-orange-700">Risk Adjusted</Badge>
                                                                 </div>
                                                            </CardContent>
                                                       </Card>
                                                  </div>

                                                  <div className="text-center">
                                                       <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold">
                                                            Analyze My Portfolio
                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                       </Button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Features Section */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-6 px-4 py-2">
                                   <Star className="w-4 h-4 mr-2" />
                                   Powerful Features
                              </Badge>
                              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                   Everything you need to
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        {" "}
                                        dominate markets
                                   </span>
                              </h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Our AI-powered platform combines cutting-edge technology with institutional-grade analytics to give you
                                   the competitive edge you need.
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-red-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Brain className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Advanced machine learning algorithms analyze thousands of data points in real-time to provide
                                             actionable investment insights.
                                        </p>
                                        <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-blue-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Clock className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Stay ahead of market movements with instant alerts and real-time portfolio tracking across all major
                                             exchanges.
                                        </p>
                                        <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-green-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Management</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Sophisticated risk assessment tools help you optimize your portfolio while maintaining your desired
                                             risk tolerance.
                                        </p>
                                        <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <BarChart3 className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Deep dive into market trends with comprehensive technical and fundamental analysis tools powered by
                                             AI.
                                        </p>
                                        <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-orange-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Get personalized investment recommendations based on your goals, risk profile, and market conditions.
                                        </p>
                                        <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-teal-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Globe className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Markets</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Access comprehensive data and analysis for stocks, bonds, commodities, and cryptocurrencies across
                                             global markets.
                                        </p>
                                        <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700">
                                             Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Solutions Section */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6 px-4 py-2">
                                   <Users className="w-4 h-4 mr-2" />
                                   Solutions for Everyone
                              </Badge>
                              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                   Tailored for your
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        {" "}
                                        investment journey
                                   </span>
                              </h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Whether you're an individual investor or managing institutional assets, our platform scales to meet your
                                   specific needs.
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-red-50 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-8 relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Investors</h3>
                                        <ul className="space-y-3 text-gray-600 mb-6">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Personal portfolio optimization</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Automated risk assessment</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Educational resources</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Mobile-first experience</span>
                                             </li>
                                        </ul>
                                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                                             Get Started
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-8 relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Building2 className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Institutions</h3>
                                        <ul className="space-y-3 text-gray-600 mb-6">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>Enterprise-grade security</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>API integration</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>Custom reporting</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>White-label solutions</span>
                                             </li>
                                        </ul>
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                             Contact Sales
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-8 relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Asset Managers</h3>
                                        <ul className="space-y-3 text-gray-600 mb-6">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Multi-portfolio management</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Performance attribution</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Compliance monitoring</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Client reporting</span>
                                             </li>
                                        </ul>
                                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                             Learn More
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-8 relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Briefcase className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporations</h3>
                                        <ul className="space-y-3 text-gray-600 mb-6">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Treasury management</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Market intelligence</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>ESG analytics</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Strategic planning</span>
                                             </li>
                                        </ul>
                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                                             Schedule Demo
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Stats Section */}
               <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                         <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                         <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <h2 className="text-5xl font-bold mb-6">Trusted by investors worldwide</h2>
                              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                                   Join thousands of successful investors who have transformed their trading with Stock AI
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <div className="text-center">
                                   <div className="text-5xl font-bold mb-2">$2.5B+</div>
                                   <div className="text-red-100 text-lg">Assets Under Management</div>
                              </div>
                              <div className="text-center">
                                   <div className="text-5xl font-bold mb-2">50K+</div>
                                   <div className="text-red-100 text-lg">Active Users</div>
                              </div>
                              <div className="text-center">
                                   <div className="text-5xl font-bold mb-2">99.9%</div>
                                   <div className="text-red-100 text-lg">Uptime Guarantee</div>
                              </div>
                              <div className="text-center">
                                   <div className="text-5xl font-bold mb-2">24/7</div>
                                   <div className="text-red-100 text-lg">Expert Support</div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6 text-center">
                         <div className="max-w-4xl mx-auto">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <Award className="w-4 h-4 mr-2" />
                                   Start Your Journey Today
                              </Badge>

                              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                   Ready to revolutionize your
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        {" "}
                                        investment strategy?
                                   </span>
                              </h2>

                              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                                   Join thousands of successful investors who trust Stock AI to make smarter, data-driven investment
                                   decisions every day.
                              </p>

                              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                                   <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
                                   >
                                        Start Free Trial
                                        <ArrowRight className="w-6 h-6 ml-3" />
                                   </Button>
                                   <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 bg-transparent"
                                   >
                                        Schedule Demo
                                   </Button>
                              </div>

                              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
                                   <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>No credit card required</span>
                                   </div>
                                   <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>14-day free trial</span>
                                   </div>
                                   <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Cancel anytime</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Footer */}
               <footer className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-6">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                              <div className="col-span-1 md:col-span-2">
                                   <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                                             <Brain className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                             <span className="text-2xl font-bold">Stock AI</span>
                                             <div className="text-sm text-gray-400">Powered by AI</div>
                                        </div>
                                   </div>
                                   <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                        Empowering investors with AI-driven insights and intelligent market analysis for smarter investment
                                        decisions.
                                   </p>
                              </div>

                              <div>
                                   <h4 className="text-lg font-semibold mb-6">Product</h4>
                                   <ul className="space-y-4 text-gray-400">
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Features
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Pricing
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  API
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Security
                                             </a>
                                        </li>
                                   </ul>
                              </div>

                              <div>
                                   <h4 className="text-lg font-semibold mb-6">Company</h4>
                                   <ul className="space-y-4 text-gray-400">
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  About
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Careers
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Contact
                                             </a>
                                        </li>
                                        <li>
                                             <a href="#" className="hover:text-white transition-colors">
                                                  Blog
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </div>

                         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
                              <div className="text-gray-400 mb-4 md:mb-0">© 2024 Stock AI. All rights reserved.</div>
                              <div className="flex items-center space-x-6 text-gray-400">
                                   <a href="#" className="hover:text-white transition-colors">
                                        Privacy Policy
                                   </a>
                                   <a href="#" className="hover:text-white transition-colors">
                                        Terms of Service
                                   </a>
                                   <a href="#" className="hover:text-white transition-colors">
                                        Cookie Policy
                                   </a>
                              </div>
                         </div>
                    </div>
               </footer>
          </div>
     )
}
