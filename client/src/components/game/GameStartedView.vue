<template>
  <div class="container-fluid">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical notification is-primary is-4">
        <player-hand player_id="beta" :hands="hands"></player-hand>
        <player-hand player_id="beta" :hands="hands"></player-hand>
        <player-hand player_id="beta" :hands="hands"></player-hand>
        <player-hand player_id="beta" :hands="hands"></player-hand>
        <player-hand player_id="beta" :hands="hands"></player-hand>
      </div>
      <div class="tile is-parent notification is-warning is-6"></div>
      <div class="tile is-parent notification is-danger"></div>
    </div>
    <!-- <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent notification is-primary mb-2">
        <div class="tile is-child">
          <player-hand player_id="beta" :hands="hands"></player-hand>
        </div>
        <div class="tile is-child">
          <player-hand player_id="beta" :hands="hands"></player-hand>
        </div>
      </div>
      <div class="tile center mb-2">
        <div
          class="
            tile
            is-parent is-vertical is-3
            notification
            is-primary
            p-0
            m-0
          "
        >
          <div class="tile is-child">
            <player-hand player_id="beta" :hands="hands"></player-hand>
          </div>
          <div class="tile is-child">
            <player-hand player_id="beta" :hands="hands"></player-hand>
          </div>
        </div>
        <div class="tile is-vertical notification is-warning is-6 m-0">
          <h1>Main Deck here</h1>
        </div>
        <div
          class="
            tile
            is-parent is-vertical is-3
            notification
            is-primary
            p-0
            m-0
          "
        >
          <div class="tile is-child">
            <player-hand player_id="beta" :hands="hands"></player-hand>
          </div>
          <div class="tile is-child">
            <player-hand player_id="beta" :hands="hands"></player-hand>
          </div>
        </div>
      </div>
      <div class="tile is-parent notification is-danger p-0">
        <div class="tile is-child">
          <player-hand player_id="beta" :hands="hands"></player-hand>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import PlayerHand from "./PlayerHand.vue";
export default {
  name: "GameView",
  components: {
    PlayerHand,
  },
  props: {
    socket: {
      type: Object,
    },
    player_id: String,
  },
  data() {
    return {
      main_deck: {},
      player_index: {},
      player_turn_state: {},
      hands: [
        {
          rank: 8,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/8_of_clubs.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/5_of_hearts.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/ace_of_spades.png?raw=true`,
        },
        {
          rank: 5,
          suit: "clubs",
          image_url: `https://github.com/hayeah/playing-cards-assets/blob/master/png/king_of_diamonds.png?raw=true`,
        },
      ],
    };
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
