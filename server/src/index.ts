import http, { Server as HTTPServer } from "http";
import { RoomEvent, SocketEvent } from "./utils/constant";
import { Lobby } from './lobby';
import { Player, PlayerStore } from './models/player';
import { setupSocketServer } from './lib/socket';
import { setupExpress } from "./lib/express";

const lobby: Lobby = new Lobby();
const playerStore: PlayerStore = new PlayerStore();

const app = setupExpress(playerStore);
const httpServer: HTTPServer = http.createServer(app);
const io = setupSocketServer(httpServer, playerStore, lobby);


const port = 3000;
httpServer.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});