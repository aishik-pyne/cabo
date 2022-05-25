import { GameService } from "./game";
import { Deck } from "./models/deck";
import { Player } from "./models/player";

export interface RoomOptions {
    max_players: number
}

export class Room {
    public id: string;
    public options: RoomOptions;
    public owner: Player;
    private players_map: Map<string, Player>;
    public players: Player[];
    public gameStarted: boolean;
    public game: GameService | null = null;

    constructor(id: string, owner: Player, roomOptions: RoomOptions = {
        max_players: 4
    }) {
        this.id = id;
        this.owner = owner;
        this.options = roomOptions;
        this.players_map = new Map<string, Player>();
        this.players_map.set(owner.id, owner);
        this.players = [owner]
        this.gameStarted = false;

    }

    // get players(): Player[] {
    //     return [...this.players_map.values()];
    // }

    addplayer(player: Player) {
        if (this.players.length < this.options.max_players - 1) {
            this.players.push(player);
        }
        if (this.players_map.size < this.options.max_players - 1) {
            this.players_map.set(player.id, player);
        }
    }

    kickPlayer(id: string) {
        if (this.players.length > 1) {
            this.players.splice(this.players.map(p => p.id).indexOf(id), 1)
        }
        if (this.players_map.size < this.options.max_players - 1) {
            this.players_map.delete(id);
        }
    }

    updateOptions(options: RoomOptions) {

    }

    startGame() {
        this.game = new GameService(Array.from(this.players_map.keys()))
    }

}