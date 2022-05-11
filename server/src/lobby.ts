import { Player } from "./models/player";
import { Room, RoomOptions } from "./room"
import { getRandomRoomName } from "./utils/random_generator";



export class Lobby {
    private room_list: Map<string, Room>;

    constructor() {
        this.room_list = new Map<string, Room>();
    };

    getRoomById(ID: string): Room | null {
        if (ID in this.room_list) {
            return this.room_list.get(ID) as Room | null;
        }
        return null;
    }

    createRoom(owner: Player, opt: RoomOptions = {
        max_players: 4
    }): Room {
        let ID: string = getRandomRoomName();

        // Generate a string till its safe
        while (ID in this.room_list) {
            ID = getRandomRoomName();
        }

        const room: Room = new Room(ID, owner, opt);
        this.room_list.set(ID, room);
        return room
    }

    deleteRoom(ID: string) {
        if (this.room_list.has(ID)) {
            this.room_list.delete(ID);
        }
    }

    listRoom(): Room[] {
        return Array.from(this.room_list.values());
    }
}
