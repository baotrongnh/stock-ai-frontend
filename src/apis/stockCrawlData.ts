import axiosClient from "./axiosClient.ts"

type StockCrawlDataPayload = {
    stockId: number,
    crawlDate: string,
    volume: number,
    refPrice: number,
    ceilPrice: number,
    floorPrice: number,
    openPrice: number,
    highPrice: number,
    lowPrice: number,
    foreignBuyVolume: number,
    foreignSellVolume: number,
    foreignBuyValue: number,
    foreignSellValue: number,
    foreignRoomLeftPercent: number,
    epsBasic: number,
    epsDiluted: number,
    pe: number,
    bookValue: number,
    pb: number,
}


const createStockCrawlData = async (data: StockCrawlDataPayload) => {
    const response = await axiosClient.post('/stock-crawl-data', data)
    return response.data
}

const getStockCrawlData = async (page: number, pageSize: number) => {
    const response = await axiosClient.get('/stock-crawl-data', {
        params: {
            page,
            pageSize
        }
    })
    return response.data
}


const getStockCrawlDataById = async (id: number) => {
    const response = await axiosClient.get(`/stock-crawl-data/${id}`)
    return response.data
}

const updateStockCrawlData = async (id: number, updateData: StockCrawlDataPayload) => {
    const response = await axiosClient.patch(`/stock-crawl-data/${id}`, updateData)
    return response.data
}

const deleteStockCrawlData = async (id: number) => {
    const response = await axiosClient.delete(`/stock-crawl-data/${id}`)
    return response.data
}


export const StockCrawlDataService = {
    createStockCrawlData,
    getStockCrawlData,
    getStockCrawlDataById,
    updateStockCrawlData,
    deleteStockCrawlData
}