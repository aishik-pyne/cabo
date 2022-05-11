import { Deck } from "./models/deck";
import { Player } from "./models/player";

export interface RoomOptions {
    max_players: number
}

export class Room {
    public id: string;
    public options: RoomOptions;
    public owner: Player;
    public players: Map<string, Player>;

    constructor(id: string, owner: Player, roomOptions: RoomOptions = {
        max_players: 4
    }) {
        this.id = id;
        this.owner = owner;
        this.options = roomOptions;
        this.players = new Map<string, Player>();
        this.players.set(owner.id, owner);
    }

    addplayer(player: Player) {
        if (this.players.size < this.options.max_players - 1) {
            this.players.set(player.id, player);
        }
    }

    kickPlayer(id: string) {
        if (this.players.size < this.options.max_players - 1) {
            this.players.delete(id);
        }
    }

}