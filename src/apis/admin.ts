import axiosClient from "./axiosClient";

const getAllUsers = async () => { 
     try {
          return axiosClient.get('users')
     } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
          
     }
}

export {getAllUsers}