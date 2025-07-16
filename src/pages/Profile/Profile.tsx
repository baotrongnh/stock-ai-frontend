import { useState } from "react"
import { useProfile } from "./hooks"
import {
     ProfileHeader,
     TabNavigation,
     PersonalInfoTab,
     AccountDetailsTab,
     ProfileSkeleton,
     AccountDetailsSkeleton,
     ProfileHeaderSkeleton,
     FavoritesList
} from "./components"

export default function Profile() {
     const [activeTab, setActiveTab] = useState("personal")
     const {
          profile,
          editedProfile,
          isEditing,
          isLoading,
          setIsEditing,
          handleSave,
          handleCancel,
          handleInputChange,
          handleFileChange,
          refetchProfile,
     } = useProfile()

     const renderTabContent = () => {
          if (isLoading) {
               switch (activeTab) {
                    case "personal":
                         return <ProfileSkeleton />
                    case "account":
                         return <AccountDetailsSkeleton />
                    case "favorites":
                         return <ProfileSkeleton />
                    default:
                         return <ProfileSkeleton />
               }
          }

          switch (activeTab) {
               case "personal":
                    return (
                         <PersonalInfoTab
                              profile={profile}
                              editedProfile={editedProfile}
                              isEditing={isEditing}
                              onInputChange={handleInputChange}
                         />
                    )
               case "account":
                    return <AccountDetailsTab profile={profile} />
               case "favorites":
                    return <FavoritesList />
               default:
                    return null
          }
     }

     return (
          <div className="h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20 flex flex-col overflow-hidden">
               {isLoading ? (
                    <ProfileHeaderSkeleton />
               ) : (
                    <ProfileHeader
                         profile={profile}
                         isEditing={isEditing}
                         isLoading={isLoading}
                         onEdit={() => setIsEditing(true)}
                         onSave={handleSave}
                         onCancel={handleCancel}
                         onRefresh={refetchProfile}
                         onFileChange={handleFileChange}
                    />
               )}

               <div className="flex-1 p-6 pb-8 overflow-y-auto bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20">
                    <div className="max-w-4xl mx-auto">
                         <TabNavigation
                              activeTab={activeTab}
                              onTabChange={setActiveTab}
                         />
                         <div className="mt-6">
                              {renderTabContent()}
                         </div>
                    </div>
               </div>
          </div>
     )
}
