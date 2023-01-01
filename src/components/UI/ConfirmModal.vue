<template>
  <modal-window :show="show" @update:show="hideModal">
    <div>
      <p>
        Are you sure you want to<slot></slot>?
      </p>
      <div class="flex">
        <button class="btn btn-secondary btn-left" @click="hideModal">Cancel</button>
        <button v-if="type === 'del'" class="btn btn-danger" @click="action">Delete</button>
        <button v-if="type === 'fire'" class="btn btn-danger" @click="action">Fire</button>
        <button v-if="type === 'confirm'" class="btn btn-primary" @click="action">Confirm</button>
      </div>
    </div>
  </modal-window>

</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow";

export default {
  name: 'confirm-modal',
  components: {ModalWindow},
  data() {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'del'
    },
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false);
    },
    action() {
      this.$emit('action');
      this.hideModal();
    }
  }
}
</script>

<style scoped>
.btn-left {
  margin-right: 15px;
}

.flex {
  display: flex;
  justify-content: flex-end;
}
</style>