import { getRandomUsername } from "../utils/random_generator";

export interface Player {
    id: string,
    name: string,
    image_url: string,
    created_time: Date,
    last_login: Date,
}

export class PlayerStore {
    private playerList: Map<string, Player>;

    constructor() {
        this.playerList = new Map<string, Player>();
    }

    get onlinePlayersCount() {
        return this.playerList.size;
    }

    getPlayer(player_id: string): Player | null {
        if (this.playerList.has(player_id)) {
            return this.playerList.get(player_id) as Player;
        }
        return null;
    }

    createPlayer(name?: string): Player {
        let id: string = getRandomUsername();
        while (this.playerList.has(id)) {
            id = getRandomUsername();
        }

        const player: Player = {
            id: id,
            name: name ? name : id,
            image_url: "https://www.w3schools.com/howto/img_avatar.png",
            created_time: new Date(),
            last_login: new Date()
        }

        this.playerList.set(id, player);
        return player;
    }

    updatePlayerName(player_id: string, name: string) {
        const player: Player = this.playerList.get(player_id) as Player;
        if (player) {
            player.name = name;
        }
    }

    deletePlayer(player_id: string): void {
        if (this.playerList.has(player_id)) {
            this.playerList.delete(player_id);
        }
    }
}