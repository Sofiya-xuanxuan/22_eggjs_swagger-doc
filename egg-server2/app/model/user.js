module.exports=app=>{
  const mongoose=app.mongoose;
  const UserSchema=new mongoose.Schema({
      mobile:{type:'string',required:true,unique:true},
      password:{type:'string',required: true},
      realName:{type:'string',required:true},
      avatar:{type:'string',default:'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
      extra:{type:mongoose.Schema.Types.Mixed},
      createdAt:{type:Date,default: Date.now()}
  });
  return mongoose.model('User',UserSchema)
};