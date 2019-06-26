module.exports={
    loginRequest:{
        mobile:{type:'string',required:true,description:'手机号',example:'18501368704',format:/^1[34578]\d{9}$/},
        password:{type:'string',required: true,description: '密码',example: '123456'}
    }
}