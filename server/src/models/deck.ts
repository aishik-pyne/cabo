import { Card, SUITS, RANKS, RANK_TO_NUMBER } from "./cards";

export class Deck {
    private _cards: Card[];

    constructor() {
        this._cards = [];
    }

    static createDeckWithInitialCards(cards: Card[]) {
        const deck = new Deck();
        deck.push(cards);
        return deck;
    }

    static createFullDeck(): Deck {
        const deck = new Deck();
        deck.fill();
        return deck;

    }

    static createShuffledDeck(): Deck {
        const deck = new Deck();
        deck.fill();
        deck.shuffle();
        return deck;
    }

    reset() {
        this._cards = [];
    }

    fill() {
        SUITS.forEach(suit => {
            RANKS.forEach(rank => {
                this._cards.push(new Card(suit, rank))
            });
        });
    }

    shuffle() {
        let currentIndex = this._cards.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this._cards[currentIndex], this._cards[randomIndex]] = [
                this._cards[randomIndex], this._cards[currentIndex]];
        }
    }

    rearrange() {
        this._cards.sort((a, b) => {
            // Different Suits
            if (SUITS.indexOf(a.suit) > SUITS.indexOf(b.suit)) {
                return 1
            } else if (SUITS.indexOf(a.suit) < SUITS.indexOf(b.suit)) {
                return -1
            }

            // Same Suit Different Rank
            if (RANK_TO_NUMBER[a.rank] > RANK_TO_NUMBER[b.rank]) {
                return 1
            } else if (RANK_TO_NUMBER[a.rank] < RANK_TO_NUMBER[b.rank]) {
                return -1
            }

            // Same Card
            return 0
        })
    }

    pop(n: number) {
        const removed = this._cards.splice(0, n);
        return removed
    }

    push(cards: Card[]) {
        this._cards = this._cards.concat(cards)
    }

    replace(card: Card, index: number): Card {
        const removed = this._cards[index];
        this._cards[index] = card;
        return removed
    }

    get size() {
        return this._cards.length;
    }

    get cards() {
        return this._cards;
    }
}