import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  topic: {
    type: String,
    required: [true, "provide a topic"],
  },
  roomType: {
    type: String,
    enum: ["Open", "Social", "Closed"],
    required: [true, "provide a value"],
  },
});

export default model("room", RoomSchema);
