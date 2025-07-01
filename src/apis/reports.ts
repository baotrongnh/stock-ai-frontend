import axiosClient from "./AxiosClient"

type ReportPayload = {
    postId?: number
    commentId?: number
    reason?: string
    status?: string
}


const createReport = async (
    data: ReportPayload
) => {
    const response = await axiosClient.post('/reports', data)
    return response.data
}

const getReports = async (page: number, pageSize: number) => {
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

const updateReportById = async (
    id: number,
    updateData: ReportPayload
) => {
    const response = await axiosClient.patch(`/reports/${id}`, updateData)
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