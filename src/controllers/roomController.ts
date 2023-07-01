import { Request, Response } from "express";
import { Public, Private } from "../models/room.js";

const createPublicRoom = async (req: Request, res: Response) => {
  const { topic, roomType } = req.body;
  await Public.create({ topic, roomType });
  res.status(201).json({ msg: "Room created" });
};

export { createPublicRoom };
