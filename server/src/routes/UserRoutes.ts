import express from "express";
import { login, logout, singup, updateProfile, userDetails } from "../controllers/UserController";
import { verifyToken } from "../middlewares/verifyToken";
import { upload } from "../lib/upload";

export const UserRouter = express.Router();

UserRouter.post("/signup", singup)
UserRouter.post("/login", login)
UserRouter.post("/logout", logout)
UserRouter.get("/details", verifyToken, userDetails)
UserRouter.post("/update", verifyToken, upload.single("avatar"), updateProfile)