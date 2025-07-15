import { Button } from '@/components/ui/button'
import {
     Activity,
     BarChart3,
     MessageSquare,
     Plus,
     Sparkles,
     GripHorizontal
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ItemType = 'MENU_ITEM'

function DraggableMenuItem({ item, index, moveItem, isActive }: any) {
     
     const [{ isDragging }, ref] = useDrag({
          type: ItemType,
          item: { index },
          collect: (monitor) => ({
               isDragging: monitor.isDragging(),
          }),
     })

     const [, drop] = useDrop({
          accept: ItemType,
          hover: (draggedItem: any) => {
               if (draggedItem.index !== index) {
                    moveItem(draggedItem.index, index)
                    draggedItem.index = index
               }
          },
     })

     return (
          <div
               ref={(node) => {
                    if (node) {
                         ref(node);
                         drop(node);
                    }
               }}
               className={`relative p-2 rounded-lg transition-all duration-200 ${isDragging ? 'bg-red-100 shadow-lg scale-105' : 'bg-white hover:bg-gray-100'
                    }`}
          >
               <Link to={item.path}>
                    <Button
                         variant="ghost"
                         className={`w-full justify-start group ${isActive(item.path)
                              ? 'text-red-700 bg-red-50'
                              : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                              }`}
                    >
                         <item.icon className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                         {item.label}
                         <GripHorizontal className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-opacity" />
                    </Button>
               </Link>
          </div>
     )
}

export default function NavbarUser() {
     const [currentTime, setCurrentTime] = useState(new Date())
     const [menuItems, setMenuItems] = useState([
          { id: 'chat', label: 'AI Chat', icon: MessageSquare, path: '/chat' },
          { id: 'blog', label: 'Market Overview', icon: BarChart3, path: '/blog' },
          { id: 'podcast', label: 'Podcast', icon: Activity, path: '/podcast' },
          { id: 'profile', label: 'Profile', icon: MessageSquare, path: '/profile' },
     ])
     const navigate = useNavigate()
     const location = useLocation()

     const userId = localStorage.getItem('userId')

     useEffect(() => {
          const timer = setInterval(() => setCurrentTime(new Date()), 1000)
          return () => clearInterval(timer)
     }, [])

     useEffect(() => {
          const savedOrder = localStorage.getItem('menuOrder')
          if (savedOrder) {
               const parsedOrder = JSON.parse(savedOrder)
               setMenuItems((prevItems) =>
                    parsedOrder.map((id: string) => prevItems.find((item) => item.id === id) || {})
               )
          }
     }, [])

     const moveItem = (fromIndex: number, toIndex: number) => {
          const updatedItems = [...menuItems]
          const [movedItem] = updatedItems.splice(fromIndex, 1)
          updatedItems.splice(toIndex, 0, movedItem)
          setMenuItems(updatedItems)
          localStorage.setItem('menuOrder', JSON.stringify(updatedItems.map((item) => item.id)))
     }

     const isActive = (path: string) => location.pathname === path

     return (
          <DndProvider backend={HTML5Backend}>
               <div className="fixed top-0 left-0 w-80 h-full bg-white/80 backdrop-blur-xl border-r border-red-100/50 flex flex-col shadow-xl">
                    {/* Header */}
                    <div className="p-6 border-b border-red-100/50 bg-gradient-to-r from-red-500 to-red-600 text-white">
                         <div className="flex items-center space-x-3 mb-4">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                                   <BarChart3 className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                   <h1 className="text-2xl font-bold">StockGPT</h1>
                                   <p className="text-red-100 text-sm">AI-Powered Analysis</p>
                              </div>
                         </div>
                         <div className="text-xs text-red-100 mb-2">Live Market Time</div>
                         <div className="text-sm font-mono">{currentTime.toLocaleTimeString()}</div>
                    </div>

                    {/* Navigation */}
                    <div className="p-4 space-y-3">
                         <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                              <Plus className="w-4 h-4 mr-2" />
                              New Analysis
                              <Sparkles className="w-4 h-4 ml-auto" />
                         </Button>

                         <div className="space-y-2">
                              {menuItems.map((item, index) => (
                                   <DraggableMenuItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        moveItem={moveItem}
                                        isActive={isActive}
                                   />
                              ))}
                         </div>
                    </div>

                    {/* Sign Out or In */}
                    <div className="mt-auto p-4">
                         {userId ? (
                              <Button
                                   onClick={() => {
                                        localStorage.removeItem('userId')
                                        localStorage.removeItem('accessToken')
                                        toast.success('Logged out successfully')
                                        navigate('/')
                                   }}
                                   className="w-full bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer"
                              >
                                   Logout
                              </Button>
                         ) : (
                              <Link to="/login">
                                   <Button className="w-full bg-red-500 text-white font-semibold hover:bg-red-400 transition cursor-pointer">
                                        Sign In
                                   </Button>
                              </Link>
                         )}
                    </div>
               </div>
          </DndProvider>
     )
}
