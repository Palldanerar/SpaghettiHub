import express from "express";
import { deleteCode, editCode, getAllCodes, getMyCodes, loadCode, saveCode } from "../controllers/EditorController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous";
import { verifyToken } from "../middlewares/verifyToken";

export const EditorRouter = express.Router();

EditorRouter.post("/save", verifyTokenAnonymous, saveCode)
EditorRouter.get("/load/:id", verifyTokenAnonymous, loadCode)
EditorRouter.get("/all", getAllCodes);
EditorRouter.get("/my-code", verifyToken, getMyCodes);
EditorRouter.delete("/delete/:id", verifyToken, deleteCode);
EditorRouter.put("/edit/:id", verifyToken, editCode);