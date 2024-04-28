import cors from "cors";
import express from "express";
import { EditorRouter } from "./routes/EditorRoutes";
import { dbConnect } from "./lib/dbConnect";
import { UserRouter } from "./routes/UserRoutes";
import cookieParser from "cookie-parser";
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}


const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static('uploads'));

dbConnect()

app.use("/editor", EditorRouter)
app.use("/auth", UserRouter)



app.listen(4000, () => {
    console.log("http://localhost:4000");
});