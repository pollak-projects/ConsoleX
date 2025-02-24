import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Games from '@/components/Games';
import Register from '@/components/Register';
import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/main', component: Main },
    { path: '/games', component: Games },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/', redirect: '/main' },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if ((to.path === '/register' || to.path === '/login') && isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
