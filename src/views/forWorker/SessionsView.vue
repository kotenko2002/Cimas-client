<template>
  <div class="w-100 d-flex justify-content-center">
    <div class="w-25 form p-5">
      <div class="form-group">
        <label>Hall</label>
        <select class="form-select">
          <option v-for="option in roleOptions" v-bind:value="option.value">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" class="form-control" v-model="date">
      </div>
    </div>
    <div class="w-50">
      sd
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'sessions-view',
  data() {
    return {
      sessions: [],
      date: new Date(),
      roleOptions: [
        { name: 'Worker', value: 1},
        { name: 'Reviewer', value: 2},
        { name: 'Company admin', value: 3}
      ]
    }
  },
  computed: {
    ...mapGetters(['workday']),
    displayList() {
      return this.sessions.length > 0;
    },
  },
}
</script>

<style scoped>
.form * {
  margin-bottom: 15px;
}
</style>