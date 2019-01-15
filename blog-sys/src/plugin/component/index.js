import App from './app';
import Slot from './slot';
import Base from './base';

export default {
  install(Vue, options) {
    Vue.use(App);
    Vue.use(Base);
    Vue.use(Slot);
  }
};
