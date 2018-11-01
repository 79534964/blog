const path = require('path');
const {Service, Interface} = require('../../decorator/service');
const {readdir, readFile, unlink, exists, writeFile} = require('../../includes/file');
const {blogPath, nginxPath} = require('../../../config/index');
const result = require('../../includes/result');

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
    async delete({file}) {
        const data = await unlink({path: `${blogPath}/${file}`});
        if (data) {
            return result.success({});
        }
        return result.error({msg: '删除失败！'});
    }

    @Interface
    async add({file, content}) {
        let isFlag = await exists({path: `${blogPath}/${file}`});
        if (isFlag) {
            return result.error({msg: '文件已存在！'});
        }
        let isSuccess = await writeFile({path: `${blogPath}/${file}`, content});
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    @Interface
    async update({file, content}) {
        let isFlag = await exists({path: `${blogPath}/${file}`});
        if (!isFlag) {
            return result.error({msg: '文件不存在！'});
        }
        let isSuccess = await writeFile({path: `${blogPath}/${file}`, content});
        return isSuccess ? result.success({}) : result.error({msg: '操作失败！'});
    }

    @Interface
    async img({file}) {
        const data = await readdir({path: path.resolve(nginxPath, `./${file}`)});
        if (data) {
            return result.success({data});
        }
        return result.error({msg: '还没有图片奥！'});
    }

    @Interface
    async imgDel({img}) {
        const data = await unlink({path: path.resolve(nginxPath, `./${img}`)});
        if (data) {
            return result.success({});
        }
        return result.error({msg: '删除失败！'});
    }
}
