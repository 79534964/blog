const {Controller, Post} = require('../../decorator/router');
const {uploadService} = require('../../services');

@Controller('/upload')
class Router {

    @Post('/img')
    async query(ctx, next) {
        const data = await uploadService.img(ctx);
        ctx.body = data;
    };
}
