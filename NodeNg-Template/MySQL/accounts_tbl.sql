-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 07, 2019 בזמן 09:49 PM
-- גרסת שרת: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bankappdb`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `bank` int(2) NOT NULL,
  `branch` int(3) NOT NULL,
  `acc_num` varchar(20) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `credit` int(11) NOT NULL DEFAULT 30000
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `accounts`
--

INSERT INTO `accounts` (`id`, `bank`, `branch`, `acc_num`, `amount`, `credit`) VALUES
(1, 11, 100, '123123', 5000, 30000),
(2, 12, 200, '456456', 6000, 30000),
(3, 133, 333, '101333', 7333, 33000),
(4, 14, 400, '112233', 8000, 30000),
(6, 15, 500, '136136', 9000, 50000),
(7, 16, 660, '166196', 166000, 60666),
(9, 19, 990, '199999', 19000, 29000),
(10, 22, 220, '1223366', 1200, 20000);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
