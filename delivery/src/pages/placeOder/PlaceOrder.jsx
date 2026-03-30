import { useContext,  useState } from 'react'
import  './placeOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function PlaceOrder() {

  const {getTotalcarAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onchangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault()

    try {

      let orderItems = []

      food_list.map((item)=>{
        if(cartItems[item._id] > 0){
          let itemInfo = {...item}
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalcarAmount()+2
      }

      console.log(orderData)

      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      )

      console.log(response.data)

      if (response.data.success) {
        const { session_url } = response.data
        window.location.replace(session_url)
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Server Error")
    }
  }


  return (
    <form  onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">

        <p className='title'>information delivery</p>

        <div className="multi-fields">
          <input required
            name='firstName'
            onChange={onchangeHandler}
            value={data.firstName}
            type="text"
            placeholder='firstName'
          />
          <input
           required
            name='lastName'
            onChange={onchangeHandler}
            value={data.lastName}
            type="text"
            placeholder='lastName'
          />
        </div>

        <input
         required
          name='email'
          onChange={onchangeHandler}
          value={data.email}
          type="email"
          placeholder='email'
        />

        <input
         required
          name='street'
          onChange={onchangeHandler}
          value={data.street}
          type="text"
          placeholder='street'
        />

        <div className="multi-fields">
          <input
           required
            name='city'
            onChange={onchangeHandler}
            value={data.city}
            type="text"
            placeholder='city'
          />
          <input
           required
            name='state'
            onChange={onchangeHandler}
            value={data.state}
            type="text"
            placeholder='state'
          />
        </div>

        <div className="multi-fields">
          <input
           required
            name='zipCode'
            onChange={onchangeHandler}
            value={data.zipCode}
            type="text"
            placeholder='zipCode'
          />
          <input
           required
            name='country'
            onChange={onchangeHandler}
            value={data.country}
            type="text"
            placeholder='country'
          />
        </div>

        <input
         required
          name='phone'
          onChange={onchangeHandler}
          value={data.phone}
          type="text"
          placeholder='phone'
        />

      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>subTotal</p>
              <p>{getTotalcarAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>delivery fee</p>
              <p>{getTotalcarAmount()===0? 0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalcarAmount()===0? 0:getTotalcarAmount()+2}</b>
            </div>
          </div>
          <button type='submit'> proceed to payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
