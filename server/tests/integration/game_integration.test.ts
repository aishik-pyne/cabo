import { GameService, GameState, TURN_STATES } from "../../src/game"
import { Card, RANK_TO_NUMBER } from "../../src/models/cards";
import { Deck } from "../../src/models/deck";
import { GameErrorEvents } from "../../src/utils/constant";

describe('Testing Game', () => {
    let game: GameService;
    let players: string[];
    let initialCards: Card[];

    beforeEach(async () => {
        players = ['alpha', 'beta', 'gamma', 'delta']
        initialCards = [
            '10_of_diamonds', '5_of_clubs', 'ace_of_spades', 'ace_of_diamonds',
            '10_of_clubs', 'king_of_hearts', '3_of_diamonds', '8_of_diamonds',
            '7_of_hearts', '8_of_hearts', '3_of_hearts', '8_of_clubs',
            'queen_of_hearts', 'jack_of_hearts', 'jack_of_clubs', 'queen_of_clubs',
            '9_of_diamonds', '4_of_hearts', '9_of_hearts', '10_of_spades',
            'ace_of_hearts', '4_of_clubs', '2_of_diamonds', 'king_of_diamonds',
            '6_of_clubs', '10_of_hearts', '5_of_diamonds', '7_of_spades',
            '8_of_spades', '7_of_diamonds', '3_of_spades', '3_of_clubs',
            '5_of_spades', 'queen_of_spades', '5_of_hearts', '4_of_spades',
            '4_of_diamonds', '2_of_spades', '6_of_diamonds', '2_of_clubs',
            '2_of_hearts', 'king_of_clubs', '9_of_clubs', '9_of_spades',
            'king_of_spades', '6_of_hearts', '7_of_clubs', 'ace_of_clubs',
            '6_of_spades', 'jack_of_diamonds', 'queen_of_diamonds', 'jack_of_spades'
        ].map((cardString: string): Card => {
            return Card.parseCardString(cardString);
        })
        game = new GameService(players, initialCards)
    })

    test('Test whole game', () => {
        let discardPileTop: Card;
        let gameState: GameState;

        // SETUP
        game.setup()

        gameState = game.gameState(players[0]);

        expect(gameState.turn_state).toBe(TURN_STATES.FLIP)

        // --------------------------------------
        // |            TESTING FLIP            |
        // --------------------------------------

        // FLIP Player 0
        game.flip(players[0], [0, 2])

        gameState = game.gameState(players[0]);
        expect(gameState.turn_state).toBe(TURN_STATES.OBSERVER_FLIP)
        expect(gameState.hands.get(players[0])!.hand[0].hidden).toBe(false)
        expect(gameState.hands.get(players[0])!.hand[1].hidden).toBe(true)
        expect(gameState.hands.get(players[0])!.hand[2].hidden).toBe(false)
        expect(gameState.hands.get(players[0])!.hand[3].hidden).toBe(true)

        game.endTurn()
        gameState = game.gameState(players[0]);
        expect(gameState.turn_state).toBe(TURN_STATES.FLIP)

        // FLIP Player 1
        game.flip(players[1], [3, 1])

        // Test Game State
        gameState = game.gameState(players[1]);
        expect(gameState.turn_state).toBe(TURN_STATES.OBSERVER_FLIP)
        expect(gameState.hands.get(players[1])!.hand[0].hidden).toBe(true)
        expect(gameState.hands.get(players[1])!.hand[1].hidden).toBe(false)
        expect(gameState.hands.get(players[1])!.hand[2].hidden).toBe(true)
        expect(gameState.hands.get(players[1])!.hand[3].hidden).toBe(false)

        game.endTurn()
        gameState = game.gameState(players[1]);
        expect(gameState.turn_state).toBe(TURN_STATES.FLIP)

        // FLIP Player 2
        game.flip(players[2], [3, 1])

        // Test Game State
        gameState = game.gameState(players[2]);
        expect(gameState.turn_state).toBe(TURN_STATES.OBSERVER_FLIP)
        expect(gameState.hands.get(players[2])!.hand[0].hidden).toBe(true)
        expect(gameState.hands.get(players[2])!.hand[1].hidden).toBe(false)
        expect(gameState.hands.get(players[2])!.hand[2].hidden).toBe(true)
        expect(gameState.hands.get(players[2])!.hand[3].hidden).toBe(false)

        game.endTurn()
        gameState = game.gameState(players[2]);
        expect(gameState.turn_state).toBe(TURN_STATES.FLIP)

        // FLIP Player 3
        game.flip(players[3], [2, 3])

        // Test Game State
        gameState = game.gameState(players[3]);
        expect(gameState.turn_state).toBe(TURN_STATES.OBSERVER_FLIP)
        expect(gameState.hands.get(players[3])!.hand[0].hidden).toBe(true)
        expect(gameState.hands.get(players[3])!.hand[1].hidden).toBe(true)
        expect(gameState.hands.get(players[3])!.hand[2].hidden).toBe(false)
        expect(gameState.hands.get(players[3])!.hand[3].hidden).toBe(false)

        game.endTurn()
        gameState = game.gameState(players[3]);
        expect(gameState.turn_state).toBe(TURN_STATES.PLAYER_DRAW)

        // game.hands.forEach((deck: Deck, player: string) => {
        //     switch (player) {
        //         case players[0]:
        //             for (let index = 0; index < deck.cards.length; index++) {
        //                 const actualCard: Card = deck.cards[index];
        //                 const expectedCard: Card = Card.parseCardString(['10_of_diamonds', '5_of_clubs', 'ace_of_spades', 'ace_of_diamonds'][index])
        //                 expect(actualCard.rank).toBe(expectedCard.rank);
        //                 expect(actualCard.suit).toBe(expectedCard.suit);
        //             }
        //             break;
        //         case players[1]:
        //             for (let index = 0; index < deck.cards.length; index++) {
        //                 const actualCard: Card = deck.cards[index];
        //                 const expectedCard: Card = Card.parseCardString(['10_of_clubs', 'king_of_hearts', '3_of_diamonds', '8_of_diamonds'][index])
        //                 expect(actualCard.rank).toBe(expectedCard.rank);
        //                 expect(actualCard.suit).toBe(expectedCard.suit);
        //             }
        //             break;
        //         case players[2]:
        //             for (let index = 0; index < deck.cards.length; index++) {
        //                 const actualCard: Card = deck.cards[index];
        //                 const expectedCard: Card = Card.parseCardString(['7_of_hearts', '8_of_hearts', '3_of_hearts', '8_of_clubs'][index])
        //                 expect(actualCard.rank).toBe(expectedCard.rank);
        //                 expect(actualCard.suit).toBe(expectedCard.suit);
        //             }
        //             break;
        //         case players[3]:
        //             for (let index = 0; index < deck.cards.length; index++) {
        //                 const actualCard: Card = deck.cards[index];
        //                 const expectedCard: Card = Card.parseCardString(['queen_of_hearts', 'jack_of_hearts', 'jack_of_clubs', 'queen_of_clubs'][index])
        //                 expect(actualCard.rank).toBe(expectedCard.rank);
        //                 expect(actualCard.suit).toBe(expectedCard.suit);
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        //     expect(deck.size).toBe(4)
        // });


        // --------------------------------------
        // |            TESTING ROUND 1         |
        // --------------------------------------

        // Player 0 turn 
        game.drawCard(players[0]);
        game.throwDrawnCard(players[0])

        // Expect State Discard Pile
        gameState = game.gameState(players[0]);
        discardPileTop = gameState.discard_pile[gameState.discard_pile.length - 1]
        expect(discardPileTop.suit).toBe('diamonds')
        expect(discardPileTop.rank).toBe('9')

        // Expect State Drawn Cards
        expect(gameState.turn_state).toBe(TURN_STATES.PLAYER_PEEK_OTHERS)


        // Player 0 turn end
        game.endTurn()

        gameState = game.gameState(players[0]);
        expect(gameState.turn_state).toBe(TURN_STATES.PLAYER_DRAW)




        // Player 1 turn 
        game.drawCard(players[1]);
        game.throwDrawnCard(players[1])

        // Expect State Discard Pile
        gameState = game.gameState(players[1]);
        discardPileTop = gameState.discard_pile[gameState.discard_pile.length - 1]
        expect(discardPileTop.suit).toBe('hearts')
        expect(discardPileTop.rank).toBe('4')

        // Player 1 turn end
        game.endTurn()

        gameState = game.gameState(players[1]);
        expect(gameState.turn_state).toBe(TURN_STATES.PLAYER_DRAW)




        // Player 2 turn 
        game.drawCard(players[2]);
        game.swapDrawnCardWithHand(players[2], 1)

        // Expect State Discard Pile
        gameState = game.gameState(players[2]);
        discardPileTop = gameState.discard_pile[gameState.discard_pile.length - 1]
        expect(discardPileTop.suit).toBe('hearts')
        expect(discardPileTop.rank).toBe('8')

        let playerHand: Card[] = gameState.hands.get(players[2])?.hand as Card[]
        expect(playerHand[1].suit).toBe('hearts')
        expect(playerHand[1].rank).toBe('9')

        // Player 2 turn end - by self
        game.endTurn()

        gameState = game.gameState(players[1]);
        expect(gameState.turn_state).toBe(TURN_STATES.PLAYER_DRAW)


    })
})