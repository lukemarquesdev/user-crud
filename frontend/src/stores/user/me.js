import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'

export const useMeStore = defineStore('me', {
  state: () => ({
    user: null,
  }),

  actions: {
    async getMe() {
      try {
        const response = await AuthService.getMe()
        this.user = await response.data
        return this.user
      } catch (error) {
        throw error
      }
    },
    // async updatePassword(params) {
    //   try {
    //     const response = await AuthService.updatePassword(params)
    //     this.user = await response.data
    //   } catch (error) {
    //     throw error
    //   }
    // },
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
  },
})