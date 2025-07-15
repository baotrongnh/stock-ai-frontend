import axiosClient from "./axiosClient.js"

const login = async (email: string, password: string) => {
     try {
          const response = await axiosClient.post('/auth/login', {
               email,
               password
          })

          return response.data
     } catch (error) {
          console.log(error)
     }
}

const loginGoogle = async (accessToken: string) => {
     try {
          const response = await axiosClient.post('/auth/google', { accessToken });
          return response.data;
     } catch (error) {
          throw new Error(`Error: ${error}`);
     }
}

const loginFacebook = async (accessToken: string) => {
     try {
          const response = await axiosClient.post('/auth/facebook', { accessToken });
          return response.data;
     } catch (error) {
          throw new Error(`Error: ${error}`);
     }
}

const register = async (email: string, password: string, fullName: string) => {
     try {
          const response = await axiosClient.post('/auth/register', {
               email,
               password,
               fullName
          });
          return response.data;
     } catch (error) {
          throw new Error(`Error: ${error}`);
     }
}

const refreshToken = async (refreshToken: string) => {
     try {
          const response = await axiosClient.post('/auth/refresh-token', { refreshToken });
          return response.data;
     } catch (error) {
          throw new Error(`Error: ${error}`);
     }
}

export { login, loginGoogle, loginFacebook, register, refreshToken }