<template>
  <div class="box">
    <div class="field">
      <label class="label">Join Room</label>
      <div class="control">
        <input v-model="room_code" type="text" placeholder="Room code" />
      </div>
    </div>
    <div class="field">
      <p class="control">
        <a class="button is-primary" @click="joinRoom()"> Submit </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyJoinRoom",
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