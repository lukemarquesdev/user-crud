import { useMeStore } from '@/stores/user/me'

export const redirectIfNotAuthenticated = (to, from, next) => {
  const meStore = useMeStore()

  if (!meStore.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
}

export const redirectIfAuthenticated = (to, from, next) => {
  const meStore = useMeStore()

  if (meStore.isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
}

export const checkIfTokenExists = (to, from, next) => {
  if (!to.query?.token) {
    next({ name: 'login' })
  } else {
    next()
  }
}