export interface UserProfile {
    userId: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    avatar: string
    provider: string
    socialId: string
    status: number
    isExpert: boolean
    createdAt: string
    updatedAt: string
    joinDate: string
    refreshToken: string
}

export interface UserBackendFields {
    provider: string
    socialId: string
    status: string
    passwordHash: string
}

export interface TabItem {
    id: string
    label: string
    icon: React.ReactNode
}
