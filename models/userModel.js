const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({filename:dbFilePath,autoload:true});
        } else {
            this.db = new Datastore();
        }
    }
    init() {
        this.db.insert({
            'user':'Alice',
            'password':'$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });
        this.db.insert({
            'user':'Bob',
            'password':'$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });
        return this;
    }
    //创建新用户
    create (username,password) {
        const that = this;
        bcrypt.hash(password,saltRounds).then(function(hash){
            var entry = {
                'user':username,
                password:hash
            };
            that.db.insert(entry,function(err){
                if (err) {
                    console.log('找不到用户：',username);
                }
            });
        });
    }
    //查找用户方法
    lookup (user,cb) {
        this.db.find({'user':user},function(err,entries){
            if (err) { 
                return cb(err,null);//如果第一个参数不是null。则说明执行find没有出错
            } else {
                if (entries.length == 0) {
                    return cb(null,null);
                }
                return cb(null,entries[0]);//entries是从数据库中查询到的所有符合条件的数据
                //这些数据用一个数组来存储。由于我们已经保证了user是唯一标识符。所以我们只需要提取数组中第一个元素
                //也就是entries[0]
            }
        });
    }
}
const dao = new UserDAO('user.db');
dao.init();
module.exports = dao;