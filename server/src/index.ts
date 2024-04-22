import cors from "cors";
import express from "express";
import { EditorRouter } from "./routes/EditorRoutes";
import { dbConnect } from "./lib/dbConnect";
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());
dbConnect()

app.use("/editor", EditorRouter)



app.listen(4000, () => {
    console.log("http://localhost:4000");
});