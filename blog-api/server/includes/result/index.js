const Code = require('./code');

class Result extends Code {
    constructor() {
        super();
        this.res = {code: 0, data: null, msg: ''}
    }

    success({data = null, msg = '请求成功'}) {
        this.res = {code: this.SUCCESS, data, msg};
        return this.res;
    }

    error({data = null, msg = '请求异常'}) {
        this.res = {code: this.ERROR, data, msg};
        return this.res;
    }

    autoError({data = null, msg = '没有对应权限'}) {
        this.res = {code: this.AUTO, data, msg};
        return this.res;
    }

    requiredError({data = null, msg = '参数异常'}) {
        this.res = {code: this.REQUIRED, data, msg};
        return this.res;
    }
}

const result = new Result();

module.exports = result;
