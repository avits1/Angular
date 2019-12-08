-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 07, 2019 בזמן 09:54 PM
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
-- Database: `userappdb`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `cars`
--

CREATE TABLE `cars` (
  `carID` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `year` int(11) DEFAULT 2019
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `cars`
--

INSERT INTO `cars` (`carID`, `type`, `color`, `year`) VALUES
(1, 'Hyundai 30i', 'grey', 2018),
(2, 'Maserati GT', 'black', 2019),
(3, 'Mazda MX-5', 'yellow', 2017),
(5, 'Mini Cooper Clasic', 'Red & White Stripes', 2020),
(8, 'Ford Focus', 'White', 2016);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`carID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `carID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
