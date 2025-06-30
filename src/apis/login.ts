import axios from "axios"
import axiosClient from "./axiosClient"

/* Example for call api login */
const login = async (email: string, password: string) => {
     try {
          return await axios.post('https://swd-stockintel.onrender.com/auth/login', { email, password })
     } catch (error) {
          console.log(error)
     }
}


export { login }