import storage from '@/common/js/storage';
import NProgress from 'nprogress';
import Router from 'vue-router';

import notFound from '@/pages/notFound/notFound';

import login from '@/pages/login/login';

import article from '@/pages/article/article';
import articleArrange from '@/pages/article/articleArrange';

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: notFound
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/article',
      name: 'article',
      component: article,
      children: [
        {
          path: 'articleArrange',
          component: articleArrange
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let userInfo = storage.getSession({key: 'userInfo'}) || storage.getLocal({key: 'userInfo'});
  switch (to.path) {
    case '/login':
      if (userInfo) {
        router.push(userInfo.menu[0].childList[0].href);
      }
      break;
    case '/':
      if (userInfo) {
        router.push(userInfo.menu[0].childList[0].href);
      } else {
        router.push('/login');
      }
      break;
    default:
      if (!userInfo) {
        router.push('/login');
      }
  }
  next();
});

router.afterEach(() => {
  window.setTimeout(() => {
    NProgress.done();
  }, 300);
});

export default router;
