import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderControllers.js";
import express from "express";
import authmiddleware from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/place', authmiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authmiddleware, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter
