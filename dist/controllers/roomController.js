import { Public } from "../models/room.js";
const createPublicRoom = async (req, res) => {
    const { topic, roomType } = req.body;
    await Public.create({ topic, roomType });
    res.status(201).json({ msg: "Room created" });
};
export { createPublicRoom };
//# sourceMappingURL=roomController.js.map