<template>
  <div class="content-container">
    <div class="d-flex justify-content-end mb-5">
      <button
          class="btn btn-primary"
          type="button"
          @click="displayModal=true"
      >
        Add
      </button>
    </div>
    <div v-if="displayTable" class="p-0">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Adress</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cinema in cinemas" :key="cinema.id">
          <th scope="row">
            <span
                style="cursor: pointer"
                @click="$router.push(`/halls/${cinema.id}`)"
            >
                  ℹ
                </span>
          </th>
          <td>{{cinema.name}}</td>
          <td>{{cinema.adress}}</td>
          <td>
            <ul class="list-inline m-0">
              <li class="list-inline-item">
                <button
                    class="btn btn-danger btn-sm"
                    type="button"
                    @click="dialogModal.status = true; dialogModal.delCinemaId = cinema.id"
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
  </div>
  <modal-window v-model:show="displayModal">
    <form @submit.prevent="addCinema">
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
  <confirm-modal
      :show="dialogModal.status"
      @update:show="dialogModal.status = false; dialogModal.delCinemaId = null;"
      @action="delCinema(dialogModal.delCinemaId)">
    delete this cinema
  </confirm-modal>
</template>

<script>
import axios from "axios";
import ModalWindow from "@/components/UI/ModalWindow";
import ConfirmModal from "@/components/UI/ConfirmModal";

export default {
  name: 'cinemas-view',
  components: {ModalWindow, ConfirmModal},
  data () {
    return {
      cinemas: [],
      displayModal: false,
      name: '',
      adress: '',
      dialogModal: {
        status: false,
        delCinemaId: null,
      }
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