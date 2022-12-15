import express from 'express';
import { CreateRoom, DeleteRoom, GetAllRoom, GetRoom, UpdateRoom } from '../controllers/roomController.js';
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

// CREATE
router.post("/:hotelId",verifyAdmin,CreateRoom);//code is handled at hotelController
// UPDATE
router.put("/",verifyAdmin,UpdateRoom);
// DELETE
router.delete("/:id/:hotelId",verifyAdmin,DeleteRoom);
// GET
router.get("/:id",GetRoom);
// GETALL
router.get("/",GetAllRoom );
export default router