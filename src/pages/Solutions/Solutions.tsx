import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import {
     ArrowRight,
     Building2,
     CheckCircle,
     Users,
     Target,
     Briefcase
} from "lucide-react"

export default function Solutions() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
               <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6 px-4 py-2">
                                   <Users className="w-4 h-4 mr-2" />
                                   Solutions for Everyone
                              </Badge>
                              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                   Tailored solutions for your
                                   <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {" "}investment journey
                                   </span>
                              </h1>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Whether you're an individual investor or managing institutional assets, our platform scales to meet your specific needs.
                              </p>
                         </div>

                         {/* Solutions Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-red-50 relative overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Individual Investors</h3>
                                        <p className="text-gray-600 mb-6 text-lg">
                                             Perfect for personal portfolio management and wealth building.
                                        </p>
                                        <ul className="space-y-4 text-gray-600 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Personal portfolio optimization with AI-driven insights</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Automated risk assessment and rebalancing</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Educational resources and market tutorials</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Mobile-first experience for trading on the go</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                  <span>Real-time alerts and notifications</span>
                                             </li>
                                        </ul>
                                        <Link to="/register">
                                             <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                                                  Get Started Free
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Building2 className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Financial Institutions</h3>
                                        <p className="text-gray-600 mb-6 text-lg">
                                             Enterprise solutions for banks, credit unions, and financial advisors.
                                        </p>
                                        <ul className="space-y-4 text-gray-600 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>Enterprise-grade security and compliance</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>RESTful API integration with existing systems</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>Custom reporting and analytics dashboard</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>White-label solutions with your branding</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                  <span>24/7 dedicated support and account management</span>
                                             </li>
                                        </ul>
                                        <Link to="/contact">
                                             <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                                  Contact Sales
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Asset Managers</h3>
                                        <p className="text-gray-600 mb-6 text-lg">
                                             Professional tools for fund managers and wealth management firms.
                                        </p>
                                        <ul className="space-y-4 text-gray-600 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Multi-portfolio management and optimization</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Advanced performance attribution analysis</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Regulatory compliance monitoring and reporting</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Client reporting and communication tools</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>Risk management and stress testing</span>
                                             </li>
                                        </ul>
                                        <Link to="/contact">
                                             <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                                  Schedule Demo
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
                                   <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Briefcase className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Corporations</h3>
                                        <p className="text-gray-600 mb-6 text-lg">
                                             Treasury management and strategic investment solutions for businesses.
                                        </p>
                                        <ul className="space-y-4 text-gray-600 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Corporate treasury management and cash optimization</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Market intelligence and economic forecasting</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>ESG analytics and sustainable investing</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Strategic planning and financial modeling</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span>Integration with ERP and accounting systems</span>
                                             </li>
                                        </ul>
                                        <Link to="/contact">
                                             <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                                                  Get Quote
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* CTA Section */}
                         <div className="text-center mt-20">
                              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                   Not sure which solution is right for you?
                              </h2>
                              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Our team of experts can help you choose the perfect plan based on your specific needs and goals.
                              </p>
                              <Link to="/contact">
                                   <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold"
                                   >
                                        Talk to an Expert
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                   </Button>
                              </Link>
                         </div>
                    </div>
               </section>
          </div>
     )
}
