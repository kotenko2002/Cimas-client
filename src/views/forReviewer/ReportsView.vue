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
                    @click="openModal(report.id)">
                    <!--@click="$router.push(`/report/${report.id}`)"-->

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
  <modal-window v-model:show="displayModal">
    <div id="container">
      <div class="tab-bar">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
                class="nav-link"
               :class="{'active' : activeTab === 'tab-1'}"
                @click="activeTab = 'tab-1'"
               href="#">Info</a>
          </li>
          <li class="nav-item">
            <a
                class="nav-link"
                :class="{'active' : activeTab === 'tab-2'}"
                @click="activeTab = 'tab-2'"
                href="#">Products</a>
          </li>
          <li class="nav-item">
            <a
                class="nav-link"
                :class="{'active' : activeTab === 'tab-3'}"
                @click="activeTab = 'tab-3'"
                href="#">Tickets</a>
          </li>
        </ul>
      </div>
      <div v-show="activeTab === 'tab-1'">
        <div v-if="!report">
          <h3>Loading...</h3>
        </div>
        <div v-else class="d-flex flex-column">
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
          <div class="d-flex justify-content-end mt-5">
            <button
                class="btn btn-primary"
                @click="editReport"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      <div v-show="activeTab === 'tab-2'">
        <div v-if="displayTable" class="p-0 table-scroll">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Sold</th>
              <th scope="col">Yield</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="product in report.products"
                :key="product.id">
              <th scope="row">{{product.id}}</th>
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
              <td>{{product.amount}}</td>
              <td>
                {{product.soldAmount}}
              </td>
              <td>
                {{product.incoming}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="activeTab === 'tab-3'">
        <div v-if="displayTable" class="p-0 table-scroll">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Film name</th>
              <th scope="col">Price</th>
              <th scope="col">Tickets sold</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="session in report.sessions"
                :key="session.id">
              <th scope="row">{{session.id}}</th>
              <td>{{session.filmName}}</td>
              <td>{{session.price}}</td>
              <td>{{session.soldTickets}}</td>
              <td>{{session.startDateTime}}</td>
              <td>{{session.endDateTime}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </modal-window>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import ModalWindow from "@/components/UI/ModalWindow";

export default {
  name: 'reports-view',
  components: {ModalWindow},
  data() {
    return {
      cinemas: [],
      cinemaId: 0,
      reports:[],
      report: null,
      displayModal: false,
      options: [
        { name: 'Not reviewed', value: 1},
        { name: 'Approved', value: 2},
        { name: 'Rejected', value: 3}
      ],
      activeTab: 'tab-1'
    }
  },
  async mounted() {
    const response = await axios.get('/cinema/items');
    this.cinemas = response.data;

  },
  methods: {
    async openModal(reportId) {
      const response = await axios.get(`/workday/report/full/rev/${reportId}`);
      this.report = response.data;
      this.displayModal = true;
    },
    async getReports() {
      const response = await axios.get(`/workday/report/short/rev/items/${this.cinemaId}`);
      this.reports = response.data;
    },
    async editReport() {
      await axios.put('/workday/report/setStatus', {
        id: this.report.id,
        status: this.report.status,
      })

      await this.getReports();
    }
  },
  computed: {
    ...mapGetters(['workday']),
    displayTable() {
      return this.reports.length > 0;
    },
  },
  watch: {
    displayModal(newValue) {
      if(!newValue) {
        this.activeTab = 'tab-1';
        this.report = null;
      }
    },
    async cinemaId(newValue) {
      await this.getReports();
    }
  }
}
</script>

<style scoped>
.form {
  width: 130px;
}

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
.content-container {
  width: 80vw;
}

.tab-bar {
  padding-bottom: 20px;
}

#container {
  min-height: 450px;
  min-width: 350px;
}

.table-scroll {
  max-height:400px;
  overflow-y:auto;
  margin-top:20px;
}
</style>