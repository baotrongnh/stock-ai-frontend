import {
     Sidebar,
     SidebarContent,
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarRail,
     SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, AlertTriangle, Shield, LogOut, User, Users } from "lucide-react"
import { Mic, Newspaper } from "lucide-react" // Import icons for News and Podcast

const navigationItems = [
     {
          title: "Overview",
          items: [
               {
                    title: "User Statistics",
                    icon: BarChart3,
                    key: "statistics",
               },
          ],
     },
     {
          title: "User Management",
          items: [
               {
                    title: "All Users",
                    icon: Users,
                    key: "users",
               },
          ],
     },
     {
          title: "Content Management",
          items: [
               {
                    title: "Posts Management",
                    icon: FileText,
                    key: "posts",
               },
               {
                    title: "Complaints Management",
                    icon: AlertTriangle,
                    key: "complaints",
               },
               {
                    title: "News Management", // Added News Management
                    icon: Newspaper,
                    key: "news",
               },
               {
                    title: "Podcast Management", // Added Podcast Management
                    icon: Mic,
                    key: "podcasts",
               },
          ],
     },
]

interface AdminSidebarProps {
     activeView: string
     setActiveView: (view: string) => void
}

export function AdminSidebar({ activeView, setActiveView }: AdminSidebarProps) {

     const handleLogout = () => {
          // Clear authentication data
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminUser")

          console.log("LOGOUT - Admin session ended:", {
               timestamp: new Date().toISOString(),
          })

          // Redirect to login page
     }

     const getAdminUser = () => {
          const userStr = localStorage.getItem("adminUser")
          return userStr ? JSON.parse(userStr) : null
     }

     const adminUser = getAdminUser()

     return (
          <Sidebar className="border-r border-red-200 bg-white" collapsible="icon" variant="sidebar">
               <SidebarHeader className="bg-gradient-to-b from-red-600 to-red-700 text-white border-b border-red-500">
                    <div className="flex items-center gap-2 px-4 py-3">
                         <Shield className="h-6 w-6 flex-shrink-0" />
                         <div className="min-w-0">
                              <h2 className="text-lg font-bold truncate">Admin Panel</h2>
                              <p className="text-red-100 text-sm truncate">Management Dashboard</p>
                         </div>
                    </div>
               </SidebarHeader>

               <SidebarContent className="bg-white">
                    {navigationItems.map((group) => (
                         <SidebarGroup key={group.title}>
                              <SidebarGroupLabel className="text-red-900 font-semibold px-4">{group.title}</SidebarGroupLabel>
                              <SidebarGroupContent>
                                   <SidebarMenu>
                                        {group.items.map((item) => (
                                             <SidebarMenuItem key={item.key}>
                                                  <SidebarMenuButton
                                                       onClick={() => setActiveView(item.key)}
                                                       isActive={activeView === item.key}
                                                       className="w-full text-red-800 hover:bg-red-50 hover:text-red-900 data-[active=true]:bg-red-100 data-[active=true]:text-red-900 data-[active=true]:border-r-2 data-[active=true]:border-red-600"
                                                       tooltip={item.title}
                                                  >
                                                       <item.icon className="h-4 w-4 flex-shrink-0" />
                                                       <span className="truncate">{item.title}</span>
                                                  </SidebarMenuButton>
                                             </SidebarMenuItem>
                                        ))}
                                   </SidebarMenu>
                              </SidebarGroupContent>
                         </SidebarGroup>
                    ))}
               </SidebarContent>

               <SidebarFooter className="border-t border-red-200 bg-red-50">
                    <div className="p-4 space-y-3">
                         {adminUser && (
                              <div className="flex items-center gap-2 text-sm text-red-800">
                                   <User className="h-4 w-4" />
                                   <span className="truncate">{adminUser.email}</span>
                              </div>
                         )}
                         <Button
                              onClick={handleLogout}
                              variant="outline"
                              size="sm"
                              className="w-full border-red-300 text-red-700 hover:bg-red-100 hover:text-red-900 bg-transparent"
                         >
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                         </Button>
                    </div>
               </SidebarFooter>

               <SidebarRail />
          </Sidebar>
     )
}
