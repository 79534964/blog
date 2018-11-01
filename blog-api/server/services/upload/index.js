const multiparty = require('multiparty');
const path = require('path');
const {unlink} = require('../../includes/file');
const {Service, Interface} = require('../../decorator/service');
const {dirExists, dirTranslate} = require('../../includes/file/rewrite');
const {nginxPath, uploadSize} = require('../../../config/index');
const {user} = require('../../../config/index');
const result = require('../../includes/result');

@Service('uploadService')
class Server {

    @Interface
    async img({req}) {
        let fileTypeError = true;
        let tokenType, fieldType = false;
        let count = 0;
        let fileName = '';
        const res = await new Promise((resolve, reject) => {
            const form = new multiparty.Form();
            form.encoding = 'utf-8';
            form.uploadDir = nginxPath;
            //设置单文件大小限制
            form.maxFilesSize = uploadSize;
            form.on('field', (field, value) => {
                if (field === 'token') {
                    if (user.userToken === value) {
                        tokenType = true;
                    }
                }
                if (field === 'file') {
                    if (value !== '') {
                        fieldType = true;
                        fileName = value;
                    }
                }
                if (++count == 2) {
                    fileTypeError = !(tokenType && fieldType);
                }
            });
            form.parse(req, async (err, fields, files) => {
                let file = files.file[0];
                if (fileTypeError) {
                    await unlink({path: file.path});
                    resolve(result.error({msg: '校验失败缺少token || 文件名！'}));
                    return;
                }
                if (err) {
                    resolve(result.error({msg: '上传失败！'}));
                    return;
                }
                let filePath = path.resolve(nginxPath, `./${fileName}`);
                await dirExists({dir: filePath});
                let bool = await dirTranslate({
                    before: file.path,
                    after: path.resolve(filePath, `./${file.originalFilename}`)
                });
                resolve(bool ? result.success({data: '上传成功'}) : resolve(result.error({msg: '上传失败！'})));
            });
        });
        return res;
    }

}
