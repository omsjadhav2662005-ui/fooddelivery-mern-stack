import React, { useState } from 'react'
import NavBar from './components/navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import PlaceOrder from './pages/placeOder/PlaceOrder'
import Cart from './pages/cart/Cart'
import { Footer } from './components/footer/Footer'
import LoginpopUp from './components/loginpopUp/LoginpopUp'
import Verify from './pages/Verify'
import MyOrders from './pages/myorders/MyOrders'

function App() {
  const [showLogin, setshowLogin] = useState(false)
  return (
    <>
    {showLogin? <LoginpopUp setshowLogin={setshowLogin}/>: <></>}
    <div className='app'>
      <NavBar setshowLogin={setshowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />

      </Routes>

    </div>
     <Footer/>
     </>
  )
}

export default App
