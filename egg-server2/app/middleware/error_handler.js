'use strict';
module.exports = (option, app) => {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            //所有的异常都在app上触发一个error事件，框架会记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            //生产环境时500错误的详细错误内容不返给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;
            //从error对象上读出各个属性，设置到响应中
            ctx.body = {
                code: status,
                error: error
            };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = 200;
        }
    }
};