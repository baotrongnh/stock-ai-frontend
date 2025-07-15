import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog";
import { Search, MoreHorizontal, Eye, Trash2, Loader2, RotateCcw } from "lucide-react";
import { getAllUsers, deleteUser, getListDeletedUsers, restoreUser } from "@/apis/admin";
import toast from "react-hot-toast";

export function UsersManagement() {
     const [users, setUsers] = useState<any[]>([]);
     const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
     const [searchTerm, setSearchTerm] = useState("");
     const [loading, setLoading] = useState(false);
     const [loadingDelete, setLoadingDelete] = useState(false);
     const [openDeleted, setOpenDeleted] = useState(false);
     const [restoringId, setRestoringId] = useState<string | null>(null);

     // Fetch active users
     const fetchListUserData = async () => {
          setLoading(true);
          try {
               const { data } = await getAllUsers();
               if (!data.error) {
                    setUsers(data.data.data);
               }
          } finally {
               setLoading(false);
          }
     };

     // Fetch deleted users
     const fetchDeletedUsers = async () => {
          setLoading(true);
          try {
               const { data } = await getListDeletedUsers();
               // Đảm bảo deletedUsers luôn là mảng
               if (Array.isArray(data?.data.users)) {
                    setDeletedUsers(data.data.users);
               } else if (data?.data.users && typeof data.data.users === "object") {
                    setDeletedUsers(Object.values(data.data.users));
               } else {
                    setDeletedUsers([]);
               }
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchListUserData();
     }, []);

     // Actions
     const handleDeleteUser = async (userId: string) => {
          setLoadingDelete(true);
          try {
               await deleteUser(userId);
               await fetchListUserData();
               toast.success("Delete user successfully!");
          } catch (e) {
               toast.error("Delete user failed!");
          }
          setLoadingDelete(false);
     };

     const handleRestoreUser = async (userId: string) => {
          setRestoringId(userId);
          try {
               await restoreUser(userId);
               await fetchDeletedUsers();      // Cập nhật lại danh sách user đã xóa
               await fetchListUserData();      // Cập nhật lại danh sách user hiện tại
               toast.success("Restore user successfully!");
          } catch (e) {
               toast.error("Restore user failed!");
          }
          setRestoringId(null);
     };

     // Filtered users
     const filteredUsers = users?.filter((user) =>
          (user?.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (user?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (user?.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
     );

     // Badge helpers
     const getStatusBadge = (status: string) => {
          if (status === "active")
               return <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>;
          if (status === "inactive")
               return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Inactive</Badge>;
          if (status === "banned")
               return <Badge className="bg-red-100 text-red-800 border-red-300">Banned</Badge>;
          if (status === "suspended")
               return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Suspended</Badge>;
          return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>;
     };

     const getRoleBadge = (user: any) => {
          if (user?.isExpert) return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Expert</Badge>;
          return <Badge className="bg-gray-100 text-gray-800 border-gray-300">User</Badge>;
     };

     return (
          <div className="w-full max-w-none space-y-6 bg-white text-gray-900">
               <div className="mb-6 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                         <h1 className="text-3xl font-bold text-red-900">Users Management</h1>
                         <p className="text-red-700 mt-2">Manage all registered users and their permissions</p>
                    </div>
                    <Button
                         variant="outline"
                         className="border-red-200 text-red-900 hover:bg-red-50"
                         onClick={() => {
                              fetchDeletedUsers();
                              setOpenDeleted(true);
                         }}
                    >
                         <RotateCcw className="w-4 h-4 mr-2" />
                         View Deleted Users
                    </Button>
               </div>

               {/* Loading overlay */}
               {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
                         <Loader2 className="animate-spin h-10 w-10 text-red-600" />
                    </div>
               )}

               {/* Search and Table */}
               <Card className="w-full border-red-200 bg-white shadow-sm">
                    <CardHeader>
                         <CardTitle className="text-red-900">All Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center space-x-4 mb-6">
                              <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
                                   <Input
                                        placeholder="Search users by name, email, or location..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-red-200 focus:border-red-400 bg-white text-gray-900"
                                   />
                              </div>
                         </div>

                         <div className="rounded-md border border-red-200 bg-white overflow-x-auto">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900">User</TableHead>
                                             <TableHead className="text-red-900">Status</TableHead>
                                             <TableHead className="text-red-900">Role</TableHead>
                                             <TableHead className="text-red-900">Email</TableHead>
                                             <TableHead className="text-red-900">Location</TableHead>
                                             <TableHead className="text-red-900">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {filteredUsers?.map((user) => (
                                             <TableRow key={user?.userId} className="bg-white hover:bg-red-50">
                                                  <TableCell>
                                                       <div className="flex items-center space-x-3">
                                                            <Avatar className="h-10 w-10">
                                                                 <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.fullName} />
                                                                 <AvatarFallback>
                                                                      {user?.fullName
                                                                           ?.split(" ")
                                                                           .map((n: string) => n[0])
                                                                           .join("")}
                                                                 </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                 <div className="font-medium text-gray-900">{user?.fullName}</div>
                                                                 <div className="text-xs text-gray-500">{user?.location || ""}</div>
                                                            </div>
                                                       </div>
                                                  </TableCell>
                                                  <TableCell>{getStatusBadge(user?.status)}</TableCell>
                                                  <TableCell>{getRoleBadge(user)}</TableCell>
                                                  <TableCell className="text-gray-900">{user?.email}</TableCell>
                                                  <TableCell className="text-gray-900">{user?.location || ""}</TableCell>
                                                  <TableCell>
                                                       <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                 <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-100 bg-white">
                                                                      <MoreHorizontal className="h-4 w-4 text-red-600" />
                                                                 </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                 align="end"
                                                                 className="bg-white border border-red-200 shadow-lg"
                                                                 style={{ color: "#222" }}
                                                            >
                                                                 <DropdownMenuItem className="hover:bg-red-50 text-gray-900">
                                                                      <Eye className="mr-2 h-4 w-4" />
                                                                      View
                                                                 </DropdownMenuItem>
                                                                 <DropdownMenuItem
                                                                      onClick={() => handleDeleteUser(user?.userId)}
                                                                      className="text-red-600 focus:text-red-600 hover:bg-red-50"
                                                                 >
                                                                      <Trash2 className="mr-2 h-4 w-4" />
                                                                      {loadingDelete ? "Deleting..." : "Delete"}
                                                                 </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                       </DropdownMenu>
                                                  </TableCell>
                                             </TableRow>
                                        ))}
                                   </TableBody>
                              </Table>
                         </div>
                    </CardContent>
               </Card>

               {/* Deleted Users Modal */}
               <Dialog open={openDeleted} onOpenChange={setOpenDeleted}>
                    <DialogContent className="border-red-200 max-w-5xl bg-white text-gray-900">
                         <DialogHeader>
                              <DialogTitle className="text-red-900">Deleted Users</DialogTitle>
                              <DialogDescription className="text-red-700">
                                   Restore users that have been deleted
                              </DialogDescription>
                         </DialogHeader>
                         <div className="max-h-[60vh] overflow-y-auto">
                              <Table>
                                   <TableHeader>
                                        <TableRow className="bg-red-50">
                                             <TableHead className="text-red-900">User</TableHead>
                                             <TableHead className="text-red-900">Email</TableHead>
                                             <TableHead className="text-red-900">Location</TableHead>
                                             <TableHead className="text-red-900">Actions</TableHead>
                                        </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                        {deletedUsers.length === 0 ? (
                                             <TableRow>
                                                  <TableCell colSpan={4} className="text-center text-gray-500">
                                                       No deleted users.
                                                  </TableCell>
                                             </TableRow>
                                        ) : (
                                             deletedUsers.map((user) => (
                                                  <TableRow key={user?.userId || user?.email} className="bg-white hover:bg-red-50">
                                                       <TableCell>
                                                            <div className="flex items-center space-x-3">
                                                                 <Avatar className="h-10 w-10">
                                                                      <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.fullName} />
                                                                      <AvatarFallback>
                                                                           {user?.fullName
                                                                                ?.split(" ")
                                                                                .map((n: string) => n[0])
                                                                                .join("")}
                                                                      </AvatarFallback>
                                                                 </Avatar>
                                                                 <div>
                                                                      <div className="font-medium text-gray-900">{user?.fullName}</div>
                                                                 </div>
                                                            </div>
                                                       </TableCell>
                                                       <TableCell className="text-gray-900">{user?.email}</TableCell>
                                                       <TableCell className="text-gray-900">{user?.location || ""}</TableCell>
                                                       <TableCell>
                                                            <Button
                                                                 size="sm"
                                                                 variant="outline"
                                                                 className="border-green-300 text-green-800 hover:bg-green-50"
                                                                 disabled={restoringId === user?.userId}
                                                                 onClick={() => handleRestoreUser(user?.userId)}
                                                            >
                                                                 <RotateCcw className="w-4 h-4 mr-2" />
                                                                 {restoringId === user?.userId ? "Restoring..." : "Restore"}
                                                            </Button>
                                                       </TableCell>
                                                  </TableRow>
                                             ))
                                        )}
                                   </TableBody>
                              </Table>
                         </div>
                    </DialogContent>
               </Dialog>
          </div>
     );
}
