<template>
  <div class="content-container">
    <div class="d-flex justify-content-between mb-5">
      <button
          class="btn btn-secondary"
          type="button"
          @click="$router.push('/sessions')"
      >
        Back
      </button>
    </div>
    <div class="border">
      <div v-if="displaySeats" class="d-flex justify-content-center">
        <div class="m-2" style="overflow-x: auto;">
          <div v-for="row in seats" class="d-flex">
            <div
                v-for="seat in row" :key="seat.id"
                class="seat d-flex justify-content-center align-items-center"
                :class="{free: seat.status === 1,
                  booked: seat.status === 2,
                  occupied: seat.status === 3}"
                @click="seat.status = (seat.status === 3) ? 1 : seat.status + 1; seat.changed = true"
            >
              <h6 class="user-select-none">{{seat.row + 1}}</h6>
              <span class="user-select-none">/</span>
              <h6 class="user-select-none">{{seat.column + 1}}</h6>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="">
        <h3>Loading...</h3>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-5">
      <button
          v-if="displaySeats"
          class="btn btn-primary"
          type="button"
          @click="saveChanges"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'session-view',
  data() {
    return {
      seats: []
    }
  },
  async created() {
    await this.getSeats();
  },
  methods: {
    async getSeats() {
      const response = await axios.get(`session/seat/items/${this.$route.params.sessionId}`);
      this.seats = response.data;
    },
    async saveChanges() {
      //const models = this.seats.filter(seat => seat.changed === true);
      let models = [];
      for (const key in this.seats) {
        this.seats[key].forEach(item => {
          if(item.changed === true) {
            models.push({
              id: item.id,
              status: item.status
            })
          }
        });
      }
      await axios.put('/session/seat/changeStatus', models);
      await this.getSeats();
    }
  },
  computed: {
    displaySeats() {
      return this.seats.length > 0;
    }
  }
}
</script>

<style scoped>
.seat {
  width: 50px;
  height: 50px;
  border: 5px solid black;
  flex-shrink: 0;
  margin: 5px;
}

.free {
  background: #5290fd;
}

.booked {
  background: #FFF200;
}

.occupied {
  background: #ff1616;
}

h4 {
  margin: 0;
  padding: 0;

}
</style>