import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const STATUS_MAP = {
  "food processing": {
    label: "Food Processing",
    color: "#f0a500",
    icon: "🍳",
    step: 1
  },
  "Out for Delivery": {
    label: "Out for Delivery",
    color: "#1e90ff",
    icon: "🚚",
    step: 2
  },
  "Delivered": {
    label: "Delivered",
    color: "#28a745",
    icon: "✅",
    step: 3
  }
}

const StatusBadge = ({ status }) => {
  const info = STATUS_MAP[status] || { label: status, color: "#999", icon: "📦", step: 0 }
  return (
    <span className="status-badge" style={{ backgroundColor: info.color + "20", color: info.color, border: `1px solid ${info.color}` }}>
      {info.icon} {info.label}
    </span>
  )
}

const StatusTracker = ({ status }) => {
  const steps = [
    { key: "food processing", label: "Processing", icon: "🍳" },
    { key: "Out for Delivery", label: "On the way", icon: "🚚" },
    { key: "Delivered", label: "Delivered", icon: "✅" }
  ]
  const currentStep = STATUS_MAP[status]?.step ?? 0

  return (
    <div className="status-tracker">
      {steps.map((step, i) => (
        <React.Fragment key={step.key}>
          <div className={`tracker-step ${currentStep >= step.key === status || STATUS_MAP[status]?.step >= i + 1 ? 'done' : ''} ${status === step.key ? 'current' : ''}`}>
            <div className="tracker-circle" style={{
              backgroundColor: STATUS_MAP[status]?.step >= i + 1 ? STATUS_MAP[step.key]?.color || '#ccc' : '#e0e0e0',
              color: STATUS_MAP[status]?.step >= i + 1 ? '#fff' : '#aaa'
            }}>
              {step.icon}
            </div>
            <p className="tracker-label" style={{
              color: STATUS_MAP[status]?.step >= i + 1 ? '#333' : '#aaa',
              fontWeight: status === step.key ? '700' : '400'
            }}>
              {step.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="tracker-line" style={{
              backgroundColor: STATUS_MAP[status]?.step >= i + 2 ? '#28a745' : '#e0e0e0'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setData(response.data.data || [])
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  const handleTrackOrder = async (orderId) => {
    await fetchOrders()
    setExpandedOrder(prev => prev === orderId ? null : orderId)
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order-wrapper">
            <div className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? item.name + " x " + item.quantity
                    : item.name + " x " + item.quantity + " ,"
                )}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <StatusBadge status={order.status} />
              <button
                onClick={() => handleTrackOrder(order._id)}
                className={expandedOrder === order._id ? 'track-btn active-track' : 'track-btn'}
              >
                {expandedOrder === order._id ? '▲ Hide' : '🚚 Track Order'}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="order-tracker-panel">
                <h4>Order Tracking</h4>
                <StatusTracker status={order.status} />
                <div className="order-tracker-details">
                  <div className="tracker-detail-row">
                    <span>Order ID</span>
                    <span className="detail-val mono">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="tracker-detail-row">
                    <span>Items</span>
                    <span className="detail-val">
                      {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                    </span>
                  </div>
                  <div className="tracker-detail-row">
                    <span>Total</span>
                    <span className="detail-val">${order.amount}.00</span>
                  </div>
                  <div className="tracker-detail-row">
                    <span>Current Status</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
