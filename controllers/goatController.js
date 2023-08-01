const stuModels = require('../models/goatModels');
const UserDAO = require('../models/userModel');
const goatDAO = new stuModels('students.db');
const auth = require('../auth/auth');
const {ensureLoggedIn} = require('connect-ensure-login');
// goatDAO.init();
//各种各样的响应函数
//显示各种学生信息
exports.goatList = function (req,res) {
    //1.查数据库
    //2.渲染网页（goat.mustache）
    goatDAO.getAllStudents().then(function(list) {
        res.render('goat',{
            'title':'所有小羊列表',
            "user":req.user,//req.user 是在 Passport 身份验证模块中预定义的属性名。
            'student': list
        });
        console.log('渲染学生列表成功！');
    }).catch(function(err) {
        console.log('渲染学生列表出错：',err);
    }).finally(function() {
        console.log('渲染学生列表结束。');
    });
}
//显示学生信息列表
exports.showNewGoatPage=function(req,res) {
    //渲染newGoat.mustache模板
    res.render('newGoat',{
        'title':'学生信息系统',
        'user':req.user
    });
}
//提交小羊信息
exports.postAGoat=function(req,res) {
    //将表单中的用户填写的数据插入到数据库中
    goatDAO.addAGoat(req.body.name,req.body.age,req.body.tel,req.body.birth,req.body.classNO);
    //重定向到主页上
    res.redirect('/');//发出了'/'的get请求

}

//显示某个班级小羊的列表
exports.showGoatListByCNO=function(req,res){
    // let no = req.params.cNO;
    var clno;
    console.log(clno);
    if (req.user) {
        //如果用户已经登录，则req.user一定指向用户文档（账号信息文档）
        //否则表示没有登录
        //放置出现读取属性错误
        clno = req.user.user;//查询到的JSON结果的user
    }
    //通过使用req.query.classNO
    goatDAO.getGoatsByClassNO(req.query.classNO).then(function(list) {
        res.render('goat',{
            'title':'某一个班的小羊列表',
            'user':clno,//req.user 是在 Passport 身份验证模块中预定义的属性名。
            'student': list
        });
        console.log('渲染学生列表成功！');
    }).catch(function(err) {
        console.log('渲染学生列表出错：',err);
        console.log(JSON.stringify(err));
    }).finally(function() {
        console.log('渲染学生列表结束。');
    });
}
//用户注册界面
exports.show_register_page = function (req,res) {
    res.render("user/register");
}
//添加新用户
exports.post_new_user = function (req,res) {
    const user = req.body.username;
    const password = req.body.password;
    if (!user || !password) {
        res.send(401,'请输入用户名或密码');
        return;
    }
    //查找键入的用户名是否已经在数据库中存在
    UserDAO.lookup(user,function(err,u){
        if (u) {
            res.status('401');
            return;
        }
        //不存在才会创建新用户
        UserDAO.create(user,password);
        res.redirect('/login');
    });
}

exports.show_login_page = function(req,res) {
    res.render('user/login');
}

exports.post_login = function(req,res) {
    res.redirect('/');
};

exports.logout = function(req,res) {
    req.logout((err)=>{//由于logout没有它的无参重载。我们必须加一个错误回调函数
    });
    res.redirect("/");
}
//登出用户，这里使用req中的logout方法即可登出，之后重定向到主页