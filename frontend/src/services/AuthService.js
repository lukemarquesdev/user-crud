import BaseService from './BaseService'

const TOKEN_NAME = import.meta.env.VITE_APP_TOKEN_NAME;

export default class AuthService extends BaseService {
    static async login(params) {
        return new Promise((resolve, reject) => {
          this.request()
            .post('/login', params)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => reject(error.response))
        })
      }
    
      static async getMe() {
        return new Promise((resolve, reject) => {
          this.request({ auth: true })
            .get('/me')
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              localStorage.removeItem(TOKEN_NAME)
              reject(error.response)
            })
        })
      }
}