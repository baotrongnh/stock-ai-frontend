import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import {
     ArrowRight,
     BarChart3,
     Brain,
     CheckCircle,
     Clock,
     Shield,
     Star,
     Target,
     TrendingUp
} from "lucide-react"

export default function Features() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-6 px-4 py-2">
                                   <Star className="w-4 h-4 mr-2" />
                                   Product Features
                              </Badge>
                              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                   Powerful AI-driven features for
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        {" "}smart investing
                                   </span>
                              </h1>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Discover how our cutting-edge AI technology transforms complex market data into actionable investment insights.
                              </p>
                         </div>

                         {/* Features Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-red-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Brain className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Advanced machine learning algorithms analyze thousands of data points in real-time to provide actionable investment insights.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                                                  Real-time market analysis
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                                                  Pattern recognition
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                                                  Predictive modeling
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-blue-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Clock className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Stay ahead of market movements with instant alerts and real-time portfolio tracking.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                                  Instant price alerts
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                                  Portfolio tracking
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                                  Market news integration
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-green-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Management</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Sophisticated risk assessment tools help optimize your portfolio while maintaining desired risk tolerance.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                  Risk scoring
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                  Diversification analysis
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                  Stop-loss recommendations
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-purple-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <BarChart3 className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Deep dive into market trends with comprehensive technical and fundamental analysis tools.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                                                  Technical indicators
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                                                  Fundamental analysis
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                                                  Market sentiment
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-orange-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Get personalized investment recommendations based on your goals and risk profile.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                                  Personalized suggestions
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                                  Goal-based investing
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                                                  Performance tracking
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-teal-50">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <TrendingUp className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Performance Tracking</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Monitor your investment performance with detailed analytics and benchmarking.
                                        </p>
                                        <ul className="space-y-2 text-gray-600">
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                                                  Performance metrics
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                                                  Benchmark comparison
                                             </li>
                                             <li className="flex items-center">
                                                  <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                                                  Historical analysis
                                             </li>
                                        </ul>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* CTA Section */}
                         <div className="text-center mt-20">
                              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                   Ready to experience these features?
                              </h2>
                              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Start your free trial today and discover how AI can transform your investment strategy.
                              </p>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                   <Link to="/register">
                                        <Button
                                             size="lg"
                                             className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg font-semibold"
                                        >
                                             Start Free Trial
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </Link>
                                   <Link to="/contact">
                                        <Button
                                             size="lg"
                                             variant="outline"
                                             className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 px-8 py-3 text-lg font-semibold"
                                        >
                                             Contact Sales
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     )
}
