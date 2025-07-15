import axiosClient from "./axiosClient.ts"

export type CreateCommentPayload = {
    postId: number
    userId: number
    parentCommentId?: number
    content: string
    isEdited?: boolean
    likeCount?: number
}

export type UpdateCommentPayload = {
    content?: string
    isEdited?: boolean
    likeCount?: number
}

const createComment = async (data: CreateCommentPayload) => {
    try {
        const response = await axiosClient.post('/comments', data)
        return response.data
    } catch (error) {
        console.error("Failed to create comment:", error)
        throw error
    }
}

const getComments = async (page: number, pageSize: number) => {
    try {
        const response = await axiosClient.get('/comments', {
            params: {
                page,
                pageSize,
            }
        })
        return response.data
    } catch (error) {
        console.error("Failed to fetch comments:", error)
        throw error
    }
}

const getCommentById = async (id: number) => {
    try {
        const response = await axiosClient.get(`/comments/${id}`)
        return response.data
    } catch (error) {
        console.error(`Failed to fetch comment with id ${id}:`, error)
        throw error
    }
}

const updateCommentById = async (id: number, updateData: UpdateCommentPayload) => {
    try {
        const response = await axiosClient.patch(`/comments/${id}`, updateData)
        return response.data
    } catch (error) {
        console.error(`Failed to update comment with id ${id}:`, error)
        throw error
    }
}

const deleteCommentById = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/comments/${id}`)
        return response.data
    } catch (error) {
        console.error(`Failed to delete comment with id ${id}:`, error)
        throw error
    }
}

export const CommentService = {
    createComment,
    getComments,
    getCommentById,
    updateCommentById,
    deleteCommentById,
}
