import Slot from '@/components/slot';
import App from '@/components/app';
import '@/common/stylus/index.styl';

function install(Vue, opts = {}) {
    for (let key in opts) {
        Vue.component(key, opts[key]);
    }
};

export default {
    install(Vue, options) {
        install(Vue, Slot);
        install(Vue, App);
    }
};
