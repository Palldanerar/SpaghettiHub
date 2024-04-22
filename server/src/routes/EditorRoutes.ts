import express from "express";
import { loadCode, saveCode } from "../controllers/EditorController";

export const EditorRouter = express.Router();

EditorRouter.post("/save", saveCode)
EditorRouter.get("/load/:id", loadCode)