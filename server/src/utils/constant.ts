export enum SocketEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    LOGIN = 'login'
};

// export enum RoomEvent {
//     LIST = 'listRoom',
//     CREATE = 'createRoom',
//     DELETE = 'deleteRoom',
//     JOIN = 'joinRoom',
//     KICK = 'kickFromRoom',
// }
export enum RoomEvent {
    LIST = 'room:list',
    CREATE = 'room:create',
    UPDATE = 'room:update',
    DELETE = 'room:delete',
    JOIN = 'room:join',
    KICK = 'room:kick',
    START = 'room:start'
}
export enum RoomEmitEvent {
    LIST = 'room:list',
    CREATE = 'room:create',
    UPDATE = 'room:update',
    DELETE = 'room:delete',
    JOIN = 'room:join',
    KICK = 'room:kick',
    START = 'room:start'
}
export enum ChatEvent {
    SEND = 'chat:send',
}

export enum ChatEmitEvent {
    BROADCAST = 'chat:broadcast'
}

export enum GameEvents {
    STATE = 'game:state',
    OPTIONS_UPDATE = 'game:options:update',
    START = 'game:start',
    KICK = 'game:kick',
    FLIP = 'game:flip',
    DRAW = 'game:draw',
    END_TURN = 'game:end_turn',
}

export enum GameEmitEvents {
    UPDATE = 'game:update',
    STATE = 'game:state'
}

export enum GameErrorEvents {
    FLIP_ONLY_2_CARDS = 'flip_only_2_cards',
    NOT_YOUR_TURN = 'not_your_turn',
    NOT_ALL_PLAYER_DISCARD_STATE = 'not_all_player_discard_state'
}