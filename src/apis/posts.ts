import axiosClient from "./axiosClient.ts";

const getPosts = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/posts', {
        params: {
            page,
            pageSize
        }
    })
    return response.data
}

const createPost = async (
    title: string,
    content: string,
    stockId: number,
    file?: File) => {
    const formData = new FormData()

    formData.append('title', title)
    if (content) formData.append('content', content)
    if (stockId !== undefined) formData.append('stockId', stockId.toString())
    if (file) formData.append('file', file)

    const response = await axiosClient.post("/posts", formData)
    return response.data
}

const getPostById = async (id: number) => {
    const response = await axiosClient.get(`/posts/${id}`)
    return response.data
}

const updatePostById = async (
    id: number,
    title: string,
    content: string,
    stockId: number,
    file?: File
) => {
    const formData = new FormData()
    if (title) formData.append('title', title)
    if (content) formData.append('content', content)
    if (stockId !== undefined) formData.append('stockId', stockId.toString())
    if (file) formData.append('file', file)

    const response = await axiosClient.patch(`/posts/${id}`, formData)

    return response.data
}

const deletePostById = async (id: number) => {
    const response = await axiosClient.delete(`/posts/${id}`)
    return response.data
}

const votePost = async (id: number, voteType: "UPVOTE" | "DOWNVOTE") => {
    const response = await axiosClient.post(`/posts/${id}/vote`, { voteType })
    return response.data
}

const favoritePost = async (id: number) => {
    try {
        const response = await axiosClient.post(`/posts/${id}/favorite`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.error(`Error favoriting post ${id}:`, error)
        throw error
    }
}

const unfavoritePost = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/posts/${id}/favorite`)
        return response.data
    } catch (error) {
        console.error(`Error unfavoriting post ${id}:`, error)
        throw error
    }
}

export const PostServices = {
    getPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
    votePost,
    favoritePost,
    unfavoritePost,
}