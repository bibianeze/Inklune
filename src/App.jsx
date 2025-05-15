import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import ConfirmResetPassword from './pages/ConfirmResetPassword'
import CreatePostPage from './pages/CreatePostPage'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import ViewingPost from './pages/ViewingPost'
import { ResetPassword } from './pages/ResetPassword'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/reset' element={<ResetPassword/>} />
      <Route path='/confirm-reset' element={<ConfirmResetPassword/>} />
      <Route path='/create' element={<CreatePostPage/>} />
      <Route path='/forgot-Password' element={<ForgotPassword/>} />
      <Route path='/login' element={<SignIn/>} />
      <Route path='/blog' element={<ViewingPost/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
