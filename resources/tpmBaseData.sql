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

-- ----------------------------
-- Table structure for mymes_post
-- ----------------------------
DROP TABLE IF EXISTS `mymes_post`;
CREATE TABLE `mymes_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `posttitle` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `postcontent` text(255) DEFAULT NULL COMMENT '文章正文',
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT='文章标题';
-- ----------------------------
-- Table structure for mymes_user
-- ----------------------------
DROP TABLE IF EXISTS `mymes_user`;
CREATE TABLE `mymes_user`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `count` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY(`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT= '用户';