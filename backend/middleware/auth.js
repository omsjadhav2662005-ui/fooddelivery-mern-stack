import jwt  from "jsonwebtoken";

const autMiddleWare = async (req,res, next) => {
    const {token} = req.headers;
    if (!token) {
       return res.json({success:false, message:"not Authrize Login again"})
    }
    try {
       const token_decode = jwt.verify(token, process.env.JWT_SECRET)
       req.body.userId = token_decode.id


       next()
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:"Error"})
    }
}

export default autMiddleWare
