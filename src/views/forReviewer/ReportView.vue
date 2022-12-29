<template>
  <div v-if="!report">
    <h3>Loading...</h3>
  </div>
  <div v-else class="border rounded d-flex flex-column align-items-end p-5">
    <div class="d-flex">
      <div class="info">
        <div>
          <span class="name">Cinema name: </span>{{report.cinemaName}}
        </div>
        <div>
          <span class="name">Cinema adress: </span>{{report.cinemaAdress}}
        </div>
        <div>
          <span class="name">Worker name: </span>{{report.workerName}}
        </div>
        <div>
          <span class="name">Profit: </span>{{report.profit}}грн
        </div>
        <div>
          <span class="name">shift start time: </span>{{report.startDateTime}}
        </div>
        <div>
          <span class="name">shift end time: </span>{{report.endDateTime}}
        </div>
        <div>
          <span class="name">Status: </span>
          <select class="form-select" v-model="report.status">
            <option v-for="option in options" v-bind:value="option.value">
              {{option.name}}
            </option>
          </select>
        </div>
      </div>
      <div class=" border">
        сообщение
      </div>
    </div>
    <div class="mt-5">
      <button
          class="btn btn-primary"
          @click="editReport"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'report-view',
  data() {
    return {
      report: null,
      options: [
        { name: 'Not reviewed', value: 1},
        { name: 'Approved', value: 2},
        { name: 'Rejected', value: 3}
      ],
    }
  },
  async mounted() {
    await this.getReport();
  },
  methods: {
    async getReport() {
      const response = await axios.get(`/workday/report/full/rev/${this.$route.params.reportId}`);
      this.report = response.data;
    },
    async editReport() {
      await axios.put('/workday/report/setStatus', {
        id: this.report.id,
        status: this.report.status,
      })
    }
  }
}
</script>

<style scoped>
.name {
  display: inline-block;
  width: 40%;
}

.info * {
  margin-bottom: 10px;
}

.form-select {
  display: inline-block;
  width: auto;
}

.rounded {
  margin-left: 10px;
  margin-right: 10px;
}
</style>