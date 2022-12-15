import express from 'express';
import { DeleteUser, GetAllUser, GetUser, UpdateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/checkauth",verifyToken,(req,res,next)=>{
//     res.send("Hello user you're logged in")
// })
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello user you're logged in and you can delete your account")
// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin you're logged in and you can delete all accounts")
// })
// UPDATE
router.put("/:id",verifyUser,UpdateUser);
// DELETE
router.delete("/:id",verifyUser,DeleteUser);
// GET
router.get("/:id",verifyUser,GetUser);
// GETALL
router.get("/",verifyAdmin,GetAllUser );

export default router