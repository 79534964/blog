const {Controller, Post, Required} = require('../../decorator/router');
const {loginService} = require('../../services');

@Controller('/login')
class Router {

    @Post('')
    @Required({
        body: ['account', 'password']
    })
    async login(ctx, next) {
        const data = await loginService.login(ctx.request.body);
        ctx.body = data;
    };
};
