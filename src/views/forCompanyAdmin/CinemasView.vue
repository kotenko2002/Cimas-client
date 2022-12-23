<template>
  <div class="w-50 d-flex justify-content-end">
    <button
        class="btn btn-primary"
        type="button"
        @click="displayModal=true"
    >
      Add
    </button>
  </div>
  <div v-if="displayTable" class="w-50 p-0">
    <table class="table table-striped text-center">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Adress</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cinema in cinemas" :key="cinema.id">
        <th scope="row">{{cinema.id}}</th>
        <td>{{cinema.name}}</td>
        <td>{{cinema.adress}}</td>
        <td>
          <ul class="list-inline m-0">
            <li class="list-inline-item">
              <button
                  class="btn btn-success btn-sm disabled"
                  type="button"
              >
                Edit</button>
            </li>
            <li class="list-inline-item">
              <button
                  class="btn btn-danger btn-sm"
                  type="button"
                  @click="delCinema(cinema.id)"
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
  <div v-else>
    <h3>Your company doesn't have any cinemas</h3>
  </div>
  <modal-window v-model:show="displayModal">
    <form  @submit.prevent="addCinema">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div class="form-group">
        <label>Adress</label>
        <input type="text" class="form-control" placeholder="Adress" v-model="adress">
      </div>
      <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-primary w-25 m-0">Add</button>
      </div>
    </form>
  </modal-window>
</template>

<script>
import axios from "axios";
import ModalWindow from "@/components/UI/ModalWindow";

export default {
  name: 'cinemas-view',
  components: {ModalWindow},
  data () {
    return {
      cinemas: [],
      displayModal: false,
      name: '',
      adress: ''
    }
  },
  async created() {
    await this.getCinemas();
  },
  methods: {
    async addCinema() {
      this.displayModal = false;

      await axios.post('/cinema/add', {
        name: this.name,
        adress: this.adress
      });

      this.name = '';
      this.adress = '';

      await this.getCinemas();
    },
    async delCinema(cinemaId) {
      await axios.delete(`/cinema/del/${cinemaId}`);

      await this.getCinemas();
    },
    async getCinemas() {
      const response = await axios.get('/cinema/items');
      this.cinemas = response.data;
    }
  },
  computed: {
    displayTable() {
      return this.cinemas.length > 0;
    }
  }
}
</script>

<style scoped>
form * {
  margin-bottom: 15px;
  width: 350px;
}
</style>