-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 07, 2019 בזמן 09:48 PM
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
-- מבנה טבלה עבור טבלה `clients`
--

CREATE TABLE `clients` (
  `rec_id` int(11) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_id` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `clients`
--

INSERT INTO `clients` (`rec_id`, `client_name`, `client_id`, `phone`, `email`, `password`, `account_id`) VALUES
(1, 'avraham first', '0123456789', '0512345678', 'avrmfirst@gmail.com', '54321', 1),
(2, 'yitshak #2 updated', '023456222', '05246835722', 'itsik2@hotmail.com', '12345', 2),
(6, 'yakov #3', '0345678933', '0535792433', 'ykov33@walla.com', '3333', 3),
(7, 'david #4', '045678987', '0544998877', 'dvid@gmail.com', '444', 7),
(8, 'josef', '05678999', '055987654', 'josef@gmail.com', '888', 6),
(22, 'gadi', '1123344', '055998877', 'gadi@gmail.com', '999', 9),
(23, 'roni', '111999', '055999', 'roni@gmail.com', '999', 0);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`rec_id`),
  ADD UNIQUE KEY `client_id` (`client_id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
