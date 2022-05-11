export const ListenEvents = {
    PLAYER: 'player',
    ROOM_CREATED: 'roomCreated',
}

export const EmitEvents = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    CREATE_ROOM: 'createRoom',
    JOIN_ROOM: 'joinRoom',
    DELETE_ROOM: 'deleteRoom',
}

export const GameEmitEvents = {
    DRAW_CARD: 'DRAW_CARD',
    DISCARD_DRAWN_CARD: 'DISCARD_DRAWN_CARD',
    SWAP_DRAWN_CARD: 'SWAP_DRAWN_CARD',
    PEEK_SELF_CARD: 'PEEK_SELF_CARD',
    PEEK_OTHERS_CARD: 'PEEK_OTHERS_CARD',
    DISCARD_CARD: 'DISCARD_CARD',
}