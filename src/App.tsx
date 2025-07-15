import { Route, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'
import Chat from './pages/Chat/Chat.js'
import BlogList from './pages/BlogList/BlogList.js'
import BlogDetail from './pages/BlogList/BlogDetail.js'
import UserLayout from './layouts/UserLayout.js'
import Podcast from './pages/Podcast/Podcast.js'
import Profile from './pages/Profile/Profile.js'
import AdminLayout from './layouts/AdminLayout.js'
import AdminDashboard from './pages/Admin/AdminDashboard.js'
import { Toaster } from 'react-hot-toast'
import TempLogData from './pages/TempLogData.js'
import AdminLogin from './pages/Admin/AdminLogin.js'

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
