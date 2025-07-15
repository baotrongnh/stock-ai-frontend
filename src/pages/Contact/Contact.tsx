import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router"
import {
     ArrowRight,
     Mail,
     Phone,
     MapPin,
     Clock,
     MessageCircle,
     HeadphonesIcon
} from "lucide-react"

export default function Contact() {
     return (
          <div className="min-h-screen bg-white">
               {/* Header */}
               <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-20">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6 px-4 py-2">
                                   <MessageCircle className="w-4 h-4 mr-2" />
                                   Get in Touch
                              </Badge>
                              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                   We're here to help you
                                   <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {" "}succeed
                                   </span>
                              </h1>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                   Have questions about our platform? Need help getting started? Our team of experts is ready to assist you.
                              </p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                              {/* Contact Form */}
                              <Card className="border-0 bg-gradient-to-br from-white to-blue-50 shadow-xl">
                                   <CardContent className="p-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                                        <form className="space-y-6">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  <div>
                                                       <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            First Name
                                                       </label>
                                                       <Input
                                                            type="text"
                                                            placeholder="John"
                                                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                                       />
                                                  </div>
                                                  <div>
                                                       <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Last Name
                                                       </label>
                                                       <Input
                                                            type="text"
                                                            placeholder="Doe"
                                                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                                       />
                                                  </div>
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                       Email
                                                  </label>
                                                  <Input
                                                       type="email"
                                                       placeholder="john@example.com"
                                                       className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                       Company (Optional)
                                                  </label>
                                                  <Input
                                                       type="text"
                                                       placeholder="Your Company"
                                                       className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                       Subject
                                                  </label>
                                                  <select className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500">
                                                       <option>General Inquiry</option>
                                                       <option>Technical Support</option>
                                                       <option>Sales Question</option>
                                                       <option>Partnership</option>
                                                       <option>Feature Request</option>
                                                  </select>
                                             </div>
                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                       Message
                                                  </label>
                                                  <Textarea
                                                       placeholder="Tell us how we can help you..."
                                                       rows={6}
                                                       className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                                  />
                                             </div>
                                             <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3">
                                                  Send Message
                                                  <ArrowRight className="w-4 h-4 ml-2" />
                                             </Button>
                                        </form>
                                   </CardContent>
                              </Card>

                              {/* Contact Information */}
                              <div className="space-y-8">
                                   <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
                                        <CardContent className="p-8">
                                             <div className="flex items-center space-x-4 mb-6">
                                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                       <Mail className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                       <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                                                       <p className="text-gray-600">Get a response within 24 hours</p>
                                                  </div>
                                             </div>
                                             <div className="space-y-2 text-gray-700">
                                                  <p>General: support@stockai.com</p>
                                                  <p>Sales: sales@stockai.com</p>
                                                  <p>Partnerships: partners@stockai.com</p>
                                             </div>
                                        </CardContent>
                                   </Card>

                                   <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
                                        <CardContent className="p-8">
                                             <div className="flex items-center space-x-4 mb-6">
                                                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                                       <Phone className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                       <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                                       <p className="text-gray-600">Mon-Fri, 9AM-6PM PST</p>
                                                  </div>
                                             </div>
                                             <div className="space-y-2 text-gray-700">
                                                  <p>US: +1 (555) 123-4567</p>
                                                  <p>UK: +44 20 7123 4567</p>
                                                  <p>Enterprise: +1 (555) 987-6543</p>
                                             </div>
                                        </CardContent>
                                   </Card>

                                   <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
                                        <CardContent className="p-8">
                                             <div className="flex items-center space-x-4 mb-6">
                                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                       <MapPin className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                       <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                                                       <p className="text-gray-600">Our headquarters</p>
                                                  </div>
                                             </div>
                                             <div className="text-gray-700">
                                                  <p>123 Innovation Drive</p>
                                                  <p>Silicon Valley, CA 94043</p>
                                                  <p>United States</p>
                                             </div>
                                        </CardContent>
                                   </Card>

                                   <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
                                        <CardContent className="p-8">
                                             <div className="flex items-center space-x-4 mb-6">
                                                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                                       <Clock className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                       <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
                                                       <p className="text-gray-600">We're here when you need us</p>
                                                  </div>
                                             </div>
                                             <div className="space-y-2 text-gray-700">
                                                  <p>Monday - Friday: 9AM - 6PM PST</p>
                                                  <p>Saturday: 10AM - 4PM PST</p>
                                                  <p>Sunday: Closed</p>
                                                  <p className="text-sm text-green-600 font-medium">Enterprise: 24/7 Support</p>
                                             </div>
                                        </CardContent>
                                   </Card>
                              </div>
                         </div>

                         {/* FAQ Section */}
                         <div className="mt-20 max-w-4xl mx-auto">
                              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                   Frequently Asked Questions
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   <div className="space-y-6">
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">How quickly will I get a response?</h3>
                                             <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days. Enterprise customers receive priority support with faster response times.</p>
                                        </div>
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer phone support?</h3>
                                             <p className="text-gray-600">Yes, we offer phone support for Pro and Enterprise customers. Starter plan users can reach us via email and our help center.</p>
                                        </div>
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I schedule a demo?</h3>
                                             <p className="text-gray-600">Absolutely! We offer personalized demos for potential customers. Use the contact form or call our sales team to schedule a demo.</p>
                                        </div>
                                   </div>
                                   <div className="space-y-6">
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you have a help center?</h3>
                                             <p className="text-gray-600">Yes, we have a comprehensive help center with articles, tutorials, and FAQs. Most common questions can be answered there instantly.</p>
                                        </div>
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">What about technical support?</h3>
                                             <p className="text-gray-600">Our technical support team is available to help with platform issues, integration questions, and troubleshooting. Enterprise customers get dedicated support.</p>
                                        </div>
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I speak with a sales representative?</h3>
                                             <p className="text-gray-600">Yes, our sales team is available to discuss pricing, enterprise features, and custom solutions. Contact us using the form or call directly.</p>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Alternative Contact Methods */}
                         <div className="mt-20">
                              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                   Other Ways to Get Help
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                   <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                                        <CardContent className="p-6 text-center">
                                             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                  <HeadphonesIcon className="w-6 h-6 text-white" />
                                             </div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
                                             <p className="text-gray-600 mb-4">Browse our knowledge base for instant answers</p>
                                             <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                                  Visit Help Center
                                             </Button>
                                        </CardContent>
                                   </Card>

                                   <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50">
                                        <CardContent className="p-6 text-center">
                                             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                  <MessageCircle className="w-6 h-6 text-white" />
                                             </div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                                             <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
                                             <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                                                  Start Chat
                                             </Button>
                                        </CardContent>
                                   </Card>

                                   <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50">
                                        <CardContent className="p-6 text-center">
                                             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                  <MessageCircle className="w-6 h-6 text-white" />
                                             </div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                                             <p className="text-gray-600 mb-4">Connect with other investors and experts</p>
                                             <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                                                  Join Community
                                             </Button>
                                        </CardContent>
                                   </Card>
                              </div>
                         </div>

                         {/* CTA Section */}
                         <div className="text-center mt-20">
                              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                   Ready to start your investment journey?
                              </h2>
                              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Don't wait any longer. Join thousands of successful investors using Stock AI today.
                              </p>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                   <Link to="/register">
                                        <Button
                                             size="lg"
                                             className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold"
                                        >
                                             Start Free Trial
                                             <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                   </Link>
                                   <Link to="/pricing">
                                        <Button
                                             size="lg"
                                             variant="outline"
                                             className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                                        >
                                             View Pricing
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     )
}
