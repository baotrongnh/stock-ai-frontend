import axios from './axiosClient';

export const getFavorites = async (page = 1, limit = 10) => {
    return axios.get('/users/me/favorites', {
        params: {
            page,
            pageSize: limit
        }
    });
};

export const addToFavorites = async (postId: number) => {
    return axios.post(`/posts/${postId}/favorite`);
};

export const removeFromFavorites = async (postId: number) => {
    return axios.delete(`/posts/${postId}/favorite`);
};
