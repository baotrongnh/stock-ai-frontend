import axiosClient from "./AxiosClient";

interface Comment {
  
}

interface PostComment {
   
}

const postComment = async (comment: PostComment) => {
    try {
        const response = await axiosClient.post<Comment>('/comments', comment);
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
}

export { postComment };