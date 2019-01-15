const {Controller, Post, Required} = require('../../decorator/router');
const {testService} = require('../../services');

@Controller('/test')
class Router {

    @Post('/img')
    @Required({
        body: ['src']
    })
    async query(ctx, next) {
        const data = await testService.img(ctx.request.body);
        ctx.body = data;
    };
}
