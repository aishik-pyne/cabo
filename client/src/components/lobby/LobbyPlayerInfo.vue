<template>
  <div class="card mb-2">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              class="is-rounded"
              :src="player.image_url"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ player.name }}</p>
          <p class="subtitle is-6">@{{ player.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyPlayerInfo",
  props: {
    player: {
      type: Object,
    },
    player_name: {
      type: String,
      default: "Jhonny Bravo",
    },
    player_image_url: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    player_karma: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      room_code: "",
    };
  },
  methods: {
    joinRoom() {
      console.log(`JOIN ROOM: ${this.room_code}`);
    },
  },
};
</script>

<style>
</style>