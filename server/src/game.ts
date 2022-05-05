import { Card, RANK_TO_NUMBER } from "./models/cards";
import { Deck } from "./models/deck";
import { GameErrorEvents } from "./utils/constant";

export const enum TURN_STATES {
    PLAYER_DRAW,
    PLAYER_OBSERVE_DRAW,
    PLAYER_PEEK_SELF,
    PLAYER_PEEK_OTHERS,
    PLAYER_PEEK_OTHERS_AND_SWAP,
    ALL_PLAYER_MATCH
}

export interface GameState {
    main_deck: Deck
    discard_pile: Deck
    player_index: number
    player_turn_state: TURN_STATES
    my_hand: PlayerState
}

export interface PlayerState {
    hand: Deck
    drawn_card: Card
}

export class Game {
    public main_deck: Deck;
    public discard_pile: Deck;
    public players: string[];
    public hands: Map<string, Deck>;
    public drawn_cards: Map<string, Card | null>;
    public player_index: number;
    public player_turn_state: TURN_STATES;

    constructor(players: string[], mainDeck: Card[] = []) {
        if (mainDeck.length > 0) {
            this.main_deck = Deck.createDeckWithInitialCards(mainDeck);
        } else {
            this.main_deck = Deck.createShuffledDeck();
        }

        this.discard_pile = new Deck()

        this.players = players;
        this.player_index = 0
        this.player_turn_state = TURN_STATES.PLAYER_DRAW

        this.hands = new Map<string, Deck>();
        this.drawn_cards = new Map<string, Card | null>();
        players.forEach(p => {
            this.hands.set(p, new Deck());
            this.drawn_cards.set(p, null);
        });

    }

    /**
     * 
     * @param player_id Player Id 
     */
    gameState(player_id: string): GameState {
        const playerState: PlayerState = {
            hand: this.hands.get(player_id) as Deck,
            drawn_card: this.drawn_cards.get(player_id) as Card
        }
        const gameState: GameState = {
            main_deck: this.main_deck,
            discard_pile: this.discard_pile,
            player_index: this.player_index,
            player_turn_state: this.player_turn_state,
            my_hand: playerState

        }
        return gameState;
    }

    setup() {
        // this.main_deck.shuffle()
        this.hands.forEach((deck: Deck, player: string) => {
            deck.push(this.main_deck.pop(4))
        });
    }

    drawCard(player_id: string) {
        if (this.players.indexOf(player_id) == this.player_index) {
            if (this.player_turn_state == TURN_STATES.PLAYER_DRAW) {
                const drawnCard: Card = this.main_deck.pop(1)[0];
                this.drawn_cards.set(player_id, drawnCard)
                this.player_turn_state = TURN_STATES.PLAYER_OBSERVE_DRAW
            }
        } else {
            throw new Error(GameErrorEvents.NOT_YOUR_TURN.toString())
        }
    }

    swapDrawnCardWithDeck(player_id: string, deck_index: number) {
        const player_hand = this.hands.get(player_id)
        if (player_hand) {
            if (this.players.indexOf(player_id) == this.player_index) {
                const drawnCard = this.drawn_cards.get(player_id)
                if (this.player_turn_state == TURN_STATES.PLAYER_OBSERVE_DRAW && drawnCard != null) {
                    this.drawn_cards.set(player_id, null)
                    const deck_card: Card = player_hand.replace(drawnCard, deck_index)
                    this.discard_pile.push([deck_card])
                    this.player_turn_state = TURN_STATES.ALL_PLAYER_MATCH;
                }
            } else {
                throw new Error(GameErrorEvents.NOT_YOUR_TURN)
            }
        }
    }

    discardDrawnCard(player_id: string) {
        if (this.players.indexOf(player_id) == this.player_index) {
            const drawnCard = this.drawn_cards.get(player_id)
            if (this.player_turn_state == TURN_STATES.PLAYER_OBSERVE_DRAW && drawnCard != null) {
                this.discard_pile.push([drawnCard])
                this.drawn_cards.set(player_id, null)

                switch (RANK_TO_NUMBER[drawnCard.rank]) {
                    case 7:
                    case 8:
                        this.player_turn_state = TURN_STATES.PLAYER_PEEK_SELF;
                        break;
                    case 9: 2
                    case 10:
                        this.player_turn_state = TURN_STATES.PLAYER_PEEK_OTHERS;
                        break;
                    case 11:
                    case 12:
                        this.player_turn_state = TURN_STATES.PLAYER_PEEK_OTHERS_AND_SWAP;
                        break;
                    default:
                        this.player_turn_state = TURN_STATES.ALL_PLAYER_MATCH;
                        break;
                }

            }
        } else {
            throw new Error(GameErrorEvents.NOT_YOUR_TURN)
        }
    }

    // Use powers if discarded cards in 7,8,9,10,11,12
    peekOwnCard(player_id: string, deck_index: number) {
        if (this.players.indexOf(player_id) == this.player_index) {
            const player_hand = this.hands.get(player_id)
            if (player_hand) {
                this.player_turn_state = TURN_STATES.ALL_PLAYER_MATCH;
                player_hand.cards[deck_index].show();
            }
        }
    }

    peekOthersCard(player_id: string, other_player_id: string, deck_index: number) {
        if (this.players.indexOf(player_id) == this.player_index) {
            const other_player_hand = this.hands.get(other_player_id)
            if (other_player_hand) {
                this.player_turn_state = TURN_STATES.ALL_PLAYER_MATCH;
                other_player_hand.cards[deck_index].show();
            }
        }
    }

    peekAndSwapOthersCard() {

        this.player_turn_state = TURN_STATES.ALL_PLAYER_MATCH;
    }

    discardCard(player_id: string, deck_index: number) {
        if (this.player_turn_state == TURN_STATES.ALL_PLAYER_MATCH) {
            const playerHand: Deck = this.hands.get(player_id) as Deck
            const discardPileTop: Card = this.discard_pile.cards[this.discard_pile.cards.length - 1];
            if (playerHand.cards[deck_index] == discardPileTop) {
                discardPileTop.show()
                this.discard_pile.push([discardPileTop]);
                playerHand.pop(1)
            } else {
                this.discard_pile.pop(1)
                playerHand.push([discardPileTop])
            }
        } else {
            return new Error(GameErrorEvents.NOT_ALL_PLAYER_DISCARD_STATE)
        }
    }

    // Ending Turn
    endTurn() {
        this.hands.forEach(hand => {
            hand.cards.forEach(card => {
                card.hide()
            });
        });
        this.player_index = (this.player_index + 1) % this.players.length
        this.player_turn_state = TURN_STATES.PLAYER_DRAW;
    }

}