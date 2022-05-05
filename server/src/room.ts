import { Deck } from "./models/deck";

export class Room {

    public ID: string;
    public players: Map<string, string>;

    constructor(ID: string) {
        this.ID = ID;
        this.players = new Map<string, string>();
    }

    addplayer() {

    }

    kickPlayer() {

    }

}

