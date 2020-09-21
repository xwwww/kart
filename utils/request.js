import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 600000
})

export default service
