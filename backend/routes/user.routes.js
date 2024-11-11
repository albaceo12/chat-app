import express from "epxress";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/", protectRoute, getUserForSidebar);
export default router;
