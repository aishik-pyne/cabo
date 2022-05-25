import http, { Server as HTTPServer } from "http";
import { AddressInfo } from "net";
import { Server as SocketIOServer } from "socket.io";
import { io as ClientIO, Socket as SocketIOClient } from "socket.io-client";
import { Lobby } from "../../src/lobby";
import { PlayerStore } from "../../src/models/player";
import { setupSocketServer } from "../../src/lib/socket";
describe("Testing Socket", () => {
    let httpServer: HTTPServer;
    let ioServer: SocketIOServer;
    let clientSocket: SocketIOClient;

    const lobby: Lobby = new Lobby();
    const playerStore: PlayerStore = new PlayerStore();


    beforeAll(() => {
        httpServer = http.createServer();

        ioServer = setupSocketServer(httpServer,
            playerStore,
            lobby,
            false);

        httpServer.listen(() => {
            const port = (httpServer.address()! as AddressInfo).port;
            clientSocket = ClientIO(`http://localhost:${port}`);
        })

    })

    afterAll(() => {
        ioServer.close()
        // clientSocket.close()
        httpServer.close()
    })

    test('Test Connection', () => {
        clientSocket.on("room:list", (args) => {
            expect(args).not.toBeNull();
        })
        clientSocket.emit("room:list");
    })
})