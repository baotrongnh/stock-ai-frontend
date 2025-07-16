import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Calendar, Shield, Info } from "lucide-react"
import type { UserProfile } from "../types"

interface PersonalInfoTabProps {
    profile: UserProfile
    editedProfile: UserProfile
    isEditing: boolean
    onInputChange: (field: keyof UserProfile, value: string | number | boolean) => void
}

export const PersonalInfoTab = ({
    profile,
    editedProfile,
    isEditing,
    onInputChange
}: PersonalInfoTabProps) => {
    return (
        <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                        <User className="w-6 h-6 mr-3 text-red-500" />
                        Personal Information
                    </h4>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                {isEditing ? (
                                    <Input
                                        value={editedProfile.firstName}
                                        onChange={(e) => onInputChange("firstName", e.target.value)}
                                        className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                    />
                                ) : (
                                    <p className="text-gray-900 py-3 text-lg">{profile.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                {isEditing ? (
                                    <Input
                                        value={editedProfile.lastName}
                                        onChange={(e) => onInputChange("lastName", e.target.value)}
                                        className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                    />
                                ) : (
                                    <p className="text-gray-900 py-3 text-lg">{profile.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            {isEditing ? (
                                <Input
                                    type="email"
                                    value={editedProfile.email}
                                    onChange={(e) => onInputChange("email", e.target.value)}
                                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                />
                            ) : (
                                <p className="text-gray-900 py-3 text-lg flex items-center">
                                    <Mail className="w-5 h-5 mr-3 text-gray-500" />
                                    {profile.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <p className="text-gray-900 py-3 text-lg bg-gray-50 rounded-lg px-4">{profile.fullName}</p>
                            <p className="text-xs text-gray-500 mt-1">This is automatically generated from first and last name</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                                <Badge
                                    variant={profile.status === 1 ? 'default' : 'secondary'}
                                    className="text-sm px-3 py-1"
                                >
                                    <Shield className="w-4 h-4 mr-1" />
                                    {profile.status === 1 ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expert Status</label>
                                <Badge
                                    variant={profile.isExpert ? 'default' : 'secondary'}
                                    className="text-sm px-3 py-1"
                                >
                                    <Info className="w-4 h-4 mr-1" />
                                    {profile.isExpert ? 'Expert' : 'Regular User'}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                            <p className="text-gray-900 py-3 text-lg flex items-center">
                                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                                {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        {/* {profile.provider && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Provider</label>
                                <p className="text-gray-900 py-3 text-lg capitalize">{profile.provider}</p>
                            </div>
                        )} */}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
