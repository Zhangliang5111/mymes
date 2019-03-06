var express = require('express');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
  
});
// 工时
router.get('/timetable',function(req,res,next){
  res.render('timetable',{title:'工时统计'});
  console.log("我是工时页面");

});
module.exports = router;
