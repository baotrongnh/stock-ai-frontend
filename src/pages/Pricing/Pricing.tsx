import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Check,
    X,
    Star,
    Crown,
    Zap,
    Sparkles,
    TrendingUp,
    Shield,
    Users,
    Headphones,
    Clock,
    BarChart3,
    Database,
    Bot
} from "lucide-react"

export default function Pricing() {
    const servicePackages = [
        {
            packageName: "Free",
            price: "0",
            currency: "VND",
            subtitle: "For beginners",
            description: "Basic experience to explore StockGPT",
            queryLimit: "50 queries/month",
            features: [
                { name: "Basic AI analysis", hasFeature: true },
                { name: "Daily market reports", hasFeature: true },
                { name: "Track 5 stocks", hasFeature: true },
                { name: "Email support", hasFeature: true },
                { name: "Advanced technical analysis", hasFeature: false },
                { name: "Real-time alerts", hasFeature: false },
                { name: "API access", hasFeature: false },
                { name: "24/7 support", hasFeature: false }
            ],
            color: "bg-gray-500",
            background: "from-gray-50 to-slate-50",
            popular: false,
            excellent: false,
            icon: Users
        },
        {
            packageName: "Investor",
            price: "299,000",
            currency: "VND/month",
            subtitle: "For individual investors",
            description: "Perfect for investors who want in-depth analysis",
            queryLimit: "500 queries/month",
            features: [
                { name: "Basic AI analysis", hasFeature: true },
                { name: "Daily market reports", hasFeature: true },
                { name: "Track 50 stocks", hasFeature: true },
                { name: "Email support", hasFeature: true },
                { name: "Advanced technical analysis", hasFeature: true },
                { name: "Real-time alerts", hasFeature: true },
                { name: "Weekly/monthly reports", hasFeature: true },
                { name: "API access", hasFeature: false },
                { name: "24/7 support", hasFeature: false }
            ],
            color: "bg-blue-500",
            background: "from-blue-50 to-indigo-50",
            popular: true,
            excellent: false,
            icon: TrendingUp
        },
        {
            packageName: "Pro Trader",
            price: "799,000",
            currency: "VND/month",
            subtitle: "For professional traders",
            description: "Comprehensive tools for professional traders",
            queryLimit: "2,000 queries/month",
            features: [
                { name: "Basic AI analysis", hasFeature: true },
                { name: "Daily market reports", hasFeature: true },
                { name: "Unlimited tracking", hasFeature: true },
                { name: "Email & chat support", hasFeature: true },
                { name: "Advanced technical analysis", hasFeature: true },
                { name: "Real-time alerts", hasFeature: true },
                { name: "Weekly/monthly reports", hasFeature: true },
                { name: "API access", hasFeature: true },
                { name: "Backtesting tools", hasFeature: true },
                { name: "Portfolio optimization", hasFeature: true },
                { name: "24/7 support", hasFeature: false }
            ],
            color: "bg-orange-500",
            background: "from-orange-50 to-yellow-50",
            popular: false,
            excellent: true,
            icon: Zap
        },
        {
            packageName: "Enterprise",
            price: "Contact",
            currency: "",
            subtitle: "For organizations & enterprises",
            description: "Custom solutions for large organizations",
            queryLimit: "Unlimited",
            features: [
                { name: "All Pro Trader features", hasFeature: true },
                { name: "Multi-user accounts", hasFeature: true },
                { name: "Custom integrations", hasFeature: true },
                { name: "Dedicated support", hasFeature: true },
                { name: "White-label solution", hasFeature: true },
                { name: "On-premise deployment", hasFeature: true },
                { name: "SLA guarantee", hasFeature: true },
                { name: "Training & consulting", hasFeature: true },
                { name: "Custom AI models", hasFeature: true },
                { name: "24/7 support", hasFeature: true }
            ],
            color: "bg-purple-500",
            background: "from-purple-50 to-violet-50",
            popular: false,
            excellent: false,
            icon: Crown
        }
    ]

    const frequentQuestions = [
        {
            question: "Can I change my service plan anytime?",
            answer: "Yes, you can upgrade or downgrade your service plan anytime. We will charge proportionally for the usage time."
        },
        {
            question: "Is there a free trial period?",
            answer: "The Free plan allows you to experience 50 free queries per month. Additionally, paid plans can be tried for 7 days for free."
        },
        {
            question: "How are queries calculated?",
            answer: "Each time you request AI to analyze a stock, generate a report, or use advanced features will be counted as 1 query."
        },
        {
            question: "What payment methods are supported?",
            answer: "We support payments via credit cards, bank transfers, and popular e-wallets in Vietnam."
        }
    ]

    return (
        <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                            💎 Pricing Plans - StockGPT
                        </h1>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            Choose the service plan that fits your investment needs. All plans come with advanced AI technology
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <Shield className="w-3 h-3 mr-1" />
                                30-day money back
                            </Badge>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                <Clock className="w-3 h-3 mr-1" />
                                No long-term commitment
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-12 pt-12 mt-6">
                    {/* Bảng giá chính */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                            {servicePackages.map((pkg, index) => {
                                const Icon = pkg.icon
                                return (
                                    <Card
                                        key={index}
                                        className={`relative border-0 bg-gradient-to-br ${pkg.background} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                                            pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                                        } ${
                                            pkg.excellent ? 'ring-2 ring-orange-500 scale-105' : ''
                                        }`}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <Badge className="bg-blue-500 text-white animate-pulse">
                                                    <Star className="w-3 h-3 mr-1" />
                                                    Most Popular
                                                </Badge>
                                            </div>
                                        )}
                                        {pkg.excellent && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <Badge className="bg-orange-500 text-white animate-pulse">
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    Best Value
                                                </Badge>
                                            </div>
                                        )}
                                        
                                        <CardContent className="p-6">
                                            {/* Package Header */}
                                            <div className="text-center mb-6">
                                                <div className={`w-16 h-16 ${pkg.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.packageName}</h3>
                                                <p className="text-sm text-gray-600 mb-4">{pkg.subtitle}</p>
                                                <div className="mb-4">
                                                    {pkg.packageName === "Enterprise" ? (
                                                        <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                                                    ) : (
                                                        <>
                                                            <div className="text-3xl font-bold text-gray-900">
                                                                {pkg.price === "0" ? "Free" : pkg.price?.toLocaleString()}
                                                            </div>
                                                            {pkg.price !== "0" && (
                                                                <div className="text-sm text-gray-500">{pkg.currency}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mb-4">{pkg.description}</p>
                                                <Badge variant="outline" className="mb-4">
                                                    <Database className="w-3 h-3 mr-1" />
                                                    {pkg.queryLimit}
                                                </Badge>
                                            </div>

                                            {/* Features List */}
                                            <div className="space-y-3 mb-6">
                                                {pkg.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-3">
                                                        {feature.hasFeature ? (
                                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                        ) : (
                                                            <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                                        )}
                                                        <span className={`text-sm ${
                                                            feature.hasFeature ? 'text-gray-700' : 'text-gray-400'
                                                        }`}>
                                                            {feature.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Button */}
                                            <Button 
                                                className={`w-full ${
                                                    pkg.popular 
                                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                                                        : pkg.excellent
                                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                                                        : `bg-gradient-to-r ${pkg.color.replace('bg-', 'from-')} to-gray-600 hover:to-gray-700`
                                                } text-white`}
                                            >
                                                {pkg.packageName === "Enterprise" ? "Contact Sales" : 
                                                 pkg.packageName === "Free" ? "Start Free" : "Choose Plan"}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    {/* Detailed Feature Comparison */}
                    <div className="px-6">
                        <h2 className="text-4xl font-semibold text-gray-900 text-center flex items-center justify-center pt-7 pb-3">
                            <BarChart3 className="w-8 h-8 mr-3 text-red-500" />
                            Detailed Comparison
                        </h2>
                        
                        <Card className="border-0 bg-white/80 backdrop-blur-sm overflow-hidden  ">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg ">
                                            <tr>
                                                <th className="text-left p-4 font-semibold">Features</th>
                                                <th className="text-center p-4 font-semibold">Free</th>
                                                <th className="text-center p-4 font-semibold">Investor</th>
                                                <th className="text-center p-4 font-semibold">Pro Trader</th>
                                                <th className="text-center p-4 font-semibold">Enterprise</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="p-4 font-semibold text-lg">AI queries per month</td>
                                                <td className="text-center p-4">50</td>
                                                <td className="text-center p-4">500</td>
                                                <td className="text-center p-4">2,000</td>
                                                <td className="text-center p-4">Unlimited</td>
                                            </tr>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <td className="p-4 font-semibold text-lg">Stocks to track</td>
                                                <td className="text-center p-4">5</td>
                                                <td className="text-center p-4">50</td>
                                                <td className="text-center p-4">Unlimited</td>
                                                <td className="text-center p-4">Unlimited</td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="p-4 font-semibold text-lg">Advanced technical analysis</td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                            </tr>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <td className="p-4 font-semibold text-lg">API Access</td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="p-4 font-semibold text-lg">24/7 Support</td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                                                <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-4xl font-semibold text-gray-900 text-center flex items-center justify-center  pb-7">
                            <Bot className="w-8 h-8 mr-3 text-red-500" />
                            Frequently Asked Questions
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                            {frequentQuestions.map((item, index) => (
                                <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                                    <CardContent className="p-6">
                                        <p className="text-xl font-semibold text-gray-900 mb-3 flex items-start">
                                            <Headphones className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                                            {item.question}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center  rounded-2xl p-8  px-6">
                        <h2 className="text-4xl font-semibold mb-4">
                            Start Smart Investing Today!
                        </h2>
                        <p className="mb-6 max-w-2xl mx-auto opacity-90 text-lg">
                            Join millions of investors who trust StockGPT to optimize their investment portfolios
                        </p>
                        <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                Try For Free
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3 text-lg"
              >
                Enterprise Consultation
              </Button>
            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
} 