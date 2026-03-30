import React, { useContext, useState } from 'react'
import './LoginpopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginpopUp = ({setshowLogin}) => {
  const {url, setToken} = useContext(StoreContext)
    const [currentState, setcurrentState] = useState("Login")
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onchangeHnadler = (e) =>{
      const name = e.target.name;
      const value = e.target.value
      setData(data =>({...data,[name]:value}))
    }

    const onLogin = async (event) =>{
       event.preventDefault()
       let newUrl = url;
       if(currentState ==='Login'){
        newUrl += '/api/user/login';
       }
       else{
        newUrl += '/api/user/register';
       }

       const response = await axios.post(newUrl,data)
       if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setshowLogin(false)
       }
       else{
        alert(response.data.message)
       }

    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() =>setshowLogin(false) } src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState ==='Login'? <></>:  <input name='name' value={data.name} onChange={onchangeHnadler} type="text" placeholder='your name' required />}

            <input name='email' value={data.email} onChange={onchangeHnadler} type="email" placeholder='your email' required />
            <input name='password' value={data.password} onChange={onchangeHnadler} type="password" placeholder='your password' required />
        </div>
        <button type='submit'>{currentState === 'sign Up'? 'create Account': "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>by continuity, i agree to the terms of use & privacy policy</p>
        </div>
        {
            currentState === 'Login'?  <p>Create a new Account? <span onClick={() => setcurrentState("sign Up")} >click Here</span></p>
            :  <p>All ready have an account? <span onClick={() => setcurrentState("Login")}>Login  Here</span></p>
        }


      </form>
        </div>
  )
}

export default LoginpopUp
