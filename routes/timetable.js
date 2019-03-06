var express = require('express');
var router = express.Router();

// 工时
router.get('/timetable',function(req, res, next){
  res.render('timetable',{title:'工时统计'})
});
module.exports = router;
