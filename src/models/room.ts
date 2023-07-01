import { Schema, model } from "mongoose";

const BaseRoomSchema = new Schema({
  topic: {
    type: String,
    required: [true, "provide a topic"],
  },
  roomType: {
    type: String,
    enum: ["Public", "Private"],
    required: [true, "provide a value for the room type"],
  },
});
const options = { discriminatorKey: "kind", collection: "rooms" };
const Public = model("Public", BaseRoomSchema);

const PrivateRoomSchema = Public.discriminator("Private", new Schema({}));

const Private = model("Private");

export { Public, Private };
