export const $translate = function (classTarget, target) {
  for (let key in classTarget) {
    target[key] = Object.assign(target[key] ? target[key] : {}, classTarget[key]);
  }
};
