import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
     Brain,
     Shield,
     Clock,
     BarChart3,
     Target,
     Globe,
     Zap,
     CheckCircle,
     ArrowRight,
     Sparkles,
     Activity,
     Bell,
     Lock,
     Smartphone,
} from "lucide-react"

export default function FeaturesPage() {
     return (
          <div className="min-h-screen bg-white">
               {/* Hero Section */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/30 to-rose-300/30 rounded-full blur-3xl"></div>
                         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-red-300/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <Sparkles className="w-4 h-4 mr-2" />
                                   Powerful AI Features
                              </Badge>

                              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                   <span className="text-gray-900">Advanced Features for</span>
                                   <br />
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        Smart Investing
                                   </span>
                              </h1>

                              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                   Discover the comprehensive suite of AI-powered tools designed to revolutionize your investment strategy
                                   and maximize your returns.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Core Features */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Core AI Capabilities</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Our platform combines cutting-edge artificial intelligence with institutional-grade analytics
                              </p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-red-50 p-8">
                                   <CardContent className="p-0">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                  <Brain className="w-8 h-8 text-white" />
                                             </div>
                                             <div>
                                                  <h3 className="text-2xl font-bold text-gray-900">AI-Powered Analysis</h3>
                                                  <p className="text-gray-600">Advanced machine learning algorithms</p>
                                             </div>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                             Our proprietary AI engine processes millions of data points from global markets, news sentiment,
                                             economic indicators, and technical patterns to provide you with actionable investment insights.
                                        </p>
                                        <ul className="space-y-3">
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500" />
                                                  <span className="text-gray-700">Real-time market sentiment analysis</span>
                                             </li>
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500" />
                                                  <span className="text-gray-700">Pattern recognition and trend prediction</span>
                                             </li>
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500" />
                                                  <span className="text-gray-700">Multi-factor risk assessment</span>
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-blue-50 p-8">
                                   <CardContent className="p-0">
                                        <div className="flex items-center space-x-4 mb-6">
                                             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                  <Clock className="w-8 h-8 text-white" />
                                             </div>
                                             <div>
                                                  <h3 className="text-2xl font-bold text-gray-900">Real-Time Monitoring</h3>
                                                  <p className="text-gray-600">24/7 market surveillance</p>
                                             </div>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                             Never miss a market opportunity with our continuous monitoring system that tracks your portfolio,
                                             watchlists, and market conditions around the clock.
                                        </p>
                                        <ul className="space-y-3">
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500" />
                                                  <span className="text-gray-700">Instant price alerts and notifications</span>
                                             </li>
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500" />
                                                  <span className="text-gray-700">Portfolio performance tracking</span>
                                             </li>
                                             <li className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500" />
                                                  <span className="text-gray-700">Market volatility warnings</span>
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* Feature Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-green-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Shield className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Management</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Advanced risk assessment tools with portfolio optimization and stress testing capabilities.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <BarChart3 className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Comprehensive technical and fundamental analysis with customizable charts and indicators.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-orange-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Personalized investment suggestions based on your goals, risk tolerance, and market conditions.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-teal-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Globe className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Global Markets</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Access to international markets with multi-currency support and regional market insights.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-pink-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Bell className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Alerts</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Intelligent notification system that learns your preferences and sends relevant market updates.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-indigo-50">
                                   <CardContent className="p-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Smartphone className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Trading</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                             Full-featured mobile app with offline capabilities and seamless synchronization across devices.
                                        </p>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Technical Specifications */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Technical Excellence</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Built on enterprise-grade infrastructure with industry-leading security and performance
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">Less than 100ms</div>
                                   <div className="text-gray-600">Response Time</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Lock className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                                   <div className="text-gray-600">Uptime SLA</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Activity className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
                                   <div className="text-gray-600">Data Points/sec</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                                   <div className="text-gray-600">Global Exchanges</div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                         <h2 className="text-4xl font-bold mb-6">Ready to experience the future of investing?</h2>
                         <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                              Join thousands of investors who are already using our AI-powered platform to make smarter investment
                              decisions.
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
