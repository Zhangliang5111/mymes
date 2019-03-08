/*
Navicat MySQL Data Transfer

Source Host         : localhost
Source port         : 3306
Source Database     : mymess

Date: 2019-03-07 15:40:00
*/
-- ----------------------------
-- Table structure for mymes_timetable
-- ----------------------------
DROP TABLE IF EXISTS `mymes_timetable`;
CREATE TABLE `mymes_timetable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectname` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `worktime` int(11) DEFAULT NULL COMMENT '工时',
  `workdate` varchar(255) DEFAULT NULL COMMENT '日期',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工时表';

