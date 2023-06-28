import Room from "../models/room.js";
const createRoom = async (req, res) => {
    await Room.create(req.body);
    res.status(201).json({ msg: "Room created" });
};
export { createRoom };
//# sourceMappingURL=roomController.js.map