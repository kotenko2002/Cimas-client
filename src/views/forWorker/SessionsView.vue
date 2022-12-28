<template>
  <div class="w-75 d-flex justify-content-end">
    <button
        class="btn btn-primary"
        type="button"
        @click="displayModal=true"
    >
      Add
    </button>
  </div>
  <div class="w-75 d-flex justify-content-center">
    <div class="w-100 d-flex justify-content-center flex-wrap">
      <div class="form m-5">
        <div class="form-group">
          <label>Hall</label>
          <select class="form-select" v-model="hallId">
            <option v-for="option in halls" v-bind:value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="date" class="form-control" v-model="date">
        </div>
      </div>
      <div class="w-75">
        <div v-if="displayTable">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Film name</th>
              <th scope="col">Ticket price</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="session in sessions" :key="session.id">
              <th scope="row" @click="$router.push(`/session/${session.id}`)">
                <a href="#">{{session.id}}</a>
              </th>
              <td>{{session.filmName}}</td>
              <td>{{session.ticketPrice}}</td>
              <td>{{session.startTime}} - {{session.endTime}}</td>
              <td>
                <ul class="list-inline m-0">
                  <li class="list-inline-item">
                    <button
                        class="btn btn-danger btn-sm m-1"
                        type="button"
                        @click="delSession(session.id)"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="mt-5">
          <h3>No sessions</h3>
        </div>
      </div>
    </div>
  </div>
  <modal-window v-model:show="displayModal">
    <form @submit.prevent="addSession">
      <div class="form-group">
        <label>Hall</label>
        <select class="form-select" v-model="hallId">
          <option v-for="option in halls" v-bind:value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Film</label>
        <select class="form-select" v-model="filmId">
          <option v-for="option in films" v-bind:value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Ticket price</label>
        <input type="number" class="form-control" placeholder="Ticket price" v-model="ticketPrice">
      </div>
      <div class="form-group">
        <label>Start data/time</label>
        <input type="datetime-local" class="form-control" placeholder="Start time" v-model="startDateTime">
      </div>
      <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-primary w-25 m-0">Add</button>
      </div>
    </form>
  </modal-window>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
import ModalWindow from "@/components/UI/ModalWindow";

export default {
  name: 'sessions-view',
  components: {ModalWindow},
  data() {
    return {
      sessions: [],
      date: new Date().toISOString().split('T')[0],
      halls: [],
      hallId: null,
      films: [],
      filmId: null,
      displayModal: false,
      ticketPrice: 0,
      startDateTime: null,
    }
  },
  async mounted() {
    if(this.workday?.id) {
      await this.getHalls(this.workday?.cinemaId);
    }
  },
  methods: {
    async getHalls(cinemaId) {
      const response = await axios.get(`/hall/items/${cinemaId}`);
      this.halls = response.data;
    },
    async getSessions() {
      if(this.hallId !== null && this.date !== null) {
        const response = await axios.get('session/items', {params: {
            hallId: this.hallId,
            date: this.date,
        }});

        this.sessions = response.data;
      }
    },
    async addSession() {
      this.displayModal = false;

      await axios.post('/session/add', {
        filmId: this.filmId,
        hallId: this.hallId,
        TicketPrice: this.ticketPrice,
        StartDateTime: this.startDateTime
      });

      this.filmId = null;
      this.ticketPrice = 0;
      this.startDateTime = null;

      await this.getSessions();
    },
    async delSession(sessionId) {
      await axios.delete(`/session/del/${sessionId}`)
      await this.getSessions();
    }
  },
  computed: {
    ...mapGetters(['workday']),
    displayTable() {
      return this.sessions.length > 0;
    },
  },
  watch: {
    async workday(newValue) {
      if(newValue != null) {
        await this.getHalls(newValue.cinemaId);
      }
    },
    async hallId() {
      await this.getSessions();
    },
    async date() {
      await this.getSessions();
    },
    startDateTime(newValue) {
      if(newValue !== null) {
        this.date = this.startDateTime.split('T')[0];
      }
    },
    async displayModal(newValue) {
      if(newValue) {
        const response = await axios.get('/film/items');
        this.films = response.data;
      }
    }
  }
}
</script>

<style scoped>
.form * {
  margin-bottom: 15px;
}

.form {
  width: 130px;
}

form * {
  margin-bottom: 15px;
  width: 350px;
}
</style>