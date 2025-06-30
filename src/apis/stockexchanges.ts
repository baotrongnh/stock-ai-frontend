import axiosClient from "./AxiosClient"

const createStockExchange = async (name: string) => {
    const response = await axiosClient.post('/stock-exchanges', {name})
    return response.data
}

const getStockExchanges = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/stock-exchanges', {
        params: {
            page,
            pageSize
        }
    })
    return response.data
}

const getStockExchangeById = async (id: number) => {
    const response = await axiosClient.get(`/stock-exchanges/${id}`)
    return response.data
}

const updateStockExchange = async (id: number, name: string) => {
    const response = await axiosClient.patch(`/stock-exchanges/${id}`, {name})
    return response.data
}

const deleteStockExchange = async (id: number) => {
    const response = await axiosClient.delete(`/stock-exchanges/${id}`) 
    return response.data 
}

export const StockExchangeServices = {
    createStockExchange,
    getStockExchanges,
    getStockExchangeById,
    updateStockExchange,
    deleteStockExchange
}
