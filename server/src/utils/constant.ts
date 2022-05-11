export enum SocketEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    LOGIN = 'login'
};

export enum RoomEvent {
    CREATE = 'createRoom',
    DELETE = 'deleteRoom',
    JOIN = 'joinRoom',
    KICK = 'kickFromRoom',
}
export enum GameErrorEvents {
    NOT_YOUR_TURN = 'not_your_turn',
    NOT_ALL_PLAYER_DISCARD_STATE = 'not_all_player_discard_state'
}