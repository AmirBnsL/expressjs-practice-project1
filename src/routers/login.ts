import Express from "express";
import authController from "../Controllers/authController";

const router = Express.Router();
export default router;

router.post("/", authController.createUser);
