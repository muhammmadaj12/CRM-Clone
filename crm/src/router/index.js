// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
    // meta: { requiresAuth: true },  
  },
  {
    path: '/sampleproduct',
    name: 'Email Template',
    component: () => import('@/views/pages/Email.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'header',
        name: 'Header',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Header.vue'),
      },
      {
        path: 'footer',
        name: 'Footer',
        component: () => import('@/views/Footer.vue')
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('@/views/pages/Contacts.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'blog-form',
        name: 'BlogForm',
        component: () => import('@/views/pages/BlogForm.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'forms',
        name: 'Forms',
        component: () => import(/* webpackChunkName: "home" */ '@/views/pages/Forms.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'editbuilder', // Rename to include :id
        name: 'EditBuilder', // Rename to have a unique name
        component: () => import(/* webpackChunkName: "home" */ '@/common/EditBuilder.vue'),
        props: true,
        meta: { requiresAuth: true },
        
      },
      {
        path: 'formbuilder',
        name: 'FormBuilder',
        component: () => import(/* webpackChunkName: "home" */ '@/components/commons/FormBuilder.vue'),
        props: true,
        meta: { requiresAuth: true }, 
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/User.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'emails',
        name: 'Email',
        component: () => import(/* webpackChunkName: "home" */ '@/views/pages/Email.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'blogs', 
        name: 'BlogPage',
        component: () => import('@/views/pages/Blog.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'companies',
        name: 'Companies',
        component: () => import('@/views/pages/Companies.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'deals',
        name: 'Deals',
        component: () => import('@/views/pages/Deals.vue'),
        meta: { requiresAuth: true }, 
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/pages/product.vue'),
        meta: { requiresAuth: true },    
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Use 'token' as the key
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login
      next({ name: 'Login' });
    }
  } else {
    // For routes that do not require authentication, allow access
    next();
  }
});

export default router
