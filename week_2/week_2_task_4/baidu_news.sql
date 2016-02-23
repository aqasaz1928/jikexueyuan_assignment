-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-12-16 16:11:38
-- 服务器版本： 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidu_news`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `admin_name` varchar(120) NOT NULL,
  `admin_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`admin_name`, `admin_token`) VALUES
('root', '471ea8520899f425754a74fc95cfe114');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(10) unsigned NOT NULL,
  `news_title` varchar(128) NOT NULL,
  `news_type` varchar(4) NOT NULL,
  `news_subject` varchar(20) NOT NULL,
  `news_time` bigint(20) unsigned NOT NULL,
  `news_abstract` text,
  `news_imgs` text
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`news_id`, `news_title`, `news_type`, `news_subject`, `news_time`, `news_abstract`, `news_imgs`) VALUES
(4, '官媒批国人吃相，自助餐垒成塔', 'a', '社会', 1450016488, '国民之吃相，关乎一国之形象', 'http://rj1.douguo.net/upload/diet/9/8/1/9821055456a78c7c4fc35af648a22df1.jpg;'),
(5, '政策性住房将成二三线城楼市去库存主攻点，媒体称力度空前', 'a', '社会', 1450016488, '既要保障居民住房，又要保持楼市合理发展，综合考虑', 'http://i2.sinaimg.cn/hs/2011/0331/S29117T1301561440391.jpg;'),
(6, '琅邪榜这么火，李彦宏为什么还支持胡歌休息', 'a', '娱乐', 1450016958, '他现身古都西安，并在文化产业发展大会上表示', 'http://img001.21cnimg.com/photos/album/20151211/m600/36DAD525C9E4B6B9E8772CDE2B869262.jpeg;'),
(7, '《货币战争》作者演讲被围攻', 'a', '社会', 1450017144, '宋鸿兵应邀做题为“货币战争时代的全新金融理念与投资策略”的演讲', 'http://i3.sinaimg.cn/cj/hy/20101016/U4850P31T1D8790795F46DT20101016165905.jpg;'),
(8, '力压骁龙，三星12核处理器跑分曝光', 'c', '科技', 1450017144, NULL, 'http://img0.pconline.com.cn/pconline/1309/02/3450973_3.jpg;http://img5.imgtn.bdimg.com/it/u=260827469,3946638648&fm=21&gp=0.jpg;http://image.tianjimedia.com/uploadImages/2011/228/3UZA006GE30V_18_500.jpg'),
(9, '微软鉴于用户强烈反应，恢复15GB云存储服务', 'b', '科技', 1450018027, '微软上个月决定，放弃其OneDrive云无线存储的服务', NULL),
(11, '不知道圣诞送什么，送几本关于苹果的书吧', 'c', '科技', 1450018027, NULL, 'http://img.xiaba.cvimage.cn/4de728422ff0b8ba7c8a0000.jpg;http://img.pconline.com.cn/images/product/5286/528658/mini.jpg;http://img01.timedg.com/attachement/jpg/site1/20111006/0021972844a90ff7593701.jpg'),
(13, 'Win10红石更新，最新版本号曝光', 'c', '科技', 1450018726, NULL, 'http://img2.imgtn.bdimg.com/it/u=2446341579,113615129&fm=11&gp=0.jpg;http://img.anfone.com/Outside/anfone/201511/201511062240192064.jpg;http://easyread.ph.126.net/MyLI_sC883TG3OEcx1DuLQ==/7917058764568554257.jpg'),
(14, '测试全文字新闻，没有图片', 'b', '社会', 1449994010, '全文字新闻是没有图片的，你将看不到图片在新闻里面显示', NULL),
(15, '测试社会新闻A修改门类', 'a', '社会', 1450256092, '这是新闻type-a，他可以包含摘要，这时已经修改后的新闻', 'http://image2.sina.com.cn/IT/h/2007-05-17/e05b72dc3df94cf718cd22c86fb9d0a7.jpg;'),
(16, '这是测试新闻B', 'b', '社会', 1450181944, '这是测试新闻B，它将包含一段摘要，没有图片', ''),
(17, '这是测试新闻C', 'c', '社会', 1450182068, '', 'http://img3.imgtn.bdimg.com/it/u=755650091,3053014564&fm=11&gp=0.jpg;http://img2.imgtn.bdimg.com/it/u=2944694408,3364971304&fm=21&gp=0.jpg;http://img2.91.com/uploads/allimg/141128/741-14112QH527-51.jpg'),
(18, 'usbhub能够给手机充电', 'a', '科技', 1450267469, '中文摘要写得好', 'http://i2.hdslb.com/video/35/35f84342d434cfe4148f1740b66f9a7e.jpg;'),
(19, '丁磊，希望考拉成千亿级电商', 'a', '科技', 1450267634, '网易考拉海购，坚持直邮，坚持正品，希望给用户最好的购物体验', 'http://img2.imgtn.bdimg.com/it/u=1325727315,61965509&fm=11&gp=0.jpg;'),
(20, '专家分析放开二胎对经济的印象', 'c', '社会', 1450269186, '', 'http://yun.hainei.org/forum/201511/03/173406vveqanzfjecfynen.jpeg;http://www.caifurensheng.cn/UploadFiles/20130304/7e531fda-34f7-4cb1-aeae-a9676fc89a4f.jpg;http://pinpai.china.com.cn/pic/attachement/jpg/site445/20151125/d43d7e53ebba17bf5cdb17.jpg'),
(21, '习近平在乌镇互联网大会讲话', 'a', '科技', 1450269330, '国家主席习近平在乌镇发表重要讲话，就中国互联网发展提出五点意见', 'http://www.3sdy.com/uploadfile/2015/1211/20151211054249590.jpg;'),
(22, '春运抢票难度排行，北京第一', 'a', '本地', 1450269443, '根据标准客流量，本次一共上榜了20个城市，北京抢票难度居第一位', 'http://img3.imgtn.bdimg.com/it/u=4153643910,1609208827&fm=21&gp=0.jpg;'),
(23, '曹云金央视春晚节目被毙', 'a', '娱乐', 1450269573, '央视春晚进行了最终审查，现场许多老面孔纷纷亮相', 'http://img4.imgtn.bdimg.com/it/u=1181173136,2686887548&fm=21&gp=0.jpg;'),
(24, '韩红欲打造“我是歌手”巡演', 'a', '娱乐', 1450269663, '在“我是歌手”第四季结束后，讲集合实力唱将进行全国巡演', 'http://img5.imgtn.bdimg.com/it/u=2192445997,1652961232&fm=21&gp=0.jpg;'),
(25, '时尚智能手表发布，颜值超过iwatch', 'c', '科技', 1450269823, '', 'http://nres.ingdan.com/uploads/20151028/1446013281174942.jpg;http://img0.imgtn.bdimg.com/it/u=2243116158,613005150&fm=21&gp=0.jpg;http://www.cnr.cn/tech/techgd/201311/W020131127336245119682.jpg'),
(26, 'google 2015热搜榜，iPhone6s居科技类榜首', 'a', '科技', 1450269945, '从大数据的角度解读今年人们关注的热点和社会趋势', 'http://cms.csdnimg.cn/articlev1/uploads/allimg/120625/112_120625133338_1.jpg;'),
(27, '索尼Z5国行开卖，售价4999', 'a', '科技', 1450270084, '索尼公布了Z5国行版售价，并与京东展开合作，现在你就可以以4999的价格预订', 'http://img0w.pconline.com.cn/pconline/1409/26/spcgroup/width_640,qua_30/5491898_60.jpg;'),
(28, '北京，天津，张家口等六座城市试行公交一卡通通用', 'b', '本地', 1450270269, '本周开始，市民就可以一卡通六城了，这是京津冀交通一体化的重要一步', ''),
(29, '北京新房供应创十年新低', 'b', '本地', 1450271241, '《经济之声》本期关注，楼市分化加剧，去库存政策要更有针对性', ''),
(30, '北京公务员工作态度恶劣将被报送检察机关', 'b', '本地', 1450271340, '今天公布了这项规定', ''),
(31, '年底北京完成百万亩造林，形成环城市森林带', 'b', '本地', 1450271572, '北京市林业工作站副站长李荣恒介绍，目前距离造林目标还差1700万亩', ''),
(32, '北京村支书帮人承接工程受贿120万，获刑五年', 'b', '本地', 1450271813, '六里桥村党支部总书记，北京天创伟业投资公司董事长张惠民，利用职务便利...', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
