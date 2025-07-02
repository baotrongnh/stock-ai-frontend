"use client"

import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bell,
    Check,
    Edit,
    Eye,
    FileText,
    Home,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    Shield,
    Trash2,
    TrendingUp,
    Users,
    X
} from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { getAllUsers } from "@/apis/admin"

const navigation = [
    {
        title: "Dashboard",
        icon: Home,
        url: "#dashboard",
    },
    {
        title: "Manage Users",
        icon: Users,
        url: "#users",
    },
    {
        title: "Reports",
        icon: FileText,
        url: "#reports",
    },
    {
        title: "Manage Stocks",
        icon: TrendingUp,
        url: "#stocks",
    },
    {
        title: "Settings",
        icon: Settings,
        url: "#settings",
    },
]

const mockReports = [
    {
        id: 1,
        type: "Spam Content",
        reporter: "user123",
        content: "Inappropriate stock recommendation",
        status: "pending",
        date: "2024-01-15",
    },
    {
        id: 2,
        type: "Misinformation",
        reporter: "user456",
        content: "False earnings data",
        status: "approved",
        date: "2024-01-14",
    },
    {
        id: 3,
        type: "Harassment",
        reporter: "user789",
        content: "Abusive comments in chat",
        status: "rejected",
        date: "2024-01-13",
    },
]

const mockStocks = [
    {
        id: 1,
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.43,
        change: "+2.34%",
        volume: "45.2M",
        lastUpdated: "2 min ago",
    },
    {
        id: 2,
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 142.56,
        change: "-1.23%",
        volume: "28.7M",
        lastUpdated: "1 min ago",
    },
    {
        id: 3,
        symbol: "MSFT",
        name: "Microsoft Corp.",
        price: 378.85,
        change: "+0.87%",
        volume: "32.1M",
        lastUpdated: "3 min ago",
    },
]

const mockActivityLogs = [
    { id: 1, action: "User role changed", user: "admin", target: "jane@example.com", timestamp: "2024-01-15 14:30" },
    { id: 2, action: "Report approved", user: "moderator", target: "Report #2", timestamp: "2024-01-15 14:25" },
    { id: 3, action: "Stock added", user: "admin", target: "NVDA", timestamp: "2024-01-15 14:20" },
]

export function AdminDashboard() {
    const [activeSection, setActiveSection] = React.useState("dashboard")
    const [selectedUser, setSelectedUser] = React.useState<any>(null)
    const [selectedReport, setSelectedReport] = React.useState<any>(null)
    const [selectedStock, setSelectedStock] = React.useState<any>(null)
    // const { theme, setTheme } = useTheme()


    type User = {
        userId: string
        fullName: string
        email: string
        role: string
        // add other fields as needed
    }
    const [listUsers, setListUsers] = React.useState<User[] | null>(null)

    const fetchDataUsers = async () => {
        const data = await getAllUsers()
        setListUsers(data.data.data.data)
    }

    React.useEffect(() => {
        fetchDataUsers()
    }, [])


    const renderDashboard = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening with your platform.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,847</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">-5% from yesterday</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Stocks</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+8 new today</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-green-600">All systems operational</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest actions performed on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockActivityLogs.map((log) => (
                                <div key={log.id} className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">{log.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            by {log.user} • {log.target} • {log.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button
                            className="w-full justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setActiveSection("users")}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Manage Users
                        </Button>
                        <Button
                            className="w-full justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setActiveSection("reports")}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Review Reports
                        </Button>
                        <Button
                            className="w-full justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setActiveSection("stocks")}
                        >
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Add New Stock
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

    const renderUsers = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
                    <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>A list of all users in your system</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listUsers?.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell className="font-medium">{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.role === "admin" ? "default" : user.role === "moderator" ? "secondary" : "outline"}
                                        >
                                            User
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant='default'>active</Badge>
                                    </TableCell>
                                    <TableCell>1 hour</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User Role</DialogTitle>
                        <DialogDescription>Change the role and permissions for {selectedUser?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <Select defaultValue={selectedUser?.role}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )

    const renderReports = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">Review and moderate user-generated content reports</p>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Reports</CardTitle>
                            <CardDescription>Reports awaiting moderation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Reporter</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockReports
                                        .filter((r) => r.status === "pending")
                                        .map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell>
                                                    <Badge variant="outline">{report.type}</Badge>
                                                </TableCell>
                                                <TableCell>{report.reporter}</TableCell>
                                                <TableCell className="max-w-xs truncate">{report.content}</TableCell>
                                                <TableCell>{report.date}</TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button size="sm" variant="outline" className="text-green-600 bg-transparent">
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => setSelectedReport(report)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="approved">
                    <Card>
                        <CardHeader>
                            <CardTitle>Approved Reports</CardTitle>
                            <CardDescription>Reports that have been approved</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Reporter</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockReports
                                        .filter((r) => r.status === "approved")
                                        .map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell>
                                                    <Badge variant="outline">{report.type}</Badge>
                                                </TableCell>
                                                <TableCell>{report.reporter}</TableCell>
                                                <TableCell className="max-w-xs truncate">{report.content}</TableCell>
                                                <TableCell>{report.date}</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="rejected">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rejected Reports</CardTitle>
                            <CardDescription>Reports that have been rejected</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Reporter</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockReports
                                        .filter((r) => r.status === "rejected")
                                        .map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell>
                                                    <Badge variant="outline">{report.type}</Badge>
                                                </TableCell>
                                                <TableCell>{report.reporter}</TableCell>
                                                <TableCell className="max-w-xs truncate">{report.content}</TableCell>
                                                <TableCell>{report.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant="destructive">Rejected</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Report Details</DialogTitle>
                        <DialogDescription>Review the full report and take appropriate action</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Report Type</Label>
                            <p className="text-sm text-muted-foreground">{selectedReport?.type}</p>
                        </div>
                        <div>
                            <Label>Reporter</Label>
                            <p className="text-sm text-muted-foreground">{selectedReport?.reporter}</p>
                        </div>
                        <div>
                            <Label>Content</Label>
                            <p className="text-sm text-muted-foreground">{selectedReport?.content}</p>
                        </div>
                        <div>
                            <Label>Additional Notes</Label>
                            <Textarea placeholder="Add your moderation notes here..." />
                        </div>
                    </div>
                    <DialogFooter className="space-x-2">
                        <Button variant="outline" className="text-red-600 bg-transparent">
                            Reject Report
                        </Button>
                        <Button className="text-green-600">Approve Report</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )

    const renderStocks = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Manage Stocks</h2>
                    <p className="text-muted-foreground">Add, edit, and remove stocks from the platform</p>
                </div>
                <Button onClick={() => setSelectedStock({})}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Stock
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Stock List</CardTitle>
                    <CardDescription>All stocks currently tracked on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockStocks.map((stock) => (
                                <TableRow key={stock.id}>
                                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                                    <TableCell>{stock.name}</TableCell>
                                    <TableCell>${stock.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={stock.change.startsWith("+") ? "default" : "destructive"}>{stock.change}</Badge>
                                    </TableCell>
                                    <TableCell>{stock.volume}</TableCell>
                                    <TableCell>{stock.lastUpdated}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setSelectedStock(stock)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Stock
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <BarChart3 className="mr-2 h-4 w-4" />
                                                    View Analytics
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove Stock
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!selectedStock} onOpenChange={() => setSelectedStock(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedStock?.id ? "Edit Stock" : "Add New Stock"}</DialogTitle>
                        <DialogDescription>
                            {selectedStock?.id ? "Update stock information" : "Add a new stock to track"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="symbol" className="text-right">
                                Symbol
                            </Label>
                            <Input
                                id="symbol"
                                defaultValue={selectedStock?.symbol || ""}
                                className="col-span-3"
                                placeholder="e.g., AAPL"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Company Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue={selectedStock?.name || ""}
                                className="col-span-3"
                                placeholder="e.g., Apple Inc."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{selectedStock?.id ? "Update Stock" : "Add Stock"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )

    const renderSettings = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your application settings and preferences</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Basic application configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="app-name">Application Name</Label>
                                <Input id="app-name" defaultValue="AI Stock Analysis" />
                            </div>
                            <div>
                                <Label htmlFor="admin-email">Admin Email</Label>
                                <Input id="admin-email" defaultValue="admin@stockanalysis.com" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Configure security and authentication settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                            </div>
                            <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Session Timeout</Label>
                                <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                            </div>
                            <Select defaultValue="30">
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Management</CardTitle>
                        <CardDescription>Configure data retention and backup settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Data Retention Period</Label>
                                <p className="text-sm text-muted-foreground">How long to keep user data</p>
                            </div>
                            <Select defaultValue="365">
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="90">90 days</SelectItem>
                                    <SelectItem value="180">180 days</SelectItem>
                                    <SelectItem value="365">1 year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Automatic Backups</Label>
                                <p className="text-sm text-muted-foreground">Schedule regular data backups</p>
                            </div>
                            <Button variant="outline">Configure</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return renderDashboard()
            case "users":
                return renderUsers()
            case "reports":
                return renderReports()
            case "stocks":
                return renderStocks()
            case "settings":
                return renderSettings()
            default:
                return renderDashboard()
        }
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <BarChart3 className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Stock Analysis</span>
                            <span className="text-xs text-muted-foreground">Admin Panel</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigation.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={activeSection === item.url.replace("#", "")}
                                            onClick={() => setActiveSection(item.url.replace("#", ""))}
                                        >
                                            <button className="flex items-center gap-2">
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />

                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search..." className="w-64 pl-8" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                                            <AvatarFallback>AD</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Admin User</p>
                                            <p className="text-xs leading-none text-muted-foreground">admin@stockanalysis.com</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Shield className="mr-2 h-4 w-4" />
                                        <span>Security</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
