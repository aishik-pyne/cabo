<template>
  <div class="box player-hand m-1 p-1">
    <div class="tile">
      <div class="tile is-vertical is-4">
        <h1>{{ player_id }}</h1>
        <figure class="image is-48x48">
          <img class="is-rounded" :src="player_avatar_url" />
        </figure>
      </div>
      <div class="tile">
        <div class="columns is-1 is-variable is-vcentered">
          <div v-for="(hand, index) in hands" :key="index" class="column">
            <figure class="image">
              <img
                :src="hand.image_url"
                alt=""
                srcset=""
                width="60"
                class="card-img"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerHand",
  props: {
    player_id: String,
    player_avatar_url: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    hands: [
      {
        rank: String,
        suit: String,
        image_url: String,
      },
    ],
  },
  data() {
    return {
      socket: {},
    };
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-hand {
  max-width: 100%;
}
.card-img {
  background: white;
  display: inline;
  border: 1px solid black;
  border-radius: 4px;
  /* box-shadow: 2px 2px black; */
}
</style>
