import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare, Headphones, Users } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
     })

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          // Handle form submission here
          console.log("Form submitted:", formData)
     }

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          })
     }

     return (
          <div className="min-h-screen bg-white">
               {/* Hero Section */}
               <section className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                         <div className="text-center mb-16">
                              <Badge className="bg-red-100 text-red-700 border-red-200 mb-8 px-4 py-2">
                                   <MessageSquare className="w-4 h-4 mr-2" />
                                   Get in Touch
                              </Badge>

                              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                   <span className="text-gray-900">Let's Start a</span>
                                   <br />
                                   <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                        Conversation
                                   </span>
                              </h1>

                              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                   Have questions about Stock AI? Want to schedule a demo? Our team is here to help you succeed with
                                   AI-powered investing.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Contact Form & Info */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                              {/* Contact Form */}
                              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-red-50">
                                   <CardContent className="p-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div>
                                                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Full Name *
                                                       </label>
                                                       <Input
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            required
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            className="w-full"
                                                            placeholder="John Doe"
                                                       />
                                                  </div>
                                                  <div>
                                                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                            Email Address *
                                                       </label>
                                                       <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            required
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full"
                                                            placeholder="john@example.com"
                                                       />
                                                  </div>
                                             </div>

                                             <div>
                                                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                                       Company (Optional)
                                                  </label>
                                                  <Input
                                                       id="company"
                                                       name="company"
                                                       type="text"
                                                       value={formData.company}
                                                       onChange={handleChange}
                                                       className="w-full"
                                                       placeholder="Your Company"
                                                  />
                                             </div>

                                             <div>
                                                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                       Subject *
                                                  </label>
                                                  <Input
                                                       id="subject"
                                                       name="subject"
                                                       type="text"
                                                       required
                                                       value={formData.subject}
                                                       onChange={handleChange}
                                                       className="w-full"
                                                       placeholder="How can we help you?"
                                                  />
                                             </div>

                                             <div>
                                                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                       Message *
                                                  </label>
                                                  <Textarea
                                                       id="message"
                                                       name="message"
                                                       required
                                                       value={formData.message}
                                                       onChange={handleChange}
                                                       className="w-full h-32"
                                                       placeholder="Tell us more about your needs..."
                                                  />
                                             </div>

                                             <Button
                                                  type="submit"
                                                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold"
                                             >
                                                  Send Message
                                                  <ArrowRight className="w-5 h-5 ml-2" />
                                             </Button>
                                        </form>
                                   </CardContent>
                              </Card>

                              {/* Contact Information */}
                              <div className="space-y-8">
                                   <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in touch</h2>
                                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                             We're here to help you succeed with AI-powered investing. Reach out to us through any of the channels
                                             below.
                                        </p>
                                   </div>

                                   <div className="space-y-6">
                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                                            <Mail className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                                                            <p className="text-gray-600">support@stockai.com</p>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                            <Phone className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                                            <MapPin className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                                                            <p className="text-gray-600">123 AI Street, Tech City, TC 12345</p>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                             <CardContent className="p-6">
                                                  <div className="flex items-center space-x-4">
                                                       <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                            <Clock className="w-6 h-6 text-white" />
                                                       </div>
                                                       <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                                                            <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Support Options */}
               <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Multiple Ways to Get Help</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the support option that works best for you</p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Headphones className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Chat</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Get instant help from our support team. Available 24/7 for urgent issues.
                                        </p>
                                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                                             Start Chat
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Demo</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Book a personalized demo with our product experts to see Stock AI in action.
                                        </p>
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                             Book Demo
                                        </Button>
                                   </CardContent>
                              </Card>

                              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                                   <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                             <MessageSquare className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Forum</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                             Connect with other investors and get answers from our community.
                                        </p>
                                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                             Join Forum
                                        </Button>
                                   </CardContent>
                              </Card>
                         </div>
                    </div>
               </section>

               {/* FAQ Section */}
               <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Quick answers to common questions about Stock AI</p>
                         </div>

                         <div className="max-w-4xl mx-auto space-y-6">
                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">How quickly can I get started with Stock AI?</h3>
                                        <p className="text-gray-600">
                                             You can start using Stock AI immediately after signing up. Our onboarding process takes less than 5
                                             minutes, and you'll have access to all features during your free trial.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Do you offer enterprise solutions?</h3>
                                        <p className="text-gray-600">
                                             Yes, we offer comprehensive enterprise solutions including white-label options, custom integrations,
                                             and dedicated support. Contact our sales team to discuss your specific requirements.
                                        </p>
                                   </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg">
                                   <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">What kind of support do you provide?</h3>
                                        <p className="text-gray-600">
                                             We offer multiple support channels including live chat, email support, phone support for enterprise
                                             customers, comprehensive documentation, and video tutorials.
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
                              Don't wait - start your AI-powered investment journey today with our free trial.
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
