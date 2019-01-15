import Axios from '@/plugin/axios';
import Layout from '@/plugin/layout';
import Utils from '@/plugin/utils';
import Component from '@/plugin/component';
import Ele from '@/plugin/ele';

export default {
  install(Vue, options) {
    Vue.use(Axios);
    Vue.use(Layout);
    Vue.use(Axios);
    Vue.use(Layout);
    Vue.use(Utils);
    Vue.use(Component);
    Vue.use(Ele);
  }
};
