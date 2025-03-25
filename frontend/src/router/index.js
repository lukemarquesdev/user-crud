import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import { useMeStore } from '@/stores/user/me'
import Users from '@/views/Users.vue'
import About from '@/views/About.vue'
import { redirectIfAuthenticated, redirectIfNotAuthenticated } from './guards'

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
      path: '/about',
      beforeEnter: redirectIfNotAuthenticated,
      children: [
        {
          path: '',
          name: 'about',
          component: About,
          meta: {
            title: 'Sobre',
            public: false, // Ajustei para false, pois precisa de autenticação
          },
        },
      ],
    },
    {
      path: '/list-users',
      beforeEnter: redirectIfNotAuthenticated,
      children: [
        {
          path: '',
          name: 'list-users',
          component: Users,
          meta: {
            title: 'Listagem de Usuários',
            public: false, // Ajustei para false, pois precisa de autenticação
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const meStore = useMeStore()
  const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME)

  if (!token && to.name !== 'login') {
    next({ name: 'login' }) // Redireciona para login se não houver token
    return
  }

  if (token) {
    try {
      await meStore.getMe()
    } catch (error) {
      localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_NAME)
      next({ name: 'login' }) // Redireciona caso o token seja inválido
      return
    }
  }

  next()
})

export default router
