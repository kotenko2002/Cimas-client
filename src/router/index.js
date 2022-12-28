import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import CompanyRegister from "@/components/auth/CompanyRegister";
import CinemasView from "@/views/forCompanyAdmin/CinemasView";
import EmployeesView from "@/views/forCompanyAdmin/EmployeesView";
import FilmsView from "@/views/forCompanyAdmin/FilmsView";
import HallsView from "@/views/forCompanyAdmin/HallsView";
import ProductsView from "@/views/forWorker/ProductsView";
import sessionsView from "@/views/forWorker/SessionsView";
import sessionView from "@/views/forWorker/SessionView";

const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/companyRegister', component: CompanyRegister },

  { path: '/cinemas', component: CinemasView },
  { path: '/employees', component: EmployeesView },
  { path: '/films', component: FilmsView },
  { path: '/halls/:cinemaId', component: HallsView },

  { path: '/products', component: ProductsView },
  { path: '/sessions', component: sessionsView },
  { path: '/session/:sessionId', component: sessionView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
