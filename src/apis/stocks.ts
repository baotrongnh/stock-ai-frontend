import axiosClient from "./axiosClient"

const createStock = async (
    symbol: string,
    companyName: string,
    stockExchangeId: number) => {
    const response = await axiosClient.post('/stocks', {
        symbol,
        companyName,
        stockExchangeId
    })
    return response.data
}

const getStocks = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/stocks', {
        params: {
            page,
            pageSize
        }
    })
    return response.data
}

const getStockById = async (id: number) => {
    const response = await axiosClient.get(`/stocks/${id}`)
    return response.data
}


const updateStock = async (
    id: number, 
    symbol?: string, 
    companyName?: string
) => {
    const response = await axiosClient.patch(`/stocks/${id}`, {
        symbol,
        companyName
    })
    return response.data
}


const deleteStockById = async (id: number) => {
    const response = await axiosClient.delete(`/stocks/${id}`)
    return response.data
}

export const StockServices = {
    createStock,
    getStocks,
    getStockById,
    updateStock,
    deleteStockById
}