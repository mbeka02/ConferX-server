import { Router } from "express";
import { createPublicRoom } from "../controllers/roomController.js";

const router = Router();

router.route("/public").post(createPublicRoom);

export default router;
