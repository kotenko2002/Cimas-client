import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import CompanyRegister from "@/components/auth/CompanyRegister";

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/companyRegister', component: CompanyRegister },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
