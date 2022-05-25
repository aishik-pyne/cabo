import { Deck } from "../../src/models/deck"

describe('Testing Shuffled Deck', () => {
    let deck: Deck;

    beforeEach(async () => {
        deck = Deck.createShuffledDeck();
    })

    test('Testing deck count', () => {
        expect(deck.size).toBe(52)
    });

    test('Testing deck pop', () => {
        const n: number = 10
        const cards = deck.pop(n)
        expect(deck.size).toBe(52 - n)
    });

    test('Testing deck push', () => {
        const n: number = 10
        const cards = deck.pop(n)

        deck.push(cards)
        expect(deck.size).toBe(52)
    });

    test('Testing shuffle', () => {
        deck.reset()
        deck.fill()
        const cards_names_before = deck.cards.map(c => c.name);

        deck.shuffle()
        const cards_names_after = deck.cards.map(c => c.name);

        let shuffled: boolean = false;
        for (let index = 0; index < cards_names_before.length; index++) {
            if (cards_names_before[index] != cards_names_after[index]) {
                shuffled = true;
            }
        }
        expect(shuffled).toBe(true);
    })

    test('Testing arrange', () => {
        deck.reset()
        const cards_names_before = deck.cards.map(c => c.name);

        deck.shuffle()
        deck.rearrange()
        const cards_names_after = deck.cards.map(c => c.name);

        let arranged: boolean = true;
        for (let index = 0; index < cards_names_before.length; index++) {
            if (cards_names_before[index] != cards_names_after[index]) {
                arranged = false;
            }
        }
        expect(arranged).toBe(true);
    })




})