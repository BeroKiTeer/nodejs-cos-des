const nedb = require('nedb');

class Goat {
    //构造器
    constructor(dbFile) {
        if (dbFile) { //创建嵌入式的数据库
            this.db=new nedb({filename:dbFile,autoload:true});
            console.log('数据库已经创建。数据库的路径是'+dbFile);
        } else {  //创建内存式的数据库
            this.db=new nedb();
            console.log('内存式数据库已经创建。');
        }
    }
    //预存文档
    init() {
        this.db.insert({
            name:'吸氧羊',
            age:9,
            tel:'1888888888',
            birth:'2913-09-11',
            classNO:'三年级二班'   //插入的数据
        },function(err,doc) {
            if (err) {
                console.log('插入第一个文档出错了',err);
            } else {
                console.log('插入第一个文档成功！',doc);
            }
        });
        this.db.insert({
            name:'美羊羊',
            age:8,
            tel:'1777777778',
            birth:'2913-11-21',
            classNO:'三年级二班'
        },function(err,doc) {
            if (err) {
                console.log('插入第一个文档出错了',err);
            } else {
                console.log('插入第一个文档成功！',doc);
            }
        });
    }
    //查询所有学生信息
    getAllStudents() {
        return new Promise((resolve,reject)=>{
            this.db.find({},function(err,data) {
                if (err) {//查询失败
                    console.log('查询出错啦，请修改',err)
                    reject(err);//将此promise对象的status由pending状态->rejected;result中存入err
                } else {//查询成功
                    console.log('查询成功，查到的文档集为',data);
                    resolve(data);//将此promise对象的status由pending状态->fulfilled;result中存入data
                }
            });
        });
    }
    getGoatsByClassNO(cNO) {
        return new Promise((resolve,reject)=>{
            this.db.find({'classNO':cNO},function(err,data) {
                if (err) {//查询失败
                    console.log('查询出错啦，请修改',err)
                    reject(err);//将此promise对象的status由pending状态->rejected;result中存入err
                } else {//查询成功
                    console.log('查询成功，查到的文档集为',data);
                    resolve(data);//将此promise对象的status由pending状态->fulfilled;result中存入data
                }
            });
        });
    }
    //添加一个学生文档
    addAGoat(na,ag,te,bir,cNO) {
        this.db.insert({
            'name':na,
            'age':ag,
            'tel':te,
            'birth':bir,
            'classNO':cNO
        },function(err,doc) {
            if (err) {
                console.log('插入学生失败！',err);
            } else {
                console.log('插入学生成功！',doc);
            }
        });
    }
}

module.exports=Goat;//对外暴露类