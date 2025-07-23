import axiosClient from "./axiosClient.ts";

const getUserPosts = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/posts/user', {
        params: {
            page,
            pageSize
        }
    });
    return response.data;
};

// Add this function to the existing PostServices export
export const getUserPostsService = {
    getUserPosts
};
