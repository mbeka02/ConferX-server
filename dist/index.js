import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import roomRouter from "./routes/roomRoutes.js";
import dotenv from "dotenv";
import connectDB from "./database/connector.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});
dotenv.config();
app.use(json());
app.use("/api/v1/room", roomRouter);
app.get("/", (req, res) => {
    res.status(200).json({ msg: "API" });
});
io.on("connection", (socket) => {
    // join room,event add socket.id to arr
    socket.on("join_room", async (roomId) => {
        //socket has to leave all other rooms before it joins new one , prevents events from being visible while in another room
        Array.from(socket.rooms)
            //by default the users own socket id is in socket.rooms we have to exclude it
            .filter((item) => item !== socket.id)
            .forEach((room) => {
            if (room !== roomId) {
                socket.leave(room);
                console.log(`User:${socket.id} has left room: ${room}`);
            }
        });
        socket.join(roomId); //join user to specific room
        // Have a joining event
        // get no of sockets in room
        //Check if length/no is greater than 2
        //If so try to connect the 2 peers
        const SOCKETS = await io.in(roomId).fetchSockets();
        //console.log(SOCKETS.length);
        if (SOCKETS.length > 1) {
            socket.to(roomId).emit("otherUserJoined");
        }
    });
    socket.on("offer", (payload) => {
        socket.to(payload.roomId).emit("offer", payload);
    });
    socket.on("answer", (payload) => {
        socket.to(payload.roomId).emit("answer", payload);
    });
    socket.on("ice-candidate", (payload) => {
        socket.to(payload.roomId).emit("ice-candidate", payload.candidate);
    });
});
const port = 3000;
//type assertion for string env variable
const connectionstring = process.env.DEVDB;
//only spin up server if con has been established
httpServer.listen(port, async () => {
    try {
        await connectDB(connectionstring);
        console.log(`Server is listening on port:${port}`);
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map