-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 07, 2019 בזמן 09:53 PM
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
-- מבנה טבלה עבור טבלה `jobs`
--

CREATE TABLE `jobs` (
  `jobID` int(11) NOT NULL,
  `carID` int(11) DEFAULT NULL,
  `position` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `salary` int(11) DEFAULT 0,
  `seniority` int(2) DEFAULT 0,
  `start_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `jobs`
--

INSERT INTO `jobs` (`jobID`, `carID`, `position`, `description`, `salary`, `seniority`, `start_date`) VALUES
(1, 1, 'programmer', 'Web Developer', 25000, 5, NULL),
(2, 2, 'CEO', 'Gen. Manager', 50000, 7, NULL),
(3, 3, 'DelMan', 'Delivery Manager', 35000, 9, NULL),
(4, 4, 'Salesman', 'Sales Manager', 28000, 10, NULL),
(5, 5, 'designer', 'UX and UI graphic designer', 28000, 6, '0000-00-00'),
(6, 5, 'Crew Leader', 'Senior Developer and Crew Leader', 33000, 11, '2018-05-01');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`jobID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `jobID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
