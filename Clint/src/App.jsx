import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UserRegister = lazy(()=> import('./assets/Components/UserRegister/UserRegister'))
const UserLogin = lazy(()=> import('./assets/Components/UserLogin/UserLogin'))
const AdminLogin = lazy(()=> import('./assets/Components/AdminLogin/AdminLogin'))

function App() {

  return (
    <Router>
    <div>
      <Suspense>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
  )
}

export default App
