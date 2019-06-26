const Service=require('egg').Service;

class UserAccessService extends Service{
    /**
     * 登录
     * @param payload
     * @returns {Promise<void>}
     */
    async login(payload){
        const {ctx,service}=this;
        const user=await service.user.findByMobile(payload.mobile);
        console.log(user+'-----------------');
        if(!user) {
            ctx.throw(404,'user not found')
        }
        let verifypsw=await ctx.compare(payload.password,user.password);
        if(!verifypsw) {
            ctx.throw(404,'user password is error');
        }
        //生成token令牌
        return {token:await service.actionToken.apply(user._id)};
    }

    /**
     * 退出登录
     * @returns {Promise<void>}
     */
    async logout() {
    }

    /**
     * 当前用户信息
     * @returns {Promise<void>}
     */
    async current(){
        const {ctx,service}=this;
        //ctx.state.user可以提取到JWT编码的data
        const _id=ctx.state.user.data._id;
        const user=await service.user.find(_id);
        if(!user) {
            ctx.throw(404,'user is not found');
        }
        user.password='how old are you?';

        return user;
    }

}

module.exports=UserAccessService;