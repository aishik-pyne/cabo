<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical is-3">
      <game-players :socket="socket"></game-players>
    </div>
    <div class="tile is-parent is-6">
      <game-settings :socket="socket"></game-settings>
    </div>
    <div class="tile is-parent is-vertical">
      <chat-box :socket="socket" :chatHistory="chatHistory"></chat-box>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChatBox from "./chat/ChatBox.vue";
import GamePlayers from "./gamestarting/GamePlayers.vue";
import GameSettings from "./gamestarting/GameSetttings.vue";
export default {
  name: "GameStartingView",
  components: {
    ChatBox,
    GameSettings,
    GamePlayers,
  },
  props: {
    socket: {
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isGameReadyToStart: (state) => state.game.isGameReadyToStart,
    }),
  },
  data() {
    return {
      chatHistory: [
        {
          player_id: "p0",
          message: "Hi!",
        },
        {
          player_id: "p0",
          message: "What's up?",
        },
        {
          player_id: "p1",
          message: "Hey",
        },
        {
          player_id: "p2",
          message: "Start the game!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
        {
          player_id: "p1",
          message: "Yeah!",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    updateRoom() {},
    startGame() {},
    kickPlayer(player_id) {
      this.socket.emit("kickFromRoom", player_id);
    },
  },
};
</script>

<style scoped>
.player-list {
  max-height: 500px;
  overflow-y: scroll;
}
.player-list-item {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}
</style>
