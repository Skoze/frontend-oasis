import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import UpdateData from '../views/UpdateData.vue';
import Scholar from '../views/Scholar.vue';
import Institution from '../views/Institution.vue';
import ResearchDirection from '../views/ResearchDirection.vue';
import Conference from '../views/Conference.vue';
import Ranking from '../views/Ranking.vue';
import Login from '../views/Login.vue';
import Page404 from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*',
    component: Page404,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: '/updateData',
        component: UpdateData,
        meta: {
          title: '更新数据',
        },
      },
      {
        path: '/search',
        component: Search,
        props: (route) => ({ query: route.query }),
      },
      {
        path: '/scholar/:id',
        component: Scholar,
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: '学者信息',
        },
      },
      {
        path: '/institution/:id',
        component: Institution,
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: '机构信息',
        },
      },
      {
        path: '/researchdirection/:id',
        component: ResearchDirection,
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: '研究方向',
        },
      },
      {
        path: '/conference/:id',
        component: Conference,
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: '会议',
        },
      },
      {
        path: '/ranking',
        component: Ranking,
        meta: {
          title: '学术排名',
        },
      },
    ],
  },
];

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  document.title = 'OASIS' + (to.meta.title ? ` - ${to.meta.title}` : '');
  next();
});

export default router;
