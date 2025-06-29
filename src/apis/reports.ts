import axiosClient from "./AxiosClient"

const createReport = async (
    postId: number,
    commentId: number,
    reason: string,
    status: string
) => {
    const response = await axiosClient.post('/reports', {
        postId,
        commentId,
        reason,
        status
    })
    return response.data
}

const getReports = async (page: string, pageSize: string) => {
    const response = await axiosClient.get('/reports', {
        params: {
            page,
            pageSize
        }
    })
    return response.data
}

const getReportById = async (id: number) => {
    const response = await axiosClient.get(`/reports/${id}`)
    return response.data
}

const updateReportById = async (id: number) => {
    const response = await axiosClient.put(`/reports/${id}`,{
        //TO DO 
    })
    return response.data
}

const deleteReportById = async (id: number) => {
    const response = await axiosClient.delete(`/reports/${id}`)
    return response.data
}

export const ReportServices = {
    createReport,
    getReports,
    getReportById,
    updateReportById,
    deleteReportById
}