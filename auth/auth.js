//相当于一个controller
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.init = function (app) {
    /*
    策略方案为：
    1. 当查询结果是出现错误应当进行cb（err）的调用，即处理错误信息。
    2. 当没有用户时应当进行cb(null,null)表示，没有错误，但是没有查到相应用户。
    3. 当密码与用户不匹配时，应当cb(null,false)，表示，有这个用户，但是密码不正确。
    4. 当密码与用户匹配时，应当cb(null,user),返回用户数据文档。
    */
    passport.use(new Strategy(function(username,password,cb) {
        userModel.lookup(username,function(err,user) {
            if (err) {//处理错误信息
                console.log('出错啦',err);
                return cb(err);
            }
            if (!user) {//没有错误，但是没有查到相应用户。
                console.log('用户',user,'找不到');
                return cb(null,false);
            }
            bcrypt.compare(password,user.password,function(err,result){
                if (result) {//密码与用户匹配。发送数据库用户数据
                    cb(null,user);
                } else {//密码与用户不匹配
                    cb(null,false);
                }
            });
        });
    }));
    /*
    SerializeUser是序列化可以根据自己的需求选择使用哪些用户信息作为会话的唯一标识符。
    通常是用户的ID或用户名，这里使用用户名作为会话id。
    DeSerializeUser是反序列化，在上面序列化之后req.user会发生变化。
    之后我们需要反序列化为原来的json格式的用户数据。
    也就是req.user还原为原来的json用户格式(包含用户名和密码的那个)。
    要想再次还原原来的数据必须要再次查询原来的id数据之后在进行调用FO(FunctionObject缩写)在还原在req.user中。
    */
    //对数据进行序列化
    passport.serializeUser(function(user,cb){
        cb(null,user.user);
        
    });
    //null 是传递给 done 回调函数的第一个参数。在这种情况下，null 表示没有发生任何错误或异常，即序列化过程是成功的。
    //对数据进行反序列化
    passport.deserializeUser(function(id,cb) {
        userModel.lookup(id , function(err,user) {
            if (err) {
                return cb(err);
            }
            cb(null,user);
        });
    });
    //Passport 使用serializeUser函数将用户数据（成功验证后）保存到会话中。 函数deserializeUser用于从会话中检索用户数据。
    // app.use(passport.initialize());
    // app.use(passport.session());
}

exports.authorize = function(redirect) {
    return passport.authenticate('local',{failureRedirect:redirect});
};

