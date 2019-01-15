export const $axios = params => (target) => {
  if (!target.methods) {
    target.methods = {};
  }
  if (!target.computed) {
    target.computed = {};
  }
  params.forEach(({name, action, params = {}}) => {
    target.methods[name] = function (potions = {}) {
      return this['$axios'](Object.assign({actionType: action}, Object.assign(potions, params)));
    };
    target.computed[`${name}_action`] = () => {
      return action;
    };
  });
};
