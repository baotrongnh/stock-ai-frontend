import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat'
import BlogList from './pages/BlogList/BlogList'
import BlogDetail from './pages/BlogList/BlogDetail'
import UserLayout from './layouts/UserLayout'
import Podcast from './pages/Podcast/Podcast'
import About from './pages/About/About'
import Pricing from './pages/Pricing/Pricing'
import AccountSettings from './pages/AccountSettings/AccountSettings'

function App() {

  return (
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/chat' element={<UserLayout><Chat /></UserLayout>} />
      <Route path='/blog' element={<UserLayout><BlogList /></UserLayout>} />
      <Route path='/blog/:id' element={<UserLayout><BlogDetail /></UserLayout>} />
      <Route path='/podcast' element={<UserLayout><Podcast /></UserLayout>} />
      <Route path='/about' element={<UserLayout><About /></UserLayout>} />
      <Route path='/pricing' element={<UserLayout><Pricing /></UserLayout>} />
      <Route path='/account-settings' element={<UserLayout><AccountSettings /></UserLayout>} />
    </Routes>
  )
}

export default App
