const {Controller, Post, Auth, Required} = require('../../decorator/router');
const {blogService} = require('../../services');

@Controller('/blog')
class Router {

    @Post('/query')
    @Auth
    async query(ctx, next) {
        const data = await blogService.query();
        ctx.body = data;
    };

    @Post('/details')
    @Auth
    @Required({
        body: ['file']
    })
    async details(ctx, next) {
        const data = await blogService.details(ctx.request.body);
        ctx.body = data;
    };

    @Post('/delete')
    @Auth
    @Required({
        body: ['file']
    })
    async delete(ctx, next) {
        const data = await blogService.delete(ctx.request.body);
        ctx.body = data;
    };

    @Post('/add')
    @Auth
    @Required({
        body: ['file', 'content']
    })
    async add(ctx, next) {
        const data = await blogService.add(ctx.request.body);
        ctx.body = data;
    };

    @Post('/update')
    @Auth
    @Required({
        body: ['file', 'content']
    })
    async update(ctx, next) {
        const data = await blogService.update(ctx.request.body);
        ctx.body = data;
    };

    @Post('/img')
    @Auth
    @Required({
        body: ['file']
    })
    async img(ctx, next) {
        const data = await blogService.img(ctx.request.body);
        ctx.body = data;
    };

    @Post('/imgDel')
    @Auth
    @Required({
        body: ['img']
    })
    async imgDel(ctx, next) {
        const data = await blogService.imgDel(ctx.request.body);
        ctx.body = data;
    };

    @Post('/backups')
    @Auth
    async backups(ctx, next) {
        const data = await blogService.backups();
        ctx.body = data;
    };
};
