import axiosClient from "./axiosClient.ts"


export const AIChat = (message: string) => {
  const url = `${import.meta.env.VITE_APP_API_URL}ai/chat`
  return axiosClient.post(url, { message })
}