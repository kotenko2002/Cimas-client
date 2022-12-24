<template>
  <div>
    <div v-if="user">
      <h3>You are log in</h3>
      <h4>{{user.name}}</h4>
    </div>
    <div v-else>
      <h3>You are not authorized</h3>
    </div>
  </div>
  <!--<img style="width: 50%" src="https://www.grandsierraresort.com/hubfs/recreation/Grand-Sierra-Cinema-view-of-auditorium_q085_1920x1080.jpg">-->
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
h3, h4 {
  text-align: center;
}
</style>