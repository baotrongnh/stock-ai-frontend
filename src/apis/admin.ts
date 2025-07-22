import axios from "axios"
import axiosClient from "./axiosClient"

const loginAdmin = async ({ username, password }: { username: string, password: string }) => {
     try {
          return await axios.post(`${import.meta.env.VITE_APP_API_URL}admin/login`, { username, password })
     } catch (error) {
          console.log(error)
     }
}

const getUserStatistics = async () => {
     try {
          return await axiosClient.get('admin/users/statistics')
     } catch (error) {
          console.error("Error fetching user statistics:", error);
          throw error;
     }
}

const getAllUsers = async () => {
     try {
          return axiosClient.get('users')
     } catch (error) {
          console.error("Error fetching users:", error);
          throw error;

     }
}

const getListDeletedUsers = async () => {
     try {
          return await axiosClient.get('admin/users/deleted')
     } catch (error) {
          console.error("Error fetching deleted users:", error);
          throw error;
     }
}

const deleteUser = async (id: string | number) => {
     try {
          return await axiosClient.delete(`admin/users/${id}`)
     } catch (error) {
          console.error("Error deleting user:", error);
          throw error;
     }
}

const restoreUser = async (id: string | number) => {
     try {
          return await axiosClient.patch(`admin/users/${id}/restore`)
     } catch (error) {
          console.error("Error restoring user:", error);
          throw error;
     }
}

const getAllPosts = async (status: string) => {
     try {
          return axiosClient.get('admin/posts/status/filter', {
               params: {
                    status
               }
          })
     } catch (error) {
          console.error("Error fetching posts:", error);
          throw error;
     }
}

const deletePost = async (id: string | number) => {
     try {
          return await axiosClient.delete(`admin/posts/${id}`)
     } catch (error) {
          console.error("Error deleting post:", error);
          throw error;
     }
}

const restorePost = async (id: string | number) => {
     try {
          return await axiosClient.patch(`admin/posts/${id}/restore`)
     } catch (error) {
          console.error("Error restoring post:", error);
          throw error;
     }
}

const getDetailPost = async (id: string | number) => {
     try {
          return await axiosClient.get(`admin/posts/${id}`)
     } catch (error) {
          console.error("Error fetching post details:", error);
          throw error;
     }
}

const getReportedPosts = async () => {
     try {
          return await axiosClient.get(`admin/posts/reported`)
     } catch (error) {
          console.error("Error fetching reported posts:", error);
          throw error;
     }
}

const rejectedPosts = async (id: string | number) => {
     try {
          return await axiosClient.post(`admin/posts/${id}/reject-reports`)
     } catch (error) {
          console.error("Error rejecting post:", error);
          throw error;
     }
}

const blockPost = async (id: string | number) => {
     try {
          return await axiosClient.patch(`admin/posts/${id}/block`)
     } catch (error) {
          console.error("Error blocking post:", error);
          throw error;
     }
}

export { getAllUsers, deleteUser, loginAdmin, getAllPosts, deletePost, getDetailPost, restorePost, restoreUser, getListDeletedUsers, getUserStatistics, getReportedPosts, blockPost, rejectedPosts }
