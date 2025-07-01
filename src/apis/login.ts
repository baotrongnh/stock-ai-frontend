import axiosClient from "./axiosClient"

/* Example for call api login */
const login = async (email: string, password: string) => {
     try {
          return await axiosClient.post('/auth/login', {
               email,
               password
          })
     } catch (error) {
          console.log(error)
     }
}

const loginGoogle = async (accessToken: string) => {
     try {
          const response = await axiosClient.post('/auth/google', accessToken);
          return response.data;
     } catch (error) {
          throw new Error(`Error: ${error}`);
     }
}

export { login, loginGoogle }