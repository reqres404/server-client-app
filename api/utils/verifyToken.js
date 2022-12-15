import jwt from 'jsonwebtoken'
import { CreateError } from '../utils/error.js'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) {
        return next(CreateError(401,"You aren't authenticated"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(CreateError(401,"Token Invalid"))
        }
        req.user = user
        next()
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id||req.user.isAdmin){
            next()
        }else{
            return next(CreateError(403,"Invalid ID"))
        }
    })
}
export const verifyAdmin=(req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(CreateError(403,"Invalid ID"))
        }
    })
}