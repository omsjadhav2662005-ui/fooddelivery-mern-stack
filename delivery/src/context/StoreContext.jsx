import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({})
    const url = 'http://localhost:5000'
    const [token,setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const addTocart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }))

        const localToken = localStorage.getItem("token")
        if (localToken) {
            await axios.post(
                url + '/api/cart/add',
                { itemId },
                { headers:{ token: localToken } }
            )
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if(!prev[itemId]) return prev
            const updated = {...prev}
            if(updated[itemId] === 1){
                delete updated[itemId]
            } else {
                updated[itemId] -= 1
            }
            return updated
        })

        const localToken = localStorage.getItem("token")
        if (localToken) {
            await axios.post(
                url + '/api/cart/remove',
                { itemId },
                { headers:{ token: localToken } }
            )
        }
    }

    const getTotalcarAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(
                    (product) => product._id === item
                );
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list')
        setFoodList(response.data.data)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                const storedToken = localStorage.getItem("token")
                setToken(storedToken)
                const response = await axios.post(
                    url + "/api/cart/get",
                    {},
                    { headers:{ token: storedToken } }
                )
                setCartItems(response.data.cartData || {})
            }
        }
        loadData()
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        getTotalcarAmount,
        url,
        token,
        setToken,
        searchQuery,
        setSearchQuery
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
