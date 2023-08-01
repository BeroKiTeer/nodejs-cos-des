const express = require('express');//导入express包
const path = require('path');//导入路径模块
const mustache = require('mustache-express');
const goatRouter = require('./routers/goatRouter');//导入routers模块
const passport = require('passport');
const session = require('express-session');
const auth = require('./auth/auth');
const app = express();//创建web应用程序
//静态资源托管中间件static express的中间件 根目录全局变量__dirname
const staticFolder = path.join(__dirname,'public');//.../public
app.use(express.static(staticFolder));
//注册模板引擎
app.engine('mustache',mustache());
app.set('view engine','mustache');
app.use(express.urlencoded({extended:false}));//对表单信息保存处理
//必须先执行下面这句话
app.use(session({secret:'不要告诉任何人',resave:false,saveUninitialized:false}));//后两个参数保证不出现空会话
app.use(passport.session());//启用了passport的会话支持
app.use(passport.initialize());//初始化passport身份验证模块
auth.init(app);
app.use('/',goatRouter);

//监听端口3000，启动web应用程序
app.listen(3000,function(){
    console.log('服务器在3000端口启动，关闭服务器请按Ctrl+C。');
});