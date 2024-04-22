import { Request, Response } from "express";
import { IFullCode } from "../interface/IFullCode";
import { Code } from "../models/Code";

export const saveCode = async (req: Request, res: Response) => {
    try {

        const { fullCode }: { fullCode: IFullCode } = req.body;

        const newCode = new Code({
            fullCode: fullCode
        });

        await newCode.save()

        return res.status(201).send({ url: newCode._id, status: "saved!" });

    } catch (error) {
        return res.status(500).send({ message: "Error saving code", error });
    }
}

export const loadCode = async (req: Request, res: Response) => {
    try {

        const code = await Code.findById(req.params.id);

        if (!code) {
            return res.status(404).send({ message: "Code not found" });
        }

        return res.status(200).send({ fullCode: code.fullCode });

    } catch (error) {
        return res.status(500).send({ message: "Error saving code", error });
    }
}