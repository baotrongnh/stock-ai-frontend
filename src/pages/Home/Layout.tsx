import type React from "react"
import "./globals.css"
import { Header } from "./Components/Header"


export default function RootLayout({
     children,
}: {
     children: React.ReactNode
}) {
     return (

          <>
               <Header />
               {children}
          </>

     )
}
