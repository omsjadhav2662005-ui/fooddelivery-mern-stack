import AppdownLoad from '../../components/AppDownload/AppdownLoad'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'
import { FoodDisplay } from '../../components/foodDisplay/FoodDisplay'
import { Header } from '../../components/header/Header'
import './home.css'
import { useState } from 'react'

function Home() {
  const [category, setCategory] = useState("All")
  return (
    <div>
     <Header/>
     <ExploreMenu category={category} setCategory={setCategory}/>
     <FoodDisplay category={category}/>
     <AppdownLoad/>
      </div>
  )
}

export default Home
