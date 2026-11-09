export default function ({ route, redirect }) {
  if (!process.client) return

  const isLogin = route.path === '/' || route.path === '/login'
  const token = localStorage.getItem('adminToken')

  if (!isLogin && !token) {
    return redirect('/')
  }
  if (isLogin && token) {
    return redirect('/admin-master')
  }
}