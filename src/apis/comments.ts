import axiosClient from "./axiosClient.ts"

export type CreateCommentPayload = {
    postId: number
    userId: number | string
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

const getCommentsByPostId = async (postId: number, page: number = 1, pageSize: number = 10) => {
    try {
        const response = await axiosClient.get(`/comments/post/${postId}`, {
            params: {
                page,
                pageSize,
            }
        })

        console.log('Raw comment API response:', response.data);

        // Ensure we return a proper format with data property that contains an array
        const responseData = response.data;

        // If response is already in correct format
        if (responseData && !responseData.error) {
            // The API returns { error: false, data: { data: [...comments], pagination: {...} }, message: "..." }
            if (Array.isArray(responseData.data?.data)) {
                console.log('Found comments in data.data array:', responseData.data.data.length);
                // This is the expected format from the API, return it directly
                return responseData;
            }

            // If data.items exists, it's likely the pagination format
            if (Array.isArray(responseData.data?.items)) {
                console.log('Found comments in data.items array:', responseData.data.items.length);
                return {
                    error: false,
                    data: {
                        data: responseData.data.items,
                        pagination: responseData.data.pagination || {}
                    },
                    message: responseData.message || "Comments fetched successfully"
                };
            }

            // If data is an array, wrap it in expected format
            if (Array.isArray(responseData.data)) {
                console.log('Found comments in data array:', responseData.data.length);
                return {
                    error: false,
                    data: {
                        data: responseData.data,
                        pagination: responseData.pagination || {}
                    },
                    message: responseData.message || "Comments fetched successfully"
                };
            }

            // If responseData itself is an array, wrap it
            if (Array.isArray(responseData)) {
                console.log('Found comments in response array:', responseData.length);
                return {
                    error: false,
                    data: {
                        data: responseData,
                        pagination: {}
                    },
                    message: "Comments fetched successfully"
                };
            }
        }

        console.log('No comments found or invalid format');

        // Return empty array as fallback but in the expected structure
        return {
            error: false,
            data: {
                data: [],
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    total: 0,
                    totalPages: 0
                }
            },
            message: "No comments found or invalid format"
        };
    } catch (error) {
        console.error(`Failed to fetch comments for post ${postId}:`, error)
        return {
            error: true,
            data: {
                data: [],
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    total: 0,
                    totalPages: 0
                }
            },
            message: "Failed to fetch comments"
        };
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
    getCommentsByPostId,
    getCommentById,
    updateCommentById,
    deleteCommentById,
}
