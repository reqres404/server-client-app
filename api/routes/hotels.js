import express from "express";
import { countByCity, countByType, createNewHotel, DeleteHotel, GetAllHotel, GetHotel, getHotelRooms, UpdateHotel } from "../controllers/hotelController.js";
import Hotel from "../models/Hotel.js";
import { CreateError } from "../utils/error.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

// CREATE
router.post("/",verifyAdmin,createNewHotel);//code is handled at hotelController
// UPDATE
router.put("/:id",verifyAdmin,UpdateHotel);
// DELETE
router.delete("/:id",verifyAdmin,DeleteHotel);
// GET
router.get("/find/:id",GetHotel);
// GETALL
router.get("/",GetAllHotel );
router.get("/countByCity",countByCity );
router.get("/countByType",countByType );
router.get("/room/:id",getHotelRooms );

export default router;
