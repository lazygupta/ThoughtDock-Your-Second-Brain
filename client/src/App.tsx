import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}> 
      {/* These all wil be passed a Outlet */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      {/* This will not come under Outlet */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App