<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center flex-wrap">
      <div class="form m-5">
        <div class="form-group">
          <label>Cinema</label>
          <select class="form-select" v-model="cinemaId">
            <option v-for="option in cinemas" v-bind:value="option.id">
              {{option.name}} {{option.adress}}
            </option>
          </select>
        </div>
      </div>
      <div class="m-5">
        <div v-if="displayTable">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="report in reports" :key="report.id">
              <th scope="row">
                <span
                    style="cursor: pointer"
                    @click="$router.push(`/report/${report.id}`)"
                >
                  ℹ
                </span>
              </th>
              <td>{{report.startDateTime}} - {{report.endDateTime}}</td>
              <td v-if="report.status == `Approved`">
                {{report.status.split(/(?=[A-Z])/).join(' ')}}<span>🟢</span>
              </td>
              <td v-else-if="report.status === `NotReviewed`">
                {{report.status.split(/(?=[A-Z])/).join(' ')}}<span>🟡</span>
              </td>
              <td v-else-if="report.status === `Rejected`">
                {{report.status.split(/(?=[A-Z])/).join(' ')}}<span>🔴</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="mt-5">
          <h3>No reports</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: 'reports-view',
  data() {
    return {
      cinemas: [],
      cinemaId: 0,
      reports:[]
    }
  },
  async mounted() {
    const response = await axios.get('/cinema/items');
    this.cinemas = response.data;

  },
  computed: {
    ...mapGetters(['workday']),
    displayTable() {
      return this.reports.length > 0;
    },
  },
  watch: {
    async cinemaId(newValue) {
      const response = await axios.get(`/workday/report/short/rev/items/${newValue}`);
      this.reports = response.data;
    }
  }
}
</script>

<style scoped>
.form {
  width: 130px;
}
</style>