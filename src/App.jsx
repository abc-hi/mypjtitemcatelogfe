import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar'
import Home from './Components/Home'
import Menswear from './Components/Menswear'
import Kidswear from './Components/Kidswear'
import Signin from './Components/Signin'
import Cart from './Components/Cart'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import Context, { myContext } from './Components/Context'
import Ladieswear from './Components/Ladieswear'
import ProductDetails from './Components/ProductDetails'
import Footcomp from './Components/Footcomp'
const App = () => {
        return (

                <div className="space-y-6 text-xl font-bold" style={{ backgroundColor: "#001F3F", minHeight: "100vh", color: "white", fontFamily: "'Open Sans', sans-serif" }}>

                        <BrowserRouter>
                                <h1>Item Catelog</h1>
                                <h4 style={{ fontFamily: "Poppins" }}>Explore yours..</h4>

                                <Context>
                                        <Navbar />
                                        <Routes>

                                                <Route path='/' element={<Home />} />
                                                <Route path='/menswear' element={<Menswear />} />
                                                <Route path='/kidswear' element={<Kidswear />} />
                                                <Route path='/ladieswear' element={<Ladieswear />} />
                                                <Route path='/ProductDetails' element={<ProductDetails />} />
                                                <Route path='/product/:id' element={<ProductDetails />} />
                                                {/* // route to get each product in product details page */}
                                                <Route path='/signin' element={<Signin />} />
                                                <Route path='/cart' element={<Cart />} />
                                                <Route path='/adminlogin' element={<AdminLogin />} />
                                                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                                        </Routes>          </Context>
                                <Footcomp />
                        </BrowserRouter> </div>
        )
}

export default App