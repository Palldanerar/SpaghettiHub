import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const singup = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    try {

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }

        if (!usernameRegex.test(username)) {
            return res.status(400).send({ message: "Some characters are not allowed!" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
        });

        const jwtToken = jwt.sign(
            {
                _id: newUser._id,
                email: newUser.email,
            },
            process.env.JWT_KEY!,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });

        await newUser.save()

        return res.status(201).send({
            username: newUser.username,
            picture: newUser.picture,
            email: newUser.email,
            savedCodes: newUser.savedCodes,
        });

    } catch (error) {
        return res.status(500).send({ message: "Error signing up!", error: error });
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password }: { username: string; password: string } = req.body;

    try {
        let existingUser = null;

        if (username.includes("@")) {
            existingUser = await User.findOne({ email: username });
        } else {
            existingUser = await User.findOne({ username: username });
        }

        if (!existingUser) {
            return res.status(400).send({ message: "User not found" });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatched) {
            return res.status(400).send({ message: "wrong password" });
        }

        const jwtToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(200).send({
            username: existingUser.username,
            picture: existingUser.picture,
            email: existingUser.email,
            savedCodes: existingUser.savedCodes,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error log in!", error: error });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({ message: "logged out successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Error logging out!", error });
    }
};