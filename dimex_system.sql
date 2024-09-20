-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2024 at 05:05 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dimex_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `creditpurchase`
--

CREATE TABLE `creditpurchase` (
  `id` int(6) NOT NULL,
  `sup_name` varchar(100) NOT NULL,
  `purchase_date` varchar(20) NOT NULL,
  `credit_period` varchar(20) NOT NULL,
  `end_date` varchar(20) NOT NULL,
  `credit_amount` varchar(50) NOT NULL,
  `credit_status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `creditpurchase`
--

INSERT INTO `creditpurchase` (`id`, `sup_name`, `purchase_date`, `credit_period`, `end_date`, `credit_amount`, `credit_status`) VALUES
(3, 'A & R Enterprises', '2024-08-17', '30', '2024-09-16', '2000', 'Completed'),
(5, 'Damith Silva', '2024-08-17', '15', '2024-09-01', '200', 'Not Completed'),
(6, 'Damith Silva', '2024-08-17', '15', '2024-09-01', '200', 'Completed'),
(8, 'chamuditha', '2024-08-17', '11', '2024-08-28', '1000', 'Completed'),
(9, 'chamuditha', '2024-08-17', '10', '2024-08-27', '1200', 'Not Completed'),
(10, 'Shavin', '2024-08-17', '20', '2024-09-06', '5000', 'Not Completed'),
(11, 'A & R Enterprises', '2024-08-21', '11', '2024-09-01', '2000', 'Not Completed'),
(12, 'chamuditha', '2024-08-21', '20', '2024-09-10', '3000', 'Not Completed'),
(13, 'Shavin', '2024-08-22', '25', '2024-09-16', '5000', 'Completed'),
(16, 'A & R Enterprises', '2024-08-24', '3', '2024-08-27', '3000', 'Not Completed');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(6) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_category` varchar(100) NOT NULL,
  `customer_date` varchar(50) NOT NULL,
  `customer_phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_name`, `customer_category`, `customer_date`, `customer_phone`) VALUES
(3, 'Sadun s', 'Solar', '2024-04-10', '0786221100'),
(4, 'Sadun', 'Solar', '2024-04-08', '0786221100'),
(11, 'Dimuthu', 'BIR-9803', '2024-07-19', '0775206259');

-- --------------------------------------------------------

--
-- Table structure for table `damageitem`
--

CREATE TABLE `damageitem` (
  `id` int(10) NOT NULL,
  `item_code` varchar(100) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `sup_name` varchar(100) NOT NULL,
  `sell_date` varchar(30) NOT NULL,
  `sell_time` varchar(30) NOT NULL,
  `item_qty` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `damageitem`
--

INSERT INTO `damageitem` (`id`, `item_code`, `item_name`, `sup_name`, `sell_date`, `sell_time`, `item_qty`) VALUES
(2, 'DX138', 'PI67', 'Damith Silva', '2024-08-20', '10:19 PM', '1'),
(3, 'DX157', 'Ladies', 'Damith Silva', '2024-08-20', '10:57 PM', '10'),
(6, 'DX138', 'PI67', 'A & R Enterprises', '2024-08-21', '02:18 PM', '8');

-- --------------------------------------------------------

--
-- Table structure for table `itemcategorys`
--

CREATE TABLE `itemcategorys` (
  `id` int(6) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `category_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemcategorys`
--

INSERT INTO `itemcategorys` (`id`, `item_category`, `category_date`) VALUES
(1, 'Helmet', '2024-04-10'),
(2, 'LED', '2024-03-09'),
(3, 'Rim Cup', '2024-05-02'),
(4, 'Japan Half Helmet', '2024-05-14'),
(5, 'CT 100 - Cable', '2024-08-02'),
(6, 'Body Parts', '2024-08-16');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(6) NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `marked_price` varchar(20) NOT NULL,
  `sell_price` varchar(20) NOT NULL,
  `item_qty` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_code`, `item_category`, `item_name`, `marked_price`, `sell_price`, `item_qty`) VALUES
(36, 'DX134', 'Helmet', 'Full face', '6000', '5000', '16'),
(37, 'DX138', 'LED', 'PI67', '3500', '3000', '110'),
(38, 'DX143', 'Rim Cup', 'Nikel', '3400', '3000', '8'),
(39, 'DX148', 'Rim Cup', 'Nikel 2', '4000', '3500', '19'),
(40, 'DX157', 'Helmet', 'Ladies', '2650', '2300', '1660'),
(41, 'DX168', 'Helmet', 'Bola Helmet', '3300', '3000', '14'),
(42, 'DX180', 'Japan Half Helmet', 'Half helmet', '6200', '6000', '38'),
(43, 'DX151', 'Helmet', 'Shako', '4250', '4000', '10'),
(44, 'DX191', 'Helmet', 'Action', '3450', '3000', '8'),
(45, 'DX204', 'Helmet', 'Cap Helmet', '4650', '4300', '40'),
(46, 'DX211', 'Rim Cup', 'Plastic', '750', '700', '22'),
(56, 'DX330', 'CT 100 - Cable', 'Brake Front', '950', '850', '10'),
(57, 'DX351', 'CT 100 - Cable', 'Acc Cable - Genuine', '1250', '1000', '10'),
(58, 'DX376', 'CT 100 - Cable', 'Brake Cable - Genuine', '1100', '950', '10'),
(59, 'DX386', 'Body Parts', 'mudguard', '4300', '4000', '8'),
(60, 'DX398', 'Body Parts', 'Dio Noise', '7700', '7000', ''),
(61, 'DX402', 'Body Parts', 'Mask', '4400', '4000', '15'),
(62, 'HD0416', 'Body Parts', 'Silencer Guard', '550', '500', '4'),
(63, 'HD0423', 'Rim Cup', 'Red Cup', '750', '700', ''),
(64, 'HD0456', 'Helmet', 'Bubble Helmet - Black ', '6500', '6000', '');

-- --------------------------------------------------------

--
-- Table structure for table `profits`
--

CREATE TABLE `profits` (
  `id` int(6) NOT NULL,
  `profit_date` varchar(20) NOT NULL,
  `total_profit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(6) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `purchase_date` varchar(20) NOT NULL,
  `unit_price` varchar(20) NOT NULL,
  `purchase_qty` varchar(10) NOT NULL,
  `total_amount` varchar(20) NOT NULL,
  `sup_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `item_category`, `item_name`, `item_code`, `purchase_date`, `unit_price`, `purchase_qty`, `total_amount`, `sup_name`) VALUES
(13, 'LED', 'PI160', 'DX011', '2024-07-18', '700', '4', '2800.00', 'Damith Silva'),
(15, 'Helmet', 'Ladies', 'DX157', '2024-07-20', '1500', '5', '7500.00', 'Dimuthu'),
(16, 'Helmet', 'Full face', 'DX134', '2024-07-20', '4000', '5', '20000.00', 'Dimuthu'),
(17, 'Helmet', 'Ladies', 'DX157', '2024-07-20', '1750', '10', '17500.00', 'Shavin'),
(18, 'LED', 'PI67', 'DX138', '2024-07-23', '2400', '10', '24000.00', 'A & R Enterprises'),
(19, 'LED', 'PI67', 'DX138', '2024-07-23', '2200', '5', '11000.00', 'Damith Silva'),
(20, 'LED', 'PI67', 'DX138', '2024-07-23', '2000', '10', '20000.00', 'Dimuthu'),
(21, 'Helmet', 'Bola Helmet', 'DX168', '2024-07-23', '1950', '6', '11700.00', 'A & R Enterprises'),
(22, 'LED', 'PI67', 'DX138', '2024-07-27', '3000', '10', '30000.00', 'Damith Silva'),
(23, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-01', '3000', '5', '15000.00', 'Damith Silva'),
(24, 'Helmet', 'Bola Helmet', 'DX168', '2024-08-01', '1950', '6', '11700.00', 'Dimuthu'),
(27, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-02', '3000', '5', '15000.00', 'Dimuthu'),
(28, 'Helmet', 'Bola Helmet', 'DX168', '2024-08-02', '1900', '5', '9500.00', 'Dimuthu'),
(29, 'LED', 'PI67', 'DX138', '2024-08-02', '1400', '10', '14000.00', 'A & R Enterprises'),
(30, 'Helmet', 'Shako', 'DX151', '2024-08-02', '3000', '10', '30000.00', 'Damith Silva'),
(40, 'LED', 'VIP', 'DX242', '2024-08-02', '1400', '4', '5600.00', 'Damith Silva'),
(41, 'Helmet', 'Action', 'DX191', '2024-08-02', '2200', '3', '6600.00', 'Damith Silva'),
(42, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-02', '3000', '4', '12000.00', 'Shavin'),
(44, 'Helmet', 'Action', 'DX191', '2024-08-02', '2000', '3', '6000.00', 'Damith Silva'),
(45, 'LED', 'Dot Led', 'DX218', '2024-08-02', '200', '3', '600.00', 'Damith Silva'),
(46, 'CT 100 - Cable', 'Clutch Cable CT 100', 'DX283', '2024-08-02', '600', '5', '3000.00', 'A & R Enterprises'),
(47, 'CT 100 - Cable', 'Clutch Cable CT 100', 'DX283', '2024-08-02', '550', '4', '2200.00', 'Damith Silva'),
(53, 'CT 100 - Cable', 'Acc Cable', 'DX307', '2024-08-03', '500', '10', '5000.00', 'A & R Enterprises'),
(54, 'CT 100 - Cable', 'Acc Cable', 'DX307', '2024-08-03', '450', '5', '2250.00', 'Damith Silva'),
(55, 'CT 100 - Cable', 'Acc Cable', 'DX307', '2024-08-03', '400', '5', '2000.00', 'Dimuthu'),
(56, 'CT 100 - Cable', 'Acc Cable', 'DX307', '2024-08-03', '400', '6', '2400.00', 'Dimuthu'),
(57, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-03', '3000', '5', '15000.00', 'A & R Enterprises'),
(58, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-03', '2950', '5', '14750.00', 'A & R Enterprises'),
(59, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-03', '2800', '5', '14000.00', 'A & R Enterprises'),
(61, 'LED', 'Dot Led', 'DX218', '2024-08-03', '600', '2', '1200.00', 'Shavin'),
(62, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-03', '3250', '5', '16250.00', 'Damith Silva'),
(63, 'LED', 'PI67', 'DX138', '2024-08-03', '300', '6', '1800.00', 'Damith Silva'),
(64, 'Japan Half Helmet', 'Visor Half', 'DX317', '2024-08-03', '3000', '5', '15000.00', 'Damith Silva'),
(65, 'Japan Half Helmet', 'Visor Half', 'DX317', '2024-08-03', '3500', '6', '21000.00', 'A & R Enterprises'),
(66, 'Japan Half Helmet', 'Visor Half', 'DX317', '2024-08-03', '4', '2800', '11200.00', 'Shavin'),
(67, 'LED', 'PI67', 'DX138', '2024-08-03', '1000', '10', '10000.00', 'Damith Silva'),
(68, 'LED', 'PI67', 'DX138', '2024-08-03', '1400', '9', '12600.00', 'Damith Silva'),
(69, 'Helmet', 'Ladies', 'DX157', '2024-08-03', '1400', '20', '28000.00', 'Dimuthu'),
(70, 'Helmet', 'Ladies', 'DX157', '2024-08-03', '1200', '18', '21600.00', 'A & R Enterprises'),
(71, 'Rim Cup', 'Nikel 2', 'DX148', '2024-08-03', '300', '9', '2700.00', 'Damith Silva'),
(72, 'Helmet', 'Ladies', 'DX157', '2024-08-03', '1250', '10', '12500.00', 'Damith Silva'),
(73, 'Helmet', 'Bola Helmet', 'DX168', '2024-08-03', '1800', '10', '18000.00', 'Damith Silva'),
(74, 'Helmet', 'Full face', 'DX134', '2024-08-03', '4500', '8', '36000.00', 'A & R Enterprises'),
(75, 'Helmet', 'Bola Helmet', 'DX168', '2024-08-03', '1850', '5', '9250.00', 'Damith Silva'),
(76, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-03', '3200', '6', '19200.00', 'Dimuthu'),
(77, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-03', '3250', '6', '19500.00', 'Dimuthu'),
(78, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-03', '3100', '4', '12400.00', 'Damith Silva'),
(79, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-03', '3000', '11', '33000.00', 'Damith Silva'),
(80, 'Japan Half Helmet', 'Half helmet', 'DX180', '2024-08-03', '3150', '10', '31500.00', 'A & R Enterprises'),
(81, 'Helmet', 'Cap Helmet', 'DX204', '2024-08-03', '2900', '5', '14500.00', 'A & R Enterprises'),
(82, 'Rim Cup', 'Plastic', 'DX211', '2024-08-03', '400', '4', '1600.00', 'Damith Silva'),
(83, 'Rim Cup', 'Plastic', 'DX211', '2024-08-03', '390', '4', '1560.00', 'Shavin'),
(84, 'Rim Cup', 'Nikel 2', 'DX148', '2024-08-03', '500', '4', '2000.00', 'Damith Silva'),
(85, 'Rim Cup', 'Plastic', 'DX211', '2024-08-03', '400', '4', '1600.00', 'A & R Enterprises'),
(86, 'LED', 'PI67', 'DX138', '2024-08-03', '400', '8', '3200.00', 'Damith Silva'),
(87, 'Helmet', 'Ladies', 'DX157', '2024-08-10', '1400', '10', '14000.00', 'Damith Silva'),
(88, 'Helmet', 'Shako', 'DX151', '2024-08-10', '3350', '5', '16750.00', 'A & R Enterprises'),
(89, 'Helmet', 'Shako', 'DX151', '2024-08-10', '3150', '6', '18900.00', 'Damith Silva'),
(90, 'CT 100 - Cable', 'Brake Cable - Genuine', 'DX376', '2024-08-15', '450', '10', '4500.00', 'Damith Silva'),
(91, 'CT 100 - Cable', 'Acc Cable - Genuine', 'DX351', '2024-08-15', '500', '10', '5000.00', 'Damith Silva'),
(92, 'Body Parts', 'mudguard', 'DX386', '2024-08-16', '2500', '8', '20000.00', 'A & R Enterprises'),
(93, 'CT 100 - Cable', 'Brake Front', 'DX330', '2024-08-22', '400', '10', '4000.00', 'A & R Enterprises'),
(94, 'Body Parts', 'Mask', 'DX402', '2024-08-23', '2500', '15', '37500.00', 'A & R Enterprises'),
(95, 'Body Parts', 'Silencer Guard', 'HD0416', '2024-08-24', '250', '10', '2500.00', 'Shavin');

-- --------------------------------------------------------

--
-- Table structure for table `returnitem`
--

CREATE TABLE `returnitem` (
  `id` int(10) NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `sell_date` varchar(100) NOT NULL,
  `sell_time` varchar(40) NOT NULL,
  `sell_price` varchar(40) NOT NULL,
  `item_qty` varchar(40) NOT NULL,
  `sell_discount` varchar(50) NOT NULL,
  `sell_total` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returnitem`
--

INSERT INTO `returnitem` (`id`, `item_code`, `item_name`, `sell_date`, `sell_time`, `sell_price`, `item_qty`, `sell_discount`, `sell_total`) VALUES
(2, 'DX157', 'Ladies', '2024-08-15', '12:20 PM', '2300', '1', '', '2300.00'),
(3, 'DX143', 'Nikel', '2024-08-15', '12:23 PM', '3000', '1', '', '3000.00'),
(4, 'DX138', 'PI67', '2024-08-15', '12:23 PM', '3000', '10', '', '30000.00'),
(5, 'DX138', 'PI67', '2024-08-15', '12:24 PM', '3000', '4', '', '12000.00'),
(6, 'DX157', 'Ladies', '2024-08-15', '12:31 PM', '2300', '1', '0', '2300.00'),
(8, 'DX138', 'PI67', '2024-08-15', '12:40 PM', '3000', '1', '200', '2800.00'),
(9, 'DX168', 'Bola Helmet', '2024-08-15', '05:33 PM', '3000', '2', '', '6000.00'),
(10, 'DX157', 'Ladies', '2024-08-15', '05:53 PM', '2300', '10', '', '23000.00'),
(11, 'DX134', 'Full face', '2024-08-16', '11:15 AM', '5000', '7', '', '35000.00'),
(12, 'DX138', 'PI67', '2024-08-21', '01:06 PM', '3000', '1', '200', '2800.00'),
(13, 'DX138', 'PI67', '2024-08-22', '11:09 AM', '3000', '1', '200', '2800.00'),
(14, 'DX151', 'Shako', '2024-08-23', '04:15 PM', '4000', '1', '300', '3700.00');

-- --------------------------------------------------------

--
-- Table structure for table `selling`
--

CREATE TABLE `selling` (
  `id` int(10) NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `sell_date` varchar(20) NOT NULL,
  `sell_time` varchar(20) NOT NULL,
  `sell_price` varchar(20) NOT NULL,
  `item_qty` varchar(20) NOT NULL,
  `sell_discount` varchar(30) NOT NULL,
  `sell_total` varchar(50) NOT NULL,
  `sell_profit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selling`
--

INSERT INTO `selling` (`id`, `item_code`, `item_name`, `sell_date`, `sell_time`, `sell_price`, `item_qty`, `sell_discount`, `sell_total`, `sell_profit`) VALUES
(45, 'DX138', 'PI67', '2024-08-01', '05:37 PM', '3000', '1', '500', '2500.00', '2500.00'),
(46, 'DX157', 'Ladies', '2024-08-01', '07:53 PM', '2300', '2', '', '4600.00', '1350.00'),
(47, 'DX180', 'Half helmet', '2024-08-01', '08:21 PM', '6000', '1', '', '6000.00', '3000.00'),
(48, 'DX180', 'Half helmet', '2024-08-01', '08:23 PM', '6000', '1', '1000', '5000.00', '2000.00'),
(49, 'DX148', 'Nikel 2', '2024-08-01', '11:18 PM', '3500', '2', '', '7000.00', '7000.00'),
(50, 'DX148', 'Nikel 2', '2024-08-01', '11:18 PM', '3500', '1', '', '3500.00', '3500.00'),
(51, 'DX134', 'Full face', '2024-08-01', '11:21 PM', '5000', '4', '', '20000.00', '8000.00'),
(52, 'DX134', 'Full face', '2024-08-01', '11:24 PM', '5000', '6', '', '30000.00', '12000.00'),
(53, 'DX143', 'Nikel', '2024-08-01', '11:29 PM', '3000', '3', '', '9000.00', '9000.00'),
(54, 'DX143', 'Nikel', '2024-08-01', '11:29 PM', '3000', '1', '', '3000.00', '3000.00'),
(55, 'DX138', 'PI67', '2024-08-02', '11:42 AM', '3000', '1', '', '3000.00', '600.00'),
(56, 'DX134', 'Full face', '2024-08-02', '12:54 PM', '5000', '1', '', '5000.00', '1500.00'),
(57, 'DX138', 'PI67', '2024-08-02', '12:58 PM', '3000', '1', '', '3000.00', '800.00'),
(58, 'DX143', 'Nikel', '2024-08-02', '12:59 PM', '3000', '2', '', '6000.00', '2750.00'),
(59, 'DX143', 'Nikel', '2024-08-02', '12:59 PM', '3000', '1', '200', '2800.00', '1175.00'),
(60, 'DX157', 'Ladies', '2024-08-02', '12:59 PM', '2300', '1', '', '2300.00', '675.00'),
(61, 'DX138', 'PI67', '2024-08-02', '03:35 PM', '3000', '1', '', '3000.00', '800.00'),
(62, 'DX157', 'Ladies', '2024-08-02', '03:35 PM', '2300', '1', '', '2300.00', '675.00'),
(63, 'DX242', 'VIP', '2024-08-02', '04:49 PM', '2200', '1', '', '2200.00', '2200.00'),
(64, 'DX138', 'PI67', '2024-08-02', '09:57 PM', '3000', '1', '', '3000.00', '800.00'),
(65, 'DX157', 'Ladies', '2024-08-02', '10:26 PM', '2300', '2', '', '4600.00', '1350.00'),
(66, 'DX148', 'Nikel 2', '2024-08-02', '10:27 PM', '3500', '1', '300', '3200.00', '1575.00'),
(67, 'DX148', 'Nikel 2', '2024-08-02', '10:32 PM', '3500', '2', '', '7000.00', '7000.00'),
(68, 'DX204', 'Cap Helmet', '2024-08-02', '03:35 PM', '4300', '1', '', '4300.00', '4300.00'),
(69, 'DX204', 'Cap Helmet', '2024-08-03', '09:24 AM', '4300', '2', '', '8600.00', '2725.00'),
(70, 'DX138', 'PI67', '2024-08-03', '10:24 AM', '3000', '4', '', '12000.00', '4466.68'),
(71, 'DX168', 'Bola Helmet', '2024-08-03', '10:35 AM', '3000', '2', '', '6000.00', '2133.34'),
(72, 'DX138', 'PI67', '2024-08-03', '10:44 AM', '3000', '1', '', '3000.00', '1116.67'),
(73, 'DX157', 'Ladies', '2024-08-03', '08:07 PM', '2300', '2', '', '4600.00', '1766.66'),
(74, 'DX218', 'Dot Led', '2024-08-03', '12:17 PM', '1800', '12', '', '21600.00', '16800.00'),
(76, 'DX157', 'Ladies', '2024-08-10', '05:52 PM', '2300', '3', '300', '6600.00', '6600.00'),
(78, 'DX148', 'Nikel 2', '2024-08-14', '09:58 PM', '3500', '1', '', '3500.00', '3100.00'),
(79, 'DX138', 'PI67', '2024-08-14', '09:59 PM', '3000', '11', '', '33000.00', '15766.63'),
(80, 'DX157', 'Ladies', '2024-08-15', '12:24 PM', '2300', '211', '', '485300.00', '186382.63'),
(81, 'DX157', 'Ladies', '2024-08-15', '05:52 PM', '2300', '12', '', '27600.00', '10599.96'),
(82, 'DX157', 'Ladies', '2024-08-15', '05:53 PM', '2300', '89', '', '204700.00', '78616.37'),
(83, 'DX138', 'PI67', '2024-08-16', '01:42 PM', '3000', '5', '', '15000.00', '7166.65'),
(84, 'DX157', 'Ladies', '2024-08-16', '10:52 AM', '2300', '10', '', '23000.00', '8833.30'),
(86, 'DX157', 'Ladies', '2024-08-16', '12:39 PM', '2300', '100', '', '230000.00', '88333.00'),
(87, 'DX138', 'PI67', '2024-08-20', '12:55 PM', '3000', '5', '', '15000.00', '7166.65'),
(88, 'DX180', 'Half helmet', '2024-08-21', '12:36 PM', '6000', '1', '', '6000.00', '2900.00'),
(89, 'DX180', 'Half helmet', '2024-08-21', '12:50 PM', '6000', '1', '', '6000.00', '2900.00'),
(90, 'DX138', 'PI67', '2024-08-21', '01:06 PM', '3000', '1', '200', '2800.00', '1233.33'),
(91, 'DX157', 'Ladies', '2024-08-21', '04:12 PM', '2300', '100', '', '230000.00', '88333.00'),
(92, 'DX143', 'Nikel', '2024-08-21', '08:40 PM', '3000', '1', '', '3000.00', '3000.00'),
(93, 'DX134', 'Full face', '2024-08-21', '08:47 PM', '5000', '1', '', '5000.00', '750.00'),
(94, 'DX134', 'Full face', '2024-08-21', '08:49 PM', '5000', '1', '', '5000.00', '750.00'),
(95, 'DX157', 'Ladies', '2024-08-21', '09:44 PM', '2300', '10', '', '23000.00', '8833.30'),
(96, 'DX138', 'PI67', '2024-08-21', '09:46 PM', '3000', '10', '', '30000.00', '14333.30'),
(97, 'DX168', 'Bola Helmet', '2024-08-21', '09:50 PM', '3000', '1', '', '3000.00', '1110.00'),
(99, 'DX157', 'Ladies', '2024-08-22', '11:07 AM', '2300', '2', '', '4600.00', '1766.66'),
(100, 'DX151', 'Shako', '2024-08-23', '07:51 PM', '4000', '2', '', '8000.00', '1666.66'),
(101, 'DX138', 'PI67', '2024-08-23', '07:52 PM', '3000', '10', '', '30000.00', '14333.30'),
(102, 'DX157', 'Ladies', '2024-08-23', '07:52 PM', '2300', '1', '', '2300.00', '883.33'),
(103, 'DX138', 'PI67', '2024-08-24', '07:04 PM', '3000', '1', '200', '2800.00', '1233.33'),
(104, 'DX157', 'Ladies', '2024-08-24', '08:40 PM', '2300', '7', '', '16100.00', '6183.31'),
(105, 'DX157', 'Ladies', '2024-08-24', '09:02 PM', '2300', '10', '', '23000.00', '8833.30'),
(106, 'DX157', 'Ladies', '2024-08-24', '10:39 PM', '2300', '10', '', '23000.00', '8833.30'),
(107, 'HD0416', 'Silencer Guard', '2024-08-24', '11:00 PM', '500', '1', '', '500.00', '500.00'),
(108, 'HD0416', 'Silencer Guard', '2024-08-24', '11:21 PM', '500', '1', '', '500.00', '250.00'),
(109, 'HD0416', 'Silencer Guard', '2024-08-25', '02:52 PM', '500', '2', '', '1000.00', '500.00'),
(112, 'HD0416', 'Silencer Guard', '2024-08-25', '02:44 PM', '500', '1', '', '500.00', '250.00'),
(113, 'DX138', 'PI67', '2024-08-25', '02:52 PM', '3000', '9', '', '27000.00', '12899.97'),
(114, 'DX134', 'Full face', '2024-08-25', '02:52 PM', '5000', '2', '', '10000.00', '1500.00');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(6) NOT NULL,
  `sup_name` varchar(200) NOT NULL,
  `sup_date` varchar(50) NOT NULL,
  `sup_address` varchar(200) NOT NULL,
  `sup_phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `sup_name`, `sup_date`, `sup_address`, `sup_phone`) VALUES
(1, 'Damith Silva', '2024-04-08', 'Kandy', '0776588780'),
(2, 'Dimuthu', '2024-04-05', 'Kandy', '0776577770'),
(4, 'dw', '2024-04-30', 'wew', '0999'),
(6, 'Shavin', '2024-05-14', 'Ibbagamuwa', '0776588780'),
(7, 'A & R Enterprises', '2024-06-04', 'Colombo 10', '0762829113'),
(8, 'chamuditha', '2024-08-16', 'gepallawa', '0716947053');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `creditpurchase`
--
ALTER TABLE `creditpurchase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `damageitem`
--
ALTER TABLE `damageitem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemcategorys`
--
ALTER TABLE `itemcategorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profits`
--
ALTER TABLE `profits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `returnitem`
--
ALTER TABLE `returnitem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selling`
--
ALTER TABLE `selling`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `creditpurchase`
--
ALTER TABLE `creditpurchase`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `damageitem`
--
ALTER TABLE `damageitem`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `itemcategorys`
--
ALTER TABLE `itemcategorys`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `profits`
--
ALTER TABLE `profits`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `returnitem`
--
ALTER TABLE `returnitem`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `selling`
--
ALTER TABLE `selling`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
