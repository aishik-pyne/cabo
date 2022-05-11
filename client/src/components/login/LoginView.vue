<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <div class="field has-addons-centered">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              placeholder="Text input"
              v-model="name"
            />
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control is-expanded">
            <button class="button is-primary is-fullwidth" @click="login()">
              Login
            </button>
          </p>
          <p class="control is-expanded">
            <button class="button is-light is-fullwidth" @click="randomName()">
              Random
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import axios from "axios";

export default {
  name: "LoginView",
  props: {
    isLoggedIn: Boolean,
    player: {},
  },
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.randomName();
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/login", {
          name: this.name,
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("player_id", response.data.player.id);
          sessionStorage.setItem("player_name", response.data.player.name);
          sessionStorage.setItem(
            "player_image_url",
            response.data.player.image_url
          );
          this.$emit("update:player", response.data.player);
          this.$emit("update:isLoggedIn", true);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    randomName() {
      this.name = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: "_",
        style: "capital",
      });
    },
  },
};
</script>

<style scoped>
</style>
