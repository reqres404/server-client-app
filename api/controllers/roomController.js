import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import {CreateError} from "../utils/error.js";

export const CreateRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err);
  }
};

export const UpdateRoom =async(req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedRoom);
      } catch (err) {
        next(err);
      }
}
export const DeleteRoom =async(req,res,next)=>{
    const hotelId = req.params.hotelId
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
        res.status(200).json("Room deleted");
      } catch (err) {
        next(err);
      }
}
export const GetRoom =async(req,res,next)=>{
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err)
    }
}
export const GetAllRoom =async(req,res,next)=>{
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
      } catch (err) {
        next(err)
      }
}
