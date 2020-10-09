const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cors = require('koa2-cors');  // 前后端跨域处理中间件
const connection = require('./db'); // 连接数据库

app.use(cors());

app.use(async (ctx, next) => {
    // 调试API接口中间件
    console.log(`请求方法: ${ctx.method}`);
    console.log(`请求路径: ${ctx.url}`);

    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(14000, () => {
    console.log("please visit http://localhost:14000");
});