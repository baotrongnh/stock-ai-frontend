import axiosClient from "./AxiosClient";

const login = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

const register = async (email: string, password: string, fullName: string) => {
    try {
        const response = await axiosClient.post('/auth/register', { email, password, fullName });
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}

export { login, register };