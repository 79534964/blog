import * as R from 'ramda';

export default {
    install(Vue, options) {
        Vue.prototype.$mapping = function ({entity, data = {}, rule = {}, node = '', reset = true, copyData = null}) {
            try {
                node && this.$refs[node].resetFields();
            } catch (e) {
            }
            data = copyData !== null ? R.merge(R.merge({})(data))(copyData) : R.merge({})(data);
            // 遍历需要映射的对象
            R.mapObjIndexed((value, key) => {
                // 是否存在需要映射的对象
                entity[key] = R.has(key)(rule)
                    ? mapping[rule[key]](data[key])
                    : R.has(key)(data)
                        ? data[key]
                        : reset
                            ? R.is(Array)(entity[key])
                                ? []
                                : ''
                            : entity[key];
            })(entity);
        };
    }
};

const mapping = {
    StringToFile(value) {
        return R.anyPass([
            R.equals(''),
            R.equals(null),
            R.equals(undefined)
        ])(value)
            ? ''
            : R.split('.')(value)[0];
    },
    StringToArray(value) {
        return R.anyPass([
            R.equals(''),
            R.equals(null),
            R.equals(undefined),
            R.equals([])
        ])(value)
            ? []
            : R.map(e => window.isNaN(e) ? e : e * 1)(R.split(',')(value));
    }
};
