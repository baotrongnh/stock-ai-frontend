import { UserServices } from "@/apis/user"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
     BarChart3,
     Bell,
     Briefcase,
     Calendar,
     Camera,
     DollarSign,
     Edit3,
     Mail,
     MapPin,
     Phone,
     Save,
     Settings,
     Shield,
     User,
     X
} from "lucide-react"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'

interface UserProfile {
     firstName: string
     lastName: string
     email: string
     phone: string
     location: string
     dateOfBirth: string
     occupation: string
     investmentExperience: string
     riskTolerance: string
     investmentGoals: string
     bio: string
     avatar: string
     joinDate: string
     totalInvestments: string
     portfolioValue: string
     notifications: {
          email: boolean
          push: boolean
          sms: boolean
     }
     privacy: {
          profileVisible: boolean
          showInvestments: boolean
     }
}

export default function Profile() {
     const [isEditing, setIsEditing] = useState(false)
     const [activeTab, setActiveTab] = useState("personal")

     const [profile, setProfile] = useState<UserProfile>({
          firstName: "Default",
          lastName: "User",
          email: "default@email.com",
          phone: "+1 (555) 123-4567",
          location: "New York, NY",
          dateOfBirth: "1990-05-15",
          occupation: "Financial Analyst", // default text
          investmentExperience: "5+ years", // default text
          riskTolerance: "Moderate", // default text
          investmentGoals: "Long-term wealth building and retirement planning", // default text
          bio: "Passionate about financial markets and long-term investing. Focused on building a diversified portfolio with a mix of growth and value stocks.", // default text
          avatar: "https://tse4.mm.bing.net/th/id/OIP.0YMbH3u3Nq7TumFaeRiU3gHaHk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
          joinDate: "January 2023", // default text
          totalInvestments: "47", // default text
          portfolioValue: "$125,430", // default text
          notifications: {
               email: true,
               push: true,
               sms: false,
          },
          privacy: {
               profileVisible: true,
               showInvestments: false,
          },
     })

     const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

     // Add extra state for backend-only fields
     const [userBackendFields, setUserBackendFields] = useState({
          provider: '',
          socialId: '',
          status: '',
          passwordHash: '',
     });

     useEffect(() => {
          console.log("Profile page loaded")
     }, [])

     useEffect(() => {
          setEditedProfile(profile);
     }, [profile]);

     const tabs = [
          { id: "personal", label: "Personal Info", icon: <User className="w-4 h-4" /> },
          { id: "investment", label: "Investment Profile", icon: <DollarSign className="w-4 h-4" /> },
          { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
     ]

     useEffect(() => {
          // Get userId from localStorage
          const userId = localStorage.getItem("userId");
          if (!userId) return;

          UserServices.getUserById(Number(userId)).then((res) => {
               console.log('User Data: ', res)
               if (res?.data) {
                    setProfile((prev) => ({
                         ...prev,
                         firstName: res.data.fullName?.split(" ")[0] || prev.firstName,
                         lastName: res.data.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
                         email: res.data.email || prev.email,
                         avatar: res.data.avatarUrl || prev.avatar,
                    }))
                    setUserBackendFields({
                         provider: res.data.provider || '',
                         socialId: res.data.socialId || '',
                         status: res.data.status || '',
                         passwordHash: res.data.passwordHash || '',
                    })
               }
          })
     }, [])

     const handleSave = async () => {
          const userId = localStorage.getItem("userId");
          if (!userId) return;
          // Compose fullName
          const fullName = `${editedProfile.firstName} ${editedProfile.lastName}`.trim();
          try {
               const res = await UserServices.updateUser(
                    Number(userId),
                    {
                         email: editedProfile.email,
                         passwordHash: userBackendFields.passwordHash || '',
                         fullName,
                         provider: userBackendFields.provider,
                         socialId: userBackendFields.socialId,
                         status: userBackendFields.status,
                    }
               );
               console.log(Number(userId))
               console.log(res)
               if (res.error === true) {
                    toast.error(res.message || 'Failed to update profile.');
               } else {
                    // Optionally update profile state with backend response if available
                    if (res.data) {
                         setProfile((prev) => ({
                              ...prev,
                              firstName: res.data.fullName?.split(" ")[0] || prev.firstName,
                              lastName: res.data.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
                              email: res.data.email || prev.email,
                              avatar: res.data.avatarUrl || prev.avatar,
                         }));
                    }
                    setIsEditing(false);
                    toast.success('Profile updated successfully!');
               }
          } catch {
               toast.error('Failed to update profile.');
          }
     }

     const handleCancel = () => {
          setEditedProfile(profile)
          setIsEditing(false)
     }

     const handleInputChange = (field: keyof UserProfile, value: any) => {
          setEditedProfile((prev) => ({
               ...prev,
               [field]: value,
          }))
     }

     // Fix the spread type error by checking if it's an object
     const handleNestedChange = (parent: string, field: string, value: any) => {
          setEditedProfile((prev) => {
               const parentValue = prev[parent as keyof UserProfile];
               const existingParent = (parentValue && typeof parentValue === 'object') ? parentValue as Record<string, any> : {};
               
               return {
                    ...prev,
                    [parent]: {
                         ...existingParent,
                         [field]: value,
                    },
               };
          });
     }

     return (
          <div className="flex h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20">
               {/* Main Content */}
               <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white/80 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-sm">
                         <div className="flex items-center justify-between">
                              <div>
                                   <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                        User Profile
                                   </h2>
                                   <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                   <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        Profile Active
                                   </Badge>
                                   {!isEditing ? (
                                        <Button
                                             onClick={() => setIsEditing(true)}
                                             className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                        >
                                             <Edit3 className="w-4 h-4 mr-2" />
                                             Edit Profile
                                        </Button>
                                   ) : (
                                        <div className="flex gap-2">
                                             <Button
                                                  onClick={handleSave}
                                                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                             >
                                                  <Save className="w-4 h-4 mr-2" />
                                                  Save
                                             </Button>
                                             <Button
                                                  onClick={handleCancel}
                                                  variant="outline"
                                                  className="border-red-200 text-red-600 bg-transparent"
                                             >
                                                  <X className="w-4 h-4 mr-2" />
                                                  Cancel
                                             </Button>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                         <div className="max-w-4xl mx-auto">
                              {/* Profile Header Card */}
                              <Card className="mb-6 border-0 bg-gradient-to-r from-white via-red-50/30 to-orange-50/30 backdrop-blur-sm shadow-lg">
                                   <CardContent className="p-6">
                                        <div className="flex items-center space-x-6">
                                             <div className="relative">
                                                  <img
                                                       src={profile.avatar === null ? "https://tse4.mm.bing.net/th/id/OIP.0YMbH3u3Nq7TumFaeRiU3gHaHk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" : profile.avatar}
                                                       alt="Profile"
                                                       className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                                  />
                                                  {isEditing && (
                                                       <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                                                            <Camera className="w-4 h-4" />
                                                       </button>
                                                  )}
                                             </div>
                                             <div className="flex-1">
                                                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                                       {profile.firstName} {profile.lastName}
                                                  </h3>
                                                  <p className="text-gray-600 mb-2">{profile.occupation}</p>
                                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                       <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {profile.location}
                                                       </div>
                                                       <div className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            Joined {profile.joinDate}
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="text-right">
                                                  <div className="text-2xl font-bold text-green-600">{profile.portfolioValue}</div>
                                                  <div className="text-sm text-gray-500">Portfolio Value</div>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>

                              {/* Tab Navigation */}
                              <div className="flex space-x-1 mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-sm">
                                   {tabs.map((tab) => (
                                        <button
                                             key={tab.id}
                                             onClick={() => setActiveTab(tab.id)}
                                             className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                                                  : "text-gray-600 hover:bg-red-50 hover:text-red-700"
                                                  }`}
                                        >
                                             {tab.icon}
                                             <span className="font-medium">{tab.label}</span>
                                        </button>
                                   ))}
                              </div>

                              {/* Tab Content */}
                              {activeTab === "personal" && (
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <User className="w-5 h-5 mr-2 text-red-500" />
                                                       Basic Information
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                 <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                                 {isEditing ? (
                                                                      <Input
                                                                           value={editedProfile.firstName}
                                                                           onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                                           className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                      />
                                                                 ) : (
                                                                      <p className="text-gray-900 py-2">{profile.firstName}</p>
                                                                 )}
                                                            </div>
                                                            <div>
                                                                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                                 {isEditing ? (
                                                                      <Input
                                                                           value={editedProfile.lastName}
                                                                           onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                                           className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                      />
                                                                 ) : (
                                                                      <p className="text-gray-900 py-2">{profile.lastName}</p>
                                                                 )}
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                            {isEditing ? (
                                                                 <Input
                                                                      type="email"
                                                                      value={editedProfile.email}
                                                                      onChange={(e) => handleInputChange("email", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2 flex items-center">
                                                                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                                                      {profile.email}
                                                                 </p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                            {isEditing ? (
                                                                 <Input
                                                                      value={editedProfile.phone}
                                                                      onChange={(e) => handleInputChange("phone", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2 flex items-center">
                                                                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                                                      {profile.phone}
                                                                 </p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                            {isEditing ? (
                                                                 <Input
                                                                      value={editedProfile.location}
                                                                      onChange={(e) => handleInputChange("location", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2 flex items-center">
                                                                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                                                      {profile.location}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <Briefcase className="w-5 h-5 mr-2 text-red-500" />
                                                       Professional Details
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                                                            {isEditing ? (
                                                                 <Input
                                                                      value={editedProfile.occupation}
                                                                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{profile.occupation}</p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                                            {isEditing ? (
                                                                 <Input
                                                                      type="date"
                                                                      value={editedProfile.dateOfBirth}
                                                                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                                            {isEditing ? (
                                                                 <Textarea
                                                                      value={editedProfile.bio}
                                                                      onChange={(e) => handleInputChange("bio", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                                                                      placeholder="Tell us about yourself..."
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{profile.bio}</p>
                                                            )}
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>
                              )}

                              {activeTab === "investment" && (
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <DollarSign className="w-5 h-5 mr-2 text-red-500" />
                                                       Investment Profile
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Experience</label>
                                                            {isEditing ? (
                                                                 <select
                                                                      value={editedProfile.investmentExperience}
                                                                      onChange={(e) => handleInputChange("investmentExperience", e.target.value)}
                                                                      className="w-full px-3 py-2 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                                                                 >
                                                                      <option value="Beginner">Beginner (0-1 years)</option>
                                                                      <option value="Intermediate">Intermediate (2-5 years)</option>
                                                                      <option value="5+ years">Experienced (5+ years)</option>
                                                                      <option value="Expert">Expert (10+ years)</option>
                                                                 </select>
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{profile.investmentExperience}</p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                                                            {isEditing ? (
                                                                 <select
                                                                      value={editedProfile.riskTolerance}
                                                                      onChange={(e) => handleInputChange("riskTolerance", e.target.value)}
                                                                      className="w-full px-3 py-2 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                                                                 >
                                                                      <option value="Conservative">Conservative</option>
                                                                      <option value="Moderate">Moderate</option>
                                                                      <option value="Aggressive">Aggressive</option>
                                                                 </select>
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{profile.riskTolerance}</p>
                                                            )}
                                                       </div>
                                                       <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Goals</label>
                                                            {isEditing ? (
                                                                 <Textarea
                                                                      value={editedProfile.investmentGoals}
                                                                      onChange={(e) => handleInputChange("investmentGoals", e.target.value)}
                                                                      className="border-red-200 focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                                                                      placeholder="Describe your investment goals..."
                                                                 />
                                                            ) : (
                                                                 <p className="text-gray-900 py-2">{profile.investmentGoals}</p>
                                                            )}
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <BarChart3 className="w-5 h-5 mr-2 text-red-500" />
                                                       Portfolio Summary
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                                            <div className="text-2xl font-bold text-green-600">{profile.portfolioValue}</div>
                                                            <div className="text-sm text-gray-600">Total Portfolio Value</div>
                                                       </div>
                                                       <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                                                            <div className="text-2xl font-bold text-blue-600">{profile.totalInvestments}</div>
                                                            <div className="text-sm text-gray-600">Total Investments</div>
                                                       </div>
                                                       <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                                            <div className="text-2xl font-bold text-purple-600">+12.5%</div>
                                                            <div className="text-sm text-gray-600">YTD Performance</div>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>
                              )}

                              {activeTab === "settings" && (
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <Bell className="w-5 h-5 mr-2 text-red-500" />
                                                       Notification Preferences
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div className="flex items-center justify-between">
                                                            <div>
                                                                 <div className="font-medium text-gray-900">Email Notifications</div>
                                                                 <div className="text-sm text-gray-500">Receive updates via email</div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      checked={isEditing ? editedProfile.notifications.email : profile.notifications.email}
                                                                      onChange={(e) =>
                                                                           isEditing && handleNestedChange("notifications", "email", e.target.checked)
                                                                      }
                                                                      disabled={!isEditing}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                            </label>
                                                       </div>
                                                       <div className="flex items-center justify-between">
                                                            <div>
                                                                 <div className="font-medium text-gray-900">Push Notifications</div>
                                                                 <div className="text-sm text-gray-500">Receive push notifications</div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      checked={isEditing ? editedProfile.notifications.push : profile.notifications.push}
                                                                      onChange={(e) => isEditing && handleNestedChange("notifications", "push", e.target.checked)}
                                                                      disabled={!isEditing}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                            </label>
                                                       </div>
                                                       <div className="flex items-center justify-between">
                                                            <div>
                                                                 <div className="font-medium text-gray-900">SMS Notifications</div>
                                                                 <div className="text-sm text-gray-500">Receive text messages</div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      checked={isEditing ? editedProfile.notifications.sms : profile.notifications.sms}
                                                                      onChange={(e) => isEditing && handleNestedChange("notifications", "sms", e.target.checked)}
                                                                      disabled={!isEditing}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                            </label>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>

                                        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                                             <CardContent className="p-6">
                                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                       <Shield className="w-5 h-5 mr-2 text-red-500" />
                                                       Privacy Settings
                                                  </h4>
                                                  <div className="space-y-4">
                                                       <div className="flex items-center justify-between">
                                                            <div>
                                                                 <div className="font-medium text-gray-900">Profile Visibility</div>
                                                                 <div className="text-sm text-gray-500">Make profile visible to others</div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      checked={isEditing ? editedProfile.privacy.profileVisible : profile.privacy.profileVisible}
                                                                      onChange={(e) =>
                                                                           isEditing && handleNestedChange("privacy", "profileVisible", e.target.checked)
                                                                      }
                                                                      disabled={!isEditing}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                            </label>
                                                       </div>
                                                       <div className="flex items-center justify-between">
                                                            <div>
                                                                 <div className="font-medium text-gray-900">Show Investments</div>
                                                                 <div className="text-sm text-gray-500">Display investment information</div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                 <input
                                                                      type="checkbox"
                                                                      checked={
                                                                           isEditing ? editedProfile.privacy.showInvestments : profile.privacy.showInvestments
                                                                      }
                                                                      onChange={(e) =>
                                                                           isEditing && handleNestedChange("privacy", "showInvestments", e.target.checked)
                                                                      }
                                                                      disabled={!isEditing}
                                                                      className="sr-only peer"
                                                                 />
                                                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                            </label>
                                                       </div>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     )
}
