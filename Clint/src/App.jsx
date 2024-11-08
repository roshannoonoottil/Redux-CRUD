import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UserRegister = lazy(()=> import('./assets/Components/UserRegister/UserRegister'))
const UserLogin = lazy(()=> import('./assets/Components/UserLogin/UserLogin'))

function App() {

  return (
    <Router>
    <div>
      <Suspense>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
  )
}

export default App
