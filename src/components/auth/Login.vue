<template>
  <div class="container">
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

      if(userInfo.data.role === 1){
        const hasNotFinishedWorkday = await axios.get('/workday/userHaveNotFinished');

        if(hasNotFinishedWorkday.data) {
          const workday = await axios.get('/workday/current');
          this.$store.dispatch('workday', workday.data)
        }
      }

      this.$router.push('/');
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