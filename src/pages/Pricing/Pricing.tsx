import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"
import {
     ArrowRight,
     CheckCircle,
     Star,
     Users,
     Building2,
     Briefcase,
     Zap
} from "lucide-react"

export default function Pricing() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
               <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-6 px-4 py-2">
                                   <Star className="w-4 h-4 mr-2" />
                                   Simple, Transparent Pricing
                              </Badge>
                              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                   Choose the perfect plan for
                                   <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        {" "}your investment needs
                                   </span>
                              </h1>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Start free and scale as you grow. All plans include our core AI features with no hidden fees.
                              </p>
                         </div>

                         {/* Pricing Cards */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                              {/* Starter Plan */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-gray-50 relative">
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                  <Users className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                                             <p className="text-gray-600 mb-6">Perfect for individual investors</p>
                                             <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
                                             <div className="text-gray-600">Forever</div>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Basic portfolio tracking</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">5 AI analysis per month</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Basic market alerts</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Educational resources</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Email support</span>
                                             </li>
                                        </ul>

                                        <Link to="/register">
                                             <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white">
                                                  Get Started Free
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>

                              {/* Pro Plan - Featured */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-purple-50 relative ring-4 ring-purple-600">
                                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold">
                                             <Zap className="w-4 h-4 mr-1" />
                                             Most Popular
                                        </Badge>
                                   </div>
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                  <Building2 className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                                             <p className="text-gray-600 mb-6">For serious investors and advisors</p>
                                             <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
                                             <div className="text-gray-600">per month</div>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Everything in Starter</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Unlimited AI analysis</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Advanced portfolio optimization</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Real-time market data</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Risk management tools</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Priority support</span>
                                             </li>
                                        </ul>

                                        <Link to="/register">
                                             <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                                                  Start 14-Day Free Trial
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>

                              {/* Enterprise Plan */}
                              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-orange-50 relative">
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                  <Briefcase className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                             <p className="text-gray-600 mb-6">For institutions and large teams</p>
                                             <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
                                             <div className="text-gray-600">Contact us</div>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Everything in Pro</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">White-label solutions</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">API access & integrations</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Custom reporting</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">Dedicated account manager</span>
                                             </li>
                                             <li className="flex items-start space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                  <span className="text-gray-600">24/7 phone support</span>
                                             </li>
                                        </ul>

                                        <Link to="/contact">
                                             <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white">
                                                  Contact Sales
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </Link>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* FAQ Section */}
                         <div className="mt-20 max-w-4xl mx-auto">
                              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                   Frequently Asked Questions
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                                        <p className="text-gray-600">Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.</p>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                                        <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                                        <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer discounts?</h3>
                                        <p className="text-gray-600">Yes, we offer annual billing discounts and special rates for educational institutions and non-profits.</p>
                                   </div>
                              </div>
                         </div>

                         {/* CTA Section */}
                         <div className="text-center mt-20">
                              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                   Ready to get started?
                              </h2>
                              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Join thousands of investors who trust Stock AI to make smarter investment decisions.
                              </p>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                   <Link to="/register">
                                        <Button
                                             size="lg"
                                             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
                                        >
                                             Start Free Trial
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </Link>
                                   <Link to="/contact">
                                        <Button
                                             size="lg"
                                             variant="outline"
                                             className="border-2 border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 px-8 py-3 text-lg font-semibold"
                                        >
                                             Talk to Sales
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     )
}
