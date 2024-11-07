-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-04 19:48:52
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
-- 資料表結構 `product_detail_img`
--

CREATE TABLE `product_detail_img` (
  `id` int(10) NOT NULL,
  `img_product_id` int(10) NOT NULL,
  `product_img_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_detail_img`
--

INSERT INTO `product_detail_img` (`id`, `img_product_id`, `product_img_path`) VALUES
(19, 275, 'XPS 14 xps14-9440-d1868sttw-3_1729511767_0.avif'),
(20, 275, 'XPS 14 xps14-9440-d1868sttw-2_1729511767_1.avif'),
(21, 275, 'XPS 14 xps14-9440-d1868sttw-1_1729511767_2.avif'),
(22, 275, 'XPS 14 xps14-9440-d1868sttw_1729511767_3.avif'),
(23, 274, 'XPS 14 xps14-9440-d1868sttw-3_1729511915_0.avif'),
(24, 274, 'XPS 14 xps14-9440-d1868sttw-2_1729511915_1.avif'),
(25, 274, 'XPS 14 xps14-9440-d1868sttw-1_1729511915_2.avif'),
(26, 274, 'XPS 14 xps14-9440-d1868sttw_1729511915_3.avif'),
(31, 272, 'xps-16-3_1729512633_0.avif'),
(32, 272, 'xps-16-2_1729512633_1.avif'),
(33, 272, 'xps-16-1_1729512633_2.avif'),
(34, 272, 'xps-16-0_1729512633_3.avif');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_detail_img`
--
ALTER TABLE `product_detail_img`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_detail_img`
--
ALTER TABLE `product_detail_img`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
