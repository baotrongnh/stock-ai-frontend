import axiosClient from "./AxiosClient";

const register = async (email: string, password: string, fullName: string) => {
    try {
        const response = await axiosClient.post('/auth/register', { email, password, fullName });
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}
export default register;