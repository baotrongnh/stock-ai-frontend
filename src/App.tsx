import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import AdminLayout from './layouts/AdminLayout.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import AdminDashboard from './pages/Admin/AdminDashboard.tsx'
import AdminLogin from './pages/Admin/AdminLogin.tsx'
import BlogDetail from './pages/BlogList/BlogDetail.tsx'
import BlogList from './pages/BlogList/BlogList.tsx'
import Chat from './pages/Chat/Chat.tsx'
import Contact from './pages/Contact/Contact.tsx'
import Features from './pages/Features/Features.tsx'
import StockAILanding from './pages/Home/Home.tsx'
import RootLayout from './pages/Home/Layout.tsx'
import Login from './pages/Login/Login.tsx'
import Podcast from './pages/Podcast/Podcast.tsx'
import Pricing from './pages/Pricing/Pricing.tsx'
import Profile from './pages/Profile/Profile.tsx'
import Register from './pages/Register/Register.tsx'
import Resources from './pages/Resources/Resources.tsx'
import Solutions from './pages/Solutions/Solutions.tsx'
import ProtectedRoute from './routes/ProtectedRoute'

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
        <Route path='/' element={<StockAILanding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path='/features' element={<ProtectedRoute><RootLayout><Features /></RootLayout></ProtectedRoute>} />
        <Route path='/solutions' element={<ProtectedRoute><RootLayout><Solutions /></RootLayout></ProtectedRoute>} />
        <Route path='/pricing' element={<ProtectedRoute><RootLayout><Pricing /></RootLayout></ProtectedRoute>} />
        <Route path='/resources' element={<ProtectedRoute><RootLayout><Resources /></RootLayout></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><RootLayout><Contact /></RootLayout></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><UserLayout><Chat /></UserLayout></ProtectedRoute>} />
        <Route path='/blog' element={<ProtectedRoute><UserLayout><BlogList /></UserLayout></ProtectedRoute>} />
        <Route path='/blog/:id' element={<ProtectedRoute><UserLayout><BlogDetail /></UserLayout></ProtectedRoute>} />
        <Route path='/podcast' element={<ProtectedRoute><UserLayout><Podcast /></UserLayout></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><UserLayout><Profile /></UserLayout></ProtectedRoute>} />
        <Route path='/admin' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      </Routes>
    </>
  )
}

export default App
