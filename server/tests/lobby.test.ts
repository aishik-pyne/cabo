import { Lobby } from "../src/lobby"

describe('Testing Lobby', () => {
  let lobby: Lobby;

  beforeEach(async () => {
    lobby = new Lobby();
  })

  test('Testing creating room', () => {
    const room = lobby.createRoom();
    expect(lobby.getRoomById(room.ID)).not.toBeNull()
  });

  test('Testing delete room', () => {
    const room = lobby.createRoom();
    lobby.deleteRoom(room.ID)
    expect(lobby.getRoomById(room.ID)).toBeNull()
  });

  test('Fetching a Room', () => {
    const room1 = lobby.createRoom();
    expect(lobby.getRoomById(room1.ID)).not.toBeNull();
  })

})