import { createRouter, createWebHashHistory } from 'vue-router';
import Fooldal from './views/Fooldal.vue';
import Cart from './views/Cart.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Fooldal
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
