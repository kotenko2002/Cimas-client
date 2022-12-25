<template>
  <nav class="navbar navbar-expand navbar-dark fixed-top">
    <div class="container">
      <div class="d-flex">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div v-if="user?.role === 1">
          <ul class="navbar-nav ml-auto">
            <div v-if="workday" class="d-flex">
              <li>
                <router-link to="/products" class="nav-link">Bar</router-link>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Tickets</a>
                <!--<router-link to="/cinemas" class="nav-link">Cinemas</router-link>-->
              </li>
              <li>
                <a href="#" class="nav-link">Schedule</a>
                <!--<router-link to="/films" class="nav-link">Films</router-link>-->
              </li>
            </div>
            <li class="d-flex align-items-center">
              <button
                  v-if="!workday"
                  @click="openStartModal"
                  class="btn btn-sm btn-workday">
                START
              </button>
              <button
                  v-else
                  @click="endWorkday"
                  class="btn btn-sm btn-workday">
                END
              </button>
            </li>
          </ul>
        </div>
        <div v-else-if="user?.role === 2">
          <h4>Reviewer</h4>
        </div>
        <div v-else-if="user?.role === 3">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/cinemas" class="nav-link">Cinemas</router-link>
            </li>
            <li>
              <router-link to="/employees" class="nav-link">Employees</router-link>
            </li>
            <li>
              <router-link to="/films" class="nav-link">Films</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="auth">
        <div v-if="!user" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="getCompanyId" to="/register" class="nav-link">Sign up</router-link>
              <router-link v-else to="/companyRegister" class="nav-link">Sign up</router-link>
            </li>
          </ul>
        </div>
        <div v-else class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="javascript:void(0)" @click="handleClick" class="nav-link">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <modal-window v-model:show="displayModal">
    <form @submit.prevent="startWorkday">
      <label>Cinema</label>
      <select class="form-select" v-model="cinemaId">
        <option v-for="option in options" v-bind:value="option.id">
          {{ option.name }} {{ option.adress }}
        </option>
      </select>
      <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-primary w-100 m-0">Start</button>
      </div>
    </form>
  </modal-window>
</template>

<script>
import {mapGetters} from 'vuex';
import ModalWindow from "@/components/UI/ModalWindow";
import axios from "axios";

export default {
  name: 'nav-bar',
  components: {ModalWindow},
  async mounted() {
    if(this.user?.role === 1) {

    }
  },
  data() {
    return {
      displayModal: false,
      options: [],
      cinemaId: 0
    }
  },
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$store.dispatch('user', null);
      this.$store.dispatch('workday', null);
      this.$router.push('/');
    },
    getCompanyId() {
      return localStorage.getItem('companyId');
    },
    async openStartModal() {
      this.displayModal = true;
      const response = await axios.get('/cinema/items');
      this.options = response.data;
    },
    async startWorkday() {
      this.displayModal = false;

      await axios.post('/workDay/start', {
        cinemaId: this.cinemaId,
      });

      this.cinemaId = 0;
      const workday = await axios.get('/workday/current');
      this.$store.dispatch('workday', workday.data)
    },
    async endWorkday() {
      await axios.put(`/workday/end/${this.workday.id}`);
      this.$store.dispatch('workday', null);
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['workday'])
  }
}
</script>

<style scoped>
.navbar-dark {
  background: #28A745;
  box-shadow: 0px 14px 10px rgba(24, 25, 58, 0.2);
}

.auth {
  font-size: 12px;
}

.btn-workday {
  background: white;
  color: #28A745;
  border-radius: 25px;
  font-weight: 700;
}

.btn-workday:hover {
  background: rgba(255, 255, 255, 0.55);
  color: #28A745;
}

.btn-workday:active {
  background: rgba(255, 255, 255, 0.55) !important;
  border-color: white !important;
  color: white !important;
}

form * {
  margin-bottom: 15px;
  width: 350px;
}
</style>