-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 08, 2019 בזמן 09:02 PM
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
-- Database: `prodappdb`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products`
--

CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `catalog_num` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `products`
--

INSERT INTO `products` (`prod_id`, `name`, `price`, `weight`, `color`, `catalog_num`) VALUES
(1, 'desk lamp flexiblre led', 99.5, 250, 'silver', 'DL002SLV'),
(2, 'wall led clock chargeable', 70, 150, 'grey', 'WCLK088-19'),
(3, 'winter men garment pockets', 101, 300, 'dark blue', 'GGWP98-02'),
(4, 'handwatch leather loop', 5.6, 20, 'black', 'WLBLT-05B'),
(5, 'jedi knight men shirt purim Custom special', 75, 220, 'white/brown light', 'JD-CST-006-007'),
(8, 'Big winter Boots', 70.7, 2.5, 'black', 'tt77');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`),
  ADD UNIQUE KEY `catalog_num` (`catalog_num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
