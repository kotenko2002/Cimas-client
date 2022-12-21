<template>
  <nav class="navbar navbar-expand navbar-dark fixed-top">
    <div class="container">
      <div class="d-flex">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div v-if="user">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="#" class="nav-link">Cinemas</a>
            </li>
            <li>
              <a href="#" class="nav-link">Employees</a>
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
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'nav-bar',
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$store.dispatch('user', null);
      this.$router.push('/');
    },
    getCompanyId() {
      return localStorage.getItem('companyId');
    }
  },
  computed: {
    ...mapGetters(['user'])
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
</style>