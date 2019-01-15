import buttonSumbit from '@/components/slot/button/sumbit';
import tabTabs from '@/components/slot/tab/tabs';
import tabTop from '@/components/slot/tab/top';
import inputTitle from '@/components/slot/input/title';
import cardActions from '@/components/slot/card/actions';
import dialogTable from '@/components/slot/dialog/table';

export default {
  install(Vue, options) {
    Vue.component('slot-button-sumbit', buttonSumbit);
    Vue.component('slot-tab-tabs', tabTabs);
    Vue.component('slot-tab-top', tabTop);
    Vue.component('slot-input-title', inputTitle);
    Vue.component('slot-card-actions', cardActions);
    Vue.component('slot-dialog-table', dialogTable);
  }
};
