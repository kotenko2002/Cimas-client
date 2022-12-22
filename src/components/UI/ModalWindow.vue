<template>
  <div class="modal-window" v-if="show" @click.stop="hideModal">
    <div @click.stop class="modal-content temp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-window',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.temp {
  width: auto;
}

.modal-window {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
}
.modal-content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding:20px;
}
</style>