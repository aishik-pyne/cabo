export enum SocketEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message',
    SCAN_VOUCHER_SUCCESS = 'scan_voucher_success',
    INBOX_NOTIFICATION = 'inbox_notification',
    INBOX_ANNOUNCEMENT = 'inbox_announcement'
};

export enum GameErrorEvents {
    NOT_YOUR_TURN = 'not_your_turn',
    NOT_ALL_PLAYER_DISCARD_STATE = 'not_all_player_discard_state'
}