-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-20 13:57:52
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
-- 資料庫： `guru`
--

-- --------------------------------------------------------

--
-- 資料表結構 `event_registration`
--

CREATE TABLE `event_registration` (
  `registration_id` int(5) NOT NULL,
  `event_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL COMMENT '報名者的用戶ID',
  `registration_type` enum('個人','團體') NOT NULL,
  `team_id` int(5) DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  `participant_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '參賽者資訊 JSON格式' CHECK (json_valid(`participant_info`)),
  `registration_status` enum('pending','active','cancelled') NOT NULL DEFAULT 'active',
  `registration_time` datetime NOT NULL DEFAULT current_timestamp(),
  `valid` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `event_registration`
--
ALTER TABLE `event_registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_event_status` (`event_id`,`registration_status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event_registration`
--
ALTER TABLE `event_registration`
  MODIFY `registration_id` int(5) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
