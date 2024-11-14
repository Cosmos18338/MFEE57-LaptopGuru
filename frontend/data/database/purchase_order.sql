-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-14 10:49:26
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
-- 資料表結構 `purchase_order`
--

CREATE TABLE `purchase_order` (
  `id` varchar(255) NOT NULL COMMENT 'UUID',
  `user_id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL COMMENT 'LINE Pay, 信用卡, ATM',
  `shipping` varchar(255) DEFAULT NULL COMMENT '7-11, Family Mart, Hi-Life, OK Mart, 郵局, 宅配',
  `status` varchar(255) DEFAULT NULL COMMENT 'pending, paid, fail, cancel, error',
  `order_info` text DEFAULT NULL COMMENT 'send to line pay',
  `reservation` text DEFAULT NULL COMMENT 'get from line pay',
  `confirm` text DEFAULT NULL COMMENT 'confirm from line pay',
  `return_code` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `purchase_order`
--

INSERT INTO `purchase_order` (`id`, `user_id`, `amount`, `transaction_id`, `payment`, `shipping`, `status`, `order_info`, `reservation`, `confirm`, `return_code`, `created_at`, `updated_at`) VALUES
('0f4a26c0-96d8-428b-bcdd-c48b5d006f12', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"0f4a26c0-96d8-428b-bcdd-c48b5d006f12\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"4900356a-9898-408e-9eb5-b28bf66d8819\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:46:50', '0000-00-00 00:00:00'),
('23ce76ca-ea5c-4e7c-a99f-9fa726de52fd', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"23ce76ca-ea5c-4e7c-a99f-9fa726de52fd\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"abe86f51-0d0b-4ac4-aa9d-a9a973143992\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:40:08', '0000-00-00 00:00:00'),
('2f784354-0d61-490f-bb14-75835b6424f0', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"2f784354-0d61-490f-bb14-75835b6424f0\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"62da7a41-2cec-4a26-afc4-4d714870fc05\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:42:27', '0000-00-00 00:00:00'),
('418dc0ab-420f-42d8-bcd1-7df599b1edd0', 2, 26100, '2024111402236799110', NULL, NULL, 'pending', '{\"orderId\":\"418dc0ab-420f-42d8-bcd1-7df599b1edd0\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"4603aa84-23cf-4e9d-a543-0dc1aabffac1\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', '{\"orderId\":\"418dc0ab-420f-42d8-bcd1-7df599b1edd0\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"4603aa84-23cf-4e9d-a543-0dc1aabffac1\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}},\"returnCode\":\"0000\",\"returnMessage\":\"Success.\",\"transactionId\":\"2024111402236799110\",\"paymentAccessToken\":\"652772550107\"}', NULL, NULL, '2024-11-14 17:25:02', '0000-00-00 00:00:00'),
('444fd60f-3d1e-4d99-8f95-e6beafd36a10', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"444fd60f-3d1e-4d99-8f95-e6beafd36a10\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"f0d71e0c-e746-456e-bd00-0732b613e31a\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:31:13', '0000-00-00 00:00:00'),
('51b07f58-2860-45cd-8aef-563f8cee3d90', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"51b07f58-2860-45cd-8aef-563f8cee3d90\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"f21334eb-81a1-43da-8d7e-349d35237f68\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:32:07', '0000-00-00 00:00:00'),
('7a4852d9-c290-45c4-902f-d20739a27ba6', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"7a4852d9-c290-45c4-902f-d20739a27ba6\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"15e9dc75-c7ba-4d10-8920-80931853b6f7\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:40:38', '0000-00-00 00:00:00'),
('837d5908-de9d-4d9c-a0c7-741ecfb60bb6', 2, 26100, '2024111402236799710', NULL, NULL, 'pending', '{\"orderId\":\"837d5908-de9d-4d9c-a0c7-741ecfb60bb6\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"36d0b21b-0da3-4f4a-a940-6b41fab6d53f\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', '{\"orderId\":\"837d5908-de9d-4d9c-a0c7-741ecfb60bb6\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"36d0b21b-0da3-4f4a-a940-6b41fab6d53f\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}},\"returnCode\":\"0000\",\"returnMessage\":\"Success.\",\"transactionId\":\"2024111402236799710\",\"paymentAccessToken\":\"704114410340\"}', NULL, NULL, '2024-11-14 17:26:15', '0000-00-00 00:00:00'),
('d6f48b15-f7b1-4c65-8479-a31c7613dec6', 2, 26100, NULL, NULL, NULL, 'pending', '{\"orderId\":\"d6f48b15-f7b1-4c65-8479-a31c7613dec6\",\"currency\":\"TWD\",\"amount\":26100,\"packages\":[{\"id\":\"b741c53a-742e-4fc7-902b-bd50075bac6f\",\"amount\":26100,\"products\":[{\"id\":1,\"name\":\"商品總計\",\"quantity\":1,\"price\":25900},{\"id\":2,\"name\":\"運費\",\"quantity\":1,\"price\":200}]}],\"options\":{\"display\":{\"locale\":\"zh_TW\"}}}', NULL, NULL, NULL, '2024-11-14 17:41:16', '0000-00-00 00:00:00');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
