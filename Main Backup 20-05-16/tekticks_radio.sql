-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 20, 2016 at 12:28 PM
-- Server version: 5.6.25-73.1-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tekticks_radio`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctormobilenumber`
--

CREATE TABLE IF NOT EXISTS `doctormobilenumber` (
  `doctorId` varchar(11) NOT NULL,
  `mobileNumber` text NOT NULL,
  `alterMobile1` varchar(10) NOT NULL,
  `alterMobile2` varchar(10) NOT NULL,
  `flag` int(11) NOT NULL DEFAULT '0',
  `statusDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctormobilenumber`
--

INSERT INTO `doctormobilenumber` (`doctorId`, `mobileNumber`, `alterMobile1`, `alterMobile2`, `flag`, `statusDate`) VALUES
('120', '-', '9820223174', '', 0, NULL),
('22', '-', '8108756911', '', 0, NULL),
('37', '', '9870025736', '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loginDetails`
--

CREATE TABLE IF NOT EXISTS `loginDetails` (
  `mobileNo` text NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `loginDetails`
--

INSERT INTO `loginDetails` (`mobileNo`, `createdOn`) VALUES
('9820223174', '2016-05-04 07:57:09'),
('9820223174', '2016-05-04 07:57:54'),
('9820223174', '2016-05-04 07:59:13'),
('8108756911', '2016-05-07 03:33:00'),
('8108756911', '2016-05-09 12:25:11'),
('8108756911', '2016-05-09 12:29:00'),
('8108756911', '2016-05-09 01:35:50'),
('8108756911', '2016-05-09 01:37:33'),
('8108756911', '2016-05-09 01:39:38'),
('8108756911', '2016-05-09 01:40:23'),
('8108756911', '2016-05-09 01:41:07'),
('8108756911', '2016-05-09 01:43:53'),
('8108756911', '2016-05-09 01:44:58'),
('8149662817', '2016-05-09 01:47:34'),
('8149662817', '2016-05-09 01:51:13'),
('8149662817', '2016-05-09 01:51:42'),
('8108756911', '2016-05-09 02:02:19'),
('8108756911', '2016-05-09 02:13:41'),
('9870025736', '2016-05-09 03:18:28'),
('9870025736', '2016-05-09 03:19:21'),
('8149662817', '2016-05-09 03:20:07'),
('8149662817', '2016-05-09 03:20:54'),
('8149662817', '2016-05-09 04:43:00'),
('8108756911', '2016-05-10 02:04:18'),
('8108756911', '2016-05-10 02:11:55'),
('9987529999', '2016-05-10 03:20:34'),
('9987529999', '2016-05-10 03:23:59'),
('9987529999', '2016-05-10 03:26:18'),
('9987529999', '2016-05-10 03:27:10'),
('8108756911', '2016-05-10 03:42:42'),
('8108756911', '2016-05-10 03:43:06'),
('8108756911', '2016-05-10 06:10:47'),
('8149662817', '2016-05-10 06:11:49'),
('8149662817', '2016-05-10 06:13:15'),
('8108756911', '2016-05-11 01:00:47');

-- --------------------------------------------------------

--
-- Table structure for table `serverlocation`
--

CREATE TABLE IF NOT EXISTS `serverlocation` (
  `locationId` int(11) NOT NULL AUTO_INCREMENT,
  `deviceId` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `servertransactions`
--

CREATE TABLE IF NOT EXISTS `servertransactions` (
  `pt_transaction` int(100) NOT NULL,
  `flag` varchar(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
