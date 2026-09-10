import { BrowserRouter, Routes } from "react-router-dom"
import Home from './pages/Home'
import Dashboard from "./pages/Dashboard";
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
