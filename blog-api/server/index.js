const Koa = require('koa');
const {port} = require('../config/index');
const R = require('ramda');
const {join} = require('path');
const chalk = require('chalk');

const MIDDLEWARES = ['bodyParser', 'cors','logger', 'router'];

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                e => e(app)
            ),
            require,
            name => join(__dirname, `./middleware/${name}`)
        )
    )(MIDDLEWARES);
};

async function start() {
    const app = new Koa();

    await useMiddlewares(app);

    app.listen(port, () => {
        console.log(chalk.green(`App listening on port ${port}`));
    });
};

start();
