import appContent from '@/components/app/content';
import appHeader from '@/components/app/header';
import appLock from '@/components/app/lock';

export default {
  install(Vue, options) {
    Vue.component('app-lock', appLock);
    Vue.component('app-header', appHeader);
    Vue.component('app-content', appContent);
  }
};
