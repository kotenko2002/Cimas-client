<template>
  <div class="w-50 d-flex justify-content-end">
    <button
        class="btn btn-primary"
        type="button"
        @click="goToRegister"
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
        <th scope="col">Role</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in employeesWithRole" :key="employee.id">
        <th scope="row">{{employee.id}}</th>
        <td>{{employee.name}}</td>
        <td>{{employee.role}}</td>
        <td>
          <ul class="list-inline m-0">
            <li class="list-inline-item">
              <button
                  class="btn btn-success btn-sm disabled m-1"
                  type="button"
              >
                Edit</button>
            </li>
            <li class="list-inline-item">
              <button
                  class="btn btn-danger btn-sm m-1"
                  type="button"
                  @click="fireEmployee(employee.id)"
              >
                Fire
              </button>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h3>Your company doesn't have any employee</h3>
  </div>
</template>

<script>
import {Role, RoleConverter} from "@/common/enums/role";
import axios from "axios";

export default {
  name: 'employees-view',
  data () {
    return {
      employees: []
    }
  },
  async mounted() {
    await this.getEmployees()
  },
  methods: {
    async getEmployees() {
      const response = await axios.get('/user/items');
      this.employees = response.data;
    },
    goToRegister() {
      this.$router.push('/register');
    },
    async fireEmployee(employeeId) {
      await axios.put(`/user/fire/${employeeId}`);
      await this.getEmployees();
    }
  },
  computed: {
    displayTable() {
      return this.employees.length > 0;
    },
    employeesWithRole() {
      return this.employees.map(function (item, index, array) {
        return {id: item.id, name: item.name, role: RoleConverter(item.role)}
      });
    }
  }
}
</script>

<style scoped>

</style>