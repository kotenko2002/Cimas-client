<template>
  <div class="content-container">
    <div class="d-flex justify-content-end mb-5">
      <button
          class="btn btn-primary"
          type="button"
          @click="goToRegister"
      >
        Add
      </button>
    </div>
    <div v-if="displayTable" class="p-0">
      <table class="table table-striped text-center">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="employee in employeesWithRole" :key="employee.id">
          <td>{{employee.name}}</td>
          <td>{{employee.role}}</td>
          <td>
            <ul class="list-inline m-0">
              <li class="list-inline-item">
                <button
                    class="btn btn-danger btn-sm m-1"
                    type="button"
                    @click="dialogModal.status = true; dialogModal.fireEmployeeId = employee.id"
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
  </div>
  <confirm-modal
      :show="dialogModal.status"
      :type="'fire'"
      @update:show="dialogModal.status = false; dialogModal.fireEmployeeId = null"
      @action="fireEmployee(dialogModal.fireEmployeeId)">
    fire this employee
  </confirm-modal>
</template>

<script>
import {Role, RoleConverter} from "@/common/enums/role";
import axios from "axios";
import ConfirmModal from "@/components/UI/ConfirmModal";

export default {
  name: 'employees-view',
  components: {ConfirmModal},
  data () {
    return {
      employees: [],
      dialogModal: {
        status: false,
        fireEmployeeId: null,
      }
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