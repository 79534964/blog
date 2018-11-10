const {Service, Interface} = require('../../decorator/service');
const {readdir, readFile, unlink, exists, writeFile} = require('../../includes/file');
const {blogPath, nginxPath} = require('../../../config/index');
const {emptyDir, rmEmptyDir, dirExists, dirTranslate} = require('../../includes/file/rewrite');
const result = require('../../includes/result');
const {pm2} = require('../../shell');

@Service('blogService')
class Server {

    @Interface
    async query() {
        const data = await readdir({path: blogPath});
        if (data) {
            return result.success({data});
        }
        return result.error({msg: '查询失败！'});
    }

    @Interface
    async details({file}) {
        const data = await readFile({path: `${blogPath}/${file}`});
        if (data) {
            return result.success({data: data.toString()});
        }
        return result.error({msg: '读取失败！'});
    }

    @Interface
    async delete({file, img}) {
        const data = await unlink({path: `${blogPath}/${file}`});
        await emptyDir({path: `${nginxPath}/${img}`});
        await rmEmptyDir({path: `${nginxPath}/${img}`});
        await emptyDir({path: `${blogPath}/${img}`});
        await rmEmptyDir({path: `${blogPath}/${img}`});
        pm2.hexo.reload();
        if (data) {
            return result.success({});
        }
        return result.error({msg: '删除失败！'});
    }

    @Interface
    async add({file, content}) {
        const isFlag = await exists({path: `${blogPath}/${file}`});
        if (isFlag) {
            return result.error({msg: '文件已存在！'});
        }
        const isSuccess = await writeFile({path: `${blogPath}/${file}`, content});
        pm2.hexo.reload();
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    @Interface
    async update({file, content}) {
        const isFlag = await exists({path: `${blogPath}/${file}`});
        if (!isFlag) {
            return result.error({msg: '文件不存在！'});
        }
        const isSuccess = await writeFile({path: `${blogPath}/${file}`, content});
        pm2.hexo.reload();
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    @Interface
    async img({file}) {
        const data = await readdir({path: `${nginxPath}/${file}`});
        if (data) {
            return result.success({data});
        }
        return result.error({msg: '还没有图片奥！'});
    }

    @Interface
    async imgDel({img}) {
        const data = await unlink({path: `${nginxPath}/${img}`});
        if (data) {
            return result.success({});
        }
        return result.error({msg: '删除失败！'});
    }

    @Interface
    async backups() {
        const list = await readdir({path: nginxPath});
        for (let file of list) {
            const dir = await readdir({path: `${nginxPath}/${file}`});
            if (dir) {
                await dirExists({dir: `${blogPath}/${file}`});
                for (let img of dir) {
                    dirTranslate({
                        before: `${nginxPath}/${file}/${img}`,
                        after: `${blogPath}/${file}/${img}`,
                        type: 'copy'
                    });
                }
            }
        }
        pm2.git.reload();
        return result.success({});
    }
}
