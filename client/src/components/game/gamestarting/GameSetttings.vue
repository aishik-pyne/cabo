<template>
  <div
    class="container box p-0 is-flex is-flex-direction-column has-text-black"
  >
    <div class="level m-0">
      <div class="level-item">
        <h1 class="has-text-black has-text-weight-bold is-size-4 p-2">
          Settings
        </h1>
      </div>
    </div>
    <div
      class="is-align-items-center is-flex-grow-1 is-flex is-flex-direction-row"
    >
      <div
        class="
          is-align-items-center is-flex-grow-1 is-flex is-flex-direction-column
        "
      >
        <div class="field py-4 is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Max Players</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="maxPlayerOptions">
                    <option v-for="index in 10" :key="index">
                      {{ index }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field py-4 is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Visibility</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    v-model="visibility"
                    name="visibility"
                    value="public"
                  />
                  Public
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    v-model="visibility"
                    name="visibility"
                    value="private"
                  />
                  Private
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-vcentered py-6">
      <div class="column">
        <label class="checkbox is-large">
          <input type="checkbox" v-model="ready" />
          I'm Ready
        </label>
      </div>
      <div v-if="owner" class="column m-2">
        <div class="field is-grouped is-grouped-centered">
          <p class="control is-expanded">
            <button
              :disabled="isGameReadyToStart"
              class="button is-primary is-medium is-fullwidth"
              @click="joinRoom()"
            >
              Start
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "GameSettings",
  components: {},
  props: {
    socket: { type: Object },
  },
  computed: {
    maxPlayerOptions: {
      get() {
        return this.options.max_players;
      },
      set(value) {
        this.socket.emit("room:update", this.room_id, {
          max_players: value,
          public: this.options.public,
        });
      },
    },
    ...mapState({
      room_id: (state) => state.game.id,
      options: (state) => state.game.options,
    }),
    ...mapGetters("game", {
      isGameReadyToStart: "isGameReadyToStart",
    }),
  },
  data() {
    return {
      owner: true,
      ready: false,
      visibility: "public",
    };
  },
  mounted() {},
  methods: {
    updateMaxPlayers(event) {
      console.log(event.target);
    },
  },
};
</script>

<style scoped>
.chat-history {
  flex-grow: 1;
  /* height: 0; */
  max-height: 400px;
  overflow-y: scroll;
}

.chat-history-message:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
}
</style>