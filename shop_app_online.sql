-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: May 21, 2025 at 10:32 AM
-- Server version: 9.0.1
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_app_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` text,
  `status` int DEFAULT NULL COMMENT '0:inactive, 1:active, 2:scheduled, 3:expired',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `name`, `image`, `status`, `created_at`, `updated_at`) VALUES
(4, 'vourcher', '1745578842845-vourcher.png', 1, '2025-04-24 11:11:18', '2025-05-03 11:01:08'),
(5, 'Giao hàng', 'https://example.com/images/giao_hang.jpg', 1, '2025-04-24 11:11:43', '2025-05-03 10:22:43'),
(9, 'Cuối tuần giải trí', '1745748949750-cuoi_tuan_giai_tri.jpeg', 1, '2025-05-03 11:19:34', '2025-05-05 09:06:45'),
(11, 'Săn sale rực rỡ', '1746436398542-san_sale_ruc_ro.png', 1, '2025-05-05 09:14:12', '2025-05-05 09:14:12');

-- --------------------------------------------------------

--
-- Table structure for table `banner_details`
--

CREATE TABLE `banner_details` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `banner_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banner_details`
--

INSERT INTO `banner_details` (`id`, `product_id`, `banner_id`, `created_at`, `updated_at`) VALUES
(4, 19, 5, '2025-04-24 11:11:18', '2025-04-24 11:14:11'),
(5, 17, 4, '2025-04-24 11:11:18', '2025-04-24 11:11:18'),
(6, 18, 4, '2025-04-24 11:11:18', '2025-04-24 11:11:18'),
(7, 10, 5, '2025-04-24 11:11:43', '2025-04-24 11:11:43'),
(8, 12, 5, '2025-04-24 11:11:43', '2025-04-24 11:11:43');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Apple', '1746875330082-apple.png', '2025-03-31 10:01:18', '2025-05-10 11:09:40'),
(2, 'Samsung', '1746875330082-samsung.png', '2025-03-31 10:01:31', '2025-05-10 11:10:04'),
(3, 'Sony', '1746875330082-sony.png', '2025-03-31 10:01:51', '2025-05-10 11:11:54'),
(4, 'Canon', NULL, '2025-03-31 10:02:42', '2025-03-31 10:02:42'),
(5, 'Dell', NULL, '2025-04-06 09:16:00', '2025-04-06 09:16:00'),
(6, 'Xiaomi', NULL, '2025-04-06 09:16:11', '2025-04-06 09:16:11'),
(7, 'HP', NULL, '2025-04-06 09:16:23', '2025-04-06 09:16:23'),
(8, 'Bose', NULL, '2025-04-06 09:16:50', '2025-04-06 09:16:50'),
(9, 'Logitech', NULL, '2025-04-06 09:17:00', '2025-04-06 09:17:00'),
(10, 'Razer', NULL, '2025-04-06 09:17:08', '2025-04-06 09:17:08'),
(11, 'Nikon', NULL, '2025-04-06 09:17:16', '2025-04-06 09:17:16'),
(12, 'DJI', NULL, '2025-04-06 09:17:34', '2025-04-06 09:17:34'),
(13, 'LG', NULL, '2025-04-06 09:18:03', '2025-04-06 09:18:03'),
(14, 'Nokia', NULL, '2025-04-06 09:18:07', '2025-04-06 09:18:07'),
(15, 'MSI', NULL, '2025-04-14 08:55:09', '2025-04-14 08:56:40');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `session_id` varchar(225) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int NOT NULL,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Đồ gia dụng', '1746871412381-do_gia_dung.jpeg', '2025-03-31 10:12:11', '2025-05-10 10:04:56'),
(2, 'Điện thoại', '1746872286193-dien_thoai.jpeg', '2025-03-31 10:12:23', '2025-05-10 10:18:43'),
(3, 'Máy tính bảng', '1746872286194-may_tinh_bang.jpeg', '2025-03-31 10:13:18', '2025-05-10 10:20:28'),
(5, 'Máy ảnh', '1746872286194-may_anh.jpeg', '2025-04-06 08:53:48', '2025-05-10 10:38:22'),
(6, 'Laptop', '1746872286194-laptop.jpeg', '2025-04-08 08:14:38', '2025-05-10 10:35:39'),
(7, 'Tai nghe', '1746872286194-tai_nghe.jpeg', '2025-04-08 08:15:20', '2025-05-10 10:36:07'),
(8, 'Đồng hồ', '1746873401307-dong_ho.jpeg', '2025-04-08 08:16:00', '2025-05-10 10:36:59'),
(9, 'Chuột', '1746873401307-chuot.jpeg', '2025-04-08 08:17:26', '2025-05-10 10:37:24'),
(10, 'Bàn phím', '1746873401306-ban_phim.jpeg', '2025-04-14 09:07:44', '2025-05-10 10:37:47');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `star` int DEFAULT NULL,
  `content` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` text,
  `content` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `image`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Startup Việt gọi vốn thành công 12 triệu USD', 'https://example.com/images/startup.jpg', 'Một startup trong lĩnh vực fintech tại Việt Nam đã gọi vốn thành công vòng Series A.', '2025-04-20 08:03:03', '2025-04-23 08:38:02'),
(4, 'Việt Nam lọt top điểm đến hàng đầu châu Á', 'https://example.com/images/vietnam-travel.jpg', 'Việt Nam được vinh danh là một trong những điểm du lịch hấp dẫn nhất tại châu Á.', '2025-04-20 08:04:00', '2025-04-20 08:04:00'),
(5, 'Startup Việt gọi vốn thành công 10 triệu USD', 'https://example.com/images/startup.jpg', 'Một startup trong lĩnh vực fintech tại Việt Nam đã gọi vốn thành công vòng Series A.', '2025-04-20 08:04:11', '2025-04-20 08:04:11');

-- --------------------------------------------------------

--
-- Table structure for table `news_details`
--

CREATE TABLE `news_details` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `news_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT '1: pending, 2: processing, 3: cancel, 4: ship, 5: delivered, 6: refund, 7: fail',
  `note` text,
  `total` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `note`, `total`, `created_at`, `updated_at`, `session_id`, `phone`, `address`) VALUES
(7, 123, NULL, '', 1396, '2025-05-18 12:41:22', '2025-05-18 12:41:22', NULL, NULL, NULL),
(8, 23, 7, 'Giao hàng giờ hành chính', 4554, '2025-05-18 12:45:06', '2025-05-21 09:32:48', NULL, NULL, NULL),
(9, NULL, 1, 'Giao hàng giờ vào chủ nhật', 2406594, '2025-05-21 03:43:41', '2025-05-21 03:43:41', 'a1b2c3d4e5f6g8w5', NULL, NULL),
(10, NULL, 2, 'Gọi điện cho tôi với sđt: 111111111', 54800000, '2025-05-21 09:37:12', '2025-05-21 09:46:40', 'a1b2c3d4e5f6hjki', '1111111111', 'Ngọc Tảo, Phúc Thọ, Hà Nội');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(5, 7, 19, 399, 2, '2025-05-18 12:41:24', '2025-05-18 12:41:24'),
(6, 7, 22, 299, 2, '2025-05-18 12:41:24', '2025-05-18 12:41:24'),
(7, 8, 14, 699, 3, '2025-05-18 12:45:06', '2025-05-18 12:45:06'),
(8, 8, 21, 499, 1, '2025-05-18 12:45:06', '2025-05-18 12:45:06'),
(9, 8, 25, 979, 2, '2025-05-18 12:45:06', '2025-05-18 12:45:06'),
(10, 9, 10, 1200000, 2, '2025-05-21 03:43:42', '2025-05-21 03:43:42'),
(11, 9, 18, 1099, 6, '2025-05-21 03:43:42', '2025-05-21 03:43:42'),
(12, 10, 1, 25000000, 2, '2025-05-21 09:37:12', '2025-05-21 09:37:12'),
(13, 10, 5, 1200000, 2, '2025-05-21 09:37:12', '2025-05-21 09:37:12'),
(14, 10, 8, 1200000, 2, '2025-05-21 09:37:12', '2025-05-21 09:37:12');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` text,
  `price` int DEFAULT '0',
  `oldprice` int DEFAULT '0',
  `description` text,
  `specification` text,
  `buyturn` int DEFAULT '0',
  `quantity` int DEFAULT '0',
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `oldprice`, `description`, `specification`, `buyturn`, `quantity`, `brand_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Laptop Dell XPS 13', '1747041487384-dell-xps-13-9340-thinkpro-zZy.webp', 25000000, 27000000, 'Laptop Dell XPS 13 với màn hình 13.4 inch Full HD.', 'CPU Intel Core i7, RAM 16GB, SSD 512GB', 10, 50, 1, 2, '2025-04-01 07:57:35', '2025-05-12 09:19:44'),
(5, 'Bàn phím cơ RGB', 'https://example.com/images/mechanical-keyboard.jpg', 1200000, 0, 'Bàn phím cơ RGB có switch brown.', 'Switch brown, kết nối USB-C', 0, 0, 3, 2, '2025-04-01 08:03:17', '2025-04-01 08:03:17'),
(8, 'Chuột Logitech G502', 'https://example.com/images/logitech-g502.jpg', 1200000, 1500000, 'Chuột gaming Logitech G502 với cảm biến HERO 25K.', 'DPI tối đa 25,600, 11 nút có thể lập trình', 30, 100, 4, 2, '2025-04-02 03:59:33', '2025-04-02 03:59:33'),
(10, 'Chuột Logitech G503', 'https://example.com/images/logitech-g502.jpg', 1200000, 1500000, 'Chuột gaming Logitech G502 với cảm biến HERO 25K.', 'DPI tối đa 25,600, 11 nút có thể lập trình', 30, 100, 4, 2, '2025-04-02 04:33:38', '2025-04-02 04:33:38'),
(12, 'iPhone 14 Pro Max', 'https://example.com/images/iphone14pro.jpg', 1199, 1299, 'Apple flagship smartphone with A16 Bionic chip.', '6.7-inch OLED, 128GB, 6GB RAM, iOS', 400, 50, 1, 2, '2025-04-08 08:19:47', '2025-04-12 10:03:02'),
(13, 'Samsung Galaxy S23 Ultra', 'https://example.com/images/s23ultra.jpg', 1099, 1199, 'Samsung\'s latest Android phone with 200MP camera.', '6.8-inch AMOLED, 256GB, 12GB RAM, Android 13', 280, 60, 2, 2, '2025-04-08 08:20:03', '2025-04-08 08:20:03'),
(14, 'Xiaomi Mi 13', 'https://example.com/images/mi13.jpg', 699, 799, 'Affordable flagship with Snapdragon 8 Gen 2.', '6.36-inch AMOLED, 256GB, 8GB RAM', 150, 70, 6, 2, '2025-04-08 08:20:18', '2025-04-08 08:20:18'),
(16, 'MacBook Air M2', 'https://example.com/images/macbookair.jpg', 999, 1099, 'Apple laptop powered by M2 chip.', '13.6-inch Retina, 256GB SSD, 8GB RAM, macOS', 200, 40, 1, 6, '2025-04-08 08:20:31', '2025-04-08 08:20:31'),
(17, 'Dell XPS 13', 'https://example.com/images/dellxps.jpg', 1199, 1299, 'Premium ultrabook with InfinityEdge display.', '13.4-inch FHD+, 512GB SSD, 16GB RAM, Windows 11', 180, 30, 5, 6, '2025-04-08 08:20:41', '2025-04-08 08:20:41'),
(18, 'HP Spectre x360', 'https://example.com/images/hpspectre.jpg', 1099, 1199, 'Convertible laptop with touchscreen.', '13.5-inch OLED, 512GB SSD, 16GB RAM', 140, 25, 7, 6, '2025-04-08 08:20:52', '2025-04-08 08:20:52'),
(19, 'Sony WH-1000XM5', 'https://example.com/images/sonyheadphones.jpg', 399, 449, 'Industry-leading noise canceling headphones.', 'Bluetooth, 30-hour battery, Noise Canceling', 320, 80, 3, 7, '2025-04-08 08:21:06', '2025-04-08 08:21:06'),
(21, 'Apple Watch Series 8', 'https://example.com/images/applewatch8.jpg', 499, 549, 'Advanced health tracking smartwatch.', 'GPS, ECG, Heart rate, 41mm, watchOS', 310, 90, 1, 8, '2025-04-08 08:21:26', '2025-04-08 08:21:26'),
(22, 'Samsung Galaxy Watch 5', 'https://example.com/images/galaxywatch5.jpg', 299, 349, 'Smartwatch with bioactive sensors.', 'Bluetooth, AMOLED, 44mm, Wear OS', 170, 85, 2, 8, '2025-04-08 08:21:38', '2025-04-08 08:21:38'),
(23, 'Logitech MX Master 3', 'https://example.com/images/mxmaster3.jpg', 99, 120, 'Ergonomic wireless mouse for professionals.', 'USB-C, Bluetooth, Multi-device', 230, 100, 9, 9, '2025-04-08 08:21:49', '2025-04-08 08:21:49'),
(24, 'Razer DeathAdder V2', 'https://example.com/images/deathadderv2.jpg', 69, 89, 'High-performance gaming mouse.', 'Wired, Optical Sensor, 20K DPI', 260, 95, 10, 9, '2025-04-08 08:22:00', '2025-04-08 08:22:00'),
(25, 'Canon EOS R10', 'https://example.com/images/canonr10.jpg', 979, 1049, 'Compact mirrorless camera for creators.', '24MP APS-C, 4K60 Video, Dual Pixel AF', 60, 15, 4, 5, '2025-04-08 08:22:12', '2025-04-08 08:22:12'),
(26, 'Nikon Z50', 'https://example.com/images/nikonz50.jpg', 999, 1099, 'Entry-level mirrorless camera.', '20.9MP, 4K UHD, Flip-down touchscreen', 55, 10, 11, 5, '2025-04-08 08:22:22', '2025-04-08 08:22:22'),
(27, 'DJI Mini 3 Pro', 'https://example.com/images/djimini3.jpg', 759, 849, 'Lightweight drone with 4K camera.', '4K HDR, 34min Flight, Obstacle Avoidance', 120, 20, 12, 5, '2025-04-08 08:22:31', '2025-04-08 08:22:31');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `image_url` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, '1746959102235-dell-xps-13-9340-thinkpro.webp', '2025-05-11 10:25:23', '2025-05-11 10:25:23'),
(2, 1, '1746959380203-dell-xps-13-9340-thinkpro-NKS.webp', '2025-05-11 10:30:03', '2025-05-11 10:30:03');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250326095615-create-user.js'),
('20250327034135-create-category.js'),
('20250327075131-create-brand.js'),
('20250327075715-create-news.js'),
('20250327080238-create-banner.js'),
('20250327104954-create-order.js'),
('20250327112407-create-product.js'),
('20250327121831-create-order-detail.js'),
('20250327151306-create-banner-detail.js'),
('20250327155614-create-news-detail.js'),
('20250327171020-create-feedback.js'),
('20250511083850-create-product-image.js'),
('20250513080103-add-session_id-to-orders.js'),
('20250513085158-create-cart.js'),
('20250513085424-create-cart-item.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `avatar`, `phone`, `created_at`, `updated_at`) VALUES
(10, 'john.doe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DgGm+uNlgoXY7WwZeaN87g$a3ki5db5fVbJ7MlMQyLbDt2Crp5yGcC0/sdkMZ23nd0', 'John Doe', 1, 'https://randomuser.me/api/portraits/men/1.jpg', 123456789, '2025-04-17 09:58:22', '2025-04-17 09:58:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner_details`
--
ALTER TABLE `banner_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `banner_id` (`banner_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_details`
--
ALTER TABLE `news_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `banner_details`
--
ALTER TABLE `banner_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `news_details`
--
ALTER TABLE `news_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banner_details`
--
ALTER TABLE `banner_details`
  ADD CONSTRAINT `banner_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `banner_details_ibfk_2` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `news_details`
--
ALTER TABLE `news_details`
  ADD CONSTRAINT `news_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `news_details_ibfk_2` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
