<template>
  <div id="app">
    <div class="section is-flex-direction-column is-flex-grow-1">
      <div v-if="isLoggedIn">
        <logged-in-view
          v-bind:isLoggedIn.sync="isLoggedIn"
          :player="player"
        ></logged-in-view>
      </div>
      <div v-else>
        <login-view
          v-bind:isLoggedIn.sync="isLoggedIn"
          v-bind:player.sync="player"
        ></login-view>
      </div>
    </div>
    <footer class="footer p-1">
      <div class="level">
        <div class="level-left pl-4">
          <p class="level-item">v0.0.1</p>
        </div>
        <div class="level-item">
          <div class="has-text-centered">
            <p>
              <strong>Kabo</strong>
              made with
              <span class="icon has-text-danger">
                <i class="fas fa-heart"></i>
              </span>
              by
              <a href="https://aishikpyne.com">Aishik Pyne</a>
            </p>
          </div>
        </div>
        <div class="level-right pr-4">
          <span class="icon-text">
            <a
              href="https://github.com/aishik-pyne/cabo"
              class="has-text-black"
            >
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
            </a>
            <a href="https://localhost:8080/" class="has-text-black">
              <span class="icon">
                <i class="fas fa-share"></i>
              </span>
            </a>
          </span>
        </div>
      </div>
    </footer>
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
  /* background: rgba(12, 12, 156, 0.1); */
  display: flex;
  flex-direction: column;
  background-image: url("~@/assets/background.png");
}
</style>
