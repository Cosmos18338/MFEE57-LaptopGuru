-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-13 07:05:04
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

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
-- 資料表結構 `order_list`
--

CREATE TABLE `order_list` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `order_amount` int(11) NOT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `receiver` varchar(200) DEFAULT NULL,
  `phone` varchar(200) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `already_pay` int(11) NOT NULL DEFAULT 0,
  `create_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `order_list`
--

INSERT INTO `order_list` (`id`, `user_id`, `order_id`, `order_amount`, `coupon_id`, `receiver`, `phone`, `address`, `already_pay`, `create_time`) VALUES
(1, 2, '7a80d1b3-4892-46f6-bfb9-ceaf0e6621c4', 104400, 1, 'test', '0987654321', '台北市大同區民生西路343號345號', 1, '2024-11-13 12:44:58'),
(3, 2, '595c1954-5e4b-4643-9e42-d2e7a74e16bb', 105900, 0, 'test', '0987654321', '台灣台北市中正區八德路１段1號', 0, '2024-11-13 13:39:20'),
(4, 2, '20002a31-1aba-45fb-b615-a8050eefe590', 105900, 0, 'test', '0987654321', '台灣台北市中正區八德路１段1號', 0, '2024-11-13 13:40:59');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
