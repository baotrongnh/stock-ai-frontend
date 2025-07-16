import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    Camera,
    CheckCircle,
    Crown,
    Edit3,
    Save,
    X,
    XCircle
} from "lucide-react"
import type { UserProfile } from "../types"

interface ProfileHeaderProps {
    profile: UserProfile
    isEditing: boolean
    isLoading: boolean
    onEdit: () => void
    onSave: () => void
    onCancel: () => void
    onRefresh?: () => void
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileHeader = ({
    profile,
    isEditing,
    isLoading,
    onEdit,
    onSave,
    onCancel,
    onFileChange,
}: ProfileHeaderProps) => {
    return (
        <div className="bg-white border-b border-gray-200">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-12 py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-red-100 mt-1">{profile.isExpert === true ? "Financial Analyst" : "Regular User"}</p>
                    </div>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-12 py-6 bg-white">
                <div className="flex items-start space-x-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={profile.avatar || "https://tse4.mm.bing.net/th/id/OIP.0YMbH3u3Nq7TumFaeRiU3gHaHk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        {isEditing && (
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg cursor-pointer">
                                <Camera className="w-4 h-4" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    name="avatar"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => onFileChange && onFileChange(e)}
                                />
                            </label>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="text-sm">Joined {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2023'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {profile.isExpert && (
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Expert
                                    </Badge>
                                )}
                                <Badge variant="outline" className={`${profile.status === 1 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    {profile.status === 1 ? (
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                    ) : (
                                        <XCircle className="w-3 h-3 mr-1" />
                                    )}
                                    {profile.status === 1 ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>
                        <p className="text-gray-600 ">{profile.email}</p>
                        {/* <div className="flex items-center text-gray-500 text-sm">
                            <Globe className="w-4 h-4 mr-2" />
                            {profile.provider === 'google' ? 'Google Account' :
                                profile.provider === 'facebook' ? 'Facebook Account' :
                                    'Local Account'}
                        </div> */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 pt-2">
                        {!isEditing ? (
                            <div className="flex gap-2">
                                {/* {onRefresh && (
                                    <Button
                                        onClick={onRefresh}
                                        disabled={isLoading}
                                        variant="outline"
                                        className="border-red-200 text-red-600 bg-transparent rounded-xl px-4"
                                    >
                                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                        Refresh
                                    </Button>
                                )} */}
                                {profile.provider !== 'google' ? (
                                    <Button
                                        onClick={onEdit}
                                        disabled={isLoading}
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl px-6"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={true}
                                        className="bg-gray-300 text-gray-600 rounded-xl px-6 cursor-not-allowed"
                                        title="Google account profiles cannot be edited"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Cannot Edit Google Profile
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    onClick={onSave}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl px-4"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                                <Button
                                    onClick={onCancel}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="border-red-200 text-red-600 bg-transparent rounded-xl px-4"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
