import { Request, Response } from "express";
import Room from "../models/room.js";

const createRoom = async (req: Request, res: Response) => {
  await Room.create(req.body);
  res.status(201).json({ msg: "Room created" });
};

export { createRoom };
