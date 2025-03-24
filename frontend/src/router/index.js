import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import { useMeStore } from '@/stores/user/me'
import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'
import { redirectIfAuthenticated, redirectIfNotAuthenticated} from './guards'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {
          title: 'Error 404',
          public: true
        },
      },
      {
        path: '/login',
        // component: BlankLayout,
        beforeEnter: redirectIfAuthenticated,
        children: [
          {
            path: '',
            name: 'login',
            component: Login,
            meta: {
              title: 'Login',
              public: true,
            },
          },
        ],
      },
      {
        path: '/home',
        // component: BlankLayout,
        beforeEnter: redirectIfNotAuthenticated,
        children: [
          {
            path: '',
            name: 'home',
            component: Home,
            meta: {
              title: 'Home',
              public: true,
            },
          },
        ],
      },
      {
        path: '/list-users',
        // component: BlankLayout,
        beforeEnter: redirectIfNotAuthenticated,
        children: [
          {
            path: '',
            name: 'list-users',
            component: Users,
            meta: {
              title: 'Listagem de Usuários',
              public: true,
            },
          },
        ],
      },
      {
        path: '/register',
        // component: BlankLayout,
        beforeEnter: redirectIfNotAuthenticated,
        children: [
          {
            path: '',
            name: 'register',
            component: Home,
            meta: {
              title: 'Cadastro',
              public: true,
            },
          },
        ],
      },
    ],
  })

  router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title
    const meStore = useMeStore()
  
    if (to.path === '/') {
      next({ name: 'login' })
      return
    }
  
    const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME)
    if (token) {
      await meStore.getMe()
    }

    next()
  })
  
export default router