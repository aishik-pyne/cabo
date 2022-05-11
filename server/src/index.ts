import express, { Request, Response } from 'express';
import cors from 'cors';
import { Server as SocketIOServer } from "socket.io";
import http, { Server as HTTPServer } from "http";
import { RoomEvent, SocketEvent } from "./utils/constant";
import { Lobby } from './lobby';
import { Room } from './room';
import { Player, PlayerStore } from './models/player';
import { setupSocketServer } from './socket';

const app = express();
const port = 3000;

// Setup Cors
app.use(cors);

const httpServer: HTTPServer = http.createServer(app);
const lobby: Lobby = new Lobby();
const playerStore: PlayerStore = new PlayerStore();

setupSocketServer(httpServer, playerStore, lobby);


httpServer.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});