# nodejs  操作手册

1. 新建文件夹  

2. 初始化项目 在终端里npm init => 在文件夹里新建package.json  

3. 创建index.js  

4. 安装express包 npm install express => 在文件夹里出现了node_module文件夹  

5. 创建mvc的目录结构 models , views , controllers , routers  

6. 编写主程序index.js，创建web应用程序，配置express应用程序，并启动  

7. 建立MVC文件及其文件之间的调用关系:  

    index调用router,router调用controller,controller调用models。  

8. 在index.js中注册mustache模板引擎  

    (1)在npm install mustache-express  

    (2)require  

    (3)注册模板引擎  

        app.engine('mustache',mustache());app.set('view engine',mustache);  

9. 实现studentModel.js 参照lab3,lab6  

    (1)下载安装模块  

    (2)require nedb模板  

    (3)创建数据访问类  

10. 编写router和controller文件 参照lab5  

    提前准备好需要渲染的模板：view层的mustache文件  

    index文件中设置对url的处理urlencode  
