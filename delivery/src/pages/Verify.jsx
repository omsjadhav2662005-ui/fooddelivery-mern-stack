import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'

const Verify = () => {

    const navigate = useNavigate();
const [searchParams, SetsearchParams] = useSearchParams()

const success = searchParams.get("success")
const orderId = searchParams.get("orderId")
const {url} = useContext(StoreContext)

const verifyPayment = async () =>{
const response = await axios.post(url + "/api/order/verify", {success, orderId})
if(response.data.success){
navigate("myorders")
}
else{
    navigate('/')
}
}
useEffect(()=>{
    verifyPayment()
}, [])

  return (
    <div className='verify'>
      <div className="spiner"></div>
        </div>
  )
}

export default Verify
