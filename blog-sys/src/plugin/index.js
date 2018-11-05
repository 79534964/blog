import Axios from '@/plugin/axios';
import Mapping from '@/plugin/mapping';
import Layout from '@/plugin/layout';

export default {
    install(Vue, options) {
        Vue.use(Axios);
        Vue.use(Mapping);
        Vue.use(Layout);
    }
};
