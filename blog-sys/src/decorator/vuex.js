import store from '@/vuex/store';

export const $vuex = params => (target, name, descriptor) => {
  if (!target.computed) {
    target.computed = {};
  }
  if (!target.methods) {
    target.methods = {};
  }
  params.forEach(({name, action, type}) => {
    if (type === 'get') {
      target.computed[name] = () => {
        return store.getters[action];
      };
    }
    if (type === 'act') {
      target.methods[name] = (params) => {
        store.dispatch(action, params);
      };
    }
    if (type === 'set') {
      target.computed[name] = {
        get() {
          return this.$store.getters[action[0]];
        },
        set(value) {
          this.$store.commit(action[1], value);
        }
      };
    }
  });
};
