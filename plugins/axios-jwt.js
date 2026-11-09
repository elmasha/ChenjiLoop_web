export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    if (process.client) {
      const token = localStorage.getItem('adminToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  $axios.onError((error) => {
    if (error.response && error.response.status === 401 && process.client) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      localStorage.removeItem('adminRole')
      if (window.location.pathname !== '/') {
        redirect('/')
      }
    }
    return Promise.reject(error)
  })
}