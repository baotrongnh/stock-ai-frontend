import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Key } from "lucide-react"

export const ProfileHeaderSkeleton = () => {
    return (
        <div className="bg-white border-b border-gray-200">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-12 py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-48 bg-white/20" />
                        <Skeleton className="h-4 w-32 mt-1 bg-white/20" />
                    </div>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-12 py-6 bg-white">
                <div className="flex items-start space-x-6">
                    {/* Avatar */}
                    <div className="">
                        <Skeleton className="w-24 h-24 rounded-full border-4 border-white shadow-xl" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton className="h-4 w-32" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-64" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 pt-2">
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProfileSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                        <User className="w-6 h-6 mr-3 text-red-500" />
                        <Skeleton className="h-6 w-48" />
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-4 w-12 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Skeleton className="h-4 w-28 mb-2" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export const AccountDetailsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                        <Key className="w-5 h-5 mr-2 text-red-500" />
                        <Skeleton className="h-5 w-40" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Skeleton className="h-4 w-16 mb-1" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-16 mb-1" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-28 mb-1" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <Skeleton className="h-5 w-32 mb-4" />
                    <div className="space-y-4">
                        <div>
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-6 w-28" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-16 mb-1" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
