import express from "express";
import { login, logout, singup } from "../controllers/UserController";

export const UserRouter = express.Router();

UserRouter.post("/signup", singup)
UserRouter.post("/login", login)
UserRouter.post("/logout", logout)