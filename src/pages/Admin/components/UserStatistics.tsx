"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, UserCheck, UserX, TrendingUp } from "lucide-react"
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     ResponsiveContainer,
     BarChart,
     Bar,
     PieChart,
     Pie,
     Cell,
} from "recharts"

const userGrowthData = [
     { month: "Jan", users: 0 },
     { month: "Feb", users: 0 },
     { month: "Mar", users: 0 },
     { month: "Apr", users: 0 },
     { month: "May", users: 0 },
     { month: "Jun", users: 2 },
     {month: "Jul", users: 3 },
]

const userTypeData = [
     { name: "Active Users", value: 3, color: "#dc2626" },
     { name: "Inactive Users", value: 0, color: "#fca5a5" },
     { name: "Banned Users", value: 0, color: "#7f1d1d" },
]

const activityData = [
     { day: "Mon", posts: 45, comments: 120 },
     { day: "Tue", posts: 52, comments: 98 },
     { day: "Wed", posts: 38, comments: 145 },
     { day: "Thu", posts: 61, comments: 167 },
     { day: "Fri", posts: 55, comments: 134 },
     { day: "Sat", posts: 42, comments: 89 },
     { day: "Sun", posts: 35, comments: 76 },
]

export function UserStatistics() {
     return (
          <div className="w-full max-w-none space-y-6">
               <div className="mb-6 w-full">
                    <h1 className="text-3xl font-bold text-red-900">User Statistics</h1>
                    <p className="text-red-700 mt-2">Overview of user metrics and analytics</p>
               </div>

               {/* Overview Cards */}
               <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Total Users</CardTitle>
                              <Users className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">3</div>
                              <p className="text-xs text-red-600">
                                   <TrendingUp className="inline h-3 w-3 mr-1" />
                                   +150% from last month
                              </p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">New Users</CardTitle>
                              <UserPlus className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">+2</div>
                              <p className="text-xs text-red-600">This month</p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Active Users</CardTitle>
                              <UserCheck className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">3</div>
                              <p className="text-xs text-red-600">100% of total users</p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Banned Users</CardTitle>
                              <UserX className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">0</div>
                              <p className="text-xs text-red-600">0% of total users</p>
                         </CardContent>
                    </Card>
               </div>

               {/* Charts */}
               <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-red-900">User Growth</CardTitle>
                              <CardDescription className="text-red-700">Monthly user registration trends</CardDescription>
                         </CardHeader>
                         <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                   <LineChart data={userGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                                        <XAxis dataKey="month" stroke="#7f1d1d" />
                                        <YAxis stroke="#7f1d1d" />
                                        <Tooltip
                                             contentStyle={{
                                                  backgroundColor: "#ffffff",
                                                  border: "1px solid #fecaca",
                                                  borderRadius: "8px",
                                                  color: "#7f1d1d",
                                             }}
                                        />
                                        <Line
                                             type="monotone"
                                             dataKey="users"
                                             stroke="#dc2626"
                                             strokeWidth={3}
                                             dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                                        />
                                   </LineChart>
                              </ResponsiveContainer>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-red-900">User Distribution</CardTitle>
                              <CardDescription className="text-red-700">User status breakdown</CardDescription>
                         </CardHeader>
                         <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                   <PieChart>
                                        <Pie
                                             data={userTypeData}
                                             cx="50%"
                                             cy="50%"
                                             innerRadius={60}
                                             outerRadius={100}
                                             paddingAngle={5}
                                             dataKey="value"
                                        >
                                             {userTypeData.map((entry, index) => (
                                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                             ))}
                                        </Pie>
                                        <Tooltip
                                             contentStyle={{
                                                  backgroundColor: "#ffffff",
                                                  border: "1px solid #fecaca",
                                                  borderRadius: "8px",
                                                  color: "#7f1d1d",
                                             }}
                                        />
                                   </PieChart>
                              </ResponsiveContainer>
                              <div className="flex justify-center space-x-4 mt-4">
                                   {userTypeData.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                             <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                             <span className="text-sm text-red-800">{item.name}</span>
                                        </div>
                                   ))}
                              </div>
                         </CardContent>
                    </Card>
               </div>

               {/* Activity Chart */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">Daily Activity</CardTitle>
                         <CardDescription className="text-red-700">Posts and comments by day</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={activityData}>
                                   <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                                   <XAxis dataKey="day" stroke="#7f1d1d" />
                                   <YAxis stroke="#7f1d1d" />
                                   <Tooltip
                                        contentStyle={{
                                             backgroundColor: "#ffffff",
                                             border: "1px solid #fecaca",
                                             borderRadius: "8px",
                                             color: "#7f1d1d",
                                        }}
                                   />
                                   <Bar dataKey="posts" fill="#dc2626" name="Posts" />
                                   <Bar dataKey="comments" fill="#fca5a5" name="Comments" />
                              </BarChart>
                         </ResponsiveContainer>
                    </CardContent>
               </Card>

               {/* Recent Activity */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">Recent Activity</CardTitle>
                         <CardDescription className="text-red-700">Latest user activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="w-full space-y-4">
                              {[
                                   { user: "John Doe", action: "registered an account", time: "2 minutes ago", type: "register" },
                                   { user: "Jane Smith", action: "created a new post", time: "5 minutes ago", type: "post" },
                                   { user: "Mike Johnson", action: "left a comment", time: "10 minutes ago", type: "comment" },
                                   { user: "Sarah Wilson", action: "updated profile", time: "15 minutes ago", type: "update" },
                                   { user: "Tom Brown", action: "reported a violation", time: "20 minutes ago", type: "report" },
                              ].map((activity, index) => (
                                   <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                                   >
                                        <div className="flex items-center space-x-3">
                                             <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                                  <span className="text-white text-sm font-medium">{activity.user.charAt(0)}</span>
                                             </div>
                                             <div>
                                                  <p className="text-sm text-red-900">
                                                       <span className="font-medium">{activity.user}</span> {activity.action}
                                                  </p>
                                                  <p className="text-xs text-red-600">{activity.time}</p>
                                             </div>
                                        </div>
                                        <Badge variant="outline" className="border-red-300 text-red-700 bg-white">
                                             {activity.type}
                                        </Badge>
                                   </div>
                              ))}
                         </div>
                    </CardContent>
               </Card>
          </div>
     )
}
