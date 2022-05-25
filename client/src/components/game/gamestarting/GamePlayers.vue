<template>
  <div class="container box p-0 m-0">
    <div class="level m-0">
      <div class="level-item">
        <h1 class="has-text-black has-text-weight-bold is-size-4 p-2">
          Players
        </h1>
      </div>
    </div>
    <div class="player-list">
      <div
        v-for="(gamePlayer, idx) in gamePlayers"
        :key="idx"
        class="player-list-item py-4 m-2"
      >
        <div class="is-flex is-flex-direction-row">
          <div class="is-flex-grow-1">
            <p class="has-text-black">
              <span v-if="gamePlayer.id == owner.id" class="icon-text">
                <span class="icon has-text-danger">
                  <i class="fas fa-crown"></i>
                </span>
              </span>
              {{ gamePlayer.name }}
            </p>
            <div>
              <span v-if="gamePlayer.ready" class="tag is-normal is-success"
                >Ready</span
              >
              <span class="tag is-normal is-warning">Not Ready</span>
              <!-- <span class="icon-text">
                <span
                  v-if="player.ready"
                  class="icon is-large has-text-success"
                >
                  <i class="fa fa-lg fa-check"></i>
                </span>
                <span v-else class="icon is-large has-text-warning">
                  <i class="fa fa-lg fa-times"></i>
                </span>
              </span> -->
            </div>
          </div>
          <div
            class="
              is-flex-shrink-1 is-flex is-flex-direction-column
              px-2
              is-justify-content-center
            "
          >
            <div v-if="selfPlayer.id === owner.id">
              <a class="tag is-delete" @click="kickPlayer(gamePlayer.id)"> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapState } from "vuex";
// import { mapState } from "vuex";
export default {
  name: "GamePlayers",
  components: {},
  props: {
    socket: {
      required: true,
    },
  },
  computed: {
    ...mapState({
      gamePlayers: (state) => state.game.players,
      owner: (state) => state.game.owner,
    }),
    ...mapGetters("player", {
      selfPlayer: "player",
    }),
  },
  data() {
    return {};
  },
  methods: {
    kickPlayer(player_to_kick_id) {
      this.socket.emit("room:kick", player_to_kick_id);
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