<template>
  <div class="w-50 d-flex justify-content-end">
    <button
        class="btn btn-primary"
        type="button"
    >
      Add
    </button>
  </div>
  <div v-if="displayTable" class="w-50 p-0">
    <table class="table table-striped text-center">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Amount</th>
        <th scope="col">Sold</th>
        <th scope="col">Incomed</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <th scope="row">{{product.id}}</th>
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
                  @click="delFilm(film.id)"
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
  <div v-if="displayTable" class="w-50 d-flex justify-content-end">
    <button
        class="btn btn-secondary"
        type="button"
    >
      Save changes
    </button>
  </div>
  <div v-else class="mt-5">
    <h3>Your cinema doesn't have any products</h3>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: 'products-view',
  data () {
    return {
      products: [],
      displayModal: false,
      name: '',
      price: 0
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
    }
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

</style>