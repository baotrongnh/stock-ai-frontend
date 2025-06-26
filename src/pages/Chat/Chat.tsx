import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
     Send,
     Plus,
     TrendingUp,
     TrendingDown,
     BarChart3,
     DollarSign,
     MessageSquare,
     History,
     Settings,
     User,
     Bot,
} from "lucide-react"

interface Message {
     id: string
     type: "user" | "ai"
     content: string
     timestamp: Date
     stockData?: {
          symbol: string
          price: number
          change: number
          changePercent: number
     }
}

export default function StockAnalysisChat() {
     const [messages, setMessages] = useState<Message[]>([
          {
               id: "1",
               type: "ai",
               content:
                    "Xin chào! Tôi là StockAI - trợ lý phân tích cổ phiếu AI của bạn. Tôi có thể giúp bạn phân tích cổ phiếu, xu hướng thị trường và cung cấp thông tin đầu tư. Bạn muốn biết điều gì?",
               timestamp: new Date(),
          },
          {
               id: "2",
               type: "user",
               content: "Bạn có thể phân tích mã FTS cho tôi?",
               timestamp: new Date(),
          },
          {
               id: "3",
               type: "ai",
               content:
                    "Đây là phân tích của tôi về CTCP FPT (HOSE: FTS). Cổ phiếu này đang cho thấy nền tảng cơ bản vững chắc với mức tăng trưởng doanh thu ổn định và vị thế vững chắc trên thị trường trong lĩnh vực công nghệ.",
               timestamp: new Date(),
               stockData: {
                    symbol: "FTS",
                    price: 139,
                    change: 2.45,
                    changePercent: 1.34,
               },
          },
     ])

     const [inputValue, setInputValue] = useState("")
     const [isTyping, setIsTyping] = useState(false)

     const chatHistory = [
          "AAPL Analysis Discussion",
          "Tesla Stock Outlook",
          "Market Trends Q4 2024",
          "Portfolio Review",
          "Crypto vs Stocks",
     ]

     const handleSendMessage = () => {
          if (!inputValue.trim()) return

          const newMessage: Message = {
               id: Date.now().toString(),
               type: "user",
               content: inputValue,
               timestamp: new Date(),
          }

          setMessages((prev) => [...prev, newMessage])
          setInputValue("")
          setIsTyping(true)

          // Simulate AI response
          setTimeout(() => {
               const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    type: "ai",
                    content:
                         "I'm analyzing that for you. Based on current market data and technical indicators, here are my insights...",
                    timestamp: new Date(),
               }
               setMessages((prev) => [...prev, aiResponse])
               setIsTyping(false)
          }, 2000)
     }

     return (
          <div className="flex h-screen bg-gray-50">
               {/* Sidebar */}
               <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                         <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                   <TrendingUp className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                   <h1 className="font-bold text-xl text-gray-900">StockGPT</h1>
                                   <p className="text-sm text-gray-500">AI Stock Analyst</p>
                              </div>
                         </div>

                         <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                              <Plus className="w-4 h-4 mr-2" />
                              New Analysis
                         </Button>
                    </div>

                    {/* Navigation */}
                    <div className="p-4 border-b border-gray-200">
                         <div className="space-y-2">
                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700">
                                   <MessageSquare className="w-4 h-4 mr-3" />
                                   Chat
                              </Button>
                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700">
                                   <BarChart3 className="w-4 h-4 mr-3" />
                                   Market Overview
                              </Button>
                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700">
                                   <TrendingUp className="w-4 h-4 mr-3" />
                                   Watchlist
                              </Button>
                         </div>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 p-4">
                         <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                              <History className="w-4 h-4 mr-2" />
                              Recent Chats
                         </h3>
                         <div className="space-y-2">
                              {chatHistory.map((chat, index) => (
                                   <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-start text-left text-gray-600 hover:bg-red-50 hover:text-red-700 h-auto p-3"
                                   >
                                        <div className="truncate">{chat}</div>
                                   </Button>
                              ))}
                         </div>
                    </div>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200">
                         <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                   <User className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                   <p className="text-sm font-medium text-gray-900">Investor</p>
                                   <p className="text-xs text-gray-500">Premium Plan</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                   <Settings className="w-4 h-4" />
                              </Button>
                         </div>
                    </div>
               </div>

               {/* Main Chat Area */}
               <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <div className="bg-white border-b border-gray-200 p-4">
                         <div className="flex items-center justify-between">
                              <div>
                                   <h2 className="font-semibold text-gray-900">Stock Analysis Chat</h2>
                                   <p className="text-sm text-gray-500">Get AI-powered insights on stocks and market trends</p>
                              </div>
                              <div className="flex items-center gap-4">
                                   {/* Live Market Ticker */}
                                   <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                             <span className="text-gray-600">SPY</span>
                                             <span className="text-green-600 font-medium">+0.8%</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                             <span className="text-gray-600">QQQ</span>
                                             <span className="text-red-600 font-medium">-0.3%</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                         {messages.map((message) => (
                              <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                                   {message.type === "ai" && (
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                             <Bot className="w-5 h-5 text-white" />
                                        </div>
                                   )}

                                   <div className={`max-w-2xl ${message.type === "user" ? "order-first" : ""}`}>
                                        <div
                                             className={`rounded-2xl p-4 ${message.type === "user"
                                                       ? "bg-red-500 text-white ml-auto"
                                                       : "bg-white border border-gray-200 text-gray-900"
                                                  }`}
                                        >
                                             <p className="text-sm leading-relaxed">{message.content}</p>

                                             {message.stockData && (
                                                  <Card className="mt-4 bg-gray-50 border-0">
                                                       <CardContent className="p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                 <div className="flex items-center gap-2">
                                                                      <DollarSign className="w-5 h-5 text-red-500" />
                                                                      <span className="font-bold text-lg">{message.stockData.symbol}</span>
                                                                 </div>
                                                                 <div className="text-right">
                                                                      <div className="text-2xl font-bold text-gray-900">${message.stockData.price}</div>
                                                                      <div
                                                                           className={`flex items-center gap-1 text-sm ${message.stockData.change >= 0 ? "text-green-600" : "text-red-600"
                                                                                }`}
                                                                      >
                                                                           {message.stockData.change >= 0 ? (
                                                                                <TrendingUp className="w-4 h-4" />
                                                                           ) : (
                                                                                <TrendingDown className="w-4 h-4" />
                                                                           )}
                                                                           +${message.stockData.change} ({message.stockData.changePercent}%)
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-lg flex items-center justify-center">
                                                                 <BarChart3 className="w-8 h-8 text-red-400" />
                                                            </div>
                                                       </CardContent>
                                                  </Card>
                                             )}
                                        </div>

                                        <div className={`text-xs text-gray-500 mt-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                                             {message.timestamp.toLocaleTimeString()}
                                        </div>
                                   </div>

                                   {message.type === "user" && (
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                             <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                   )}
                              </div>
                         ))}

                         {isTyping && (
                              <div className="flex gap-4">
                                   <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                   </div>
                                   <div className="bg-white border border-gray-200 rounded-2xl p-4">
                                        <div className="flex gap-1">
                                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                             <div
                                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                  style={{ animationDelay: "0.1s" }}
                                             ></div>
                                             <div
                                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                  style={{ animationDelay: "0.2s" }}
                                             ></div>
                                        </div>
                                   </div>
                              </div>
                         )}
                    </div>

                    {/* Input Area */}
                    <div className="bg-white border-t border-gray-200 p-6">
                         <div className="max-w-4xl mx-auto">
                              <div className="flex gap-4 items-end">
                                   <div className="flex-1">
                                        <Input
                                             value={inputValue}
                                             onChange={(e) => setInputValue(e.target.value)}
                                             placeholder="Ask about stocks, market trends, or request analysis..."
                                             className="min-h-[50px] text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
                                             onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                        />
                                   </div>
                                   <Button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isTyping}
                                        className="h-[50px] px-6 bg-red-500 hover:bg-red-600 text-white"
                                   >
                                        <Send className="w-5 h-5" />
                                   </Button>
                              </div>

                              <div className="flex gap-2 mt-3">
                                   <Button variant="outline" size="sm" className="text-xs border-red-200 text-red-600 hover:bg-red-50">
                                        Analyze TSLA
                                   </Button>
                                   <Button variant="outline" size="sm" className="text-xs border-red-200 text-red-600 hover:bg-red-50">
                                        Market Summary
                                   </Button>
                                   <Button variant="outline" size="sm" className="text-xs border-red-200 text-red-600 hover:bg-red-50">
                                        Portfolio Review
                                   </Button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}