import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import { FoodItem } from '../foodItem/FoodItem'

export const FoodDisplay = ({category}) => {

    const { food_list, searchQuery } = useContext(StoreContext)

    const filteredList = food_list.filter((item) => {
        const matchesCategory = category === "All" ||
            item.category.toLowerCase() === category.toLowerCase()
        const matchesSearch = !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className='food-display' id='food-display'>
            <h2>
                {searchQuery
                    ? `Results for "${searchQuery}" ${filteredList.length === 0 ? '— nothing found' : `(${filteredList.length})`}`
                    : category !== "All"
                        ? `${category} (${filteredList.length})`
                        : 'Top dishes near you'
                }
            </h2>
            {filteredList.length === 0 && (
                <p className="no-results">
                    No dishes found. Try a different category or add items from the admin panel.
                </p>
            )}
            <div className="food-display-list">
                {filteredList.map((item) => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
}