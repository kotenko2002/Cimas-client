<template>
  <div class="content-container">
    <div class="d-flex justify-content-between mb-5">
      <button
          class="btn btn-secondary"
          type="button"
          @click="$router.push('/cinemas')"
      >
        Back
      </button>
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
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Number of seats</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hall in halls" :key="hall.id">
          <th scope="row">{{hall.id}}</th>
          <td>{{hall.name}}</td>
          <td>{{hall.seatsCount}}</td>
          <td>
            <ul class="list-inline m-0">
              <li class="list-inline-item">
                <button
                    class="btn btn-danger btn-sm"
                    type="button"
                    @click="delHall(hall.id)"
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
      <h3>This cinema doesn't have any hall</h3>
    </div>
  </div>
  <modal-window v-model:show="displayModal">
    <form  @submit.prevent="addHall">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div class="form-group">
        <label>Count of rows</label>
        <input type="number" class="form-control" placeholder="Count of rows" v-model="rows">
      </div>
      <div class="form-group">
        <label>Count of columns</label>
        <input type="number" class="form-control" placeholder="Count of columns" v-model="columns">
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
  name: 'halls-view',
  components: {ModalWindow},

  data () {
    return {
      halls: [],
      displayModal: false,
      name: '',
      rows: 0,
      columns: 0,
    }
  },
  async created() {
    await this.getHalls();
  },
  methods: {
    async getHalls() {
      const response = await axios.get(`/hall/items/${this.$route.params.cinemaId}`);
      this.halls = response.data;
    },
    async addHall() {
      this.displayModal = false;

      await axios.post('/hall/add', {
        cinemaId: this.$route.params.cinemaId,
        name: this.name,
        rows: this.rows,
        columns: this.columns
      });

      this.name = '';
      this.rows = 0;
      this.columns = 0;

      await this.getHalls();
    },
    async delHall(hallId) {
      await axios.delete(`/hall/del/${hallId}`);
      await this.getHalls();
    }
  },
  computed: {
    displayTable() {
      return this.halls.length > 0;
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