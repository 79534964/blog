const {Service, Interface} = require('../../decorator/service');
const Code = require('./code');

@Service('result')
class Result extends Code {
    constructor() {
        super();
        this.res = {code: 0, data: null, msg: ''}
    }

    @Interface
    success({data = null, msg = '请求成功'}) {
        this.res = {code: this.SUCCESS, data, msg};
        return this.res;
    }

    @Interface
    error({data = null, msg = '请求异常'}) {
        this.res = {code: this.ERROR, data, msg};
        return this.res;
    }

    @Interface
    autoError({data = null, msg = '没有对应权限'}) {
        this.res = {code: this.AUTO, data, msg};
        return this.res;
    }

    @Interface
    requiredError({data = null, msg = '参数异常'}) {
        this.res = {code: this.REQUIRED, data, msg};
        return this.res;
    }
}

const result = new Result();

module.exports = result;
