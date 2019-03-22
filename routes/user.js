var express = require('express');
var router = express.Router();
var db = require('./db/db')

// 用户
router.get('/login',function(req, res, next){
  res.render('login',{title:'登录'})
});
router.get('/res',function(req,res,next){
  res.render('res',{title:'注册'})
})
//登录
router.post('/login',function(req,res){
  var count = req.body.count;
  var password = req.body.pwd;
  var countResultSql = "select * from mymes_user where count = '"+count+"' and password = '"+password+"'";
  db.query(countResultSql,function(err,result){
     if(err){
      console.log('login ERROR');
      return;
     }
     if(result==''){
      res.json({'status':1,'msg':'账户或者密码错误'})
      return;
     }else{
      res.json({'status':0})
     }  
  })
})
// 注册
router.post('/res',function(req,res){
  var count = req.body.count;
  var name = req.body.name;
  var password = req.body.pwd;
  var resSql = "INSERT INTO mymes_user(count,name,password) values ('"+count+"','"+name+"','"+password+"')";
  db.query(resSql,function(err,result){
    if(err){
      console.log("res error!")
      return;
    }
    if(result == ''){
      res.json({'status':1,'msg':'注册失败'})
      return;
    }else{
      res.json({'status':0,'msg':'注册成功'})
    }
  })
})
module.exports = router;
