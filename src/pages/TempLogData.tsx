import { ReportServices } from '@/apis/reports'
import { StockCrawlDataService } from '@/apis/stockCrawlData'
import { StockExchangeServices } from '@/apis/stockexchanges'
import { StockServices } from '@/apis/stocks'
import { UserServices } from '@/apis/user'
import { useEffect } from 'react'

export default function TempLogData() {


    const fetchStock = async () => {
        const res = await StockServices.getStocks(1, 20)
        console.log("Stocks Data: ", res.data.data)
    }

    const fetchReport = async () => {
        const res = await ReportServices.getReports(1, 20)
        console.log("Report Data: ", res.data.data)
    }

    const fetchUser = async () => {
        const res = await UserServices.getUsers(1, 20)
        console.log("User Data: ", res.data.data)
    }

    const fetchStockExchange = async () => {
        const res = await StockExchangeServices.getStockExchanges(1, 20)
        console.log("Stock Exchange Data: ", res.data)
    }

    const fetchStockCrawlData = async () => {
        const res = await StockCrawlDataService.getStockCrawlDataById(1, 20)
        console.log("Stock Crawl Data: ", res)
    }

    useEffect(() => {
        fetchStock()
        fetchReport()
        fetchUser()
        fetchStockExchange()
        fetchStockCrawlData()
    }, [])

    return (
        <div className='flex w-full h-full justify-center items-center'>
            <p>Press F12 to see the log Data</p>
        </div>
    )
}
