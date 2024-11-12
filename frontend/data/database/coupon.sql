-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-11 08:03:56
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `project_db`
--

-- --------------------------------------------------------

--
-- 資料表結構 `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `coupon_content` varchar(200) NOT NULL,
  `discount_method` int(2) NOT NULL,
  `coupon_discount` varchar(200) NOT NULL,
  `coupon_start_time` datetime NOT NULL,
  `coupon_end_time` datetime NOT NULL,
  `valid` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_code`, `coupon_content`, `discount_method`, `coupon_discount`, `coupon_start_time`, `coupon_end_time`, `valid`) VALUES
(1, 'laptop15', '筆電結帳即可折扣1500元', 1, '1500', '2024-08-19 00:00:00', '2024-08-25 00:00:00', 0),
(2, 'count10', '筆電結帳9折', 0, '90', '2024-08-21 00:00:00', '2024-08-29 00:00:00', 0),
(3, '8ievtmqvxzc', '', 1, '500', '2024-08-19 13:23:00', '2024-08-31 13:24:00', 0),
(4, '6egr8d73yoh', '', 0, '80', '2024-08-19 13:29:00', '2024-08-24 13:29:00', 0),
(5, 'o72lbpn5sjq', '', 1, '200', '2024-08-19 14:00:00', '2024-08-31 14:00:00', 1),
(6, 'ls3690qbs3r', '', 0, '10', '2024-08-19 14:02:00', '2024-08-31 14:02:00', 1),
(7, '1lwjl8caz1li', '', 0, '10', '2024-08-29 14:53:00', '2024-08-31 14:53:00', 1),
(8, 's986h6cjf7b', '', 1, '500', '2024-08-07 14:56:00', '2024-08-30 14:56:00', 0),
(9, 'b3mf01x3lb6', '', 0, '80', '2024-08-13 14:57:00', '2024-08-31 14:57:00', 1),
(10, 'e0g6qd7sfhn', '', 1, '800', '2024-08-10 14:57:00', '2024-08-29 14:57:00', 0),
(11, '4eidw05tdge', '', 0, '80', '2024-08-09 14:57:00', '2024-08-31 14:57:00', 0),
(12, 'rjnmmdjc9q', '', 0, '80', '2024-08-19 15:02:00', '2024-08-29 15:02:00', 0),
(13, 'alfpi3gh196', '', 1, '100', '2024-08-22 15:03:00', '2024-08-31 15:03:00', 1),
(14, 'q652opnq1gs', '', 0, '50', '2024-08-23 15:03:00', '2024-08-31 15:03:00', 0),
(15, 'gikrpy74gtn', '', 1, '500', '2024-08-15 15:03:00', '2024-09-03 15:03:00', 0),
(16, 'mcffpdtu50q', '', 0, '20', '2024-08-30 15:03:00', '2024-08-31 15:03:00', 1),
(17, 'dleyelptqgc', '', 1, '500', '2024-08-14 15:27:00', '2024-08-31 15:27:00', 0),
(18, 'b94pvjnkpmi', '', 1, '500', '2024-08-31 15:47:00', '2024-09-30 15:47:00', 0),
(19, 'yb8tn16vg5', '筆電結帳9折', 0, '90', '2024-08-20 16:57:00', '2024-08-31 16:57:00', 0),
(20, '1l8g3xqzjsh', '', 0, '90', '2024-08-22 17:01:00', '2024-09-28 17:01:00', 0),
(21, 'w47e8zre3eo', '筆電結帳9折', 0, '90', '2024-08-31 11:23:00', '2024-10-31 11:23:00', 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
