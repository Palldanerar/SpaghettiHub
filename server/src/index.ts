import cors from "cors";
import express from "express";
import { EditorRouter } from "./routes/EditorRoutes";
import { dbConnect } from "./lib/dbConnect";
import { UserRouter } from "./routes/UserRoutes";
import cookieParser from "cookie-parser";
require('dotenv').config();
import http from "http"
import { Server } from 'socket.io';
import { Code } from "./models/Code";

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}


const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static('uploads'));

dbConnect()

app.use("/editor", EditorRouter)
app.use("/auth", UserRouter)

const users:any = [];
let code = {
    html: "",
    css: "",
    javascript: "",
};

io.on("connection", (socket) => {
    console.log('socket connected', socket.id);

    socket.on("joinRoom", (user) => {

        console.log(user)

        if(!users.find((el: any) => el.username == user.username)) {
            users.push(user)
        }

        socket.emit("currentCode", code)
    });

    socket.on("changeCode", (newCode) => {

        code.html = newCode.html || code.html;
        code.css = newCode.css || code.css;
        code.javascript = newCode.javascript || code.javascript;

        console.log(code)

        io.emit("currentCode", code)
    })

    socket.on('disconnect', () => {
        console.log('Отключились')
    })
})


server.listen(4000, () => {
    console.log("http://localhost:4000");
});