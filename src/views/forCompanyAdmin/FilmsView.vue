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
          <th scope="col">Name</th>
          <th scope="col">Duration</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="film in films" :key="film.id">
          <td>{{film.name}}</td>
          <td>{{film.duration}}</td>
          <td>
            <ul class="list-inline m-0">
              <li class="list-inline-item">
                <button
                    class="btn btn-danger btn-sm"
                    type="button"
                    @click="dialogModal.status = true; dialogModal.delFilmId = film.id"
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
      <h3>Your company doesn't have any film</h3>
    </div>
  </div>
  <modal-window v-model:show="displayModal">
    <form  @submit.prevent="addFilm">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div class="form-group">
        <label>Duration</label>
        <input type="number" class="form-control" placeholder="Duration" v-model="duration">
      </div>
      <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-primary w-25 m-0">Add</button>
      </div>
    </form>
  </modal-window>
  <confirm-modal
      :show="dialogModal.status"
      @update:show="dialogModal.status = false; dialogModal.delFilmId = null"
      @action="delFilm(dialogModal.delFilmId)">
    delete this film
  </confirm-modal>
</template>

<script>
import axios from "axios";
import ModalWindow from "@/components/UI/ModalWindow";
import ConfirmModal from "@/components/UI/ConfirmModal";

export default {
  name: 'films-view',
  components: {ModalWindow, ConfirmModal},

  data () {
    return {
      films: [],
      displayModal: false,
      name: '',
      duration: 0,
      dialogModal: {
        status: false,
        delFilmId: null,
      }
    }
  },
  async created() {
    await this.getFilm();
  },
  methods: {
    async getFilm() {
      const response = await axios.get('/film/items');
      this.films = response.data;
    },
    async addFilm() {
      this.displayModal = false;

      await axios.post('/film/add', {
        name: this.name,
        duration: this.duration
      });

      this.name = '';
      this.duration = 0;

      await this.getFilm();
    },
    async delFilm(filmId) {
      await axios.delete(`/film/del/${filmId}`);
      await this.getFilm();
    }
  },
  computed: {
    displayTable() {
      return this.films.length > 0;
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