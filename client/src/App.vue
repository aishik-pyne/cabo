<template>
  <div id="app">
    <div v-if="isLoggedIn" class="section">
      <logged-in-view
        v-bind:isLoggedIn.sync="isLoggedIn"
        :player="player"
      ></logged-in-view>
    </div>
    <div v-else class="section">
      <login-view
        v-bind:isLoggedIn.sync="isLoggedIn"
        v-bind:player.sync="player"
      ></login-view>
    </div>
  </div>
</template>

<script>
// import { io } from "socket.io-client";
// import { ListenEvents } from "./utils/events";
import LoginView from "./components/login/LoginView.vue";
import LoggedInView from "./components/login/LoggedInView.vue";
// import LobbyView from "./components/lobby/LobbyView.vue";
// import GameView from "./components/game/GameView.vue";

export default {
  name: "App",
  components: {
    LoginView,
    LoggedInView,
  },
  data() {
    return {
      socket: {},
      player: {},
      isLoggedIn: false,
      isInRoom: false,
    };
  },
  created() {},
  mounted() {
    this.token = sessionStorage.getItem("token");

    const id = sessionStorage.getItem("player_id");
    const name = sessionStorage.getItem("player_name");
    const image_url = sessionStorage.getItem("player_image_url");

    if (this.token === null || this.token === undefined) {
      this.isLoggedIn = false;
    } else {
      this.player = {
        id: id,
        name: name,
        image_url: image_url,
      };
      this.isLoggedIn = true;
    }
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
  background: rgba(12, 12, 156, 0.1);
}
</style>
