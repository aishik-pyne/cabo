
import { Server as SocketIOServer } from "socket.io";
import { Lobby } from '../lobby';
import { Room } from '../room';
import { Player, PlayerStore } from '../models/player';
import http, { Server as HTTPServer } from "http";
import { decodeToken, generateToken, verifyToken } from "../utils/jwt";
import { SocketEvent, RoomEvent, RoomEmitEvent, ChatEvent, ChatEmitEvent, GameEvents, GameEmitEvents } from "../utils/constant";
import { createLogger, format, transports } from "winston";

const eventLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.label({ label: 'event' }),
        format.timestamp(),
        format.align(),
        format.printf(info => `${info.label} ${info.timestamp} ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'socket-event-logger' },
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'logs/socker_event.log' }),
    ],
});

export function setupSocketServer(httpServer: HTTPServer,
    playerStore: PlayerStore, lobby: Lobby, auth: boolean = true) {

    const io: SocketIOServer = new SocketIOServer(httpServer, {
        cors: {
            origin: "http://localhost:8080"
        }
    });

    // Authentication Middleware
    if (auth) {
        io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            try {
                verifyToken(token);
                next()
            } catch (error) {
                console.error("Token Not Valid");
                next(new Error("Token not valid"));
            }
        });

        io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            const payload: Player = decodeToken(token) as Player;

            const player = playerStore.getPlayer(payload.id);
            if (player == null) {
                console.error("Player Not Found");
                next(new Error("Player Not Found"));
            } else {
                socket.data.player = player;
                next();
            }
        })
    }

    io.on(SocketEvent.CONNECT, (socket) => {
        const player: Player = socket.data.player;
        console.log(`Connected ${socket.data.player.name}`);

        registerRoomEventHandlers(io, socket, lobby);
        registerGameEventHandlers(io, socket, lobby);
        registerChatEventHandlers(io, socket);

        socket.on(SocketEvent.DISCONNECT, () => {
            console.log(`Disconnected ${socket.data.player.id}`);
        });

    })

    return io;
}


function registerRoomEventHandlers(io: SocketIOServer, socket: any, lobby: Lobby) {
    const player: Player = socket.data.player;

    socket.on(RoomEvent.LIST, function () {
        eventLogger.info(`${player.name} ${RoomEvent.LIST}`);
        socket.emit(RoomEmitEvent.LIST, lobby.listRoom());
    })

    socket.on(RoomEvent.CREATE, function () {
        eventLogger.info(`${player.name} ${RoomEvent.CREATE}`);
        const createdRoom: Room = lobby.createRoom(player);

        socket.join(createdRoom.id);

        socket.emit(RoomEmitEvent.CREATE, createdRoom)
        socket.emit(RoomEmitEvent.LIST, lobby.listRoom());
    });

    socket.on(RoomEvent.JOIN, function (ID: string) {
        eventLogger.info(`${player.name} ${RoomEvent.JOIN} ${ID}`);
        const joinedRoom: Room | null = lobby.getRoomById(ID);
        eventLogger.info(`${joinedRoom} ${RoomEvent.JOIN} ${ID}`);
        if (joinedRoom != null) {
            joinedRoom.addplayer(player);

            socket.join(joinedRoom.id);

            io.to(joinedRoom.id).emit(RoomEmitEvent.JOIN, joinedRoom);
            socket.emit(RoomEmitEvent.LIST, lobby.listRoom());
        }
    });

    socket.on(RoomEvent.DELETE, function (ID: string) {
        eventLogger.info(`${player.name} ${RoomEvent.DELETE} ${ID}`);

        const room: Room | null = lobby.getRoomById(ID);
        if (room != null && room.owner == player) {
            lobby.deleteRoom(ID);

            socket.leave(ID);

            socket.emit(RoomEmitEvent.DELETE, ID);
            socket.emit(RoomEmitEvent.LIST, lobby.listRoom());
        }
    });
}

function registerGameEventHandlers(io: SocketIOServer, socket: any, lobby: Lobby) {
    const player: Player = socket.data.player;

    socket.on(GameEvents.OPTIONS_UPDATE, function () {

    })

    socket.on(GameEvents.STATE, function (room_id: string) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player && room.gameStarted) {
            socket.to(room.id).emit(GameEmitEvents.STATE, room!.game?.gameState(player.id))
        }
    })

    socket.on(GameEvents.START, function (room_id: string) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player) {
            room.startGame();
        }

    })
    socket.on(GameEvents.FLIP, function (room_id: string, flip_index: number[]) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player && room.gameStarted) {
            room.game!.flip(player.id, flip_index)
        }
    })

    socket.on(GameEvents.DRAW, function (room_id: string) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player && room.gameStarted) {
            room.game!.drawCard(player.id);
            socket.to(room.id).emit(GameEmitEvents.UPDATE)
        }

    })

    socket.on(GameEvents.END_TURN, function (room_id: string) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player && room.gameStarted) {
            room.game!.endTurn();
        }
    })

    socket.on(GameEvents.KICK, function (room_id: string, player_to_kick_id: string) {
        const room: Room | null = lobby.getRoomById(room_id);
        if (room != null && room.owner == player) {
            if (room.players.map(p => p.id).includes(player_to_kick_id)) {
                room.kickPlayer(player_to_kick_id);
            }
        }
    })
}

function registerChatEventHandlers(io: SocketIOServer, socket: any) {
    const player: Player = socket.data.player;

    socket.on(ChatEvent.SEND, function (args: any) {
        socket.to(args.room_id).emit(ChatEmitEvent.BROADCAST, {
            "player_id": player.name,
            "datetime": new Date(),
            "message": args.message
        })

    })
}