import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, Star, CheckCircle } from "lucide-react";
import img1 from "@/assets/about/img1.png";
import img2 from "@/assets/about/img2.png";
import img3 from "@/assets/about/img3.png";
import img4 from "@/assets/about/img4.png";
import img5 from "@/assets/about/img5.png";
import img6 from "@/assets/about/img6.png";

export default function About() {
    const teamMembers = [
        {
            name: "Andrew Nguyen",
            position: "CEO & Founder", 
            experience: "10+ years in finance",
            image: img3,
            description: "Market analysis expert with CFA certification and MBA from Wharton",
        },
        {
            name: "Mary Tran",
            position: "CTO",
            experience: "AI & Machine Learning Specialist",
            image: img5,
            description: "PhD in Computer Science, former Google engineer with 8 years of experience",
        },
        {
            name: "David Le",
            position: "Head of Research",
            experience: "Quantitative Analysis",
            image: img4,
            description: "Master's in Quantitative Finance, former Goldman Sachs analyst",
        },
        {
            name: "Hannah Pham",
            position: "Product Manager",
            experience: "User Experience Design",
            image: img6,
            description: "6 years of UX/UI experience, former Facebook Product Manager",
        },
    ];

      const coreValues = [
        {
            title: "Advanced Artificial Intelligence",
            description: "Using AI and machine learning to analyze real-time market data",
            number: "01",
        },
        {
            title: "Absolute Security",
            description: "Data encrypted and protected according to international banking standards",
            number: "02",
        },
        {
            title: "Multi-dimensional Analysis", 
            description: "Powerful AI algorithms analyze data from every angle – fundamental, technical, psychological, comparative.",
            number: "03",
        },
        {
            title: "Smart Synthesis & Presentation",
            description: "StockGPT filters the most valuable information, eliminates noise, and presents results in a visual, easy-to-understand way with clear action recommendations.",
            number: "04",
        },
    ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                          <div className="text-center">
                    <h1 className="text-5xl font-semibold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                        🚀 About Us - StockGPT
                    </h1>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                        We are a team passionate about technology and finance, delivering
                        smart investment solutions powered by artificial intelligence
                    </p>
                </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-12">
          {/* Vision */}
          <div>
            <div className="text-center mb-6 pt-7">
              <h2 className="text-4xl font-semibold text-gray-900 flex items-center justify-center mb-4">
                <Target className="w-8 h-8 mr-3 text-red-500" />
                Vision & Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
              {/* Text Content */}
              <div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center"> 
                  Becoming Vietnam's Leading AI Stock Analysis Platform
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  StockGPT aims to become Vietnam's leading AI platform in the stock investment sector, 
                  helping everyone invest smarter and more efficiently through advanced technology.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We are committed to democratizing smart investing, bringing equal financial opportunities 
                  to everyone through accessible and reliable AI solutions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With this mission, StockGPT continuously innovates and develops to bring 
                  the most powerful analytical tools to Vietnamese investors.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="flex items-center justify-center p-4">
              <img
                        src={img1}
                        alt="img1"
                        className="w-full h-full object-cover"
                      />
              </div>
            </div>
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-6 mt-12">
                 {/* Image Placeholder */}
               <div className="flex items-center justify-center p-4">
               <img
                         src={img2}
                         alt="img2"
                         className="w-full h-full object-cover"
                       />
               </div>
               {/* Text Content */}
               <div>
                 <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center"> 
                   Empowering Every Investor with AI Technology
                 </h3>
                 <p className="text-lg text-gray-600 leading-relaxed mb-4">
                   Our mission is to make sophisticated investment analysis accessible to everyone, 
                   regardless of their financial background or experience level.
                 </p>
                 <p className="text-lg text-gray-600 leading-relaxed mb-4">
                   Through cutting-edge AI technology, we democratize financial markets and provide 
                   equal opportunities for all investors to achieve their financial goals.
                 </p>
                 <p className="text-lg text-gray-600 leading-relaxed">
                   StockGPT is more than just a platform – it's your intelligent partner in navigating 
                   the complex world of stock investments with confidence and precision.
                 </p>
               </div>

              
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold text-gray-900 mb-3 pt-7">
                Advanced AI Technology - Unlock Investment Advantages
              </h2>
              <p className="text-gray-600 max-w-4xl mx-auto text-lg">
                StockGPT is not magic, it's the result of advanced
                AI technology and intelligent data processing workflows
              </p>
            </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                {coreValues.map((value, index) => (
                    <Card
                        key={index}
                        className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <CardContent className="p-6 pt-0 left">
                            <div className="mb-2">
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-red-500`}
                                >
                                    <span className="text-4xl font-semibold ">
                                        {value.number}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                {value.title}
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {value.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          {/* Development Team */}
          <div>
            <h2 className="text-4xl font-semibold text-gray-900 text-center mb-8 flex items-center justify-center pt-7">
              <Users className="w-8 h-8 mr-3 text-red-500" />
              Our Development Team
            </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                {teamMembers.map((member, index) => (
                    <Card
                        key={index}
                        className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                        <CardContent className="p-6 text-center">
                            <div className="relative mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-red-100 group-hover:border-red-300 transition-colors duration-300"
                                />
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-red-500 text-white">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 text-lg">
                                {member.name}
                            </h3>
                            <p className="text-red-600 font-semibold mb-2 text-lg">
                                {member.position}
                            </p>
                            <p className=" text-gray-600 mb-2 text-md">
                                {member.experience}
                            </p>
                            <p className=" text-gray-500 leading-relaxed text-sm">
                                {member.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Ready to Start Your Smart Investment Journey?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
              Join millions of investors who trust StockGPT to optimize
              their investment portfolios
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                Try For Free
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
