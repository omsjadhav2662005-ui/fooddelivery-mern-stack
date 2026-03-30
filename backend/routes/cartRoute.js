import express from "express";
import { addTocart, removeFromCart, getCart } from "../controllers/cartControllers.js";
import autMiddleWare from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.post("/add", autMiddleWare, addTocart)
cartRouter.post("/remove",  autMiddleWare, removeFromCart)
cartRouter.post("/get",  autMiddleWare, getCart)

export default cartRouter;
