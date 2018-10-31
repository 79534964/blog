import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/vuex/store';
// 第三方的库
import libs from '@/libs';
// 核心插件
import plugin from '@/plugin';

Vue.use(libs);
Vue.use(plugin);

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
