import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/signup',
    component: () => import('@/views/signup/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

   

   

  {
    path: '/example',
    component: Layout,
    redirect: '/example/createTeam',
    name: 'Example',
    meta: { title: 'Team', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'createTeam',
        name: 'createTeam',
        component: () => import('@/views/example/createTeam'),
        meta: { title: 'Create Team', icon: 'form' }
      },
      {
        path: 'joinTeam',
        name: 'Join',
        component: () => import('@/views/example/joinTeam'),
        meta: { title: 'Join team', icon: 'table' }
      },
      {
        path: 'myTeam',
        name: 'Table',
        component: () => import('@/views/example/myTeam'),
        meta: { title: 'My Team', icon: 'table' }
      },
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/createProject',
    name: 'Nested',
    meta: {
      title: 'Project',
      icon: 'nested'
    },
    children: [
      {
        path: 'createProject',
        component: () => import('@/views/project/createProject'), // Parent router-view
        name: 'createProject',
        meta: { title: 'Create Project', icon: 'form' }
      },
      {
        path: 'myProject',
        component: () => import('@/views/project/myProject'), // Parent router-view
        name: 'myProject',
        meta: { title: 'My Project', icon: 'form' }
      },
    ]
  },
  {
    path: '/database',
    component: Layout,
    redirect: '/database/processing',
    name: 'Database',
    meta: { title: 'Database', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'processing',
        name: 'Processing',
        component: () => import('@/views/database/processing/index'),
        meta: { title: 'Processing', icon: 'el-icon-s-promotion' }
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/database/result/index'),
        meta: { title: 'Result', icon: 'table' }
      },
      {
        path: 'myDatabase',
        name: 'myDatabase',
        component: () => import('@/views/database/myDatabase'),
        meta: { title: 'My Database', icon: 'table' }
      },
    ]
  },
  
  {
    path: '/model',
    component: Layout,
    redirect: '/model/train',
    name: 'Train',
    meta: {
      title: 'Train model',
      icon: 'el-icon-s-help'
    },
    children: [
      // {
      //   path: 'trainModel',
      //   component: () => import('@/views/model/train'), // Parent router-view
      //   name: 'trainModel',
      //   meta: { title: 'My Model', icon: 'form' }
      // },
      {
        path: 'trainModel2',
        component: () => import('@/views/model/train'), // Parent router-view
        name: 'trainModel',
        meta: { title: 'Train Model', icon: 'form' }
      }
    ]
  },
 

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://gitlab.doc.ic.ac.uk/g227004217/webapplicationformedicalimagingai',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
