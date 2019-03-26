var express = require('express');
var router = express.Router();
var db = require('./db/db')

/* 首页 */
router.get('/', function(req, res, next) {
  res.render('index', { username: req.cookies.username });
  
});
// 工时
router.get('/timetable',function(req,res,next){
  if(req.cookies.username==undefined){
    return res.redirect('/user/login');//页面重定向；
  }else{
    res.render('timetable',{ username: req.cookies.username });
  }
});
// 文章列表页
router.get('/page',function(req,res,next){
  if(req.cookies.username==undefined){
    return res.redirect('/user/login');//页面重定向；
  }else{
    res.render('page',{ username: req.cookies.username });
  }
  
});
//写文章
router.get('/post',function(req,res,next){
  if(req.cookies.username==undefined){
    return res.redirect('/user/login');//页面重定向；
  }else{
    res.render('post',{ username: req.cookies.username })
  }
 
});
//文章详情
router.get('/aticle',function(req,res,next){
  res.render('aticle',{ username: req.cookies.username })
  
});
// 查询列表
router.post('/list',function(req,res){
  var projectname = req.body.projectname;
  if(projectname != undefined){
    var sql = 'SELECT * FROM mymes_timetable where projectname LIKE '+'"%'+projectname+'%"';
  }else{
    var sql = 'SELECT * FROM mymes_timetable';
  }
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
});
//文章列表
router.post('/postlist',function(req,res){
  var postListSql =  'SELECT * FROM mymes_post';
  db.query(postListSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("数据加载失败")
    }
  })
});
// 发布文章
router.post('/addpost',function(req,res){
  var postTitle = req.body.posttitle;
  var postContent = req.body.postcontent;
  var postSql = "INSERT INTO mymes_post(posttitle,postcontent) values ('"+postTitle+"','"+postContent+"')";
  db.query(postSql,function(err,result){
    if(!err){
      res.json(JSON.stringify(result));
    }else{
      console.log("发布失败")
    }
  })
})
//文章详情页
router.post('/aticle',function(req,res){
    var id = req.body.id;
    var aticleSql = 'SELECT *FROM mymes_post where id ='+id;
    console.log(aticleSql)
    db.query(aticleSql,function(err,result){
      if(!err){
        res.json(JSON.stringify(result));
      }else{
        console.log('数据加载失败');
      }
    })
});
module.exports = router;
