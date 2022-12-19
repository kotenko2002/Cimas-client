<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h3>Sing Up</h3>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div class="form-group">
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
  methods:{
    async handleSubmit() {
      const response = await axios.post('/auth/register', {
        companyId: 1,
        login: this.login,
        password: this.password,
        name: this.name,
        role: this.role,
      });

      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
form * {
  margin-bottom: 15px;
}
</style>