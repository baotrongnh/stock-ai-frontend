import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat'
import BlogList from './pages/BlogList/BlogList'
import BlogDetail from './pages/BlogList/BlogDetail'
import UserLayout from './layouts/UserLayout'

function App() {

  return (
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='blog' element={<UserLayout><BlogList /></UserLayout>} />
      <Route path='blog/:id' element={<UserLayout><BlogDetail /></UserLayout>} />
    </Routes>
  )
}

export default App
