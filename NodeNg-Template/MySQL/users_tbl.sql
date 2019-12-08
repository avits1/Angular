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
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `jobID` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `age` int(3) NOT NULL DEFAULT 0,
  `phone` varchar(15) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userID`, `jobID`, `name`, `age`, `phone`, `username`, `password`) VALUES
(1, 1, 'avraham', 40, '0544667788', 'avrahamt', '123456'),
(2, 2, 'saar', 38, '0505112233', 'saarafota', '234567'),
(3, 3, 'reuven', 45, '05223344', 'reuven', '345678'),
(4, 6, 'shimon', 51, '053344677', 'shimon', '567890'),
(6, 0, 'yehuda', 35, '056785423', 'yehudak', '665544'),
(9, 1, 'moshe', 25, '056789654', '', ''),
(11, 4, 'moti', 40, '05356598', '', ''),
(14, 4, 'Levi', 33, '050887799', '', '');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
