import express, { Request, Response } from 'express';
import { Server as SocketIOServer } from "socket.io";
import http, { Server as HTTPServer } from "http";
import { SocketEvent } from "./utils/constant";
// import { Server as HTTPServer } from "http";

const app = express();
const port = 3000;

const httpServer: HTTPServer = http.createServer(app);
// const io = new socketio(httpServer);

const io: SocketIOServer = new SocketIOServer(httpServer);

io.on(SocketEvent.CONNECT, (socket) => {
    console.log(`Connect ${socket.id}`);

    socket.on(SocketEvent.DISCONNECT, () => {
        console.log(`Disconnected ${socket.id}`);

    });

})

httpServer.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});