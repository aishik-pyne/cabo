<template>
  <div>
    <div class="field is-grouped is-grouped-right mb-5">
      <p class="control">
        <button class="button is-primary is-fullwidth" @click="logout()">
          Logout
        </button>
      </p>
    </div>
    <lobby-view
      v-if="isInLobby"
      :socket="this.socket"
      :player="player"
    ></lobby-view>
    <game-view v-else :socket="this.socket"></game-view>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import LobbyView from "../lobby/LobbyView.vue";
import GameView from "../game/GameView.vue";

export default {
  name: "LoggedInView",
  components: {
    LobbyView,
    GameView,
  },
  props: {
    player: {},
    isLoggedIn: Boolean,
  },
  data() {
    return {
      socket: {},
      isInLobby: true,
    };
  },
  created() {},
  mounted() {
    const token = sessionStorage.getItem("token");
    this.socket = io("http://localhost:3000/", {
      auth: {
        token: token,
      },
    });

    this.socket.on("connect_error", (err) => {
      console.error(err.message); // prints the message associated with the error
      this.logout();
    });
  },
  methods: {
    logout() {
      if (this.socket) {
        this.socket.close();
      }
      sessionStorage.clear();
      this.$emit("update:isLoggedIn", false);
    },
  },
};
</script>

<style scoped>
</style>
