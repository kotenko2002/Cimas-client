<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h3>Sing Up</h3>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div v-if="!getCompanyId()" class="form-group">
        <label>Role</label>
        <select class="form-select" v-model="role">
          <option v-for="option in roleOptions" v-bind:value="option.value">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Login</label>
        <input type="text" class="form-control" placeholder="Login" v-model="login">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Password"  v-model="password">
      </div>
      <button class="btn btn-primary w-100">Sing up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {Role} from "@/common/enums/role";

export default {
  name: 'register',
  data() {
    return {
      name: '',
      role: null,
      login: '',
      password: '',
      roleOptions: [
        { name: 'Worker', value: 1},
        { name: 'Reviewer', value: 2},
        { name: 'Company admin', value: 3}
      ]
    }
  },
  mounted() {
    if(!localStorage.getItem('companyId')
      && !localStorage.getItem('token')) {
      this.$router.push('/companyRegister');
    } else {
      this.role = Role.CompanyAdmin;
    }
  },
  methods:{
    async handleSubmit() {
      await axios.post('/auth/register', {
        companyId: localStorage.getItem('companyId'),
        login: this.login,
        password: this.password,
        name: this.name,
        role: this.role,
      });

      if(localStorage.getItem('companyId')) {
        localStorage.removeItem('companyId');
        this.$router.push('/login');
      } else {
        this.$router.push('/employees');
      }

    },
    getCompanyId() {
      return localStorage.getItem('companyId');
    }
  }
}
</script>

<style scoped>
form * {
  margin-bottom: 15px;
  width: 350px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>