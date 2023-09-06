import { createRouter, createWebHistory } from 'vue-router';
import StudentsList from '../views/StudentsList.vue';
import StudentCreate from '../views/StudentCreate.vue';


const routes = [
  {
    path: '/',
    name: 'StudentsList',
    component: StudentsList,
  },
  {
    path: '/student/:id',
    name: 'StudentDetail',
    component: () => import('../views/StudentDetail.vue'),
  },
  {
    path: '/create-student',
    name: 'CreateStudent',
    component: StudentCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
