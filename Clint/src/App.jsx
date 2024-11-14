import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UserRegister = lazy(()=> import('./assets/Components/UserRegister/UserRegister'))
const UserLogin = lazy(()=> import('./assets/Components/UserLogin/UserLogin'))
const AdminLogin = lazy(()=> import('./assets/Components/AdminLogin/AdminLogin'))
const UserHome = lazy(()=> import('./assets/Components/UserHome/UserHome'))
const UserEdit = lazy(()=> import('./assets/Components/UserEdit/UserEdit'))
const AdminHome = lazy(()=> import('./assets/Components/AdminHome/Home/AdminHome'))



function App() {

  return (
    <Router>
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<UserRegister />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/editUser" element={<UserEdit />} />
          <Route path="/adminhome" element={<AdminHome />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
  )
}

export default App
