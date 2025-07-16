import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, Crown, Key, User, XCircle } from "lucide-react"
import type { UserProfile } from "../types"

interface AccountDetailsTabProps {
    profile: UserProfile
}

export const AccountDetailsTab = ({ profile }: AccountDetailsTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Key className="w-5 h-5 mr-2 text-red-500" />
                        Account Information
                    </h4>
                    <div className="space-y-4">
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                            <p className="text-gray-900 py-2 font-mono text-sm bg-gray-50 rounded px-2">
                                {profile.userId}
                            </p>
                        </div> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`${profile.provider === 'google' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        profile.provider === 'facebook' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-gray-50 text-gray-700 border-gray-200'
                                    }`}>
                                    <Globe className="w-3 h-3 mr-1" />
                                    {profile.provider === 'google' ? 'Google' :
                                        profile.provider === 'facebook' ? 'Facebook' :
                                            'Local Account'}
                                </Badge>
                            </div>
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Social ID</label>
                            <p className="text-gray-900 py-2 font-mono text-sm bg-gray-50 rounded px-2">
                                {profile.socialId || 'Not linked to social account'}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                            <Badge variant="outline" className={`${profile.status === 1 ? 'bg-green-50 text-green-700 border-green-200' :
                                    'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                {profile.status === 1 ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                    <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {profile.status === 1 ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-red-500" />
                        Account Timeline
                    </h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Account Created</span>
                                <Calendar className="w-4 h-4 text-blue-500" />
                            </div>
                            <p className="text-lg font-semibold text-blue-700">
                                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : 'Not available'}
                            </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Last Updated</span>
                                <Clock className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-lg font-semibold text-green-700">
                                {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : 'Not available'}
                            </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Expert Status</span>
                                {profile.isExpert ? (
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                ) : (
                                    <User className="w-4 h-4 text-gray-500" />
                                )}
                            </div>
                            <p className="text-lg font-semibold text-purple-700">
                                {profile.isExpert ? 'Expert Account' : 'Regular User'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
