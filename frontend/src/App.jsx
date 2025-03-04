import './lib/App.css'
import Login from "./components/auth/LoginComponent"
import Signup from "./components/auth/SignupComponent"
import BuyerDashboard from './components/auth/BuyerDashboard'
import SellerDashboard from './components/auth/SellerDashboard'
import AdminDashboard from './components/auth/AdminDashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<BuyerDashboard/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      
   </Routes>
  </Router>
  )
}

export default App
