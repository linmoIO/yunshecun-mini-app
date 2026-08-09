-- MySQL dump 10.13  Distrib 8.4.11, for Linux (x86_64)
--
-- Host: localhost    Database: yunshecun_local
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Activity`
--

DROP TABLE IF EXISTS `Activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activityCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `originalPrice` double DEFAULT NULL,
  `coverImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoThumb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoLinkType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'upload',
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `maxPersons` int DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Activity_activityCode_key` (`activityCode`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activity`
--

LOCK TABLES `Activity` WRITE;
/*!40000 ALTER TABLE `Activity` DISABLE KEYS */;
INSERT INTO `Activity` VALUES (3,'YSC-BOAT','泛舟体验','沿水而行，感受云舍村周边的宁静景色。具体时段与安全要求以预约确认信息为准。',888,NULL,'/uploads/images/云舍村-泛舟夜景.webp','[\"/uploads/images/云舍村-泛舟夜景.webp\",\"/uploads/images/云舍村-村落风景-02.webp\"]',NULL,NULL,'upload','云舍村',NULL,NULL,0,4,'在地体验',1,'2026-07-07 11:21:04.014','2026-08-05 01:51:30.832'),(4,'YSC-EMBROIDERY','桃源绣体验','认识桃源绣的民间工艺与吉祥纹样，在手作中感受地方文化。',888,NULL,'/uploads/images/云舍村-村落风景-04.webp','[\"/uploads/images/云舍村-村落风景-04.webp\",\"/uploads/images/云舍村-村落风景-05.webp\"]',NULL,NULL,'upload','云舍村',NULL,NULL,0,8,'传统手工',2,'2026-08-05 01:45:54.860','2026-08-06 15:35:36.513'),(5,'YSC-LEICHA','擂茶体验','体验地方擂茶的制作与品饮，了解村落中的日常风味。',888,NULL,'/uploads/images/云舍村-村落风景-05.webp','[\"/uploads/images/云舍村-村落风景-05.webp\",\"/uploads/images/云舍村-村落风景-06.webp\"]',NULL,NULL,'upload','云舍村',NULL,NULL,0,8,'茶事体验',3,'2026-08-05 01:45:54.867','2026-08-05 01:51:30.956'),(6,'DEMO-ACTIVITY-TEA','演示·桃源擂茶入门','从炒米、磨茶到冲泡，了解擂茶在当地日常饮食中的位置，完成一碗自己的擂茶。',168,198,'/uploads/images/云舍村-村落风景-02.webp','[\"/uploads/images/云舍村-村落风景-02.webp\",\"/uploads/images/云舍村-竹榻书屋.jpg\"]',NULL,NULL,'upload','云舍村茶坊','2026-01-01','2026-12-31',1,12,'茶事体验',10,'2026-08-06 18:39:07.905','2026-08-06 19:01:07.491'),(7,'DEMO-ACTIVITY-EMBROIDERY','演示·桃源绣手作体验','在绣娘指导下完成一枚简洁纹样，认识“有图必有意，有意必吉祥”的民间审美。',198,238,'/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg','[\"/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg\",\"/uploads/images/云舍村-雅室陈设.jpg\"]',NULL,NULL,'upload','云舍村作坊','2026-01-01','2026-12-31',1,8,'传统手艺',11,'2026-08-06 18:39:07.912','2026-08-06 19:01:07.498'),(8,'DEMO-ACTIVITY-FARM','演示·菜园农事半日','跟随村民认识时令蔬菜，完成松土、采摘或浇灌，感受“晨兴理荒秽”的田园日常。',128,158,'/uploads/images/云舍村-稻田耕牛.jpg','[\"/uploads/images/云舍村-稻田耕牛.jpg\",\"/uploads/images/云舍村-稻田鸭群.png\"]',NULL,NULL,'upload','云舍村菜园','2026-01-01','2026-12-31',1,10,'田园农事',12,'2026-08-06 18:39:07.918','2026-08-06 19:01:07.505'),(9,'DEMO-ACTIVITY-BOAT','演示·水岸泛舟夜游','在灯影与树影之间缓慢行舟，观察村落水岸与夜色变化，雨天或水位不适时暂停。',238,268,'/uploads/images/云舍村-水岸泛舟.jpg','[\"/uploads/images/云舍村-水岸泛舟.jpg\",\"/uploads/images/云舍村-泛舟夜景.webp\"]',NULL,NULL,'upload','云舍村水岸','2026-01-01','2026-12-31',1,6,'水岸游历',13,'2026-08-06 18:39:07.948','2026-08-06 19:01:07.510');
/*!40000 ALTER TABLE `Activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ActivityOrder`
--

DROP TABLE IF EXISTS `ActivityOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ActivityOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int NOT NULL,
  `activityId` int DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `quantity` int DEFAULT NULL,
  `totalAmount` double NOT NULL,
  `paidAmount` double DEFAULT NULL,
  `pointDed` int DEFAULT '0',
  `pointMoney` double DEFAULT '0',
  `pointEarned` int DEFAULT '0',
  `contactName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contactPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activityDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTime` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ActivityOrder_orderNo_key` (`orderNo`),
  KEY `ActivityOrder_memberId_fkey` (`memberId`),
  KEY `ActivityOrder_activityId_fkey` (`activityId`),
  CONSTRAINT `ActivityOrder_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ActivityOrder_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ActivityOrder`
--

LOCK TABLES `ActivityOrder` WRITE;
/*!40000 ALTER TABLE `ActivityOrder` DISABLE KEYS */;
INSERT INTO `ActivityOrder` VALUES (2,'cmrak5xkl0002n3ji30ktskc7',2,3,'pending',1,1,NULL,0,0,0,'????','13800000000','2026-12-29',NULL,NULL,NULL,'2026-07-07 11:21:04.053','2026-07-07 11:21:04.053'),(3,'cmsjycuxt0002ww3bd8zpgzvq',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 05:47:59.777','2026-08-08 05:47:59.813'),(4,'cmsjydnw40006ww3b9bbnxviz',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 05:48:37.300','2026-08-08 05:48:37.327'),(5,'cmsjyq6920002d500wb6otgwj',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 05:58:20.966','2026-08-08 05:58:20.991'),(6,'cmsjyt71k00026yj8qj96fp3k',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:00:41.961','2026-08-08 06:00:41.996'),(7,'cmsjyv0ep00066yj8hwqnk9ne',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:02:06.673','2026-08-08 06:02:06.705'),(8,'cmsjz1z5600027fwr5ziz1xnu',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:07:31.627','2026-08-08 06:07:31.665'),(9,'cmsjz77y60002ak9241jpzo54',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:11:36.319','2026-08-08 06:11:36.361'),(10,'cmsjzase50002122pd1wvd8u6',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:14:22.781','2026-08-08 06:14:22.824'),(11,'cmsjzbpa30006122pocqmaonj',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:15:05.404','2026-08-08 06:15:05.443'),(12,'cmsjznkzd000a122po1pyxcd5',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:24:19.706','2026-08-08 06:24:19.747'),(13,'cmsjznvx4000e122pkush6n9u',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:24:33.880','2026-08-08 06:24:33.921'),(14,'cmsk07by7000210mblez4ohxd',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:39:41.120','2026-08-08 06:39:41.166'),(15,'cmsk08i60000610mbqdtvojiz',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:40:35.832','2026-08-08 06:40:35.870'),(16,'cmsk0atzu000a10mb36gqdeh4',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:42:24.474','2026-08-08 06:42:24.510'),(17,'cmsk0cmzj0002jb21vq262zq5',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:43:48.703','2026-08-08 06:43:48.743'),(18,'cmsk0cnxu0006jb21qxlbzahy',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:43:49.938','2026-08-08 06:43:49.981'),(19,'cmsk0fmaa0002yt3n2cjwf5nt',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:46:07.763','2026-08-08 06:46:07.807'),(20,'cmsk0h71f0006yt3n8g17cbfk',2,6,'cancelled',2,336,NULL,0,0,0,'演示联系人','13800138000','2026-08-09','',NULL,NULL,'2026-08-08 06:47:21.315','2026-08-08 06:47:21.360');
/*!40000 ALTER TABLE `ActivityOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES (1,'admin','$2a$10$mkJr0ZJf/G.AFro0wFpgIOpeaDBFnlKl9.jO6vxva87zjXa1wON8.','superadmin','超级管理员','admin@yunshecun.com',1,'2026-08-08 06:47:27.744','2026-06-02 11:17:03.707','2026-08-08 06:47:27.745');
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AfterSalesRequest`
--

DROP TABLE IF EXISTS `AfterSalesRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AfterSalesRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `adminNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refundAmount` double DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AfterSalesRequest`
--

LOCK TABLES `AfterSalesRequest` WRITE;
/*!40000 ALTER TABLE `AfterSalesRequest` DISABLE KEYS */;
INSERT INTO `AfterSalesRequest` VALUES (1,1,'cmq2okjjv00012hysy4u97v7i','商品质量问题','不要了','approved',NULL,NULL,'2026-06-06 18:23:27.571','2026-06-06 18:23:45.784');
/*!40000 ALTER TABLE `AfterSalesRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (59,'桃花源·云舍村','/uploads/images/云舍村-苔藓院落.webp','/pages/scenery/culture-detail','path','1',1,1,NULL,NULL,'2026-08-05 01:51:30.631','2026-08-06 19:01:07.374'),(61,'每个入世的人，都该有一个出世的地方','/uploads/images/云舍村-村落风景-02.webp','/pages/scenery/culture-detail','path','3',1,1,NULL,NULL,'2026-08-05 01:51:30.631','2026-08-06 19:01:07.386'),(62,'归居院落','/uploads/images/云舍村-苔藓院落.webp','/pages/scenery/culture-detail','path','4_ul',1,1,NULL,NULL,'2026-08-05 01:51:30.631','2026-08-06 19:01:07.391'),(63,'村落漫游','/uploads/images/云舍村-村落风景-03.webp','/pages/scenery/culture-detail','path','4_ur1',2,1,NULL,NULL,'2026-08-05 01:51:30.631','2026-08-06 19:01:07.396'),(70,'一座手工营造的村落','/uploads/images/云舍村-村落风景-03.webp','/pages/scenery/culture-detail','path','1',2,1,NULL,NULL,'2026-08-06 15:29:10.074','2026-08-06 19:01:07.380'),(71,'水岸泛舟','/uploads/images/云舍村-泛舟夜景.webp','/pages/scenery/culture-detail','path','4_ur2',3,1,NULL,NULL,'2026-08-06 15:29:10.105','2026-08-06 19:01:07.401'),(72,'溪畔庭园','/uploads/images/云舍村-村落风景-04.webp','/pages/scenery/culture-detail','path','4_dl1',4,1,NULL,NULL,'2026-08-06 15:29:10.112','2026-08-06 19:01:07.407'),(73,'雨后青石板路','/uploads/images/云舍村-村落风景-05.webp','/pages/scenery/culture-detail','path','4_dl2',5,1,NULL,NULL,'2026-08-06 15:29:10.118','2026-08-06 19:01:07.413'),(74,'村居一隅','/uploads/images/云舍村-村落风景-06.webp','/pages/scenery/culture-detail','path','4_dr',6,1,NULL,NULL,'2026-08-06 15:29:10.124','2026-08-06 19:01:07.418'),(75,'庭院夜色','/uploads/images/云舍村-村落风景-07.webp','/pages/scenery/culture-detail','path','5_up',1,1,NULL,NULL,'2026-08-06 15:29:10.130','2026-08-06 19:01:07.423'),(76,'溪畔庭园','/uploads/images/云舍村-村落风景-04.webp','/pages/scenery/culture-detail','path','6_row1',1,1,NULL,NULL,'2026-08-06 15:29:10.136','2026-08-06 19:01:07.428');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Beneficiary`
--

DROP TABLE IF EXISTS `Beneficiary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Beneficiary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `targetId` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Beneficiary_memberId_fkey` (`memberId`),
  KEY `Beneficiary_targetId_fkey` (`targetId`),
  CONSTRAINT `Beneficiary_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Beneficiary_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Beneficiary`
--

LOCK TABLES `Beneficiary` WRITE;
/*!40000 ALTER TABLE `Beneficiary` DISABLE KEYS */;
/*!40000 ALTER TABLE `Beneficiary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatConversation`
--

DROP TABLE IF EXISTS `ChatConversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatConversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `lastMessage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unreadAdmin` int NOT NULL DEFAULT '0',
  `unreadMember` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ChatConversation_memberId_key` (`memberId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatConversation`
--

LOCK TABLES `ChatConversation` WRITE;
/*!40000 ALTER TABLE `ChatConversation` DISABLE KEYS */;
INSERT INTO `ChatConversation` VALUES (1,'e1e855d4-3b99-4e6d-89c8-4c0cbb75428e','用户','https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png','closed','[客服] 6',0,0,'2026-06-06 08:33:41.600','2026-06-07 07:01:23.127'),(3,'9f825402-2c46-498a-9e90-b10c49875226','云舍村家人','','open','[客服] fuck u',0,0,'2026-07-07 12:52:10.942','2026-08-01 04:05:40.306');
/*!40000 ALTER TABLE `ChatConversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatMessage`
--

DROP TABLE IF EXISTS `ChatMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatMessage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversationId` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ChatMessage_conversationId_fkey` (`conversationId`),
  CONSTRAINT `ChatMessage_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `ChatConversation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatMessage`
--

LOCK TABLES `ChatMessage` WRITE;
/*!40000 ALTER TABLE `ChatMessage` DISABLE KEYS */;
INSERT INTO `ChatMessage` VALUES (1,1,'11',0,1,'2026-06-06 08:33:41.606'),(2,1,'你好',1,1,'2026-06-06 08:33:50.600'),(3,1,'有什么可以帮助到您呢？',1,1,'2026-06-06 08:34:01.140'),(4,1,'没有，测试',0,1,'2026-06-06 08:34:06.041'),(5,1,'好的',1,1,'2026-06-06 08:34:12.646'),(6,1,'你好',0,1,'2026-06-06 08:58:08.472'),(7,1,'1111',0,1,'2026-06-06 17:04:21.867'),(8,1,'111',0,1,'2026-06-06 22:58:35.656'),(9,1,'6',1,1,'2026-06-06 22:58:47.760'),(12,3,'123',0,1,'2026-07-07 12:52:10.945'),(13,3,'nih',0,1,'2026-07-31 17:08:53.755'),(14,3,'fuck u',1,1,'2026-07-31 17:09:33.471');
/*!40000 ALTER TABLE `ChatMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContentPage`
--

DROP TABLE IF EXISTS `ContentPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContentPage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ContentPage_pageCode_key` (`pageCode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContentPage`
--

LOCK TABLES `ContentPage` WRITE;
/*!40000 ALTER TABLE `ContentPage` DISABLE KEYS */;
INSERT INTO `ContentPage` VALUES (1,'about_us','关于云舍村','<section><h2>云舍村简介</h2><p>村落是我们最早的家园，是扎在大地上最深的根。</p><p>作为东方村落文明的一种诠释，云舍村秉承着对中华传统文化的尊崇和极具匠心的追寻，致力于保护和传承东方的村落文明。以陶渊明笔下的《桃花源记》与刘禹锡的《陋室铭》为意境，呈现出千百年来历久而弥新的民间工艺与智慧，赋予无尽薪火相传的民间文化遗产以时代价值，使之焕发新生，为当代和未来的造访者再现梦中的世外桃源……</p><p>保护与传承东方村落文明是云舍村的出发点和落脚点，也贯穿了村落营造的全过程。</p><p>项目伊始，云舍人花了两年多的时间，寻艺四方，问俗南北，走访调研了上百个古村落和古民居群，探寻传统村落建筑和园林的历史痕迹，并搜集了大量的古建筑材料。当在报纸上看到因修建水电站，千年托口古镇即将移民搬迁、沉入江底的消息，项目团队随即赶赴古镇，将一万多平米的古青石板、条石、门窗等古建材料花费巨资收集、吊装，从三百多公里外的大山深处运输回村。逢山开路、遇水架桥。云舍人行遍湖南、湖北、江西、四川、贵州等地，搜集、抢救了数以万计的古物件。</p><p>随后聘请数百位全国各地的老匠人，用最精湛的传统技艺纯手工打造村落的每一栋建筑。建造过程中所使用的，百分之九十五以上都是有上百年，甚至数百年历史印记的古建材料，其中包括数万平米的老青石板，数千吨的老条石，以及大批量的古旧门窗、石墩、石柱、石砖等。村内的家具陈设，则由明式家具传承人带队，历时八年，用金丝楠木拆房老料，按一比一的比例纯手工逐件打造而成。</p><p>十五年，五千多个日夜，一个似乎被遗忘了千百年的古村落，如雨后的蘑菇般冒了出来。</p><p>村内六十余栋具有典型湖湘民居特色的院落，掩映于茂林修竹之间。一条长约三公里的青石板路嫁接起整个村子的动脉，构成由北向为主，向东西延伸的村落系统。俯瞰村子全貌，宛如一条泰然自若的蛟龙，静静守望着这片遗落风尘的净土。目前，村落的生活区包括草庐、书屋、射圃、茶坊、戏楼、饭庄、博物苑、作坊、酒肆、菜园、果园等场景。远观，村内的每一栋建筑都与湖湘传统民居一脉相承，如出一辙；近赏，每一个院落又是一步一景，耐人寻味。</p><p>湖湘民居是融入大自然之中的民居形式，是一种人工建筑环境与大自然的完美融合。“虽由人作，宛自天开”。云舍村的一座座院落或隐于青山古树之间，或枕山傍水，或夹溪而筑，有些还有人工开凿的水渠穿村而过，在各家各户门前流过。充满浪漫色彩的同时，又展现出人类对大自然的依恋与敬畏。云舍村巧夺天工的景观排布背后，隐藏着博大精深的风水文化和天人合一的民间智慧。</p><p>村内的每一个细节，看似朴实无华，却常常蕴藏着博大精深的民间智慧。比如说院内的晒谷坪，俗称五合土。制造工艺是先把桐油、石灰、黄土、河砂搅拌均匀，发酵数日之后，再与煮成粥状的糯米混合搅拌均匀，铺平后用石夯夯实，再反复用木缒手工敲打月余后完工。这种传统民间工艺锤炼出来的作品，与现代化的钢筋混凝土截然不同，它们被赋有了独特的生命力，仿佛与周围的人和环境在一起呼吸、生长。</p><p>村内移植进来了大大小小，共一万七千余棵本地树种，在四季风景的交替下如诗如画。菜园子里自种的百余种四季蔬菜和时令瓜果，配上热气腾腾的钵子菜、琳琅满目的擂茶、米粉等特色佳肴，令人流连忘返。</p><p>十三年磨一剑。直到今天，这个“久藏深闺”、集东方村落万般风情于一身的世外桃源才揭开她神秘的面纱，开始迎接一个个“刘子骥”前来探寻。</p><p>这里是华夏先民世代营造的田园梦，这里是文人墨客心驰神往的乌托邦，这里是东方村落文明的缩影……</p><p>云舍村位于湖南省桃源县西南 15 公里的水溪附近，地处古武陵县境内，是陶渊明笔下《桃花源记》所描述的“世外桃源”真迹地。</p><p>踏入村口，交错纵横的青石板道经历千百年风雨沧桑，在雨后熠熠闪光。村内的房屋为全木质穿斗式结构，屋顶呈现出特殊的坡度和形状。作为传统乡村聚落和居住空间的历史遗存，湖湘民居将其时代特征、建筑技艺和民族习俗展现得淋漓尽致。</p><p>走在云舍村，处处是画，步步皆景。苔痕上阶绿，草色入帘青。春生夏长，秋收冬藏，四季流转，景色各异。时间仿佛在这里定格，过往全都尘封一隅，只剩下祥和与宁静。</p><p>一砖一瓦，一木一石，都有根有脉，有因有果。暧暧远人村，依依墟里烟；晨兴理荒秽，带月荷锄归；欢然酌春酒，摘我园中蔬。重温古人隐藏于村落中的诗意与智慧：户庭无尘杂，虚室有余闲，可以调素琴，阅金经。</p><p>世居这里的人们，不断通过艺术升华平凡生活，载之以日常用器，传情以物。桃源工的木雕，有着浓厚的生活印记，折射出民间艺人的娴熟技巧和超凡智慧。“有图必有意，有意必吉祥”。桃源工·青花绣。在云舍村，顿顿都少不了沸腾的钵子菜；擂茶是村民的最爱，也是当地最有名的小吃。</p></section><section><h3>归居之约</h3><p>自打国人心中最柔软和诗意的地方，被陶渊明称作桃花源；一代一代的我们，便有了一份执着的向往和寻找……</p><p>或许，你还没有听说或找到云舍村。这里不是一家奢华的度假酒店，而是一个归居式的传统村落，一个东方村落的共享空间。</p><p>这里没有经理和客人，只有长住与归居的村民。这里没有老板、经理人、服务员，只有村长和常居村民；这里没有度假客人，只有归居村民。</p><p>请别以安缦作比，这里追求的不是奢华，而是让奢华归真返朴；请别以裸心堡作比，这里讲述的不是已经发生的历史，而是那些即将发生的故事。</p><p>请别以你到过的任何酒店作比。云舍村希望让你发现的，不是这里既有的美和好，而是你内心潜在的美和好。</p></section>','cms',1,1,'2026-08-05 01:43:41.948','2026-08-06 19:01:07.268'),(2,'culture_intro','什么是云舍村','{\"heroImage\":\"/uploads/images/云舍村-苔藓院落.webp\",\"image\":\"/uploads/images/云舍村-村落风景-02.webp\",\"title\":\"这里是云舍村\",\"paragraphs\":[\"云舍村位于湖南省桃源县西南水溪附近，是以湖湘传统村落为意境营造的归居式村落。\",\"村内六十余栋院落掩映于茂林修竹之间，青石板路、溪流、园林与传统民居共同构成一处可居、可游、可感知的东方村落空间。\",\"在这里，可以读书、品茶、看戏、体验农事和民间手艺，也可以在四季景色中慢下来，重温村落日常中的诗意与智慧。\"],\"phone\":\"0736-7070666\",\"address\":\"湖南省常德市桃花源风景区\",\"gallery\":[\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-稻田鸭群.png\",\"/uploads/images/云舍村-泛舟夜景.webp\",\"/uploads/images/云舍村-村落风景-02.webp\",\"/uploads/images/云舍村-村落风景-03.webp\",\"/uploads/images/云舍村-村落风景-04.webp\",\"/uploads/images/云舍村-村落风景-05.webp\",\"/uploads/images/云舍村-村落风景-06.webp\",\"/uploads/images/云舍村-村落风景-07.webp\"]}','cms',1,2,'2026-08-05 01:43:41.965','2026-08-06 19:01:07.277'),(3,'faq','常见问题','[{\"id\":\"location\",\"question\":\"云舍村在哪里？\",\"answer\":\"云舍村位于湖南省常德市桃花源风景区，距桃源县城西南约 15 公里。\"},{\"id\":\"booking\",\"question\":\"如何预约到访或住宿？\",\"answer\":\"请在小程序选择日期、房型或体验项目提交预约；如需协助，可致电 <b>0736-7070666</b>。\"},{\"id\":\"experience\",\"question\":\"村内有哪些体验？\",\"answer\":\"村内可体验湖湘民居与园林、茶事与擂茶、桃源绣、村落漫游、泛舟及菜园农事等内容，具体安排以当日确认信息为准。\"},{\"id\":\"arrival\",\"question\":\"到访前需要注意什么？\",\"answer\":\"请按确认时间抵达，并关注天气与舒适步行装备。村内有青石板路，请注意雨天防滑并照看同行儿童。\"},{\"id\":\"service\",\"question\":\"需要人工帮助怎么办？\",\"answer\":\"可通过小程序在线客服留言，或拨打云舍村咨询电话 <b>0736-7070666</b>。\"}]','cms',1,3,'2026-08-05 01:43:41.974','2026-08-06 19:01:07.283'),(4,'member_policy','预约须知','\n  <section><h2>云舍村入住条款及细则</h2><p>云舍村没有消费，只有按时间和空间缴纳的村落维护费。村落维护费包括村内提供的住宿、餐食、茶饮、体验式农耕、传统手工、文艺欣赏、艺术品鉴等诸多项目。</p><h3>预订</h3><ol><li>仅提供入住天数少于 31 天的客房预订。同一入住时间段，每位宾客最多可预订 3 间客房。对于桃花源·云舍村推出的套餐或客房优惠，桃花源·云舍村有权根据相关法律拒绝或接受任何预订或任何参与套餐或优惠的宾客。</li><li>预订时需全额支付相应的村落维护费用。村落维护费不包括超出套餐额度的餐饮费、服务费和其他花费。</li><li>所有价格均以人民币计算。</li><li>桃花源·云舍村保留权利根据市场情况不定时调整客房价格（但不影响已确认的预订下已支付的价格）和/或根据适用税率或其他政府收费的变更而收取额外费用。</li><li>收到订单确认号即代表预订已确认。</li><li>预订的客房和套餐产品内容仅限宾客个人使用，不得转让、转售或用于旅行团、企业活动、营销、推广或其他商业目的。</li><li>若桃花源·云舍村出现失误（包括但不限于房价错误或客房类型错误，若预订已被确认则会与宾客友好协商），或宾客在预订客房时涉及欺诈或欺骗行为（无论预订确认与否），桃花源·云舍村保留取消或修改客房预订的权利。</li></ol></section>\n  <section><h3>取消与变更</h3><ol><li>如需取消预订，须至少于入住日期 00:00 的 48 小时前提交申请，方能获全额退款。如于入住日期 00:00 前的 48 小时内取消预订，则将收取宾客预订时支付的首晚房费（包含服务费和税费）。</li><li>入住日期 00:00 起不得申请取消预订，但若入住当日宾客未办理入住（即未按照预订日期入住酒店），则宾客的预订自动取消，且将收取宾客预订时支付的首晚房费（包含服务费和税费）。一旦办理入住，则预订无法再取消。</li><li>预订变更，包括但不限于入住时长或客房类型变更，视变更时的供应情况而定，且宾客应支付因变更而产生的差价。</li><li>入住和/或退房日期的变更需至少于入住日期 00:00 的 48 小时前进行，且视供应情况、预订优惠条款和市场价格而定。晚于上述时间则不得进行变更。</li><li>酒店前台入住手续需由预订姓名的本人到场办理。已确认的预订不允许更改姓名。</li></ol></section>\n  <section><h3>入住与退房</h3><ol><li>所有入住酒店的宾客（包括儿童）以及入住期间的访客均须持有有效个人身份证明原件（中国内地游客，须携带《中华人民共和国居民身份证》；中国香港、中国澳门地区游客，须携带《港澳居民来往内地通行证》、《中华人民共和国旅行证》或《中华人民共和国港澳居民居住证》；中国台湾地区游客，须携带《台湾居民来往大陆通行证》、《中华人民共和国旅行证》或《中华人民共和国台湾居民居住证》；其他国家及地区游客，须携带有效护照或《中华人民共和国外国人永久居留身份证》）进行登记。每个房间需至少有一位成人宾客入住。</li><li>入住时间最早为当日 09:00，退房时间最晚为当日 15:00。申请推迟退房时间可能需要支付额外费用。入住高峰时段，入住可能会有所延迟。入住高峰期间，请尽早到村并办理入住手续。</li><li>入住后提早退房将不会退还宾客任何费用，除非由桃花源·云舍村认定为特殊情况，可退还部分费用。</li></ol></section>\n  <section><h3>住宿</h3><ol><li>住宿人数不得超过客房最大可入住人数。如仍有空房，可为额外宾客加订房间。</li><li>相邻客房、相连客房或客房位置需要申请，且视入住时的供应情况而定。</li><li>每间客房最多容纳 1 名 17 岁及以下儿童，和成人共用现有床铺。</li><li>客房不提供加床服务，如果入住人数超过客房的可入住人数，则必须增订客房。</li><li>不得携带宠物入住。</li></ol><h3>儿童住宿费用</h3><ul><li>5 岁及以下：使用现有床铺免费；早餐免费。</li><li>6 至 11 岁：使用现有床铺加收人民币 150 元/人/晚；早餐免费。</li><li>12 至 17 岁：使用现有床铺加收人民币 805 元/人/晚；早餐免费。</li></ul></section>\n  <section><h3>其他</h3><ol><li>村内的演出和其他游历项目、服务或事项可能随时变更，且可能随时因重建、翻修、客容量限制、季节变化、恶劣天气、特别活动或其他原因而暂时关闭、更改或中断。</li><li>未使用的游历票或其他套餐内容或特色服务，包括餐食都不予退款。未使用的套餐内容也不能折现。</li><li>其他条款与细则可能适用于特殊或打折优惠或预订。</li><li>宾客应随时看管好其私人财物，并自行为其安全负责。</li><li>此条款和细则可能变更。如法律另有强制性规定，则应以相应法律规定为准。</li></ol><h3>联系我们</h3><p>如需获取预订信息、取消或修改预订，请致电 +86 0736-7070666。</p></section>','cms',1,4,'2026-08-05 01:43:41.983','2026-08-06 19:01:07.289'),(5,'privacy_policy','隐私政策','\n  <section><h2>隐私政策</h2><p>感谢您选择云舍村为您的度假目的地。我们诚挚地致力于为您提供卓越的度假体验。为了确保您的隐私得到最大程度的保护，我们编制了详尽的隐私政策，以便您全面了解我们如何收集、使用、共享和保护您的个人信息。</p></section>\n  <section><h3>信息收集与使用</h3><p>在使用云舍村服务时，我们可能会收集多样化的个人信息，包括但不限于姓名、联系方式、信用卡信息、偏好设置、身份证明文件等。这些信息将用于订单处理、住宿安排、特色活动提供等服务；我们也可能用于市场研究、用户行为分析，以优化服务和满足用户需求。</p><p>为确保服务符合您的期望，我们可能收集房间喜好、餐饮口味等偏好信息，以提供更符合您期望的个性化度假体验。</p></section>\n  <section><h3>信息保护</h3><p>我们采用数据加密、访问控制、网络安全监控等安全措施，保护您的个人信息免受未经授权的访问、使用、披露或破坏。我们定期进行风险评估和安全审查，并开展员工信息安全意识培训。只有在必要业务运作中、经合法授权的工作人员才能访问您的个人信息。</p></section>\n  <section><h3>信息共享与披露</h3><p>我们将您的个人信息视为高度机密。除非经您明确同意或法律法规明文规定，我们不会将个人信息分享给第三方。与合作伙伴的信息共享遵循法律法规，并在明确目的下保障同等水平的信息保护。为提供支付处理、客户支持、市场营销等服务，可能与第三方服务提供商共享必要信息；我们将确保这些服务提供商同样遵循高标准信息保护措施。</p></section>\n  <section><h3>未成年人隐私保护</h3><p>我们的服务主要面向成年人。对于未满 18 岁的未成年人，建议在监护人陪同和同意下使用服务。我们不会故意收集未成年人个人信息；如发现错误收集，将立即删除。</p></section>\n  <section><h3>隐私政策的修改</h3><p>我们可能根据业务发展、技术更新或法规要求修改本政策。发生重大变更时，将通过适当方式通知您，并提供更新后政策链接。</p></section>\n  <section><h3>联系我们</h3><p>如对本政策有疑问、建议或投诉，请致电 +86 0736-7070666。我们将竭力解答，并持续改进隐私政策和数据保护措施。感谢您耐心阅读，云舍村期待与您一同共度世外桃源的美好时光。</p></section>','cms',1,5,'2026-08-05 01:43:41.993','2026-08-06 19:01:07.294');
/*!40000 ALTER TABLE `ContentPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coupon`
--

DROP TABLE IF EXISTS `Coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `couponCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discountAmount` double DEFAULT NULL,
  `discountRate` double DEFAULT NULL,
  `minAmount` double DEFAULT NULL,
  `maxDiscount` double DEFAULT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `totalCount` int DEFAULT NULL,
  `usedCount` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `applicableTo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Coupon_couponCode_key` (`couponCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coupon`
--

LOCK TABLES `Coupon` WRITE;
/*!40000 ALTER TABLE `Coupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `Coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DateInventory`
--

DROP TABLE IF EXISTS `DateInventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DateInventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetId` int NOT NULL,
  `targetCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DateInventory_type_targetId_date_key` (`type`,`targetId`,`date`),
  KEY `DateInventory_type_targetCode_date_idx` (`type`,`targetCode`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DateInventory`
--

LOCK TABLES `DateInventory` WRITE;
/*!40000 ALTER TABLE `DateInventory` DISABLE KEYS */;
INSERT INTO `DateInventory` VALUES (3,'activity',3,'stock-cancel-1783423264013','2026-12-29','2026-12-29',NULL,0,1,NULL,'2026-07-07 11:21:04.020','2026-07-07 11:21:04.052');
/*!40000 ALTER TABLE `DateInventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DiyTripRequest`
--

DROP TABLE IF EXISTS `DiyTripRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DiyTripRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destinations` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persons` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requirements` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `adminNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsePlan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responseImages` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DiyTripRequest`
--

LOCK TABLES `DiyTripRequest` WRITE;
/*!40000 ALTER TABLE `DiyTripRequest` DISABLE KEYS */;
INSERT INTO `DiyTripRequest` VALUES (1,'e1e855d4-3b99-4e6d-89c8-4c0cbb75428e','111111','18588624883','111111','111','111','111','111','1111','111111','done','',NULL,NULL,'2026-06-06 12:45:53.463','2026-06-06 12:46:10.636'),(2,'e1e855d4-3b99-4e6d-89c8-4c0cbb75428e','1111','11521500111','1111','1111','11','11111111','1','1111111','111','done',NULL,'6666','[]','2026-06-06 12:47:39.341','2026-06-06 14:38:14.284'),(3,'e1e855d4-3b99-4e6d-89c8-4c0cbb75428e','444','18588624883','444','444','44','44','44','444','4444','done',NULL,'test','[]','2026-06-06 14:52:46.043','2026-06-06 23:05:11.541');
/*!40000 ALTER TABLE `DiyTripRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GoodsCollection`
--

DROP TABLE IF EXISTS `GoodsCollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GoodsCollection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `GoodsCollection_memberId_fkey` (`memberId`),
  KEY `GoodsCollection_productId_fkey` (`productId`),
  CONSTRAINT `GoodsCollection_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `GoodsCollection_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `ShopProduct` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GoodsCollection`
--

LOCK TABLES `GoodsCollection` WRITE;
/*!40000 ALTER TABLE `GoodsCollection` DISABLE KEYS */;
/*!40000 ALTER TABLE `GoodsCollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Guest`
--

DROP TABLE IF EXISTS `Guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Guest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Guest_memberId_fkey` (`memberId`),
  CONSTRAINT `Guest_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Guest`
--

LOCK TABLES `Guest` WRITE;
/*!40000 ALTER TABLE `Guest` DISABLE KEYS */;
INSERT INTO `Guest` VALUES (1,1,'111','1111','','身份证','11111','11111',NULL,'中国','2026-06-06 14:53:29.230','2026-06-06 14:53:29.230'),(2,1,'111222','222','','身份证','222','2222',NULL,'中国','2026-06-06 14:53:35.548','2026-06-06 14:53:35.548');
/*!40000 ALTER TABLE `Guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hotel`
--

DROP TABLE IF EXISTS `Hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hotel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotelCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hotelGroupCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'YUNSHECUN',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coverImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoThumb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoLinkType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'upload',
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `starLevel` int DEFAULT NULL,
  `facilities` text COLLATE utf8mb4_unicode_ci,
  `checkInTime` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkOutTime` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Hotel_hotelCode_key` (`hotelCode`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hotel`
--

LOCK TABLES `Hotel` WRITE;
/*!40000 ALTER TABLE `Hotel` DISABLE KEYS */;
INSERT INTO `Hotel` VALUES (5,'YSC-TAOYUAN','YUNSHECUN','桃花源·云舍村','湖南省常德市桃花源风景区','桃源县','湖南省','0736-7070666','云舍村以湖湘传统民居为意境，六十余栋院落掩映于茂林修竹之间。到访者可在村落中体验住宿、餐食、茶饮、农事与民间手艺。','/uploads/images/云舍村-苔藓院落.webp','[\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-村落风景-01.webp\",\"/uploads/images/云舍村-村落风景-02.webp\"]',NULL,NULL,'upload',NULL,NULL,5,'[\"传统院落\",\"茶坊\",\"书屋\",\"饭庄\",\"博物苑\",\"菜园\",\"果园\"]','09:00','15:00',0,1,'2026-06-06 22:19:39.159','2026-08-05 01:51:30.671'),(6,'DEMO-HOTEL-YUNSHE','YUNSHECUN','演示·云舍归居客栈','湖南省常德市桃花源风景区云舍村内','常德','湖南','0736-7070666','演示住宿目录，采用湖湘传统民居的木构空间与院落尺度，适合验证酒店列表、房型详情与预订流程。','/uploads/images/云舍村-木构接待厅.jpg','[\"/uploads/images/云舍村-木构接待厅.jpg\",\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-雅室陈设.jpg\",\"/uploads/images/云舍村-竹榻书屋.jpg\"]',NULL,NULL,'upload',NULL,NULL,5,'[\"院落庭院\",\"茶室\",\"书屋\",\"村内接驳\",\"行李寄存\"]','09:00','15:00',1,10,'2026-08-06 18:39:07.878','2026-08-06 19:01:07.451');
/*!40000 ALTER TABLE `Hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotelOrder`
--

DROP TABLE IF EXISTS `HotelOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HotelOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int NOT NULL,
  `hotelId` int DEFAULT NULL,
  `roomTypeId` int DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `checkIn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkOut` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nights` int DEFAULT NULL,
  `rooms` int DEFAULT NULL,
  `totalAmount` double NOT NULL,
  `paidAmount` double DEFAULT NULL,
  `pointDed` int DEFAULT '0',
  `pointMoney` double DEFAULT '0',
  `pointEarned` int DEFAULT '0',
  `guestName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTime` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `HotelOrder_orderNo_key` (`orderNo`),
  KEY `HotelOrder_memberId_fkey` (`memberId`),
  KEY `HotelOrder_hotelId_fkey` (`hotelId`),
  KEY `HotelOrder_roomTypeId_fkey` (`roomTypeId`),
  CONSTRAINT `HotelOrder_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `HotelOrder_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `HotelOrder_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelOrder`
--

LOCK TABLES `HotelOrder` WRITE;
/*!40000 ALTER TABLE `HotelOrder` DISABLE KEYS */;
INSERT INTO `HotelOrder` VALUES (2,'cmrajnpqg00013e3v0cattktr',2,5,5,'pending','2026-07-10','2026-07-11',1,1,999,NULL,0,0,0,'????','13800000000',NULL,NULL,NULL,'2026-07-07 11:06:54.088','2026-07-07 11:06:54.088');
/*!40000 ALTER TABLE `HotelOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotelService`
--

DROP TABLE IF EXISTS `HotelService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HotelService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotelId` int DEFAULT NULL,
  `serviceCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `HotelService_serviceCode_key` (`serviceCode`),
  KEY `HotelService_hotelId_fkey` (`hotelId`),
  CONSTRAINT `HotelService_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelService`
--

LOCK TABLES `HotelService` WRITE;
/*!40000 ALTER TABLE `HotelService` DISABLE KEYS */;
/*!40000 ALTER TABLE `HotelService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvoiceRequest`
--

DROP TABLE IF EXISTS `InvoiceRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InvoiceRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `orderNos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'personal',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `rejectReason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceImages` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adminNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvoiceRequest`
--

LOCK TABLES `InvoiceRequest` WRITE;
/*!40000 ALTER TABLE `InvoiceRequest` DISABLE KEYS */;
INSERT INTO `InvoiceRequest` VALUES (1,1,'[\"cmq2bcx6v00012mgv09z1giyu\",\"cmq29p53s0001jsqv5qhsrqzg\"]','personal','222',NULL,'222222','22222222222',224,'rejected','no','[]','','2026-06-06 14:54:04.830','2026-06-06 14:54:27.515');
/*!40000 ALTER TABLE `InvoiceRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MediaFile`
--

DROP TABLE IF EXISTS `MediaFile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MediaFile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `originalName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mimeType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnailUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `duration` double DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploadedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MediaFile`
--

LOCK TABLES `MediaFile` WRITE;
/*!40000 ALTER TABLE `MediaFile` DISABLE KEYS */;
INSERT INTO `MediaFile` VALUES (36,'709412df-f99b-440b-8351-e57b0068dd0c.jpg','微信图片_20260602221411_789_2.jpg','image','image/jpeg','http://localhost:3000/uploads/images/709412df-f99b-440b-8351-e57b0068dd0c.jpg',NULL,69244,NULL,NULL,NULL,'banner',NULL,'admin','2026-06-06 21:53:02.555','2026-07-29 17:16:36.698'),(45,'a9a5e74e-ba69-4c9a-88b6-9573242963af.jpg','SPA房.jpg','image','image/jpeg','http://localhost:3000/uploads/images/a9a5e74e-ba69-4c9a-88b6-9573242963af.jpg',NULL,40247883,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.444','2026-07-29 17:16:36.698'),(46,'0713b26d-787e-4537-9978-76ef8aac9ec2.jpg','博物苑 (2).jpg','image','image/jpeg','http://localhost:3000/uploads/images/0713b26d-787e-4537-9978-76ef8aac9ec2.jpg',NULL,28859385,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.525','2026-07-29 17:16:36.698'),(47,'fcb7f8dd-8d5a-4ea9-a7b9-43cc3ca987a6.jpg','博物苑内.jpg','image','image/jpeg','http://localhost:3000/uploads/images/fcb7f8dd-8d5a-4ea9-a7b9-43cc3ca987a6.jpg',NULL,29338772,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.599','2026-07-29 17:16:36.698'),(48,'a8ba02e4-9f46-407f-812a-c155d0457864.jpg','菜园.jpg','image','image/jpeg','http://localhost:3000/uploads/images/a8ba02e4-9f46-407f-812a-c155d0457864.jpg',NULL,8391547,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.625','2026-07-29 17:16:36.698'),(49,'b9e0f62a-5fdd-4cbf-b3e9-9074e325ac64.jpg','餐厅.jpg','image','image/jpeg','http://localhost:3000/uploads/images/b9e0f62a-5fdd-4cbf-b3e9-9074e325ac64.jpg',NULL,19473902,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.674','2026-07-29 17:16:36.698'),(50,'9fb14dc0-397e-45a4-a46f-57be8fe42727.jpg','茶山.jpg','image','image/jpeg','http://localhost:3000/uploads/images/9fb14dc0-397e-45a4-a46f-57be8fe42727.jpg',NULL,36799912,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.776','2026-07-29 17:16:36.698'),(51,'7f1620ae-932e-48a4-96f7-3ed54266bbe1.jpg','茶亭.jpg','image','image/jpeg','http://localhost:3000/uploads/images/7f1620ae-932e-48a4-96f7-3ed54266bbe1.jpg',NULL,27674075,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.850','2026-07-29 17:16:36.698'),(52,'deca69dd-40ac-4067-ad4f-c91bcdf6c7ae.jpg','稻田.jpg','image','image/jpeg','http://localhost:3000/uploads/images/deca69dd-40ac-4067-ad4f-c91bcdf6c7ae.jpg',NULL,17290981,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:57.906','2026-07-29 17:16:36.698'),(53,'8d80f25f-d982-442d-ade8-5ae2abf9c78d.jpg','泛舟.jpg','image','image/jpeg','http://localhost:3000/uploads/images/8d80f25f-d982-442d-ade8-5ae2abf9c78d.jpg',NULL,43212425,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.036','2026-07-29 17:16:36.698'),(54,'89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg','非遗-桃源绣.jpg','image','image/jpeg','http://localhost:3000/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg',NULL,33593856,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.126','2026-07-29 17:16:36.698'),(55,'38ae28c6-3422-42f2-a75f-a436b1e9aade.jpg','俯瞰图1.jpg','image','image/jpeg','http://localhost:3000/uploads/images/38ae28c6-3422-42f2-a75f-a436b1e9aade.jpg',NULL,8967684,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.166','2026-07-29 17:16:36.698'),(56,'b6b89ce8-eda5-43d2-acd0-34bc021cb876.jpg','耕牛.jpg','image','image/jpeg','http://localhost:3000/uploads/images/b6b89ce8-eda5-43d2-acd0-34bc021cb876.jpg',NULL,18106249,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.248','2026-07-29 17:16:36.698'),(57,'59bf51aa-c42b-4090-9e9d-530cb7f14095.jpg','古青石板路.jpg','image','image/jpeg','http://localhost:3000/uploads/images/59bf51aa-c42b-4090-9e9d-530cb7f14095.jpg',NULL,56398495,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.465','2026-07-29 17:16:36.698'),(58,'13929223-44d2-4a13-b961-eb4b40f8767e.jpg','接待厅.jpg','image','image/jpeg','http://localhost:3000/uploads/images/13929223-44d2-4a13-b961-eb4b40f8767e.jpg',NULL,14418186,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.510','2026-07-29 17:16:36.698'),(59,'e1b8fc71-823e-42ee-ba24-b4d6a60c2a67.jpg','书屋2.jpg','image','image/jpeg','http://localhost:3000/uploads/images/e1b8fc71-823e-42ee-ba24-b4d6a60c2a67.jpg',NULL,23176507,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.590','2026-07-29 17:16:36.698'),(60,'c8c54615-d0f3-474c-97ce-5f4e3e592543.jpg','水库.jpg','image','image/jpeg','http://localhost:3000/uploads/images/c8c54615-d0f3-474c-97ce-5f4e3e592543.jpg',NULL,34013299,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.722','2026-07-29 17:16:36.698'),(61,'01bb6f1f-ec09-4961-a80c-8ffbd7403c5f.jpg','戏楼.jpg','image','image/jpeg','http://localhost:3000/uploads/images/01bb6f1f-ec09-4961-a80c-8ffbd7403c5f.jpg',NULL,16686867,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.781','2026-07-29 17:16:36.698'),(62,'2d9e6cb6-eb6d-412e-ab52-3d7f0a204cda.jpg','雅室（会议室）.jpg','image','image/jpeg','http://localhost:3000/uploads/images/2d9e6cb6-eb6d-412e-ab52-3d7f0a204cda.jpg',NULL,8007357,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.813','2026-07-29 17:16:36.698'),(63,'a4a40ac5-a3b9-41af-ad63-fd0b0372360f.jpg','竹林.jpg','image','image/jpeg','http://localhost:3000/uploads/images/a4a40ac5-a3b9-41af-ad63-fd0b0372360f.jpg',NULL,20676269,NULL,NULL,NULL,'general',NULL,'admin','2026-06-06 22:14:58.880','2026-07-29 17:16:36.698'),(81,'云舍村-品牌标识.webp','云舍村-品牌标识.webp','image','image/webp','/uploads/images/云舍村-品牌标识.webp',NULL,28614,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(82,'云舍村-苔藓院落.webp','云舍村-苔藓院落.webp','image','image/webp','/uploads/images/云舍村-苔藓院落.webp',NULL,2512888,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(83,'云舍村-村落风景-01.webp','云舍村-村落风景-01.webp','image','image/webp','/uploads/images/云舍村-村落风景-01.webp',NULL,909982,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(84,'云舍村-泛舟夜景.webp','云舍村-泛舟夜景.webp','image','image/webp','/uploads/images/云舍村-泛舟夜景.webp',NULL,956770,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(85,'云舍村-村落风景-02.webp','云舍村-村落风景-02.webp','image','image/webp','/uploads/images/云舍村-村落风景-02.webp',NULL,1744536,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(86,'云舍村-村落风景-03.webp','云舍村-村落风景-03.webp','image','image/webp','/uploads/images/云舍村-村落风景-03.webp',NULL,1663196,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(87,'云舍村-村落风景-04.webp','云舍村-村落风景-04.webp','image','image/webp','/uploads/images/云舍村-村落风景-04.webp',NULL,1850020,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(88,'云舍村-村落风景-05.webp','云舍村-村落风景-05.webp','image','image/webp','/uploads/images/云舍村-村落风景-05.webp',NULL,1743536,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(89,'云舍村-村落风景-06.webp','云舍村-村落风景-06.webp','image','image/webp','/uploads/images/云舍村-村落风景-06.webp',NULL,1132900,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(90,'云舍村-村落风景-07.webp','云舍村-村落风景-07.webp','image','image/webp','/uploads/images/云舍村-村落风景-07.webp',NULL,1056296,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(91,'云舍村-中文品牌标识.png','云舍村-中文品牌标识.png','image','image/webp','/uploads/images/云舍村-中文品牌标识.png',NULL,3100,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(92,'云舍村-预约标识.png','云舍村-预约标识.png','image','image/webp','/uploads/images/云舍村-预约标识.png',NULL,2948,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(93,'云舍村-预约按钮底图.png','云舍村-预约按钮底图.png','image','image/webp','/uploads/images/云舍村-预约按钮底图.png',NULL,1468,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(94,'云舍村-稻田鸭群.png','云舍村-稻田鸭群.png','image','image/webp','/uploads/images/云舍村-稻田鸭群.png',NULL,611330,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(95,'云舍村-儿童住宿费用表.png','云舍村-儿童住宿费用表.png','image','image/webp','/uploads/images/云舍村-儿童住宿费用表.png',NULL,20053,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(96,'云舍村-预约条款背景.png','云舍村-预约条款背景.png','image','image/webp','/uploads/images/云舍村-预约条款背景.png',NULL,54835,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(97,'云舍村-预约页导航背景.png','云舍村-预约页导航背景.png','image','image/webp','/uploads/images/云舍村-预约页导航背景.png',NULL,203345,NULL,NULL,NULL,'云舍村官网素材','云舍村,官网,村落',NULL,'2026-08-05 01:51:31.075','2026-08-05 01:51:31.075'),(98,'云舍村-航拍全景.jpg','村落航拍','image','image/jpeg','/uploads/images/云舍村-航拍全景.jpg',NULL,NULL,NULL,NULL,NULL,'scenery',NULL,NULL,'2026-08-06 18:39:07.632','2026-08-06 19:01:07.202'),(99,'云舍村-稻田耕牛.jpg','稻田耕牛','image','image/jpeg','/uploads/images/云舍村-稻田耕牛.jpg',NULL,NULL,NULL,NULL,NULL,'farming',NULL,NULL,'2026-08-06 18:39:07.643','2026-08-06 19:01:07.213'),(100,'云舍村-青石板古道.jpg','青石板古道','image','image/jpeg','/uploads/images/云舍村-青石板古道.jpg',NULL,NULL,NULL,NULL,NULL,'scenery',NULL,NULL,'2026-08-06 18:39:07.650','2026-08-06 19:01:07.220'),(101,'云舍村-木构接待厅.jpg','木构接待厅','image','image/jpeg','/uploads/images/云舍村-木构接待厅.jpg',NULL,NULL,NULL,NULL,NULL,'hotel',NULL,NULL,'2026-08-06 18:39:07.656','2026-08-06 19:01:07.226'),(102,'云舍村-竹榻书屋.jpg','竹榻书屋','image','image/jpeg','/uploads/images/云舍村-竹榻书屋.jpg',NULL,NULL,NULL,NULL,NULL,'hotel',NULL,NULL,'2026-08-06 18:39:07.663','2026-08-06 19:01:07.234'),(103,'云舍村-水岸泛舟.jpg','水岸泛舟','image','image/jpeg','/uploads/images/云舍村-水岸泛舟.jpg',NULL,NULL,NULL,NULL,NULL,'activity',NULL,NULL,'2026-08-06 18:39:07.669','2026-08-06 19:01:07.241'),(104,'云舍村-古戏楼.jpg','古戏楼','image','image/jpeg','/uploads/images/云舍村-古戏楼.jpg',NULL,NULL,NULL,NULL,NULL,'culture',NULL,NULL,'2026-08-06 18:39:07.675','2026-08-06 19:01:07.247'),(105,'云舍村-雅室陈设.jpg','雅室（会议室）.jpg','image','image/jpeg','/uploads/images/云舍村-雅室陈设.jpg',NULL,NULL,NULL,NULL,NULL,'hotel',NULL,NULL,'2026-08-06 18:39:07.679','2026-08-06 19:01:07.252'),(106,'云舍村-竹林小径.jpg','竹林小径','image','image/jpeg','/uploads/images/云舍村-竹林小径.jpg',NULL,NULL,NULL,NULL,NULL,'scenery',NULL,NULL,'2026-08-06 18:39:07.685','2026-08-06 19:01:07.257'),(107,'云舍村-品牌横幅.jpg','云舍村品牌横幅','image','image/jpeg','/uploads/images/云舍村-品牌横幅.jpg',NULL,NULL,NULL,NULL,NULL,'banner',NULL,NULL,'2026-08-06 18:39:07.693','2026-08-06 19:01:07.263');
/*!40000 ALTER TABLE `MediaFile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberToken` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wechatOpenId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `realName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `birthday` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cardNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cardLevel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '普通会员',
  `points` int NOT NULL DEFAULT '0',
  `balance` double NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Member_memberId_key` (`memberId`),
  UNIQUE KEY `Member_memberToken_key` (`memberToken`),
  UNIQUE KEY `Member_phone_key` (`phone`),
  UNIQUE KEY `Member_wechatOpenId_key` (`wechatOpenId`),
  UNIQUE KEY `Member_cardNo_key` (`cardNo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
INSERT INTO `Member` VALUES (1,'e1e855d4-3b99-4e6d-89c8-4c0cbb75428e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWVtYmVySWQiOiJlMWU4NTVkNC0zYjk5LTRlNmQtODljOC00YzBjYmI3NTQyOGUiLCJwaG9uZSI6bnVsbCwiaWF0IjoxNzgzMTAzODE0LCJleHAiOjE3ODM3MDg2MTR9._q7Mak5LefV1Kjy11kCTZz5JENHHv0DYRGv8z4U7w68',NULL,NULL,'o5OwZ5Hr33R9VkwkD_ryM_-_SAAg','666','https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png',NULL,1,'2026-06-07',NULL,'普通会员',0,0,1,'2026-06-02 13:13:06.327','2026-07-03 18:36:54.393'),(2,'9f825402-2c46-498a-9e90-b10c49875226','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWVtYmVySWQiOiI5ZjgyNTQwMi0yYzQ2LTQ5OGEtOWU5MC1iMTBjNDk4NzUyMjYiLCJwaG9uZSI6bnVsbCwiaWF0IjoxNzg2MTcxNjQxLCJleHAiOjE3ODY3NzY0NDF9.DWJ0yDWGr2OYKQ0hX9gtaGTckCDY8fm9R2XUHGV_bGQ',NULL,NULL,'oGoyM6y3P2FLicNR6fbxjG1zaK2E','云舍村家人',NULL,NULL,NULL,NULL,NULL,'普通会员',0,0,1,'2026-07-07 09:44:46.745','2026-08-08 06:47:21.505');
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MemberCoupon`
--

DROP TABLE IF EXISTS `MemberCoupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MemberCoupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `couponId` int NOT NULL,
  `couponNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `usedAt` datetime(3) DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `MemberCoupon_couponNo_key` (`couponNo`),
  KEY `MemberCoupon_memberId_fkey` (`memberId`),
  KEY `MemberCoupon_couponId_fkey` (`couponId`),
  CONSTRAINT `MemberCoupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MemberCoupon_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MemberCoupon`
--

LOCK TABLES `MemberCoupon` WRITE;
/*!40000 ALTER TABLE `MemberCoupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `MemberCoupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MemberInvoice`
--

DROP TABLE IF EXISTS `MemberInvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MemberInvoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAccount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MemberInvoice_memberId_fkey` (`memberId`),
  CONSTRAINT `MemberInvoice_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MemberInvoice`
--

LOCK TABLES `MemberInvoice` WRITE;
/*!40000 ALTER TABLE `MemberInvoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `MemberInvoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memberId` int DEFAULT NULL,
  `amount` double NOT NULL,
  `originalAmount` double DEFAULT '0',
  `pointDed` int DEFAULT '0',
  `pointMoney` double DEFAULT '0',
  `pointEarned` int DEFAULT '0',
  `method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paidAt` datetime(3) DEFAULT NULL,
  `refundedAt` datetime(3) DEFAULT NULL,
  `refundAmount` double DEFAULT NULL,
  `extra` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Payment_paymentNo_key` (`paymentNo`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,'dbeaf2bf-3424-4c40-9e60-7327af5f90f0','cmq2bcx6v00012mgv09z1giyu','shop',1,112,0,0,0,0,'wechat','refunded','MOCK_1780747961928','2026-06-06 12:12:41.928','2026-06-06 12:17:15.385',112,NULL,'2026-06-06 12:12:41.897','2026-06-06 12:17:15.386'),(2,'4d94f2b6-6d66-4b4c-aa5b-d0828ea9a0b3','cmq2n6xen0001zfkdu8grqtg1','shop',1,11,0,0,0,0,'wechat','refunded','MOCK_1780767837681','2026-06-06 17:43:57.681','2026-06-06 18:24:00.527',11,NULL,'2026-06-06 17:43:57.636','2026-06-06 18:24:00.529'),(3,'965b577c-c146-4183-943f-495c9b955846','cmq2o19p50001zlhyup48h6gw','shop',1,11,0,0,0,0,'wechat','refunded','MOCK_1780769253280','2026-06-06 18:07:33.280','2026-06-06 18:23:59.376',11,NULL,'2026-06-06 18:07:33.246','2026-06-06 18:23:59.378'),(4,'6b964b0c-f4d5-4b60-9a27-54c0844e9c62','cmq2okjjv00012hysy4u97v7i','shop',1,22,0,0,0,0,'wechat','refunded','MOCK_1780770152503','2026-06-06 18:22:32.503','2026-06-06 18:23:57.224',22,NULL,'2026-06-06 18:22:32.477','2026-06-06 18:23:57.226'),(5,'49b7b2f6-51f1-49a6-a2ba-eb758220f0ac','cmq2pnlmx0001wupgv7od36h9','shop',1,112,0,0,0,0,'wechat','refunded','MOCK_1780771974802','2026-06-06 18:52:54.802','2026-06-06 18:53:14.723',112,NULL,'2026-06-06 18:52:54.771','2026-06-06 18:53:14.725'),(6,'dcfe62c9-982d-41e7-bf9b-2e8b24355869','cmq2vykyf0001u7wbskaadppa','shop',1,18,0,0,0,0,'wechat','refunded','MOCK_1780782564829','2026-06-06 21:49:24.829','2026-06-06 23:07:04.300',18,NULL,'2026-06-06 21:49:24.797','2026-06-06 23:07:04.300'),(7,'277600a9-d90d-4910-8b5f-4fca0ef8f345','cmq2yhscw0001vii1sl6ub3zg','shop',1,18,0,0,0,0,'wechat','refunded','MOCK_1780786820112','2026-06-06 23:00:20.112','2026-06-06 23:07:02.578',18,NULL,'2026-06-06 23:00:20.084','2026-06-06 23:07:02.579'),(8,'YSC1783417541653216A88F0','cmragra3z000113r21tf6qc7t','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmragra3z000113r21tf6qc7t\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 09:45:41.655','2026-07-07 09:45:41.655'),(9,'YSC178341755021801C8CE5F','cmragrgq2000313r2on88wpms','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmragrgq2000313r2on88wpms\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 09:45:50.220','2026-07-07 09:45:50.220'),(10,'YSC1783417550837B658619B','cmragrh77000513r29dngcyzy','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmragrh77000513r29dngcyzy\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 09:45:50.839','2026-07-07 09:45:50.839'),(11,'YSC1783417560362FA299FF6','cmragrojv000713r2c3nqf7bx','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmragrojv000713r2c3nqf7bx\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 09:46:00.364','2026-07-07 09:46:00.364'),(12,'YSC1783418505677D8969B2C','cmrahbxyf0001r0oev9rhhbx2','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahbxyf0001r0oev9rhhbx2\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:01:45.679','2026-07-07 10:01:45.679'),(13,'YSC1783418508143DD9CFBF5','cmrahbzv30003r0oeec4o47j3','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahbzv30003r0oeec4o47j3\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:01:48.144','2026-07-07 10:01:48.144'),(14,'YSC178341850906715A851BA','cmrahc0k70005r0oezeo2wmzq','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahc0k70005r0oezeo2wmzq\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:01:49.068','2026-07-07 10:01:49.068'),(15,'YSC178341851005849FB34EF','cmrahc1c90007r0oewzgifrno','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahc1c90007r0oewzgifrno\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:01:50.059','2026-07-07 10:01:50.059'),(16,'YSC17834194531061A9FA00B','cmrahw8zs0001v5bycdqxp6ld','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahw8zs0001v5bycdqxp6ld\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:17:33.109','2026-07-07 10:17:33.109'),(17,'YSC1783419455843A1E332AF','cmrahwb3w0003v5by6m3986e4','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrahwb3w0003v5by6m3986e4\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:17:35.844','2026-07-07 10:17:35.844'),(18,'YSC178342026446824BC3FE9','cmraiddp60001zfzxncvc9vry','travel',2,99,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":0,\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cmraiddp60001zfzxncvc9vry\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":2,\"cardNo\":\"\",\"isDeposit\":false,\"utm_params\":{\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\"},\"money\":99,\"orderNo\":\"cmraiddp60001zfzxncvc9vry\",\"orderType\":\"travel\"}}','2026-07-07 10:31:04.470','2026-07-07 10:31:04.470'),(19,'YSC178342032113913F9DBF8','cmraieurv0003zfzxxkqnrt2b','shop',2,18,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmraieurv0003zfzxxkqnrt2b\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"}}','2026-07-07 10:32:01.140','2026-07-07 10:32:01.140'),(20,'YSC17834225561231CC83F87','cmrajqrbf0001e10q6px9ku5b','hotel',2,999,0,0,0,0,'WECHAT_MINI_APP','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrajqrbf0001e10q6px9ku5b\",\"money\":999,\"payMethod\":\"WECHAT_MINI_APP\",\"openid\":\"dev_openid_test\"}}','2026-07-07 11:09:16.125','2026-07-07 11:09:16.125'),(21,'YSC1783422556145263C45FE','cmrajqrc60003e10q0qp4aj4b','travel',2,1,0,0,0,0,'WECHAT_MINI_APP','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrajqrc60003e10q0qp4aj4b\",\"money\":1,\"payMethod\":\"WECHAT_MINI_APP\",\"openid\":\"dev_openid_test\",\"orderType\":\"travel\"}}','2026-07-07 11:09:16.146','2026-07-07 11:09:16.146'),(22,'YSC1783422556178CB603576','cmrajqrco0005e10qyxnymqaj','shop',2,18,0,0,0,0,'WECHAT_MINI_APP','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrajqrco0005e10qyxnymqaj\",\"money\":18,\"payMethod\":\"WECHAT_MINI_APP\",\"openid\":\"dev_openid_test\",\"orderType\":\"shop\"}}','2026-07-07 11:09:16.179','2026-07-07 11:09:16.179'),(23,'YSC1783426320081793A5977','cmrajnpqg00013e3v0cattktr','hotel',2,999,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":\"云舍村之旅\",\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cmrajnpqg00013e3v0cattktr\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"orderType\":\"hotel\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":\"2\",\"cardNo\":\"\",\"isDeposit\":\"false\",\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\",\"money\":\"999\"}}','2026-07-07 12:12:00.083','2026-07-07 12:12:00.083'),(24,'YSC17834263247095FD1B534','cmrajnpqg00013e3v0cattktr','hotel',2,999,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":\"云舍村之旅\",\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cmrajnpqg00013e3v0cattktr\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"orderType\":\"hotel\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":\"2\",\"cardNo\":\"\",\"isDeposit\":\"false\",\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\",\"money\":\"999\"}}','2026-07-07 12:12:04.710','2026-07-07 12:12:04.710'),(25,'YSC178342632719269238E63','cmrajnpqg00013e3v0cattktr','hotel',2,999,0,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":\"云舍村之旅\",\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cmrajnpqg00013e3v0cattktr\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"orderType\":\"hotel\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":\"2\",\"cardNo\":\"\",\"isDeposit\":\"false\",\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\",\"money\":\"999\"}}','2026-07-07 12:12:07.194','2026-07-07 12:12:07.194'),(30,'YSC17834287905309E832ED5','cmrangdst0001z46dgg1ucizj','shop',2,18,18,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"orderNo\":\"cmrangdst0001z46dgg1ucizj\",\"payMethod\":\"wechat\",\"orderType\":\"shop\"},\"points\":{\"pointDed\":0,\"pointMoney\":0,\"availablePoints\":0}}','2026-07-07 12:53:10.531','2026-07-07 12:53:10.531'),(31,'YSC1785516337915AFF7D36D','cms96boot0002qmhwgcboc045','travel',2,99,99,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":0,\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cms96boot0002qmhwgcboc045\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":2,\"cardNo\":\"\",\"isDeposit\":false,\"utm_params\":{\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\"},\"money\":99,\"orderNo\":\"cms96boot0002qmhwgcboc045\",\"orderType\":\"travel\"},\"points\":{\"pointDed\":0,\"pointMoney\":0,\"availablePoints\":0}}','2026-07-31 16:45:37.916','2026-07-31 16:45:37.916'),(32,'YSC178560860556226A854CE','cmsap92pr0002c65gd9rvmz50','travel',2,2,2,0,0,0,'wechat','pending',NULL,NULL,NULL,NULL,'{\"request\":{\"hotelGroupCode\":\"SONGTSAM\",\"hotelCode\":0,\"payType\":\"WECHAT_MINI_APP\",\"crsNo\":\"cmsap92pr0002c65gd9rvmz50\",\"channel\":\"WECHAT\",\"otaChannel\":\"WECHAT\",\"openid\":\"oGoyM6y3P2FLicNR6fbxjG1zaK2E\",\"pointDed\":\"\",\"moneyDed\":\"\",\"configUuid\":\"\",\"appid\":\"wxc8e2d82494b5b533\",\"componentAppid\":\"\",\"memberId\":\"9f825402-2c46-498a-9e90-b10c49875226\",\"cardId\":2,\"cardNo\":\"\",\"isDeposit\":false,\"utm_params\":{\"utm_campaign\":\"\",\"utm_source\":\"\",\"utm_medium\":\"\",\"utm_content\":\"\",\"utm_term\":\"\"},\"money\":2,\"orderNo\":\"cmsap92pr0002c65gd9rvmz50\",\"orderType\":\"travel\"},\"points\":{\"pointDed\":0,\"pointMoney\":0,\"availablePoints\":0}}','2026-08-01 18:23:25.564','2026-08-01 18:23:25.564');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PointTransaction`
--

DROP TABLE IF EXISTS `PointTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PointTransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `points` int NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `PointTransaction_memberId_fkey` (`memberId`),
  CONSTRAINT `PointTransaction_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PointTransaction`
--

LOCK TABLES `PointTransaction` WRITE;
/*!40000 ALTER TABLE `PointTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `PointTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductReview`
--

DROP TABLE IF EXISTS `ProductReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductReview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `productId` int NOT NULL,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductReview`
--

LOCK TABLES `ProductReview` WRITE;
/*!40000 ALTER TABLE `ProductReview` DISABLE KEYS */;
INSERT INTO `ProductReview` VALUES (1,1,2,'cmq2o19p50001zlhyup48h6gw',3,'还不错吧','[]','匿名用户','https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png','2026-06-06 18:21:40.158'),(2,1,4,'cmq2yhscw0001vii1sl6ub3zg',5,'ok的','[]','666','https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png','2026-06-06 23:03:54.679');
/*!40000 ALTER TABLE `ProductReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoomType`
--

DROP TABLE IF EXISTS `RoomType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RoomType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotelId` int NOT NULL,
  `roomCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `originalPrice` double DEFAULT NULL,
  `area` double DEFAULT NULL,
  `bedType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `amenities` text COLLATE utf8mb4_unicode_ci,
  `stock` int NOT NULL DEFAULT '10',
  `status` int NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `RoomType_hotelId_fkey` (`hotelId`),
  CONSTRAINT `RoomType_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoomType`
--

LOCK TABLES `RoomType` WRITE;
/*!40000 ALTER TABLE `RoomType` DISABLE KEYS */;
INSERT INTO `RoomType` VALUES (5,5,'YSC-COURTYARD','归居院落','以传统湖湘民居为意境的院落住宿空间，适合在村落日常与自然景色中静下来。',888,NULL,45,'大床',2,'[\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-村落风景-01.webp\"]','[\"独立卫浴\",\"茶具\",\"空调\",\"无线网络\"]',8,0,1,'2026-06-06 22:19:51.590','2026-08-05 01:51:30.695'),(6,6,'DEMO-COURTYARD-A','演示·苔藓院落大床房','木构院落中的安静大床房，推窗可见苔痕、树影与青石小径。',980,1180,42,'2米大床',2,'[\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-木构接待厅.jpg\"]','[\"独立卫浴\",\"茶席\",\"院景\"]',8,1,10,'2026-08-06 18:39:07.888','2026-08-06 19:01:07.468'),(7,6,'DEMO-WATERSIDE-B','演示·水岸雅舍双床房','临近水岸的双床房，适合朋友同行或亲子入住。',1180,1380,48,'1.35米双床',3,'[\"/uploads/images/云舍村-水岸泛舟.jpg\",\"/uploads/images/云舍村-雅室陈设.jpg\"]','[\"独立卫浴\",\"水岸景观\",\"茶席\"]',6,1,11,'2026-08-06 18:39:07.895','2026-08-06 19:01:07.474'),(8,6,'DEMO-BAMBOO-C','演示·竹林书屋套房','坐落于竹林边的套房，配有阅读空间与临水休憩区。',1380,1680,65,'2米大床',3,'[\"/uploads/images/云舍村-竹榻书屋.jpg\",\"/uploads/images/云舍村-竹林小径.jpg\",\"/uploads/images/云舍村-青石板古道.jpg\"]','[\"独立卫浴\",\"书桌\",\"竹林景观\",\"茶具\"]',4,1,12,'2026-08-06 18:39:07.901','2026-08-06 19:01:07.482');
/*!40000 ALTER TABLE `RoomType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceOrder`
--

DROP TABLE IF EXISTS `ServiceOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `hotelCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roomNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ServiceOrder_orderNo_key` (`orderNo`),
  KEY `ServiceOrder_serviceId_fkey` (`serviceId`),
  CONSTRAINT `ServiceOrder_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `HotelService` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceOrder`
--

LOCK TABLES `ServiceOrder` WRITE;
/*!40000 ALTER TABLE `ServiceOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `ServiceOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShippingAddress`
--

DROP TABLE IF EXISTS `ShippingAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShippingAddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ShippingAddress_memberId_fkey` (`memberId`),
  CONSTRAINT `ShippingAddress_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShippingAddress`
--

LOCK TABLES `ShippingAddress` WRITE;
/*!40000 ALTER TABLE `ShippingAddress` DISABLE KEYS */;
INSERT INTO `ShippingAddress` VALUES (1,1,'hxs','18588624883','gds','gzs','hpq','1111',1,'2026-06-06 13:26:35.050','2026-06-06 17:05:40.116');
/*!40000 ALTER TABLE `ShippingAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopOrder`
--

DROP TABLE IF EXISTS `ShopOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `totalAmount` double NOT NULL,
  `paidAmount` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `pointDed` int DEFAULT '0',
  `pointMoney` double DEFAULT '0',
  `pointEarned` int DEFAULT '0',
  `shippingFee` double DEFAULT NULL,
  `addressId` int DEFAULT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTime` datetime(3) DEFAULT NULL,
  `trackingNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ShopOrder_orderNo_key` (`orderNo`),
  KEY `ShopOrder_memberId_fkey` (`memberId`),
  CONSTRAINT `ShopOrder_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopOrder`
--

LOCK TABLES `ShopOrder` WRITE;
/*!40000 ALTER TABLE `ShopOrder` DISABLE KEYS */;
INSERT INTO `ShopOrder` VALUES (1,'cmq2774ul00019jej1foz300j',1,'cancelled',112,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:11111111 1111111111111 1111111111111','2026-06-06 10:16:13.388','2026-06-06 18:06:22.436'),(2,'cmq29juz90001kq6i602o7tjh',1,'cancelled',112,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'666','1233 | 收件人:12312 | 电话:18588624883 | 地址:31 33333333333333333 333333333333333333333333333333333333333333','2026-06-06 11:22:06.358','2026-06-06 18:06:22.031'),(3,'cmq29p53s0001jsqv5qhsrqzg',1,'cancelled',112,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'1111111111111111111','收件人:hwf | 电话:18588624883 | 地址:1111 1111111111 11111111','2026-06-06 11:26:12.761','2026-06-06 18:06:21.463'),(4,'cmq2bcx6v00012mgv09z1giyu',1,'cancelled',112,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 12:12:41.931',NULL,'收件人:hwf | 电话:18588624883 | 地址:啊啊啊啊。 aaaa aaa','2026-06-06 12:12:41.863','2026-06-06 18:06:21.041'),(5,'cmq2n6xen0001zfkdu8grqtg1',1,'refunded',11,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 17:43:57.685',NULL,'收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 17:43:57.598','2026-06-06 18:24:00.533'),(6,'cmq2o19p50001zlhyup48h6gw',1,'refunded',11,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 18:07:33.284','1334124344','收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 18:07:33.209','2026-06-06 18:23:59.383'),(7,'cmq2okjjv00012hysy4u97v7i',1,'refunded',22,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 18:22:32.506','13','收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 18:22:32.444','2026-06-06 18:23:57.230'),(8,'cmq2pnlmx0001wupgv7od36h9',1,'refunded',112,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 18:52:54.806',NULL,'收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 18:52:54.729','2026-06-06 18:53:14.729'),(9,'cmq2vykyf0001u7wbskaadppa',1,'refunded',18,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 21:49:24.834',NULL,'收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 21:49:24.760','2026-06-06 23:07:04.303'),(10,'cmq2yhscw0001vii1sl6ub3zg',1,'refunded',18,NULL,NULL,0,0,0,NULL,NULL,NULL,'2026-06-06 23:00:20.116','666','收件人:hxs | 电话:18588624883 | 地址:gds gzs hpq 1111','2026-06-06 23:00:20.048','2026-06-06 23:07:02.584'),(11,'cmragra3z000113r21tf6qc7t',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:111111111111 11111 111111111111','2026-07-07 09:45:41.615','2026-07-07 09:45:41.615'),(12,'cmragrgq2000313r2on88wpms',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:111111111111 11111 111111111111','2026-07-07 09:45:50.187','2026-07-07 09:45:50.187'),(13,'cmragrh77000513r29dngcyzy',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:111111111111 11111 111111111111','2026-07-07 09:45:50.804','2026-07-07 09:45:50.804'),(14,'cmragrojv000713r2c3nqf7bx',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:111111111111 11111 111111111111','2026-07-07 09:46:00.332','2026-07-07 09:46:00.332'),(15,'cmrahbxyf0001r0oev9rhhbx2',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:1111111111111 | 电话:11111111111 | 地址:1111111111111111 111111111111 111111111111','2026-07-07 10:01:45.639','2026-07-07 10:01:45.639'),(16,'cmrahbzv30003r0oeec4o47j3',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:1111111111111 | 电话:11111111111 | 地址:1111111111111111 111111111111 111111111111','2026-07-07 10:01:48.112','2026-07-07 10:01:48.112'),(17,'cmrahc0k70005r0oezeo2wmzq',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:1111111111111 | 电话:11111111111 | 地址:1111111111111111 111111111111 111111111111','2026-07-07 10:01:49.016','2026-07-07 10:01:49.016'),(18,'cmrahc1c90007r0oewzgifrno',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:1111111111111 | 电话:11111111111 | 地址:1111111111111111 111111111111 111111111111','2026-07-07 10:01:50.026','2026-07-07 10:01:50.026'),(19,'cmrahw8zs0001v5bycdqxp6ld',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:1111111111111 111111111 1111111111111','2026-07-07 10:17:33.064','2026-07-07 10:17:33.064'),(20,'cmrahwb3w0003v5by6m3986e4',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:11111 | 电话:11111111111 | 地址:1111111111111 111111111 1111111111111','2026-07-07 10:17:35.804','2026-07-07 10:17:35.804'),(21,'cmraieurv0003zfzxxkqnrt2b',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:111 | 电话:11111111111 | 地址:111111111 111111111111 1111111111111111','2026-07-07 10:32:01.099','2026-07-07 10:32:01.099'),(29,'cmrangdst0001z46dgg1ucizj',2,'pending',18,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,'收件人:111 | 电话:11111111111 | 地址:111111111111 1 1111111','2026-07-07 12:53:10.494','2026-07-07 12:53:10.494');
/*!40000 ALTER TABLE `ShopOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopOrderItem`
--

DROP TABLE IF EXISTS `ShopOrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopOrderItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `skuInfo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ShopOrderItem_orderId_fkey` (`orderId`),
  KEY `ShopOrderItem_productId_fkey` (`productId`),
  CONSTRAINT `ShopOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `ShopOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ShopOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `ShopProduct` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopOrderItem`
--

LOCK TABLES `ShopOrderItem` WRITE;
/*!40000 ALTER TABLE `ShopOrderItem` DISABLE KEYS */;
INSERT INTO `ShopOrderItem` VALUES (1,1,NULL,'测试',112,1,NULL,'2026-06-06 10:16:13.388'),(2,2,NULL,'测试',112,1,NULL,'2026-06-06 11:22:06.358'),(3,3,NULL,'测试',112,1,NULL,'2026-06-06 11:26:12.761'),(4,4,NULL,'测试',112,1,NULL,'2026-06-06 12:12:41.863'),(5,5,NULL,'123',11,1,NULL,'2026-06-06 17:43:57.598'),(6,6,NULL,'123',11,1,NULL,'2026-06-06 18:07:33.209'),(7,7,NULL,'1',22,1,NULL,'2026-06-06 18:22:32.444'),(8,8,NULL,'测试',112,1,NULL,'2026-06-06 18:52:54.729'),(9,9,4,'擂茶',18,1,NULL,'2026-06-06 21:49:24.760'),(10,10,4,'擂茶',18,1,NULL,'2026-06-06 23:00:20.048'),(11,11,4,'擂茶',18,1,NULL,'2026-07-07 09:45:41.615'),(12,12,4,'擂茶',18,1,NULL,'2026-07-07 09:45:50.187'),(13,13,4,'擂茶',18,1,NULL,'2026-07-07 09:45:50.804'),(14,14,4,'擂茶',18,1,NULL,'2026-07-07 09:46:00.332'),(15,15,4,'擂茶',18,1,NULL,'2026-07-07 10:01:45.639'),(16,16,4,'擂茶',18,1,NULL,'2026-07-07 10:01:48.112'),(17,17,4,'擂茶',18,1,NULL,'2026-07-07 10:01:49.016'),(18,18,4,'擂茶',18,1,NULL,'2026-07-07 10:01:50.026'),(19,19,4,'擂茶',18,1,NULL,'2026-07-07 10:17:33.064'),(20,20,4,'擂茶',18,1,NULL,'2026-07-07 10:17:35.804'),(21,21,4,'擂茶',18,1,NULL,'2026-07-07 10:32:01.099'),(24,29,4,'擂茶',18,1,NULL,'2026-07-07 12:53:10.494');
/*!40000 ALTER TABLE `ShopOrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopProduct`
--

DROP TABLE IF EXISTS `ShopProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `originalPrice` double DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `coverImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `skuInfo` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ShopProduct_productCode_key` (`productCode`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopProduct`
--

LOCK TABLES `ShopProduct` WRITE;
/*!40000 ALTER TABLE `ShopProduct` DISABLE KEYS */;
INSERT INTO `ShopProduct` VALUES (4,'cmq2vv6bz0000btihpjg5l7wa','云舍村擂茶体验券','用于预约云舍村擂茶体验，具体使用安排以客服确认信息为准。',88,NULL,99,'/uploads/images/云舍村-村落风景-05.webp','[\"/uploads/images/云舍村-村落风景-05.webp\",\"/uploads/images/云舍村-村落风景-06.webp\"]','村落风物',0,1,'[{\"name\":\"擂茶体验券\",\"price\":88,\"stock\":99}]','2026-06-06 21:46:45.840','2026-08-05 01:51:30.978'),(5,'YSC-EMBROIDERY-GIFT','桃源绣体验券','用于预约云舍村桃源绣体验，具体安排以客服确认信息为准。',88,NULL,99,'/uploads/images/云舍村-村落风景-04.webp','[\"/uploads/images/云舍村-村落风景-04.webp\",\"/uploads/images/云舍村-村落风景-05.webp\"]','村落风物',0,2,'[{\"name\":\"桃源绣体验券\",\"price\":88,\"stock\":99}]','2026-08-05 01:45:54.892','2026-08-05 01:51:30.998'),(6,'DEMO-SHOP-TEA','演示·云舍高山茶礼盒','以茶山风物为灵感的演示茶礼，适合验证商品详情、SKU 与购物车流程。',198,238,80,'/uploads/images/云舍村-村落风景-02.webp','[\"/uploads/images/云舍村-村落风景-02.webp\",\"/uploads/images/云舍村-竹榻书屋.jpg\"]','茶礼',1,10,'[{\"name\":\"规格\",\"values\":[\"演示装 100g\",\"演示装 200g\"]}]','2026-08-06 18:39:07.953','2026-08-06 19:01:07.516'),(7,'DEMO-SHOP-EMBROIDERY','演示·桃源绣手绣方巾','以桃源绣纹样为主题的演示文创小物，图案与寓意来自村落手艺介绍。',128,158,120,'/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg','[\"/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg\",\"/uploads/images/云舍村-雅室陈设.jpg\"]','桃源绣',1,11,'[{\"name\":\"颜色\",\"values\":[\"绛红演示款\",\"靛青演示款\"]}]','2026-08-06 18:39:07.959','2026-08-06 19:01:07.525'),(8,'DEMO-SHOP-RICE','演示·云舍五合土米礼','以村内晒谷坪“五合土”工艺为灵感的演示米礼，内容用于展示商品与订单链路。',88,108,100,'/uploads/images/云舍村-稻田耕牛.jpg','[\"/uploads/images/云舍村-稻田耕牛.jpg\",\"/uploads/images/云舍村-稻田鸭群.png\"]','田园食集',1,12,'[{\"name\":\"规格\",\"values\":[\"演示 1kg\"]}]','2026-08-06 18:39:07.965','2026-08-06 19:01:07.531'),(9,'DEMO-SHOP-BAMBOO','演示·竹编茶席','竹林与茶事场景中的轻巧茶席，适合搭配茶具使用。',158,188,60,'/uploads/images/云舍村-竹林小径.jpg','[\"/uploads/images/云舍村-竹林小径.jpg\",\"/uploads/images/云舍村-竹榻书屋.jpg\"]','茶器',1,13,'[{\"name\":\"尺寸\",\"values\":[\"演示标准款\"]}]','2026-08-06 18:39:07.971','2026-08-06 19:01:07.537');
/*!40000 ALTER TABLE `ShopProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'staff',
  `permissions` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Staff_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `Staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
INSERT INTO `Staff` VALUES (3,'123','$2a$10$fA15H.BtrpfyIh20fKr5juc1TANNJV0T3zLq20f.IDapr01HkkWy6','1','','','staff','[\"travel\",\"hotel\",\"shop\",\"activity\",\"service\",\"coupon\",\"content\",\"member\",\"payment\",\"invoice\",\"diy\",\"aftersales\",\"reviews\",\"chat\",\"departures\"]',1,'2026-06-06 23:06:39.437','2026-06-06 23:06:26.344','2026-06-06 23:06:39.439');
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SysConfig`
--

DROP TABLE IF EXISTS `SysConfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SysConfig` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SysConfig_key_key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SysConfig`
--

LOCK TABLES `SysConfig` WRITE;
/*!40000 ALTER TABLE `SysConfig` DISABLE KEYS */;
INSERT INTO `SysConfig` VALUES (1,'search_hot_words','[\"云舍村\",\"桃花源\",\"湖湘民居\",\"青石板路\",\"擂茶\"]','搜索热词','2026-08-06 19:01:07.339'),(2,'hotel_group_name','桃花源·云舍村','村落名称','2026-08-06 19:01:07.308'),(3,'customer_service_phone','0736-7070666','客服电话','2026-08-06 19:01:07.304'),(4,'points_exchange_rate','100','积分兑换比例（100积分=1元）','2026-06-02 11:17:03.750'),(6,'hotel_group_code','',NULL,'2026-06-03 12:58:28.776'),(7,'sms_api_key','',NULL,'2026-06-03 12:58:28.781'),(8,'wechat_app_id','wxc8e2d82494b5b533','微信小程序 AppID','2026-07-03 17:55:20.706'),(9,'wechat_app_secret','0492f48fc6f12bbf653aa6192a3e6ea1','微信小程序 AppSecret','2026-07-03 17:55:20.711'),(14,'destinations_series','[{\"productSeriesName\":\"桃花源·云舍村\",\"productSeriesCode\":\"taoyuan\"}]','目的地系列','2026-08-06 19:01:07.350'),(15,'cs_wx_corpid','','企业微信CorpId','2026-06-03 12:58:35.221'),(16,'cs_phone','0736-7070666','云舍村咨询电话','2026-08-06 19:01:07.299'),(17,'cs_wx_url','','微信客服URL','2026-06-03 12:58:35.215'),(32,'page_member_right','<p>111</p>','个人中心页面内容','2026-06-06 17:43:07.825'),(33,'page_member_policy','<p>111</p>','个人中心页面内容','2026-06-06 17:43:11.655'),(34,'page_member_benefits','<p>111</p>','个人中心页面内容','2026-06-06 17:43:13.512'),(35,'page_travel_preference','11111111111','个人中心页面内容','2026-06-06 12:14:41.595'),(37,'page_about','11111111111111','个人中心页面内容','2026-06-06 12:14:43.021'),(38,'diy_trip_title','定制云舍村到访体验','定制行程标题','2026-08-06 19:01:07.357'),(39,'diy_trip_content','<p>请告知到访时间、同行人数与偏好；具体安排、可选内容及费用以预约确认信息为准。</p>','定制行程介绍','2026-08-06 19:01:07.363'),(40,'nav_logo_center','/uploads/images/a41bfdfc-2bf0-4946-8bd3-919e8531f339.png','导航栏中间大按钮Logo','2026-07-07 09:11:36.663'),(41,'member_pref_1','{\"season\":\"夏\",\"style\":\"休闲度假\"}',NULL,'2026-06-06 14:51:47.402'),(49,'sms_user','1632129307',NULL,'2026-06-06 19:26:06.942'),(50,'sms_pass','qq1632129307',NULL,'2026-06-06 19:26:06.948'),(51,'sms_sign','',NULL,'2026-06-06 19:26:06.954'),(57,'wxpay_mch_id','1658725419','??????','2026-07-03 17:55:20.715'),(58,'wxpay_serial_no','6DF95C93C8B106F670A488CFD68923139727E8BD','??????','2026-07-03 17:55:20.718'),(59,'wxpay_private_key_path','C:\\Users\\huangweifeng\\Desktop\\单子\\希望没有早八\\证书\\apiclient_key.pem','wechat pay private key path','2026-07-07 08:56:58.171'),(60,'wxpay_api_v3_key','RlnWYFM0LyxelAfBZns8no0XXXWNlIQU','??????','2026-07-03 17:55:20.725'),(65,'wxpay_cert_path','C:\\Users\\huangweifeng\\Desktop\\单子\\希望没有早八\\证书\\apiclient_cert.pem','wechat pay cert path','2026-07-07 08:56:58.176'),(68,'sms_provider','dev',NULL,'2026-07-07 12:01:52.041'),(69,'sms_dev_mode','true',NULL,'2026-07-07 12:01:52.045'),(70,'captcha_provider','local',NULL,'2026-07-07 12:01:52.049'),(71,'captcha_required','true',NULL,'2026-07-07 12:01:52.053'),(81,'captcha_-VLtS1au4FWL3-UaymKK0mQK','{\"code\":\"BSB8\",\"expiresAt\":\"2026-07-07T12:14:19.321Z\"}',NULL,'2026-07-07 12:04:19.324'),(82,'captcha_lsVezimAhzx32enIPkW3bAoN','{\"code\":\"86BU\",\"expiresAt\":\"2026-07-07T12:15:09.379Z\"}',NULL,'2026-07-07 12:05:09.382'),(83,'captcha_hKRLfy8g9EeLXBgLNH305FA_','{\"code\":\"a7iD\",\"expiresAt\":\"2026-07-07T12:15:17.433Z\"}',NULL,'2026-07-07 12:05:17.435'),(84,'captcha_QzpXQZfyhunnfRXP3ldkU9Rv','{\"code\":\"RPdu\",\"expiresAt\":\"2026-07-07T12:15:20.143Z\"}',NULL,'2026-07-07 12:05:20.145'),(85,'captcha_CKVkeWKIbYHpXuV00bYXrKrm','{\"code\":\"p8hH\",\"expiresAt\":\"2026-07-07T12:16:20.373Z\"}',NULL,'2026-07-07 12:06:20.375'),(91,'captcha_afloVQayloPtr1NyV_6IAey4','{\"code\":\"QnGd\",\"expiresAt\":\"2026-07-07T12:52:21.686Z\"}',NULL,'2026-07-07 12:42:21.688'),(92,'captcha_VfS1UfK8hwyVcYHljbGxeC0T','{\"code\":\"VfeV\",\"expiresAt\":\"2026-07-07T13:01:32.018Z\"}',NULL,'2026-07-07 12:51:32.021'),(93,'captcha_WqOKJ6pmY4C8UoEdn5b7fGb-','{\"code\":\"NNCB\",\"expiresAt\":\"2026-07-27T18:25:14.056Z\"}',NULL,'2026-07-27 18:15:14.060'),(94,'captcha_DheImJ8UNM02AaHrMhBVyCpU','{\"code\":\"Ddz4\",\"expiresAt\":\"2026-07-30T15:00:10.117Z\"}',NULL,'2026-07-30 14:50:10.123'),(95,'captcha_ApQeNE7m0Dfh43nmQnkkCQd4','{\"code\":\"bEBg\",\"expiresAt\":\"2026-07-31T16:54:29.979Z\"}',NULL,'2026-07-31 16:44:29.983'),(96,'captcha_aPYJSA9rpeJqv3Ptm_mbrbw-','{\"code\":\"FUnB\",\"expiresAt\":\"2026-07-31T17:18:13.107Z\"}',NULL,'2026-07-31 17:08:13.111'),(97,'captcha_nwGNvYt6-TRObrELSHIlkG1o','{\"code\":\"QRdp\",\"expiresAt\":\"2026-08-01T03:11:47.285Z\"}',NULL,'2026-08-01 03:01:47.289'),(98,'captcha_dQFCK7a_gSt2zJLsWBoNBNS2','{\"code\":\"HwPO\",\"expiresAt\":\"2026-08-01T03:12:17.965Z\"}',NULL,'2026-08-01 03:02:17.968'),(99,'captcha_wHOQIjHYsmqfxasKf1-DGFAI','{\"code\":\"Idr8\",\"expiresAt\":\"2026-08-01T04:10:38.884Z\"}',NULL,'2026-08-01 04:00:38.887'),(100,'captcha_otYvkU1M_4slMgIVYHEvTUwB','{\"code\":\"IYSM\",\"expiresAt\":\"2026-08-01T04:27:19.975Z\"}',NULL,'2026-08-01 04:17:19.978'),(101,'captcha_GkdxHrAFVNK91ktd-Wjp-G4o','{\"code\":\"7IwH\",\"expiresAt\":\"2026-08-01T16:49:38.763Z\"}',NULL,'2026-08-01 16:39:38.768'),(102,'captcha_6HOvwkOyuzC9BFP5pAdVLJe7','{\"code\":\"kMbx\",\"expiresAt\":\"2026-08-01T17:46:03.972Z\"}',NULL,'2026-08-01 17:36:03.976'),(103,'captcha_yjPoPm_4SUhiCym0iaBu660x','{\"code\":\"4iYg\",\"expiresAt\":\"2026-08-01T18:30:33.903Z\"}',NULL,'2026-08-01 18:20:33.907'),(104,'captcha_0ehkCe4ze2RWdl0UtznXeMQQ','{\"code\":\"bMPD\",\"expiresAt\":\"2026-08-02T16:52:31.070Z\"}',NULL,'2026-08-02 16:42:31.075'),(105,'brand_logo','/uploads/images/云舍村-品牌标识.webp','云舍村品牌标识','2026-08-06 19:01:07.312'),(106,'site_address','湖南省常德市桃花源风景区','村落地址','2026-08-06 19:01:07.321'),(107,'site_beian','湘ICP备2023030754号-1','备案信息','2026-08-06 19:01:07.329'),(108,'diy_example_plans','[]','DIY 参考方案','2026-08-06 19:01:07.368'),(109,'captcha_kmMl9tqEr6h9pyaX78mgmGG0','{\"code\":\"8mbS\",\"expiresAt\":\"2026-08-06T17:04:17.888Z\"}',NULL,'2026-08-06 16:54:17.891'),(110,'captcha_kW2TZRFltFxWXIq5urJ1x9or','{\"code\":\"XPP4\",\"expiresAt\":\"2026-08-07T20:21:13.699Z\"}',NULL,'2026-08-07 20:11:13.701'),(111,'captcha_npmPosXoGtldzqABl6dKSa43','{\"code\":\"EFgc\",\"expiresAt\":\"2026-08-08T04:56:30.912Z\"}',NULL,'2026-08-08 04:46:30.916');
/*!40000 ALTER TABLE `SysConfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TravelDeparture`
--

DROP TABLE IF EXISTS `TravelDeparture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TravelDeparture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  `stock` int NOT NULL DEFAULT '10',
  `status` int NOT NULL DEFAULT '1',
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TravelDeparture`
--

LOCK TABLES `TravelDeparture` WRITE;
/*!40000 ALTER TABLE `TravelDeparture` DISABLE KEYS */;
INSERT INTO `TravelDeparture` VALUES (3,8,'cmpxdojdd00026ypz87y03r70','2026-06-01','2026-06-07',22,10,1,'','2026-06-03 10:00:13.516','2026-06-03 10:00:13.516'),(4,9,'cmpy308ao000010n6bl6zapcz','2026-06-01','2026-06-07',666,2,1,'','2026-06-03 13:10:16.148','2026-06-06 08:49:41.018');
/*!40000 ALTER TABLE `TravelDeparture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TravelOrder`
--

DROP TABLE IF EXISTS `TravelOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TravelOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `totalAmount` double NOT NULL,
  `paidAmount` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `pointDed` int DEFAULT '0',
  `pointMoney` double DEFAULT '0',
  `pointEarned` int DEFAULT '0',
  `startDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persons` int DEFAULT NULL,
  `guestInfo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contactName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contactPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancelReason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTime` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TravelOrder_orderNo_key` (`orderNo`),
  KEY `TravelOrder_memberId_fkey` (`memberId`),
  KEY `TravelOrder_productId_fkey` (`productId`),
  CONSTRAINT `TravelOrder_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `TravelOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `TravelProduct` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TravelOrder`
--

LOCK TABLES `TravelOrder` WRITE;
/*!40000 ALTER TABLE `TravelOrder` DISABLE KEYS */;
INSERT INTO `TravelOrder` VALUES (1,'cmpwy4abf0001jxurysukusda',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','11111','11111111111','',NULL,NULL,NULL,'2026-06-02 18:03:13.083','2026-06-06 21:08:10.023'),(2,'cmpwy59nu0003jxur35kureuv',1,NULL,'completed',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','111111','11111111111','',NULL,NULL,NULL,'2026-06-02 18:03:58.891','2026-06-06 21:08:10.023'),(3,'cmpxcs9yp00016xfo6490npqi',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','111','11111111111','',NULL,NULL,NULL,'2026-06-03 00:53:46.994','2026-06-06 21:08:10.023'),(4,'cmpxd7v1k0001ns8snjlakgjc',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','111','11111111111','',NULL,NULL,NULL,'2026-06-03 01:05:54.152','2026-06-06 21:08:10.023'),(5,'cmpxda94n0003ns8swbhtaqbg',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','21111','11111111111','',NULL,NULL,NULL,'2026-06-03 01:07:45.719','2026-06-06 21:08:10.023'),(6,'cmpxdc1sl0005ns8sbdwnjool',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','123','11111111111','',NULL,NULL,NULL,'2026-06-03 01:09:09.525','2026-06-06 21:08:10.023'),(7,'cmpxdnonk00016ypzzd5xueqk',1,NULL,'cancelled',1221,NULL,0,0,0,0,'2026-06-01','2026-06-02',1,'[]','1111','11111111111','',NULL,NULL,NULL,'2026-06-03 01:18:12.369','2026-06-06 21:08:10.023'),(8,'cmpxdq1lc00046ypzjux9lw51',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','123','11111111','',NULL,NULL,NULL,'2026-06-03 01:20:02.449','2026-06-06 21:08:07.639'),(9,'cmpxecb4z00012icn0d5j7w7f',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','123','11111111111','',NULL,NULL,NULL,'2026-06-03 01:37:21.251','2026-06-06 21:08:07.639'),(10,'cmpxf7ozx0001n1vkazkfe9ee',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','123','1233333333','',NULL,NULL,NULL,'2026-06-03 02:01:45.549','2026-06-06 21:08:07.639'),(11,'cmpxh3ssl0001o1a9xc0pjqqg',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','11','111','',NULL,NULL,NULL,'2026-06-03 02:54:43.077','2026-06-06 21:08:07.639'),(12,'cmpxi2wdt0001o4d7pzfwczrh',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','斗文','11111111111','',NULL,NULL,NULL,'2026-06-03 03:22:00.689','2026-06-06 21:08:07.639'),(13,'cmpxuxtdv0001tlijy2ii7zll',1,NULL,'cancelled',22,NULL,0,0,0,0,'2026-06-01','2026-06-01',1,'[]','123','11111111111','',NULL,NULL,NULL,'2026-06-03 09:21:58.531','2026-06-06 21:08:07.639'),(14,'cmpy2tlqv0001iku43wfx1qi4',1,NULL,'cancelled',1233,NULL,0,0,0,0,'2026-06-01','2026-06-13',1,'[]','111','11111111111','',NULL,NULL,NULL,'2026-06-03 13:02:38.934','2026-06-06 21:08:04.861'),(15,'cmq2x7wiy0003nj4yc3nx7e7k',1,14,'cancelled',99,NULL,0,0,0,0,'2026-07-01','2026-07-05',1,'[]','1111111','11111','',NULL,NULL,NULL,'2026-06-06 22:24:39.275','2026-06-06 23:02:57.095'),(16,'cmraiddp60001zfzxncvc9vry',2,14,'pending',99,NULL,0,0,0,0,'2026-07-01','2026-07-05',1,'[]','111','11111111111','',NULL,NULL,NULL,'2026-07-07 10:30:52.314','2026-07-07 10:30:52.314'),(17,'cms96boot0002qmhwgcboc045',2,14,'pending',99,NULL,0,0,0,0,'2026-08-15','2026-08-19',1,'[]','ws','13sd','',NULL,NULL,NULL,'2026-07-31 16:45:34.013','2026-07-31 16:45:34.013'),(18,'cmsap92pr0002c65gd9rvmz50',2,13,'pending',2,NULL,0,0,0,0,'2026-09-15','2026-09-15',2,'[]','sd','sdfsd','',NULL,NULL,NULL,'2026-08-01 18:23:11.103','2026-08-01 18:23:11.103');
/*!40000 ALTER TABLE `TravelOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TravelProduct`
--

DROP TABLE IF EXISTS `TravelProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TravelProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `originalPrice` double DEFAULT NULL,
  `coverImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoThumb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoLinkType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'upload',
  `status` int NOT NULL DEFAULT '1',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destination` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `minPersons` int DEFAULT NULL,
  `maxPersons` int DEFAULT NULL,
  `tags` text COLLATE utf8mb4_unicode_ci,
  `itinerary` text COLLATE utf8mb4_unicode_ci,
  `includes` text COLLATE utf8mb4_unicode_ci,
  `excludes` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TravelProduct_productCode_key` (`productCode`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TravelProduct`
--

LOCK TABLES `TravelProduct` WRITE;
/*!40000 ALTER TABLE `TravelProduct` DISABLE KEYS */;
INSERT INTO `TravelProduct` VALUES (13,'cmq2wu4as0000nj4y7t950s8b','云舍村归居体验','住进湖湘院落，感受村落日常','以村落漫游、院落住宿、茶饮与地方风味为线索，体验云舍村的慢生活。',888,NULL,'/uploads/images/云舍村-苔藓院落.webp','[\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-村落风景-01.webp\",\"/uploads/images/云舍村-村落风景-02.webp\"]',NULL,NULL,'upload',0,'Travel','taoyuan',2,1,8,'[\"归居院落\",\"村落漫游\",\"地方风味\"]','[{\"title\":\"第 1 天\",\"details\":[{\"title\":\"抵达云舍村\",\"content\":\"沿青石板路走进村落，安顿后自由漫游院落与园林。\",\"picture\":\"/uploads/images/云舍村-苔藓院落.webp\"},{\"title\":\"茶事与晚餐\",\"content\":\"体验茶饮与地方风味，感受村落夜色。\",\"picture\":\"/uploads/images/云舍村-村落风景-02.webp\"}]},{\"title\":\"第 2 天\",\"details\":[{\"title\":\"村落晨间\",\"content\":\"在四季景色与村居日常中度过清晨，按确认时间返程。\",\"picture\":\"/uploads/images/云舍村-村落风景-01.webp\"}]}]','[\"村落体验内容以预约确认信息为准\"]','[\"往返交通及未列明的个人消费\"]','请按预约确认信息安排到访；雨天请注意青石板路防滑。',1,'2026-06-06 22:13:56.165','2026-08-05 01:51:30.721'),(14,'cmq2x6uqw0001nj4y9en1n56t','东方村落文化漫游','湖湘民居、民间手艺与自然风景','从传统建筑、园林、茶事到桃源绣和农事，认识云舍村承载的东方村落文明。',888,NULL,'/uploads/images/云舍村-村落风景-03.webp','[\"/uploads/images/云舍村-村落风景-03.webp\",\"/uploads/images/云舍村-村落风景-04.webp\",\"/uploads/images/云舍村-村落风景-05.webp\"]',NULL,NULL,'upload',0,'Travel','taoyuan',1,1,8,'[\"湖湘民居\",\"桃源绣\",\"擂茶\",\"农事体验\"]','[{\"title\":\"村落文化漫游\",\"details\":[{\"title\":\"湖湘民居与园林\",\"content\":\"了解传统院落、青石板路与自然环境相融的村落营造。\",\"picture\":\"/uploads/images/云舍村-村落风景-03.webp\"},{\"title\":\"民间手艺与风味\",\"content\":\"体验桃源绣、擂茶等地方文化内容，具体安排以预约确认信息为准。\",\"picture\":\"/uploads/images/云舍村-村落风景-04.webp\"}]}]','[\"村落体验内容以预约确认信息为准\"]','[\"往返交通及未列明的个人消费\"]','请按预约确认信息安排到访；雨天请注意青石板路防滑。',2,'2026-06-06 22:23:50.313','2026-08-05 01:51:30.753'),(15,'DEMO-TRAVEL-ROOTS-01','演示·村落归居两日体验','湖湘民居、茶事与田园日常','以传统村落为起点，住进木构院落，沿青石板路漫游，体验擂茶、农事与夜间水岸风景。本产品价格仅用于小程序联调展示。',1280,1480,'/uploads/images/云舍村-航拍全景.jpg','[\"/uploads/images/云舍村-航拍全景.jpg\",\"/uploads/images/云舍村-苔藓院落.webp\",\"/uploads/images/云舍村-青石板古道.jpg\",\"/uploads/images/云舍村-水岸泛舟.jpg\"]',NULL,NULL,'upload',1,'DestPackage','taoyuan',2,1,4,'[\"演示数据\",\"归居体验\",\"湖湘民居\"]','[{\"day\":1,\"title\":\"抵达与村落漫游\",\"items\":[\"木构接待厅办理入住\",\"青石板古道与院落漫游\",\"晚间水岸泛舟\"]},{\"day\":2,\"title\":\"田园与手艺\",\"items\":[\"晨间茶事\",\"菜园农事体验\",\"桃源绣手作体验\"]}]','[\"演示住宿 1 晚\",\"村内体验项目组合\",\"基础早餐\"]','[\"往返交通\",\"个人消费\"]','演示套餐，实际可售内容与价格以运营配置为准。',10,'2026-08-06 18:39:07.859','2026-08-06 19:01:07.433'),(16,'DEMO-TRAVEL-CRAFT-02','演示·桃源工艺寻访一日','从古建材料到桃源绣','走访村内博物苑、作坊与戏楼，了解古建材料、木作陈设和桃源绣的日常传承，适合亲子与文化漫游。',680,780,'/uploads/images/云舍村-古戏楼.jpg','[\"/uploads/images/云舍村-古戏楼.jpg\",\"/uploads/images/云舍村-木构接待厅.jpg\",\"/uploads/images/云舍村-雅室陈设.jpg\",\"/uploads/images/89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg\"]',NULL,NULL,'upload',1,'DayActivity','taoyuan',1,1,6,'[\"演示数据\",\"传统手艺\",\"亲子友好\"]','[{\"day\":1,\"title\":\"工艺与村落\",\"items\":[\"博物苑导览\",\"木构建筑细节观察\",\"桃源绣手作体验\",\"古戏楼茶歇\"]}]','[\"演示导览服务\",\"手作材料包\",\"茶歇\"]','[\"住宿\",\"午餐\"]','演示产品，体验时段需提前预约。',11,'2026-08-06 18:39:07.867','2026-08-06 19:01:07.439'),(17,'DEMO-TRAVEL-SEASONS-03','演示·四时田园慢游三日','茶山、菜园与青石板路','用三天时间感受村落四季：茶山晨雾、菜园劳作、竹林散步与溪畔泛舟，留出充分的自由时间回到村民般的日常。',1680,1980,'/uploads/images/云舍村-稻田耕牛.jpg','[\"/uploads/images/云舍村-稻田耕牛.jpg\",\"/uploads/images/云舍村-竹林小径.jpg\",\"/uploads/images/云舍村-青石板古道.jpg\",\"/uploads/images/云舍村-水岸泛舟.jpg\",\"/uploads/images/云舍村-苔藓院落.webp\"]',NULL,NULL,'upload',1,'Travel','taoyuan',3,1,4,'[\"演示数据\",\"田园慢游\",\"三日两晚\"]','[{\"day\":1,\"title\":\"茶山入村\",\"items\":[\"茶山漫步\",\"入住归居院落\",\"溪畔晚餐\"]},{\"day\":2,\"title\":\"村民日常\",\"items\":[\"菜园农事\",\"书屋阅读\",\"擂茶体验\"]},{\"day\":3,\"title\":\"竹林与水岸\",\"items\":[\"竹林小径散步\",\"水岸泛舟\",\"自由返程\"]}]','[\"演示住宿 2 晚\",\"早餐与茶事体验\",\"农事与泛舟体验\"]','[\"往返交通\",\"酒水及个人消费\"]','演示套餐，季节性内容需以当日开放项目为准。',12,'2026-08-06 18:39:07.873','2026-08-06 19:01:07.445');
/*!40000 ALTER TABLE `TravelProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerifyCode`
--

DROP TABLE IF EXISTS `VerifyCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerifyCode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerifyCode`
--

LOCK TABLES `VerifyCode` WRITE;
/*!40000 ALTER TABLE `VerifyCode` DISABLE KEYS */;
INSERT INTO `VerifyCode` VALUES (1,'13800138000','572731',0,'2026-06-02 11:27:22.000','2026-06-02 11:22:22.001'),(2,'18588624883','231227',0,'2026-06-06 18:48:43.206','2026-06-06 18:43:43.207'),(3,'18588624883','237236',0,'2026-06-06 18:51:42.411','2026-06-06 18:46:42.413'),(4,'13250661630','724026',0,'2026-06-06 18:53:33.318','2026-06-06 18:48:33.320'),(5,'18588624883','606923',0,'2026-06-06 19:31:12.317','2026-06-06 19:26:12.319'),(6,'18588624883','586614',0,'2026-06-06 19:35:29.362','2026-06-06 19:30:29.363'),(8,'18588624883','617231',0,'2026-07-07 12:16:13.404','2026-07-07 12:11:13.405');
/*!40000 ALTER TABLE `VerifyCode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'yunshecun_local'
--

--
-- Dumping routines for database 'yunshecun_local'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-09 13:24:10
