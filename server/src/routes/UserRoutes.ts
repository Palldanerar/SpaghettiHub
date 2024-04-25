import express from "express";
import { login, logout, singup, userDetails } from "../controllers/UserController";
import { verifyToken } from "../middlewares/verifyToken";

export const UserRouter = express.Router();

UserRouter.post("/signup", singup)
UserRouter.post("/login", login)
UserRouter.post("/logout", logout)
UserRouter.get("/details", verifyToken, userDetails)