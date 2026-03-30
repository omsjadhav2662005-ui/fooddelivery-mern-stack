import React, { useContext } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

export const ExploreMenu = ({category, setCategory}) => {

  const { setSearchQuery } = useContext(StoreContext)

  const handleCategoryClick = (menuName) => {
    setSearchQuery("")
    setCategory(prev => (prev === menuName ? "All" : menuName))
    setTimeout(() => {
      const el = document.getElementById('food-display')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Choose from our diverse menu — click any category to filter the dishes shown below.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item.menu_name)}
            key={index}
            className='explore-menu-list-item'
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p className={category === item.menu_name ? "active-label" : ""}>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}