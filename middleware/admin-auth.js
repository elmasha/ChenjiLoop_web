// middleware/admin-auth.js

export default function ({ route, redirect }) {
  const path = route.path;

  // // Only guard /admin/* routes
  // if (!path.startsWith('/admin')) return;

  // // Allow the login page itself
  // if (path === '/admin/login') return;

  // // Synchronous localStorage marker check
  // let uid = null;
  // try {
  //   if (process.client) {
  //     uid = localStorage.getItem('admin_uid');
  //   }
  // } catch (e) {
  //   console.warn('admin-auth: read failed', e.message);
  // }

  // // No UID marker → redirect to login
  // if (!uid) {
  //   return redirect('/admin/login');
  // }

  // Marker present → allow (Firebase will verify on actual API calls)
}