import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Lock,
    CreditCard,
    Bell,
    Shield,
    Settings,
    Eye,
    EyeOff,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    RefreshCw,
    TrendingUp,
    Database,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";

export default function AccountSettings() {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const thongTinTaiKhoan = {
        ten: "John Smith",
        email: "john.smith@email.com",
        soDienThoai: "+84 123 456 789",
        diaChi: "District 1, Ho Chi Minh City",
        ngayThamGia: "January 15, 2024",
        goi: "Pro Trader",
        trangThai: "Active"
    };

    const thongTinCredit = {
        soDuHienTai: 1250,
        tongTruyVan: 2000,
        daSuDung: 750,
        conLai: 1250,
        ngayLamMoi: "July 1, 2024",
        lichSuGiaoDich: [
            { ngay: "June 25, 2024", loai: "Package Purchase", soLuong: "+2000", trangThai: "completed" },
            { ngay: "June 20, 2024", loai: "AI Analysis", soLuong: "-50", trangThai: "completed" },
            { ngay: "June 18, 2024", loai: "Report Generation", soLuong: "-25", trangThai: "completed" },
            { ngay: "June 15, 2024", loai: "Market Scan", soLuong: "-15", trangThai: "completed" }
        ]
    };

    const cauHinhThongBao = [
        { ten: "Email notifications for market alerts", daBat: true },
        { ten: "SMS notifications for price changes", daBat: false },
        { ten: "Weekly portfolio summary", daBat: true },
        { ten: "New feature announcements", daBat: true },
        { ten: "Security alerts", daBat: true }
    ];

    return (
        <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/20">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-xl border-b border-red-100/50 p-6 shadow-lg">
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                            ⚙️ Account Settings
                        </h1>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            Manage your personal information, security settings, and account preferences
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-8">
                    {/* Personal Information */}
                    <div className="px-6">
                        <h2 className="text-4xl font-semibold text-gray-900 flex items-center mb-6 pt-7">
                            <User className="w-8 h-8 mr-3 text-red-500" />
                            Personal Information
                        </h2>
                        
                        <Card className="border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            JS
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-2xl font-bold text-gray-900">{thongTinTaiKhoan.ten}</h3>
                                        <p className="text-gray-600 mb-2">{thongTinTaiKhoan.email}</p>
                                        <Badge className="bg-green-100 text-green-800">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            {thongTinTaiKhoan.trangThai}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Full Name
                                        </label>
                                        <Input 
                                            type="text" 
                                            defaultValue={thongTinTaiKhoan.ten}
                                            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email Address
                                        </label>
                                        <Input 
                                            type="email" 
                                            defaultValue={thongTinTaiKhoan.email}
                                            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number
                                        </label>
                                        <Input 
                                            type="tel" 
                                            defaultValue={thongTinTaiKhoan.soDienThoai}
                                            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Address
                                        </label>
                                        <Input 
                                            type="text" 
                                            defaultValue={thongTinTaiKhoan.diaChi}
                                            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Security Settings */}
                    <div className="px-6">
                        <h2 className="text-4xl font-semibold text-gray-900 flex items-center mb-6 pt-7">
                            <Lock className="w-8 h-8 mr-3 text-red-500" />
                            Security Settings
                        </h2>
                        
                        <Card className="border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Input 
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                                className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div></div>

                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Input 
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-md font-semibold text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Input 
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <div className="text-md text-yellow-800">
                                            <p className="font-semibold mb-1">Password Requirements:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>At least 8 characters long</li>
                                                <li>Contains uppercase and lowercase letters</li>
                                                <li>Contains at least one number</li>
                                                <li>Contains at least one special character</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Update Password
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Credit & Usage */}
                    <div className="px-6">
                        <h2 className="text-4xl font-semibold text-gray-900 flex items-center mb-6 pt-7">
                            <CreditCard className="w-8 h-8 mr-3 text-red-500" />
                            Credit & Usage Management
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Current Plan & Usage */}
                            <Card className="border-0 bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Current Plan</h3>
                                        <Badge className="bg-orange-100 text-orange-800 text-lg px-4 py-2">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            {thongTinTaiKhoan.goi}
                                        </Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Database className="w-5 h-5 text-red-500 mr-3" />
                                                <span className="font-semibold">Available Queries</span>
                                            </div>
                                            <span className="text-2xl font-bold text-red-600">{thongTinCredit.conLai.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <RefreshCw className="w-5 h-5 text-gray-500 mr-3" />
                                                <span className="font-semibold">Total Monthly Limit</span>
                                            </div>
                                            <span className="text-xl font-bold text-gray-700">{thongTinCredit.tongTruyVan.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                                            <div className="flex items-center">
                                                <TrendingUp className="w-5 h-5 text-orange-500 mr-3" />
                                                <span className="font-semibold">Used This Month</span>
                                            </div>
                                            <span className="text-xl font-bold text-orange-600">{thongTinCredit.daSuDung.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                                                <span className="font-semibold">Next Renewal</span>
                                            </div>
                                            <span className="text-lg font-bold text-blue-600">{thongTinCredit.ngayLamMoi}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Upgrade Plan
                                        </Button>
                                        <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Buy Additional Queries
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Transaction History */}
                            <Card className="border-0 bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                        <Clock className="w-6 h-6 mr-2 text-red-500" />
                                        Recent Activity
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {thongTinCredit.lichSuGiaoDich.map((giaoDich, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{giaoDich.loai}</p>
                                                    <p className="text-md text-gray-600">{giaoDich.ngay}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold text-lg ${
                                                        giaoDich.soLuong.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {giaoDich.soLuong}
                                                    </p>
                                                    <Badge variant="outline" className="text-xs">
                                                        {giaoDich.trangThai}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50">
                                        View All Transactions
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    

                    {/* Account Actions */}
                    <div className="px-6 pb-8">
                        <h2 className="text-4xl font-semibold text-gray-900 flex items-center mb-6 pt-7">
                            <Settings className="w-8 h-8 mr-3 text-red-500" />
                            Account Actions
                        </h2>
                        
                        <Card className="border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="border border-blue-200 bg-blue-50">
                                        <CardContent className="p-6 text-center">
                                            <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-bold text-blue-900 mb-2">Export Data</h3>
                                            <p className="text-md text-blue-700 mb-4">Download your account data and trading history</p>
                                            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                                                Export
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-yellow-200 bg-yellow-50">
                                        <CardContent className="p-6 text-center">
                                            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-bold text-yellow-900 mb-2">Pause Account</h3>
                                            <p className="text-md text-yellow-700 mb-4">Temporarily suspend your account access</p>
                                            <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-100">
                                                Pause
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-red-200 bg-red-50">
                                        <CardContent className="p-6 text-center">
                                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-bold text-red-900 mb-2">Delete Account</h3>
                                            <p className="text-md text-red-700 mb-4">Permanently delete your account and data</p>
                                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                                                Delete
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 