<template>
  <div class="container-fluid">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical notification is-primary is-3">
        <lobby-player-info :player="player"></lobby-player-info>
        <lobby-join-room></lobby-join-room>
      </div>
      <div class="tile is-parent notification is-warning is-6">
        <lobby-room-list></lobby-room-list>
      </div>
      <div class="tile is-parent notification is-danger"></div>
    </div>
  </div>
</template>

<script>
import LobbyJoinRoom from "./LobbyJoinRoom.vue";
import LobbyRoomList from "./LobbyRoomList.vue";
import LobbyPlayerInfo from "./LobbyPlayerInfo.vue";
export default {
  name: "LobbyView",
  components: {
    LobbyJoinRoom,
    LobbyRoomList,
    LobbyPlayerInfo,
  },
  props: {
    socket: {
      required: true,
    },
    player: {
      type: Object,
    },
  },
  data() {
    return {
      main_deck: {},
      player_index: {},
      player_turn_state: {},
      hands: [
        {
          rank: 8,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/8_of_clubs.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/5_of_hearts.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/ace_of_spades.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/king_of_diamonds.png?raw=true`,
        },
      ],
    };
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
