//入口文件
// /app.js
/**
 * 全局定义
 * @param app
 */
class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path = __dirname;
    }
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }
    configDidLoad() {
        // Config, plugin files have been loaded.
    }
    async didLoad() {
        // All files have loaded, start plugin here.
    }
    async willReady() {
        // All plugins have started, can do some thing before app ready
    }
    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        console.log('========Init Data=========')
        const ctx = await this.app.createAnonymousContext();//createAnonymousContext创建匿名上下文
        await ctx.model.User.remove();//将数据库全部清除
        await ctx.service.user.create({
            mobile: '18501368704',
            password: '123456',
            realName: 'sofiyas',
        })
    }
    async serverDidReady() {
    }
    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports=AppBootHook;