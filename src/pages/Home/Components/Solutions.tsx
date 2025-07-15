import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
     Users,
     Building2,
     Target,
     Briefcase,
     CheckCircle,
     ArrowRight,
     TrendingUp,
     Shield,
     Zap,
     Award,
} from "lucide-react"

export default function SolutionsPage() {
     return (
          <div className="min-h-screen bg-white">
               {/* Hero Section */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <Target className="w-4 h-4 mr-2" />
                                   Tailored Solutions
                              </Badge>

                              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                   <span className="text-gray-900">Solutions for Every</span>
                                   <br />
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        Investment Journey
                                   </span>
                              </h1>

                              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                   From individual investors to large institutions, our AI-powered platform scales to meet your specific
                                   needs and investment objectives.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Solutions Grid */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                              {/* Individual Investors */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-red-50 overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-12 relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                             <Users className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Individual Investors</h2>
                                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                             Empower your personal investment journey with AI-driven insights, automated portfolio management, and
                                             educational resources designed for retail investors.
                                        </p>

                                        <div className="space-y-4 mb-8">
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Personal Portfolio Optimization</h4>
                                                       <p className="text-gray-600">
                                                            AI-powered asset allocation based on your risk tolerance and goals
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Educational Resources</h4>
                                                       <p className="text-gray-600">
                                                            Learn investing fundamentals with interactive tutorials and guides
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Mobile-First Experience</h4>
                                                       <p className="text-gray-600">Trade and monitor your investments on-the-go with our mobile app</p>
                                                  </div>
                                             </div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg py-3">
                                             Start Personal Account
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>

                              {/* Financial Institutions */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-12 relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                             <Building2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Institutions</h2>
                                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                             Enterprise-grade solutions for banks, brokerages, and financial services companies looking to enhance
                                             their investment offerings with AI technology.
                                        </p>

                                        <div className="space-y-4 mb-8">
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">White-Label Solutions</h4>
                                                       <p className="text-gray-600">
                                                            Customize our platform with your branding and specific requirements
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">API Integration</h4>
                                                       <p className="text-gray-600">
                                                            Seamlessly integrate our AI capabilities into your existing systems
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Compliance & Security</h4>
                                                       <p className="text-gray-600">Enterprise-grade security with full regulatory compliance support</p>
                                                  </div>
                                             </div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-3">
                                             Contact Enterprise Sales
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                              {/* Asset Managers */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-12 relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Asset Managers</h2>
                                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                             Professional tools for fund managers, wealth advisors, and institutional investors managing large
                                             portfolios and multiple client accounts.
                                        </p>

                                        <div className="space-y-4 mb-8">
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Multi-Portfolio Management</h4>
                                                       <p className="text-gray-600">
                                                            Manage hundreds of portfolios with automated rebalancing and optimization
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Performance Attribution</h4>
                                                       <p className="text-gray-600">Detailed analysis of portfolio performance and risk attribution</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Client Reporting</h4>
                                                       <p className="text-gray-600">Automated, customizable reports for your clients and stakeholders</p>
                                                  </div>
                                             </div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-3">
                                             Request Demo
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>

                              {/* Corporations */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-purple-50 overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                   <CardContent className="p-12 relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                             <Briefcase className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Corporations</h2>
                                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                             Corporate treasury solutions for managing company investments, pension funds, and strategic financial
                                             planning with AI-driven insights.
                                        </p>

                                        <div className="space-y-4 mb-8">
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Treasury Management</h4>
                                                       <p className="text-gray-600">Optimize cash management and corporate investment strategies</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">ESG Analytics</h4>
                                                       <p className="text-gray-600">
                                                            Environmental, social, and governance investment analysis and reporting
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex items-start space-x-4">
                                                  <CheckCircle className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                                                  <div>
                                                       <h4 className="font-semibold text-gray-900">Strategic Planning</h4>
                                                       <p className="text-gray-600">
                                                            Long-term financial planning with scenario analysis and stress testing
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-lg py-3">
                                             Schedule Consultation
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* Benefits Section */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Solutions?</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Our platform delivers measurable results across all user segments
                              </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
                                   <div className="text-gray-600">Average Return Improvement</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Shield className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
                                   <div className="text-gray-600">Risk Reduction</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Zap className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">90%</div>
                                   <div className="text-gray-600">Time Savings</div>
                              </div>

                              <div className="text-center">
                                   <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Award className="w-8 h-8 text-white" />
                                   </div>
                                   <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                                   <div className="text-gray-600">Client Satisfaction</div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                         <h2 className="text-4xl font-bold mb-6">Ready to transform your investment approach?</h2>
                         <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                              Choose the solution that fits your needs and start experiencing the power of AI-driven investing today.
                         </p>
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                                   Start Free Trial
                                   <ArrowRight className="w-5 h-5 ml-2" />
                              </Button>
                              <Button
                                   size="lg"
                                   variant="outline"
                                   className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold bg-transparent"
                              >
                                   Contact Sales
                              </Button>
                         </div>
                    </div>
               </section>
          </div>
     )
}
