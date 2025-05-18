-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2025 at 10:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcakeshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblingredient`
--

CREATE TABLE `tblingredient` (
  `id` int(11) NOT NULL,
  `ingredientname` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblingredient`
--

INSERT INTO `tblingredient` (`id`, `ingredientname`, `stock`) VALUES
(1, 'egg', 300);

-- --------------------------------------------------------

--
-- Table structure for table `tbllogin`
--

CREATE TABLE `tbllogin` (
  `LoginID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `userlevel` varchar(100) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbllogin`
--

INSERT INTO `tbllogin` (`LoginID`, `Username`, `Password`, `fullname`, `userlevel`, `access_token`, `last_login`) VALUES
(1, 'test', 'test', 'test', 'schema admin', 'test', '2025-05-17 13:47:59'),
(2, 'admin', '$2b$10$TxD4Nkv60VFhJAqlGKbaXu01g9KDFwdeS9PWWggzW4R4CmRRGXfgC', 'Johnberth Urgello', 'schema admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJOYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDc1NDc3OTEsImV4cCI6MTc0NzYzNDE5MX0.DFWTaYDsxDtKG432C3pvKAQZNdc70zdGWmV0qlyCtcw', '2025-05-18 13:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduct`
--

CREATE TABLE `tblproduct` (
  `id` int(11) NOT NULL,
  `pname` varchar(255) NOT NULL,
  `pprice` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `ptype` varchar(100) DEFAULT NULL,
  `pexpiry` date DEFAULT NULL,
  `picturepath` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblproduct`
--

INSERT INTO `tblproduct` (`id`, `pname`, `pprice`, `stock`, `ptype`, `pexpiry`, `picturepath`) VALUES
(3, 'Star Bread', 5.00, 138, 'Bread', '2025-05-28', 'https://i.ytimg.com/vi/6GPs4GOb-yw/maxresdefault.jpg'),
(4, 'Pandesal', 2.00, 141, 'Bread', '2025-05-24', 'https://assets.tastemadecdn.net/images/2500b0/88b2df481e91c5531a6e/6797b8.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbltransactiondtl`
--

CREATE TABLE `tbltransactiondtl` (
  `id` int(11) NOT NULL,
  `transaction_link_id` int(11) DEFAULT NULL,
  `prodid` int(11) DEFAULT NULL,
  `prodprice` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbltransactiondtl`
--

INSERT INTO `tbltransactiondtl` (`id`, `transaction_link_id`, `prodid`, `prodprice`, `quantity`) VALUES
(2, 8, 3, 5.00, 2),
(3, 8, 4, 2.00, 2),
(4, 9, 3, 5.00, 3),
(5, 10, 3, 5.00, 2),
(6, 10, 4, 2.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbltransactionhdr`
--

CREATE TABLE `tbltransactionhdr` (
  `transactionID` int(11) NOT NULL,
  `date` date DEFAULT current_timestamp(),
  `time` time DEFAULT current_timestamp(),
  `transactiontotal` decimal(10,2) DEFAULT NULL,
  `transactiontype` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbltransactionhdr`
--

INSERT INTO `tbltransactionhdr` (`transactionID`, `date`, `time`, `transactiontotal`, `transactiontype`) VALUES
(8, '2025-05-17', '14:31:28', 14.00, 'CASH'),
(9, '2025-05-18', '14:35:10', 15.00, 'CASH'),
(10, '2025-05-18', '15:55:33', 14.00, 'CASH');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblingredient`
--
ALTER TABLE `tblingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbllogin`
--
ALTER TABLE `tbllogin`
  ADD PRIMARY KEY (`LoginID`);

--
-- Indexes for table `tblproduct`
--
ALTER TABLE `tblproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbltransactiondtl`
--
ALTER TABLE `tbltransactiondtl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction-link-id` (`transaction_link_id`),
  ADD KEY `prodid` (`prodid`);

--
-- Indexes for table `tbltransactionhdr`
--
ALTER TABLE `tbltransactionhdr`
  ADD PRIMARY KEY (`transactionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblingredient`
--
ALTER TABLE `tblingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbllogin`
--
ALTER TABLE `tbllogin`
  MODIFY `LoginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblproduct`
--
ALTER TABLE `tblproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbltransactiondtl`
--
ALTER TABLE `tbltransactiondtl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbltransactionhdr`
--
ALTER TABLE `tbltransactionhdr`
  MODIFY `transactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbltransactiondtl`
--
ALTER TABLE `tbltransactiondtl`
  ADD CONSTRAINT `tbltransactiondtl_ibfk_1` FOREIGN KEY (`transaction_link_id`) REFERENCES `tbltransactionhdr` (`transactionID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbltransactiondtl_ibfk_2` FOREIGN KEY (`prodid`) REFERENCES `tblproduct` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
