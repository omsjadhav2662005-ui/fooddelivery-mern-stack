import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

export const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, molestias. Ratione expedita veritatis perspiciatis, numquam mollitia dolores ad ab perferendis voluptatibus sint cumque iure! Repellendus ipsum rem ab voluptatem provident.</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>Contact Us</li>
                <li>Delivery</li>
                <li>privacy Policy </li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET I TOACH</h2>
            <ul>
                <li>0614832077</li>
                <li>contact@tomato.gmail.com</li>
            </ul>
        </div>

       </div>
       <hr />
       <p className="footer-copyRight">copy right 2025-2026. All reserved </p>
        </div>
  )
}
