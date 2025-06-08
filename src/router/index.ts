// src/router/index.ts (새 파일 생성)
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import AboutView from '../views/AboutView.vue'
import PortalView from '../views/PortalView.vue'
import ComposableView from '../views/ComposableView.vue'
import ModalView from '../views/ModalView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/portal',
      name: 'portal',
      component: PortalView
    },
    {
      path: '/composable',
      name: 'composable',
      component: ComposableView
    },
    {
      path: '/modal',
      name: 'modal',
      component: ModalView
    }
  ]
})

export default router