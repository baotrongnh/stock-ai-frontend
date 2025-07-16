import axiosClient from "./axiosClient.ts"


export const AIChat = (message: string) => {
  const url = `${import.meta.env.VITE_APP_TOOL_AI}/chat`
  return axiosClient.post(url, { message })
}