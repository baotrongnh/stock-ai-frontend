import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Star, Zap, Building2, X } from "lucide-react"

export default function PricingPage() {
     return (
          <div className="min-h-screen bg-white">
               {/* Hero Section */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <Star className="w-4 h-4 mr-2" />
                                   Simple, Transparent Pricing
                              </Badge>

                              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                   <span className="text-gray-900">Choose Your</span>
                                   <br />
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        Investment Plan
                                   </span>
                              </h1>

                              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                   Start free and scale as you grow. All plans include our core AI features with no hidden fees or long-term
                                   commitments.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Pricing Cards */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                              {/* Starter Plan */}
                              <Card className="border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                  <Zap className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                                             <p className="text-gray-600 mb-6">Perfect for individual investors getting started</p>
                                             <div className="mb-6">
                                                  <span className="text-5xl font-bold text-gray-900">$0</span>
                                                  <span className="text-gray-600 ml-2">/month</span>
                                             </div>
                                             <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white">
                                                  Get Started Free
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </div>

                                        <div className="space-y-4">
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Up to 3 portfolios</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Basic AI analysis</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Real-time market data</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Mobile app access</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Email support</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                  <span className="text-gray-400">Advanced analytics</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                  <span className="text-gray-400">Custom alerts</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                  <span className="text-gray-400">API access</span>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>

                              {/* Professional Plan */}
                              <Card className="border-2 border-red-500 hover:border-red-600 transition-all duration-300 hover:shadow-2xl relative">
                                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2">Most Popular</Badge>
                                   </div>
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                  <Star className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                                             <p className="text-gray-600 mb-6">Advanced features for serious investors</p>
                                             <div className="mb-6">
                                                  <span className="text-5xl font-bold text-gray-900">$49</span>
                                                  <span className="text-gray-600 ml-2">/month</span>
                                             </div>
                                             <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                                                  Start Free Trial
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </div>

                                        <div className="space-y-4">
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Unlimited portfolios</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Advanced AI analysis</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Real-time alerts</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Risk management tools</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Custom dashboards</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Priority support</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Advanced analytics</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                  <span className="text-gray-400">API access</span>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>

                              {/* Enterprise Plan */}
                              <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                                   <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                  <Building2 className="w-8 h-8 text-white" />
                                             </div>
                                             <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                             <p className="text-gray-600 mb-6">Custom solutions for institutions</p>
                                             <div className="mb-6">
                                                  <span className="text-5xl font-bold text-gray-900">Custom</span>
                                             </div>
                                             <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                                                  Contact Sales
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </div>

                                        <div className="space-y-4">
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Everything in Professional</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">White-label solutions</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Full API access</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Custom integrations</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Dedicated support</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">SLA guarantees</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">On-premise deployment</span>
                                             </div>
                                             <div className="flex items-center space-x-3">
                                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                  <span className="text-gray-700">Custom training</span>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* FAQ Section */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Everything you need to know about our pricing and plans
                              </p>
                         </div>

                         <div className="max-w-4xl mx-auto space-y-8">
                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Can I change my plan at any time?</h3>
                                        <p className="text-gray-600">
                                             Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                                             prorate any charges or credits to your account.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Is there a free trial available?</h3>
                                        <p className="text-gray-600">
                                             Yes, we offer a 14-day free trial for our Professional plan. No credit card required. You can explore
                                             all features and see how Stock AI can transform your investment strategy.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">What payment methods do you accept?</h3>
                                        <p className="text-gray-600">
                                             We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for
                                             Enterprise customers. All payments are processed securely.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Do you offer discounts for annual plans?</h3>
                                        <p className="text-gray-600">
                                             Yes, we offer a 20% discount when you pay annually. This applies to both Starter and Professional
                                             plans. Enterprise customers can discuss custom pricing with our sales team.
                                        </p>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                         <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
                         <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                              Join thousands of investors who trust Stock AI to make smarter investment decisions. Start your free trial
                              today.
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
