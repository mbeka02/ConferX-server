import { Router } from "express";
import { createRoom } from "../controllers/roomController.js";
const router = Router();
router.route("/").post(createRoom);
export default router;
//# sourceMappingURL=roomRoutes.js.map