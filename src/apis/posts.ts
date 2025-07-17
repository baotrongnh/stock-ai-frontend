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
    try {
        console.log('Creating post with data:', { title, content, stockId, hasFile: !!file })

        const formData = new FormData()
        formData.append('title', title)
        if (content) formData.append('content', content)
        if (stockId !== undefined) formData.append('stockId', stockId.toString())
        if (file) formData.append('file', file)

        console.log('FormData created, sending request to /posts')

        // Add specific configuration to detect and debug redirects
        const response = await axiosClient.post("/posts", formData, {
            validateStatus: function (status) {
                // Accept all status codes to see what's happening
                console.log('Received status code:', status)
                return true
            },
            // Prevent browser from following redirects
            maxRedirects: 0
        })

        console.log('Post creation complete. Response status:', response.status)
        console.log('Response data:', response.data)
        console.log('Response headers:', response.headers)

        // Check if there's a location header that might be causing a redirect
        if (response.headers.location) {
            console.warn('REDIRECT DETECTED! Location header found:', response.headers.location)
        }

        // Check for redirect status codes
        if (response.status >= 300 && response.status < 400) {
            console.warn('REDIRECT STATUS CODE DETECTED:', response.status)
            // Return the data without following the redirect
            return {
                saved: true,
                redirectDetected: true,
                message: 'Post created successfully, but redirect was detected'
            }
        }

        return response.data
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
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