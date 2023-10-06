import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsList from "@/views/ProductsList.vue";
import ProductProfile from "@/views/ProductProfile.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products/',
    name: 'productsListRoute',
    component: ProductsList
    },
  {
    path: '/products/profile',
    name: 'productProfileRoute',
    component: ProductProfile
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
