var express = require('express');
var router = express.Router();
var db = require('./db/db')

/* 首页 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
  
});
// 工时
router.get('/timetable',function(req,res,next){
  res.render('timetable',{title:'工时统计'});
});
// 查询列表
router.post('/list',function(req,res){
  var sql = 'SELECT * FROM mymes_timetable';
  db.query(sql,function(err,result){
    if(!err){
      res.json(result)
    }else{
      console.log("获取信息失败")
    }
  })
  
});
router.post('/delete',function(req,res){
  var ids = req.body.ids;
  var deSql = 'DELETE FROM mymes_timetable where id in (' +ids+')';
  db.query(deSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("删除失败")
    }
  })
});
router.post('/save',function(req,res){
  var projectname = req.body.projectname;
  var worktime = req.body.worktime;
  var workdate = req.body.workdate;
  var description = req.body.description;
  var addSql = "INSERT INTO mymes_timetable(projectname,worktime,workdate,description) values ('"+projectname+"','"+worktime+"','"+workdate+"','"+description+"')";
  db.query(addSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("新增失败")
    }
  })
});
router.post('/edit',function(req,res){
  var id = req.body.id;
  console.log(id);
  var editSql = "SELECT * FROM mymes_timetable  where id ="+id;
  //console.log(editSql)
  db.query(editSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("查询失败！！")
    }
  })
});
router.post('/updata',function(req,res){
  var id = req.body.id;
  var projectname = req.body.projectname;
  var worktime = req.body.worktime;
  var workdate = req.body.workdate;
  var description = req.body.description;
  var updataSql = "UPDATE mymes_timetable SET projectname = '"+projectname+"',worktime = '"+worktime+"',workdate = '"+workdate+"',description = '"+description+"' where id ="+id;
  console.log(updataSql);
  db.query(updataSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("新增失败！！")
    }
  })
})
module.exports = router;
