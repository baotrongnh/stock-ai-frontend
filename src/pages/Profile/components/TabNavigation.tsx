import { User, Key, BookmarkIcon } from "lucide-react"
import type { TabItem } from "../types"

interface TabNavigationProps {
    activeTab: string
    onTabChange: (tabId: string) => void
}

const tabs: TabItem[] = [
    { id: "personal", label: "Personal Info", icon: <User className="w-4 h-4" /> },
    { id: "account", label: "Account Details", icon: <Key className="w-4 h-4" /> },
    { id: "favorites", label: "Favorites", icon: <BookmarkIcon className="w-4 h-4" /> },
]

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <div className="flex space-x-1 mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-sm ">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === tab.id
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-red-50 hover:text-red-700"
                        }`}
                >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                </button>
            ))}
        </div>
    )
}
