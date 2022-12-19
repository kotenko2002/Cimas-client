<template>
  <div>
    <div v-if="user">
      <h3>You are log in</h3>
      <h4>{{user.name}} {{user.role}}</h4>
    </div>
    <div v-else>
      <h3>You are log out</h3>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'home',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>

</style>