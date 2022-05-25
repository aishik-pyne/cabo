import { GameService, GameState, TURN_STATES } from "../../src/game"
import { Card, RANK_TO_NUMBER } from "../../src/models/cards";
import { Deck } from "../../src/models/deck";
import { GameErrorEvents } from "../../src/utils/constant";

describe('Testing Kabo Game', () => {
    let game: GameService;
    let players: string[];

    beforeEach(async () => {
        players = ['alpha', 'beta', 'gamma', 'delta']
        game = new GameService(players)
    })

    test('Test Game setup', () => {
        game.setup()

        expect(game.main_deck.size).toBe(52 - players.length * 4)
        game.hands.forEach((deck: Deck, player: string) => {
            expect(deck.size).toBe(4)
        });
        expect(game.player_turn_state).toBe(TURN_STATES.PLAYER_DRAW)
    })

    describe('Test Draw Card', () => {

        beforeEach(() => {
            game.setup()
        })

        test('Test current player drawing card', () => {
            game.drawCard(players[0])

            expect(game.main_deck.size).toBe(52 - players.length * 4 - 1)
            expect(game.drawn_cards.get(players[0])).not.toBeNull()
            expect(game.player_turn_state).toBe(TURN_STATES.PLAYER_OBSERVE_DRAW)
        })

        test('Test other player drawing card', () => {
            expect(() => { game.drawCard(players[1]) }).toThrowError(GameErrorEvents.NOT_YOUR_TURN)
        })
    })

    describe('Test Discard Card', () => {
        beforeEach(() => {
            game.setup()
            game.drawCard(players[0])
        })


        test.each([...Array(10).keys()])('Test current player discarding card', () => {
            const drawnCard: Card = game.drawn_cards.get(players[0]) as Card
            game.throwDrawnCard(players[0]);
            expect(game.drawn_cards.get(players[0])).toBeNull()
            expect(game.discard_pile.size).toBe(1)

            switch (RANK_TO_NUMBER[drawnCard.rank]) {
                case 7:
                case 8:
                    expect(game.player_turn_state).toBe(TURN_STATES.PLAYER_PEEK_SELF)
                    break;
                case 9:
                case 10:
                    expect(game.player_turn_state).toBe(TURN_STATES.PLAYER_PEEK_OTHERS)
                    break;
                case 11:
                case 12:
                    expect(game.player_turn_state).toBe(TURN_STATES.PLAYER_PEEK_OTHERS_AND_SWAP)
                    break;
                default:
                    expect(game.player_turn_state).toBe(TURN_STATES.ALL_PLAYER_MATCH)
                    break;
            }
        })

        test('Test other player discarding card', () => {
            expect(() => { game.throwDrawnCard(players[1]) }).toThrowError(GameErrorEvents.NOT_YOUR_TURN)
        })
    })

    describe('Test Swap Card', () => {
        beforeEach(() => {
            game.setup()
            game.drawCard(players[0])
        })

        test('Test current player discarding card', () => {
            const drawnCard = game.drawn_cards.get(players[0])
            game.swapDrawnCardWithHand(players[0], 3);

            expect(game.drawn_cards.get(players[0])).toBeNull()
            expect(game.hands.get(players[0])?.cards[3]).toBe(drawnCard)

            expect(game.discard_pile.size).toBe(1)
            expect(game.discard_pile.cards[game.discard_pile.cards.length - 1]).not.toBe(drawnCard)

            expect(game.player_turn_state).toBe(TURN_STATES.ALL_PLAYER_MATCH)
        })

        test('Test other player discarding card', () => {
            expect(() => { game.throwDrawnCard(players[1]) }).toThrowError(GameErrorEvents.NOT_YOUR_TURN)
        })
    })

})