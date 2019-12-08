-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 07, 2019 בזמן 09:55 PM
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
-- מבנה טבלה עבור טבלה `users_to_jobs`
--

CREATE TABLE `users_to_jobs` (
  `user_job_id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `jobID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `users_to_jobs`
--

INSERT INTO `users_to_jobs` (`user_job_id`, `userID`, `jobID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 6, 4);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `users_to_jobs`
--
ALTER TABLE `users_to_jobs`
  ADD PRIMARY KEY (`user_job_id`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users_to_jobs`
--
ALTER TABLE `users_to_jobs`
  MODIFY `user_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
