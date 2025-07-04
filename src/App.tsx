import { Route, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat'
import BlogList from './pages/BlogList/BlogList'
import BlogDetail from './pages/BlogList/BlogDetail'
import UserLayout from './layouts/UserLayout'
import Podcast from './pages/Podcast/Podcast'
import Profile from './pages/Profile/Profile'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import TempLogData from './pages/TempLogData'
import AdminLogin from './pages/Admin/AdminLogin'

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
