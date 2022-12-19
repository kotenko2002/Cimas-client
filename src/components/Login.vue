<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <div class="form-group">
        <label>Login</label>
        <input type="text" class="form-control" placeholder="Login" v-model="login">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <button class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'login',
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const token = await axios.post('/auth/login', {
        login: this.login,
        password: this.password
      });
      localStorage.setItem('token', token.data);

      const userInfo = await axios.get('user/info');
      this.$store.dispatch('user', userInfo.data)
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  form * {
    margin-bottom: 15px;
  }
</style>