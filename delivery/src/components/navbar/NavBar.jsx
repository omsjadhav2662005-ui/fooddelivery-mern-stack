import './navbar.css'
import {assets} from '../../assets/assets'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function NavBar({setshowLogin}) {
    const [menu, setMenu] = useState("home")
    const { getTotalcarAmount, token, setToken, searchQuery, setSearchQuery } = useContext(StoreContext)
    const navigate = useNavigate()
    const [searchOpen, setSearchOpen] = useState(false)

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }

    const handleSearchToggle = () => {
        setSearchOpen(prev => {
            if (prev) setSearchQuery("")
            return !prev
        })
    }

  return (
    <div className='navbar'>
       <Link to={'/'}>
         <img src={assets.logo} alt="" className="logo" />
       </Link>

    <ul className="navbar-Menu">
        <Link to='/' onClick={()=> setMenu("home")} className={menu === 'home'? "active": ""}>Home</Link>
        <a href='#explore-menu' onClick={()=> setMenu("menu")} className={menu === 'menu'? "active": ""}>Menu</a>
        <a href='#app-download' onClick={()=> setMenu("mopile-App")} className={menu === 'mopile-App'? "active": ""}>Mobile App</a>
        <a href='#footer' onClick={()=> setMenu("Contact Us")} className={menu === 'Contact Us'? "active": ""}>Contact Us</a>
    </ul>

    <div className="navbar-right">
        <div className={"navbar-search-bar" + (searchOpen ? " open" : "")}>
            {searchOpen && (
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="search-input"
                />
            )}
            <img
                src={assets.search_icon}
                alt="search"
                onClick={handleSearchToggle}
                className={"search-icon" + (searchOpen ? " active-search" : "")}
                title={searchOpen ? 'Close search' : 'Search food'}
            />
        </div>

        <div className="navbar-saerch-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalcarAmount()===0?"":"dot"}></div>
        </div>

        {!token ?
          <button onClick={()=> setshowLogin(true)}>Sign In</button>
        :
         <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Log Out</p>
                </li>
            </ul>
         </div>
        }
    </div>
    </div>
  )
}

export default NavBar
