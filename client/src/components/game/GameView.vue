<template>
  <game-started-view
    v-if="isGameStarted"
    :socket="this.socket"
  ></game-started-view>
  <game-starting-view v-else :socket="this.socket"></game-starting-view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import GameStartedView from "./GameStartedView.vue";
import GameStartingView from "./GameStartingView.vue";
export default {
  name: "GameView",
  components: {
    GameStartedView,
    GameStartingView,
  },
  props: {
    socket: {
      required: true,
    },
    player_id: String,
  },
  computed: {
    ...mapState({
      isGameStarted: (state) => state.game.isGameStarted,
    }),
  },
  data() {
    return {
      gameStarted: true,
      players: [
        {
          name: "Black Mamba",
          ready: true,
        },
        {
          name: "Golden Fish",
          ready: true,
        },
        {
          name: "Black Mamba",
          ready: true,
        },
        {
          name: "Black Mamba",
          ready: false,
        },
      ],
    };
  },
  methods: {
    ...mapMutations("game", {
      resetGame: "resetGame",
      startGame: "startGame",
    }),
  },
  created() {},
  unmounted() {
    this.resetGame;
  },
};
</script>

<style scoped>
</style>
