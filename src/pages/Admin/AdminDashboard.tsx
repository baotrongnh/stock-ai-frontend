import { useEffect, useState } from "react"
import { AdminSidebar } from "./components/AdminSidebar.js"
import { PostsManagement } from "./components/PostsManagement.js"
import { ComplaintsManagement } from "./components/ComplaintsManagement.js"
import { UserStatistics } from "./components/UserStatistics.js"
import { UsersManagement } from "./components/UserManager.js"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router"

function AdminDashboardContent() {
    const [activeView, setActiveView] = useState("statistics")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            navigate("/admin/login")
        }
    }, [])

    const renderContent = () => {
        switch (activeView) {
            case "statistics":
                return <UserStatistics />
            case "users":
                return <UsersManagement />
            case "posts":
                return <PostsManagement />
            case "complaints":
                return <ComplaintsManagement />
            default:
                return <UserStatistics />
        }
    }

    const getBreadcrumbTitle = () => {
        switch (activeView) {
            case "statistics":
                return "User Statistics"
            case "users":
                return "Users Management"
            case "posts":
                return "Posts Management"
            case "complaints":
                return "Complaints Management"
            default:
                return "User Statistics"
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-white">
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
                    <SidebarInset className="flex-1 w-full">
                        <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center gap-2 border-b border-red-200 px-6 bg-white shadow-sm">
                            <SidebarTrigger className="-ml-1 text-red-600 hover:bg-red-100" />
                            <Separator orientation="vertical" className="mr-2 h-4 bg-red-300" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#" className="text-red-700 hover:text-red-900">
                                            Admin Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block text-red-400" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-red-900 font-medium">{getBreadcrumbTitle()}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </header>
                        <main className="flex-1 w-full max-w-none p-6 bg-gradient-to-br from-red-50 to-white">
                            <div className="w-full max-w-none">{renderContent()}</div>
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default function AdminDashboard() {
    return (
        <AdminDashboardContent />
    )
}
