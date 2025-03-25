import axios from 'axios';

const TOKEN_NAME = import.meta.env.VITE_APP_TOKEN_NAME;
const URL_API = import.meta.env.VITE_APP_URL_API;

class Http {
  constructor(status) {
    const token = localStorage.getItem(TOKEN_NAME)

    const headers = status.auth
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}

    this.instance = axios.create({
      baseURL: URL_API,
      headers: headers,
    })

    return this.instance
  }
}

export default class BaseService {
  constructor() {
    this.instance = new BaseService()
  }

  static request(status = { auth: false }) {
    return new Http(status)
  }
}