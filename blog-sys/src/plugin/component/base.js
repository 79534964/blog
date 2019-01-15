import buttonImg from '@/components/base/button/img';
import dialogImg from '@/components/base/dialog/img';

export default {
  install(Vue, options) {
    Vue.component('base-button-img', buttonImg);
    Vue.component('base-dialog-img', dialogImg);
  }
};
