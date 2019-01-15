const {Service, Interface} = require('../../decorator/service');
const http = require('http');
const result = require('../../includes/result');

@Service('testService')
class Server {

    @Interface
    async img({src}) {
        // const data = await new Promise((resolve, reject) => {
        //     http.get(src, (res) => {
        //         let chunks = [];
        //         let size = 0;
        //         res.on('data', (chunk) => {
        //             chunks.push(chunk);
        //             size += chunk.length;
        //         });
        //         res.on('end', (err) => {
        //             let data = Buffer.concat(chunks, size);
        //             resolve(`data:image/png;base64,${data.toString('base64')}`);
        //         });
        //     });
        // });
        return result.success({data:1});
    }
}
