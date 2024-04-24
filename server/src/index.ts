import cors from "cors";
import express from "express";
import { EditorRouter } from "./routes/EditorRoutes";
import { dbConnect } from "./lib/dbConnect";
import { UserRouter } from "./routes/UserRoutes";
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());
dbConnect()

app.use("/editor", EditorRouter)
app.use("/auth", UserRouter)



app.listen(4000, () => {
    console.log("http://localhost:4000");
});