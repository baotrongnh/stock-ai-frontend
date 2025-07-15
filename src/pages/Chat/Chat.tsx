import { AIChat } from "@/apis/tool";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Brain,
  ChevronRight,
  DollarSign,
  Globe,
  Send,
  Target,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatText } from "../../utils/formatText.js";


interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  stockData?: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  };
}

export default function StockAnalysisChat() {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI stock analysis assistant. I can help you analyze stocks, market trends, and provide investment insights. What would you like to know about today's market?",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const stockSuggestions = [
    {
      text: "Analyze AAPL stock performance",
      icon: <BarChart3 className="w-4 h-4" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      text: "What are the top tech stocks to watch?",
      icon: <Target className="w-4 h-4" />,
      color: "from-green-500 to-green-600",
    },
    {
      text: "Explain P/E ratio and its importance",
      icon: <Brain className="w-4 h-4" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      text: "Market outlook for Q4 2024",
      icon: <Globe className="w-4 h-4" />,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await AIChat(messageToSend);
      const answer =
        response?.data?.answer ||
        "(Demo) The AI tool server is not running. This is a default answer. Please start the AI tool backend to get real responses.";
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "(Demo) The AI tool server is not running. This is a default answer. Please start the AI tool backend to get real responses.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20">
      <div className="flex-1 flex flex-col">
        <div className="bg-white/80 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                AI Stock Analysis
              </h2>
              <p className="text-gray-600 mt-1">
                Get intelligent insights powered by advanced AI
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 animate-pulse"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live Market
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                <Brain className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 1 ? (
            <div className="text-center py-12">
              {/* Animated Welcome Section */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  StockGPT
                </span>
                !
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Your AI-powered financial advisor. Ask me anything about stocks,
                markets, or investment strategies.
              </p>

              {/* Enhanced Suggestion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {stockSuggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 bg-white/60 backdrop-blur-sm"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${suggestion.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}
                        >
                          {suggestion.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {suggestion.text}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200 float-right mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-2xl ${
                    message.role === "user" ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`rounded-3xl p-6 shadow-lg ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white ml-auto"
                        : "bg-white/80 backdrop-blur-sm border border-red-100/50 text-gray-900"
                    }`}
                  >
                    {/* Format answer using formatText utility */}
                    {formatText(message.content)
                      .split("\n\n")
                      .map((para: string, idx: number) => (
                        <p key={idx} className="mb-2">
                          {para}
                        </p>
                      ))}

                    {message.stockData && (
                      <Card className="mt-4 bg-gray-50 border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-red-500" />
                              <span className="font-bold text-lg">
                                {message.stockData.symbol}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${message.stockData.price}
                              </div>
                              <div
                                className={`flex items-center gap-1 text-sm ${
                                  message.stockData.change >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {message.stockData.change >= 0 ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : (
                                  <TrendingDown className="w-4 h-4" />
                                )}
                                +${message.stockData.change} (
                                {message.stockData.changePercent}%)
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

                  <div
                    className={`text-xs text-gray-500 mt-2 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-red-100/50 rounded-3xl p-6 shadow-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-red-100/50 p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stocks, market analysis, or investment strategies..."
                  className="min-h-[60px] text-base border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="h-[60px] px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-full"
                onClick={() =>
                  handleSuggestionClick("Analyze TSLA stock performance")
                }
              >
                📈 Analyze TSLA
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-full"
                onClick={() =>
                  handleSuggestionClick(
                    "What are the top tech stocks to watch?"
                  )
                }
              >
                📊 Market Summary
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-full"
                onClick={() =>
                  handleSuggestionClick("Market outlook for Q4 2024")
                }
              >
                💼 Portfolio Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
