<template>
  <div class="box">
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="Position">Room Id</abbr></th>
          <th>Players</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>2134</th>
          <td>4</td>
          <td>
            <p class="control">
              <a class="button is-primary" @click="joinRoom()"> Join </a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LobbyRoomList",
  props: {
    rooms: [],
  },
  data() {
    return {};
  },
  methods: {
    joinRoom(room_code) {
      console.log(`JOIN ROOM: ${room_code}`);
    },
  },
};
</script>

<style>
</style>