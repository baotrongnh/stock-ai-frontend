import { Route, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import Chat from './pages/Chat/Chat.tsx'
import BlogList from './pages/BlogList/BlogList.tsx'
import BlogDetail from './pages/BlogList/BlogDetail.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import Podcast from './pages/Podcast/Podcast.tsx'
import Profile from './pages/Profile/Profile.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import AdminDashboard from './pages/Admin/AdminDashboard.tsx'
import { Toaster } from 'react-hot-toast'
import TempLogData from './pages/TempLogData.tsx'
import AdminLogin from './pages/Admin/AdminLogin.tsx'

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken');
    }
  }, [location.pathname]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<UserLayout><BlogList /></UserLayout>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<UserLayout><Chat /></UserLayout>} />
        <Route path='/blog' element={<UserLayout><BlogList /></UserLayout>} />
        <Route path='/blog/:id' element={<UserLayout><BlogDetail /></UserLayout>} />
        <Route path='/podcast' element={<UserLayout><Podcast /></UserLayout>} />
        <Route path='/profile' element={<UserLayout><Profile /></UserLayout>} />
        <Route path='/admin' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/data' element={<UserLayout><TempLogData /></UserLayout>} />
      </Routes>
    </>
  )
}

export default App
