const {Service, Interface} = require('../../decorator/service');
const {user} = require('../../../config/index');
const result = require('../../includes/result');

@Service('loginService')
class Server {

    @Interface
    async login({account, password}) {
        let data = await new Promise((resolve, reject) => {
            if (user.account !== account) {
                resolve(result.error({msg: '账号不存在！'}));
                return;
            }

            if (user.password !== password) {
                resolve(result.error({msg: '密码不正确！'}));
                return;
            }
            resolve(result.success({data: this.getUser(), msg: '登陆成功！'}));
        });
        return data;
    }

    getUser() {
        return {
            loginName: '管理员',
            userToken: user.userToken,
            menu: [{
                href: '/article',
                id: 1,
                name: '我的博客',
                childList: [{
                    href: '/article/articleArrange',
                    id: 2,
                    name: '文章管理',
                    title: '我的文章'
                }]
            }]
        }
    }
}
