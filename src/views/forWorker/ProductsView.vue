<template>
  <div class="content-container">
    <div class="d-flex justify-content-end mb-5">
      <button
          class="btn btn-primary"
          type="button"
          @click="displayModal=true"
      >
        Add
      </button>
    </div>
    <div v-if="displayTable" style="overflow: auto">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Amount</th>
          <th scope="col">Sold</th>
          <th scope="col">Yield</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.amount}}</td>

          <td>
            <span class="btn btn-sm" @click="product.soldAmount--; product.changed=true">➖</span>
            {{product.soldAmount}}
            <span class="btn btn-sm" @click="product.soldAmount++; product.changed=true">➕</span>
          </td>
          <td>
            <span class="btn btn-sm" @click="product.incoming--; product.changed=true">➖</span>
            {{product.incoming}}
            <span class="btn btn-sm" @click="product.incoming++; product.changed=true">➕</span>
          </td>
          <td>
            <ul class="list-inline m-0">
              <li class="list-inline-item">
                <button
                    class="btn btn-danger btn-sm"
                    type="button"
                    @click="dialogModal.delProductId = product.id; dialogModal.status = true"
                >
                  Delete
                </button>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="displayTable" class="d-flex justify-content-end mt-5">
      <button
          class="btn btn-secondary"
          type="button"
          @click="saveChanges"
      >
        Save changes
      </button>
    </div>
    <div v-else class="m-5">
      <h3>Your cinema doesn't have any products</h3>
    </div>
  </div>
  <modal-window v-model:show="displayModal">
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="name">
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="number" step="0.1" class="form-control" placeholder="Price" v-model="price">
      </div>
      <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-primary w-25 m-0">Add</button>
      </div>
    </form>
  </modal-window>
  <confirm-modal
      :show="dialogModal.status"
      @update:show="this.dialogModal.status = false; this.dialogModal.delProductId = null;"
      @action="delProduct(dialogModal.delProductId)">
    delete this product
  </confirm-modal>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
import ModalWindow from "@/components/UI/ModalWindow";
import ConfirmModal from "@/components/UI/ConfirmModal";

export default {
  name: 'products-view',
  components: {ConfirmModal, ModalWindow},

  data () {
    return {
      products: [],
      displayModal: false,
      name: '',
      price: 0,
      dialogModal: {
        status: false,
        delProductId: null,
      }
    }
  },
  async mounted() {
    if(this.workday?.id) {
      await this.getProducts(this.workday?.id);
    }
  },
  methods: {
    async getProducts(workdayId) {

      const response = await axios.get(`/product/items/${workdayId}`);
      this.products = response.data;
    },
    async addProduct() {
      this.displayModal = false;
      await axios.post('/product/add',{
        workDayId: this.workday?.id,
        name: this.name,
        price: this.price
      });

      this.name = '';
      this.price = 0;

      await this.getProducts(this.workday?.id);
    },
    async delProduct(productId) {
      await axios.delete(`/product/del/${productId}`);
      await this.getProducts(this.workday?.id);
    },
    async saveChanges() {
      const models = this.products.filter(product => product.changed === true)
          .map(function (item, index, array) {
              return {
                  Id: item.id,
                  Price: item.price,
                  SoldAmount : item.soldAmount,
                  Incoming : item.incoming
              }
          });

      await axios.put('/product/items/edit', models);
      await this.getProducts(this.workday?.id);
    },
  },
  computed: {
    ...mapGetters(['workday']),

    displayTable() {
      return this.products.length > 0;
    },
  },
  watch: {
    async workday(newValue) {
      if(newValue != null) {
        await this.getProducts(newValue?.id);
      }
    }
  }
}
</script>

<style scoped>
form * {
  margin-bottom: 15px;
  width: 350px;
}
</style>