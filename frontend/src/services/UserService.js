import BaseService from './BaseService'

export default class UserService extends BaseService {
      static async getAllUsers() {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .get('/users')
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error.response)
            })
        })
      }

      static async registerUser(params) {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .post(`/users`, params)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error.response)
            })
        })
      }

      static async editUser(id, params) {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .put(`/users/${id}`, params)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error.response)
            })
        })
      }

      static async deleteUser(id) {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .delete(`/users/${id}`)
            .then((response) => {
                resolve(response)
                this.$router.push({ name: "login" });
            })
            .catch((error) => {
              reject(error.response)
            })
        })
      }

      static async logout() {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .post(`/logout`)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error.response)
            })
        })
      }
}