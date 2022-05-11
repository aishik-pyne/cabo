
import { Server as SocketIOServer } from "socket.io";
import { Lobby } from './lobby';
import { Room } from './room';
import { Player, PlayerStore } from './models/player';
import http, { Server as HTTPServer } from "http";
import { decodeToken, generateToken, verifyToken } from "./utils/jwt";
import { SocketEvent, RoomEvent } from "./utils/constant";


export function setupSocketServer(httpServer: HTTPServer,
    playerStore: PlayerStore, lobby: Lobby) {
    const io: SocketIOServer = new SocketIOServer(httpServer, {
        cors: {
            origin: "http://localhost:8080"
        }
    });
    // Authentication Middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            verifyToken(token);
            next()
        } catch (error) {
            next(new Error("Token not valid"));
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        const payload: Player = decodeToken(token) as Player;
        const player = playerStore.getPlayer(payload.id);
        if (player == null) {
            socket.data.player = player;
            next(new Error("Player Not Found"));
        } else {
            next();
        }
    })


    io.on(SocketEvent.CONNECT, (socket) => {
        const player: Player = socket.data.player;
        console.log(`Connected ${socket.data.player.id}`);

        socket.on('login', function () {
            console.debug(`Received Event: login`);

            const player = playerStore.createPlayer();
            const token: string = generateToken(player.id);
            socket.emit('player', {
                player: player,
                token: token,
            });
            socket.emit('roomList', lobby.listRoom());
        });


        socket.on(RoomEvent.CREATE, function () {
            const createdRoom: Room = lobby.createRoom(player);
            socket.emit('roomCreated', createdRoom)
            socket.emit('roomList', lobby.listRoom());
        });

        socket.on(RoomEvent.JOIN, function (ID: string) {
            const room: Room | null = lobby.getRoomById(ID);
            if (room != null) {
                room.addplayer(player);
            }
            socket.emit('roomList', lobby.listRoom());
        });

        socket.on(RoomEvent.KICK, function (ID: string) {
            const room: Room | null = lobby.getRoomById(ID);
            if (room != null) {
                room.kickPlayer(player.id);
            }
            socket.emit('roomList', lobby.listRoom());
        });

        socket.on(RoomEvent.DELETE, function (ID: string) {
            const room: Room | null = lobby.getRoomById(ID);
            if (room != null && room.owner == player) {
                lobby.deleteRoom(ID);
            }
            socket.emit('roomList', lobby.listRoom());
        });

        socket.on(SocketEvent.DISCONNECT, () => {
            console.log(`Disconnected ${socket.data.player.id}`);
        });

    })

    return io;
}