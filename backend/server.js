import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use("/images", express.static("uploads"))

app.use(cors())

connectDb()

app.use("/api/food", foodRouter)
app.use('/api/user', userRouter)
app.use("/api/cart", cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) =>{
    res.send("api working")
})

app.listen(port, ()=>{
    console.log(`server started on port http://localhost:${port}`)
})
