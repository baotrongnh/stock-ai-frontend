import { NavbarUser } from '@/components/common'
import type React from 'react'

export default function UserLayout({ children }: { children: React.ReactElement }) {
     return (
          <div className='flex h-screen bg-gray-50'>
               <NavbarUser />
               <div className='ml-80 flex-1'>{children}</div>
          </div>
     )
}
