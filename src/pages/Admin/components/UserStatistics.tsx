"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, UserCheck, UserX, TrendingUp, Loader2 } from "lucide-react"
import {
     Tooltip,
     ResponsiveContainer,
     PieChart,
     Pie,
     Cell,
} from "recharts"
import { getUserStatistics } from "@/apis/admin"
import toast from "react-hot-toast"

// Define interfaces for the API response
interface UserStats {
     overview: {
          totalUsers: number;
          totalActiveUsers: number;
          totalInactiveUsers: number;
          totalExperts: number;
          totalRegularUsers: number;
     };
     providers: {
          unknown: number;
          google: number;
          local: number;
     };
     recentUsers: Array<{
          userId: string;
          email: string;
     }>;
     registrations: {
          today: number;
          thisWeek: number;
          thisMonth: number;
          lastMonth: number;
          growthRate: string;
     };
}

export function UserStatistics() {
     const [loading, setLoading] = useState(false);
     const [stats, setStats] = useState<UserStats | null>(null);
     const [userTypeData, setUserTypeData] = useState([
          { name: "Active Users", value: 0, color: "#dc2626" },
          { name: "Inactive Users", value: 0, color: "#fca5a5" },
          { name: "Expert Users", value: 0, color: "#7f1d1d" },
     ]);

     // Data for provider distribution
     const [providerData, setProviderData] = useState([
          { name: "Unknown", value: 0, color: "#9ca3af" },
          { name: "Google", value: 0, color: "#4285F4" },
          { name: "Local", value: 0, color: "#34a853" },
     ]);

     useEffect(() => {
          fetchUserStatistics();
     }, []);

     const fetchUserStatistics = async () => {
          setLoading(true);
          try {
               const response = await getUserStatistics();
               const responseData = response.data;

               // Log the full response structure for debugging
               console.log("API Response:", responseData);

               if (responseData && responseData.data) {
                    setStats(responseData.data);

                    // Update user type distribution data
                    if (responseData.data.overview) {
                         setUserTypeData([
                              { name: "Active Users", value: responseData.data.overview.totalActiveUsers || 0, color: "#dc2626" },
                              { name: "Inactive Users", value: responseData.data.overview.totalInactiveUsers || 0, color: "#fca5a5" },
                              { name: "Expert Users", value: responseData.data.overview.totalExperts || 0, color: "#7f1d1d" },
                         ]);
                    }

                    // Update provider data
                    if (responseData.data.providers) {
                         setProviderData([
                              { name: "Unknown", value: responseData.data.providers.unknown || 0, color: "#9ca3af" },
                              { name: "Google", value: responseData.data.providers.google || 0, color: "#4285F4" },
                              { name: "Local", value: responseData.data.providers.local || 0, color: "#34a853" },
                         ]);
                    }
               } else {
                    console.error("API response is not in the expected format:", responseData);
                    toast.error("Data format error");
               }
          } catch (error) {
               console.error("Failed to fetch user statistics:", error);
               toast.error("Failed to load user statistics");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="w-full max-w-none space-y-6">
               {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
                         <div className="flex flex-col items-center">
                              <Loader2 className="animate-spin h-10 w-10 text-red-600 mb-2" />
                              <p className="text-red-800 font-medium">Loading statistics...</p>
                         </div>
                    </div>
               )}

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
                              <div className="text-2xl font-bold text-red-900">{stats?.overview?.totalUsers || 0}</div>
                              <p className="text-xs text-red-600">
                                   <TrendingUp className="inline h-3 w-3 mr-1" />
                                   {stats?.registrations?.growthRate || '0%'} from last month
                              </p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">New Users</CardTitle>
                              <UserPlus className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">+{stats?.registrations?.thisMonth || 0}</div>
                              <p className="text-xs text-red-600">This month</p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Active Users</CardTitle>
                              <UserCheck className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{stats?.overview?.totalActiveUsers || 0}</div>
                              <p className="text-xs text-red-600">
                                   {stats?.overview?.totalUsers
                                        ? `${Math.round((stats.overview.totalActiveUsers / stats.overview.totalUsers) * 100)}% of total users`
                                        : '0% of total users'}
                              </p>
                         </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium text-red-900">Expert Users</CardTitle>
                              <UserX className="h-4 w-4 text-red-600" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold text-red-900">{stats?.overview?.totalExperts || 0}</div>
                              <p className="text-xs text-red-600">
                                   {stats?.overview?.totalUsers
                                        ? `${Math.round((stats.overview.totalExperts / stats.overview.totalUsers) * 100)}% of total users`
                                        : '0% of total users'}
                              </p>
                         </CardContent>
                    </Card>
               </div>

               {/* Charts */}
               <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card className="border-red-200 bg-white shadow-sm">
                         <CardHeader>
                              <CardTitle className="text-red-900">User Registration</CardTitle>
                              <CardDescription className="text-red-700">Recent registration statistics</CardDescription>
                         </CardHeader>
                         <CardContent>
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                   <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                                        <p className="text-sm text-red-800 font-medium">Today</p>
                                        <p className="text-2xl font-bold text-red-900">{stats?.registrations?.today || 0}</p>
                                   </div>
                                   <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                                        <p className="text-sm text-red-800 font-medium">This Week</p>
                                        <p className="text-2xl font-bold text-red-900">{stats?.registrations?.thisWeek || 0}</p>
                                   </div>
                                   <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                                        <p className="text-sm text-red-800 font-medium">This Month</p>
                                        <p className="text-2xl font-bold text-red-900">{stats?.registrations?.thisMonth || 0}</p>
                                   </div>
                                   <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                                        <p className="text-sm text-red-800 font-medium">Last Month</p>
                                        <p className="text-2xl font-bold text-red-900">{stats?.registrations?.lastMonth || 0}</p>
                                   </div>
                              </div>
                              <div className="flex items-center justify-center mt-4">
                                   <div className="text-center">
                                        <p className="text-sm text-red-700 mb-1">Growth Rate</p>
                                        <p className="text-3xl font-bold text-red-900">{stats?.registrations?.growthRate || "0%"}</p>
                                        <p className="text-xs text-red-600 mt-1">Compared to last month</p>
                                   </div>
                              </div>
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
                                             <span className="text-sm text-red-800">{item.name}: {item.value}</span>
                                        </div>
                                   ))}
                              </div>
                         </CardContent>
                    </Card>
               </div>

               {/* Provider Distribution */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">Login Providers</CardTitle>
                         <CardDescription className="text-red-700">How users authenticate</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                   <Pie
                                        data={providerData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                   >
                                        {providerData.map((entry, index) => (
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
                              {providerData.map((item, index) => (
                                   <div key={index} className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm text-red-800">{item.name}: {item.value}</span>
                                   </div>
                              ))}
                         </div>
                    </CardContent>
               </Card>

               {/* Recent Users */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">Recent Users</CardTitle>
                         <CardDescription className="text-red-700">Recently registered users</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="w-full space-y-4">
                              {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                                   stats.recentUsers.map((user, index) => (
                                        <div
                                             key={user.userId || index}
                                             className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                                        >
                                             <div className="flex items-center space-x-3">
                                                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                                       <span className="text-white text-sm font-medium">{user.email?.charAt(0) || "U"}</span>
                                                  </div>
                                                  <div>
                                                       <p className="text-sm text-red-900">
                                                            <span className="font-medium">User</span> registered with email
                                                       </p>
                                                       <p className="text-xs text-red-600">{user.email}</p>
                                                  </div>
                                             </div>
                                             <Badge variant="outline" className="border-red-300 text-red-700 bg-white">
                                                  new user
                                             </Badge>
                                        </div>
                                   ))
                              ) : (
                                   <div className="text-center p-4">
                                        <p className="text-red-700">No recent users to display</p>
                                   </div>
                              )}
                         </div>
                    </CardContent>
               </Card>
          </div>
     )
}
