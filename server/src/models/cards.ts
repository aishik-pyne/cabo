export const SUITS: string[] = ['spades', 'hearts', 'clubs', 'diamonds']
export const RANKS: string[] = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
export const RANK_TO_NUMBER: Record<string, number> = {
    'ace': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'jack': 11,
    'queen': 12,
    'king': 13
}

const SUIT_TO_SYMBOL: Record<string, string> = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠',
}


export class Card {

    suit: string;
    rank: string;
    hidden: boolean;

    constructor(suit: string, rank: string, hidden: boolean = true) {
        this.suit = suit
        this.rank = rank
        this.hidden = hidden
    }

    static parseCardString(cardString: string): Card {
        const splittedCardString: string[] = cardString.split("_", 3)

        if (!(RANKS.some(x => x === splittedCardString[0]))) {
            throw new Error(`${splittedCardString[0]} is not a valid Rank. Valid Ranks are ${RANKS}`);
        }
        if (!(SUITS.some(x => x === splittedCardString[2]))) {
            throw new Error(`${splittedCardString[2]} is not a valid Suit. Valid Suits are ${SUITS}`)
        }
        return new Card(splittedCardString[2], splittedCardString[0])

    }
    public get image_url() {
        return `https://github.com/hayeah/playing-cards-assets/blob/master/png/${this.rank}_of_${this.suit}.png?raw=true`
    }

    public get symbol() {
        return `${SUIT_TO_SYMBOL[this.suit]} ${RANK_TO_NUMBER[this.rank]}`
    }

    public get name() {
        return `${this.suit}_of_${this.rank}`
    }

    public hide() {
        this.hidden = true
    }

    public show() {
        this.hidden = false
    }

    public toString(): string {
        return this.symbol
    }

}