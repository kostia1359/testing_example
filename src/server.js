const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./controllers');
const app = new Koa();

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

