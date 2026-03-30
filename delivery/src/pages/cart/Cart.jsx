import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './cart.css'

const Cart = () => {

  const { food_list, cartItems, removeFromCart, getTotalcarAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">

        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>

        <br />
        <hr />

        {
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>

                    <img src={url + "/images/" + item.image} alt="" />

                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>

                    <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>

                  </div>
                  <hr />
                </div>
              )
            }
            return null
          })
        }

        <div className="cart-bottom">

          <div className="cart-total">
            <h2>cart Total</h2>

            <div>
              <div className="cart-total-details">
                <p>subTotal</p>
                <p>${getTotalcarAmount()}</p>
              </div>

              <hr />

              <div className="cart-total-details">
                <p>delivery fee</p>
                <p>${getTotalcarAmount() === 0 ? 0 : 2}</p>
              </div>

              <hr />

              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalcarAmount() === 0
                    ? 0
                    : getTotalcarAmount() + 2}
                </b>
              </div>
            </div>

            <button onClick={() => navigate('/order')}>
              proceed to checkout
            </button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>if you have promocode enter here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promocode' />
                <button>submit</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart
