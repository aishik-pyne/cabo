import { Room } from "./room"
import * as crypto from "crypto";

export class Lobby {
    private room_list: Record<string, Room>;

    constructor() {
        this.room_list = {};
    };

    getRoomById(ID: string): Room | null {
        if (ID in this.room_list) {
            return this.room_list[ID];
        }
        return null;
    }

    createRoom(): Room {
        let ID: string = crypto.randomBytes(5).toString('hex');

        // Generate a string till its safe
        while (ID in this.room_list) {
            ID = crypto.randomBytes(5).toString('hex');
        }

        const room: Room = new Room(ID);
        this.room_list[ID] = room;
        return room
    }

    deleteRoom(ID: string) {
        const room = this.getRoomById(ID);
        if (room) {
            delete this.room_list[ID]
        }
    }
}
