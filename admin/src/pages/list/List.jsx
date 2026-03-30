import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])
const url = 'http://localhost:5000'
  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error('Error')
    }
  }
const removeFood = async (foodId) =>{
const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
await fetchList()
if(response.data.success){
  toast.success(response.data.message)
}
else{
  toast.error("Error")
}
}
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
  <p>All foods list</p>
  <div className="list-table">
  <div className="list-table-format title">
  <b>image</b>
  <b>name</b>
  <b>category</b>
  <b>price</b>
  <b>Action</b>
</div>

{list.map((item, index) => (
  <div key={index} className="list-table-format">
    <img src={`${url}/images/${item.image}`} alt="" />
    <p>{item.name}</p>
    <p>{item.category}</p>
    <p>{item .price}</p>
    <p onClick={()=> removeFood(item._id)} className='cursor'>x</p>
  </div>
))}

    </div>
  </div>

  )
}

export default List
