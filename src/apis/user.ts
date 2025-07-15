import axiosClient from "./axiosClient"

type UserPayload = {
    email: string
    passwordHash: string
    fullName: string
    provider: string
    socialId: string
    status: string
}

const createUser = async (data: UserPayload & { avatarUrl?: string }) => {
    const response = await axiosClient.post('/users', data)
    return response.data
}

const getUsers = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/users', {
        params: {
            page,
            pageSize,
        },
    })
    return response.data
}

const getUserById = async (id: number) => {
    const response = await axiosClient.get(`/users/${id}`)
    return response.data
}

const updateUser = async (
    id: number,
    updateData: UserPayload,
    file?: File
) => {
    const formData = new FormData()

    // Append user fields
    formData.append("email", updateData.email)
    formData.append("passwordHash", updateData.passwordHash)
    formData.append("fullName", updateData.fullName)
    formData.append("provider", updateData.provider)
    formData.append("socialId", updateData.socialId)
    formData.append("status", updateData.status)

    // Optional file upload
    if (file) {
        formData.append("file", file)
    }

    const response = await axiosClient.patch(`/users/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return response.data
}

const deleteUser = async (id: number) => {
    const response = await axiosClient.delete(`/users/${id}`)
    return response.data
}

export const UserServices = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}
