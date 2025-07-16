import { useState, useEffect } from 'react'
import { UserServices } from '@/apis/user'
import type { UserProfile, UserBackendFields } from '../types'
import toast from 'react-hot-toast'

const defaultProfile: UserProfile = {
    userId: "",
    firstName: "Default",
    lastName: "User",
    fullName: "Default User",
    email: "default@email.com",
    avatar: "https://tse4.mm.bing.net/th/id/OIP.0YMbH3u3Nq7TumFaeRiU3gHaHk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    joinDate: "January 2023",
    provider: "local",
    socialId: "",
    status: 1,
    isExpert: false,
    createdAt: "",
    updatedAt: "",
    refreshToken: "",
}

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile)
    const [editedProfile, setEditedProfile] = useState<UserProfile>(defaultProfile)
    const [userBackendFields, setUserBackendFields] = useState<UserBackendFields>({
        provider: '',
        socialId: '',
        status: '',
        passwordHash: '',
    })
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true) // Start with loading true
    const userId = localStorage.getItem("userId")

    // Load user profile from API
    useEffect(() => {
        const loadProfile = async () => {
            if (!userId) {
                console.log('No userId found in localStorage')
                toast.error('User ID not found. Please login again.')
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            try {
                const res = await UserServices.getUserById(userId)

                if (res && !res.error) {
                    if (res.data) {
                        const userData = res.data

                        setProfile((prev) => ({
                            ...prev,
                            userId: userData.userId || prev.userId,
                            firstName: userData.fullName?.split(" ")[0] || prev.firstName,
                            lastName: userData.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
                            fullName: userData.fullName || prev.fullName,
                            email: userData.email || prev.email,
                            avatar: userData.avatarUrl || prev.avatar,
                            provider: userData.provider || prev.provider,
                            socialId: userData.socialId || prev.socialId,
                            status: userData.status || prev.status,
                            isExpert: userData.isExpert || prev.isExpert,
                            createdAt: userData.createdAt || prev.createdAt,
                            updatedAt: userData.updatedAt || prev.updatedAt,
                            refreshToken: userData.refreshToken || prev.refreshToken,
                            joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : prev.joinDate,
                        }))
                        setUserBackendFields({
                            provider: userData.provider || '',
                            socialId: userData.socialId || '',
                            status: userData.status?.toString() || '',
                            passwordHash: userData.passwordHash || '',
                        })
                        toast.success('Profile loaded successfully!')
                    } else {
                        console.log('API returned success but no data - this might be expected for some endpoints')
                        console.log('Using default profile data')
                    }
                } else {
                    console.log('API returned error:', res?.message)
                    toast.error(res?.message || 'Failed to load profile')
                }
            } catch (error) {
                console.error('Error loading profile:', error)
                toast.error('Failed to load profile')
            } finally {
                setIsLoading(false)
            }
        }

        loadProfile()
    }, [userId])

    // Function to refetch profile
    const refetchProfile = async () => {
        if (!userId) return

        setIsLoading(true)
        try {
            const res = await UserServices.getUserById(userId)

            if (res && !res.error) {
                if (res.data) {
                    const userData = res.data

                    setProfile((prev) => ({
                        ...prev,
                        userId: userData.userId || prev.userId,
                        firstName: userData.fullName?.split(" ")[0] || prev.firstName,
                        lastName: userData.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
                        fullName: userData.fullName || prev.fullName,
                        email: userData.email || prev.email,
                        avatar: userData.avatarUrl || prev.avatar,
                        provider: userData.provider || prev.provider,
                        socialId: userData.socialId || prev.socialId,
                        status: userData.status || prev.status,
                        isExpert: userData.isExpert || prev.isExpert,
                        createdAt: userData.createdAt || prev.createdAt,
                        updatedAt: userData.updatedAt || prev.updatedAt,
                        refreshToken: userData.refreshToken || prev.refreshToken,
                        joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : prev.joinDate,
                    }))
                    setUserBackendFields({
                        provider: userData.provider || '',
                        socialId: userData.socialId || '',
                        status: userData.status?.toString() || '',
                        passwordHash: userData.passwordHash || '',
                    })
                    toast.success('Profile refreshed successfully!')
                } else {
                    console.log('API returned success but no data')
                }
            } else {
                console.log('API returned error:', res?.message)
                toast.error(res?.message || 'Failed to refresh profile')
            }
        } catch (error) {
            console.error('Error refreshing profile:', error)
            toast.error('Failed to refresh profile')
        } finally {
            setIsLoading(false)
        }
    }

    // Remove the old loadProfile function and replace with the new one
    // useEffect(() => {
    //     const loadProfile = async () => {

    //         // const accessToken = localStorage.getItem("accessToken")
    //         // const adminToken = localStorage.getItem("adminToken")

    //         // console.log('=== Profile Loading Debug ===')
    //         // console.log('userId:', userId)
    //         // console.log('accessToken:', accessToken ? 'Present' : 'Not found')
    //         // console.log('adminToken:', adminToken ? 'Present' : 'Not found')

    //         if (!userId) {
    //             console.log('No userId found in localStorage')
    //             toast.error('User ID not found. Please login again.')
    //             return
    //         }

    //         // console.log('Loading profile for userId:', userId)
    //         setIsLoading(true)
    //         try {
    //             const res = await UserServices.getUserById(userId) // Use userId as string instead of Number(userId)
    //             // console.log('=== API Response Debug ===')
    //             // console.log('Full response:', res)
    //             // console.log('Response data:', res?.data)
    //             // console.log('Response error:', res?.error)
    //             // console.log('Response message:', res?.message)

    //             if (res && !res.error) {
    //                 if (res.data) {
    //                     const userData = res.data
    //                     // console.log('Processing user data:', userData)
    //                     // console.log('User ID:', userData.userId)
    //                     // console.log('Full Name:', userData.fullName)
    //                     // console.log('Email:', userData.email)
    //                     // console.log('Avatar URL:', userData.avatarUrl)
    //                     // console.log('Provider:', userData.provider)
    //                     // console.log('Social ID:', userData.socialId)
    //                     // console.log('Status:', userData.status)
    //                     // console.log('Is Expert:', userData.isExpert)
    //                     // console.log('Created At:', userData.createdAt)
    //                     // console.log('Updated At:', userData.updatedAt)

    //                     setProfile((prev) => ({
    //                         ...prev,
    //                         userId: userData.userId || prev.userId,
    //                         firstName: userData.fullName?.split(" ")[0] || prev.firstName,
    //                         lastName: userData.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
    //                         fullName: userData.fullName || prev.fullName,
    //                         email: userData.email || prev.email,
    //                         avatar: userData.avatarUrl || prev.avatar,
    //                         provider: userData.provider || prev.provider,
    //                         socialId: userData.socialId || prev.socialId,
    //                         status: userData.status || prev.status,
    //                         isExpert: userData.isExpert || prev.isExpert,
    //                         createdAt: userData.createdAt || prev.createdAt,
    //                         updatedAt: userData.updatedAt || prev.updatedAt,
    //                         refreshToken: userData.refreshToken || prev.refreshToken,
    //                         joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : prev.joinDate,
    //                     }))
    //                     setUserBackendFields({
    //                         provider: userData.provider || '',
    //                         socialId: userData.socialId || '',
    //                         status: userData.status?.toString() || '',
    //                         passwordHash: userData.passwordHash || '',
    //                     })
    //                     // console.log('Profile updated successfully')
    //                     toast.success('Profile loaded successfully!')
    //                 } else {
    //                     console.log('API returned success but no data - this might be expected for some endpoints')
    //                     console.log('Using default profile data')
    //                     // Don't show error toast here, just use default data
    //                 }
    //             } else {
    //                 console.log('API returned error:', res?.message)
    //                 toast.error(res?.message || 'Failed to load profile')
    //             }
    //         } catch (error) {
    //             console.error('Error loading profile:', error)
    //             toast.error('Failed to load profile')
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     loadProfile()
    // }, [userId])

    // Sync edited profile with main profile
    useEffect(() => {
        setEditedProfile(profile)
    }, [profile])

    const handleSave = async () => {
        const userId = localStorage.getItem("userId")
        if (!userId) return

        const fullName = `${editedProfile.firstName} ${editedProfile.lastName}`.trim()
        setIsLoading(true)

        try {
            const res = await UserServices.updateUser(
                userId, // Use userId as string instead of Number(userId)
                {
                    email: editedProfile.email,
                    passwordHash: userBackendFields.passwordHash || '',
                    fullName,
                    provider: userBackendFields.provider,
                    socialId: userBackendFields.socialId,
                    status: userBackendFields.status,
                }
            )

            if (res.error === true) {
                toast.error(res.message || 'Failed to update profile.')
            } else {
                if (res.data) {
                    setProfile((prev) => ({
                        ...prev,
                        firstName: res.data.fullName?.split(" ")[0] || prev.firstName,
                        lastName: res.data.fullName?.split(" ").slice(1).join(" ") || prev.lastName,
                        email: res.data.email || prev.email,
                        avatar: res.data.avatarUrl || prev.avatar,
                    }))
                }
                setIsEditing(false)
                toast.success('Profile updated successfully!')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('Failed to update profile.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setEditedProfile(profile)
        setIsEditing(false)
    }

    const handleInputChange = (field: keyof UserProfile, value: string | number | boolean) => {
        setEditedProfile((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return {
        profile,
        editedProfile,
        userBackendFields,
        isEditing,
        isLoading,
        setIsEditing,
        handleSave,
        handleCancel,
        handleInputChange,
        refetchProfile,
    }
}
