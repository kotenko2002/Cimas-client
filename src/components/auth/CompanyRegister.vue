<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h3>Creating company</h3>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <button class="btn btn-primary w-100">Create</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'company-register',
  data () {
    return {
      name: '',
    }
  },
  methods: {
    async handleSubmit() {
      const companyId = await axios.post('/company/add', {
        name: this.name,
      });
      localStorage.setItem('companyId', companyId.data);

      this.$router.push('/register');
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