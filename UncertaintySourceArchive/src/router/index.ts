import ClassView from '@/views/ClassView.vue'
import OverviewView from '@/views/OverviewView.vue'
import UncertaintyView from '@/views/wrapper/UncertaintyViewWrapper.vue'
import CreationViewWrapper from '@/views/wrapper/CreationViewWrapper.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'overview',
      path: '/',
      component: OverviewView
    },
    {
      name: 'uncertainty',
      path: '/uncertainty/:id',
      component: UncertaintyView,
      props: true
    },
    {
      name: 'class',
      path: '/class/:category',
      component: ClassView,
      props: true
    },
    {
      name: 'create',
      path: '/create',
      component: CreationViewWrapper
    }
  ]
})

export { router }
