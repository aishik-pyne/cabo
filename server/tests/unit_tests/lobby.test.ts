import { Lobby } from "../../src/lobby"
import { Player, PlayerStore } from "../../src/models/player";

describe('Testing Lobby', () => {
  let lobby: Lobby;
  let playerStore: PlayerStore;
  let player: Player;

  beforeEach(async () => {
    lobby = new Lobby();
    playerStore = new PlayerStore();
    player = playerStore.createPlayer();
  })

  test('Testing creating room', () => {
    const room = lobby.createRoom(player);
    expect(lobby.getRoomById(room.id)).not.toBeNull()
    expect(lobby.getRoomById(room.id)!.owner).toBe(player);
  });

  test('Testing delete room', () => {
    const room = lobby.createRoom(player);
    lobby.deleteRoom(room.id)
    expect(lobby.getRoomById(room.id)).toBeNull()
  });

  test('Fetching a Room', () => {
    const room1 = lobby.createRoom(player);
    expect(lobby.getRoomById(room1.id)).not.toBeNull();
  })

})