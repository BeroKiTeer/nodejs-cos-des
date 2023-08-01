const { ensureLoggedIn } = require('connect-ensure-login');
const Controller = require('../controllers/goatController');
const express = require('express');
const router = express.Router();//创建router实例
const auth = require('../auth/auth');
//主页(url:http://127.0.0.1:3000 或者http://127.0.0.1:3000/)
router.get('/',Controller.goatList);
//添加新学生(url:http://127.0.0.1:3000/new)
router.get('/new',ensureLoggedIn('/login'),Controller.showNewGoatPage);//第二个参数：如果是合法用户跳转。若不是重定向到/login
router.post('/new',ensureLoggedIn('/login'),Controller.postAGoat);
router.get('/register',Controller.show_register_page);
router.post('/register',Controller.post_new_user);
router.get('/login',Controller.show_login_page);
router.post('/login',auth.authorize("/login"),Controller.post_login);
router.get('/logout',Controller.logout);
// router.get('/post',function(req,res){
//     console.log("filitering for goat",req.query.name);
// });
//显示某班的学生页面
router.get('/post',Controller.showGoatListByCNO);
// router.get('/:cNO',Controller.showGoatListByCNO);
//处理非法页面
router.use(function(req,res) {
    res.status(404);
    res.type('text/html');
    res.send('您的文件找不到，请核实url！');
});
router.use(function(err,req,res,next) {
    res.status(500);
    res.type('text/html');
    console.log('服务器内部错误。')
    res.send('服务器内部错误。');
    console.log(err);
});

module.exports=router;//对外暴露