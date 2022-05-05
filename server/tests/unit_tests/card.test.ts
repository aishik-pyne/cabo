import { Card } from "../../src/models/cards"

describe('Testing Card Module', () => {
    const sampleCardStrings: string[] = ['7_of_clubs']
    test.each(sampleCardStrings)('Test Card from parse string', (cardString: string) => {
        expect(Card.parseCardString(cardString)).toBeInstanceOf(Card);
    })
})