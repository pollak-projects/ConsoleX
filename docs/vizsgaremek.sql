-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 30. 23:28
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `vizsgaremek`;
 USE `vizsgaremek`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'PC'),
(2, 'PS'),
(3, 'Xbox'),
(4, 'PS konzolok'),
(5, 'Xbox konzolok'),
(6, 'PS tartozékok'),
(7, 'Xbox tartozékok');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `image`, `category`) VALUES
(1, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142344989?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 2),
(2, 'The Witcher 3: Wild Hunt Game of The Year Edition (GOTY)\r\n(PC)', 10000.00, 'https://content.konzolvilag.hu/product_instances2/189820/pc-the-witcher-3-wild-hunt-game-of-the-year-edition-goty_thumb674.jpg?lmod=1701862650', 1),
(3, 'Grand Theft Auto V (GTA 5) (Xbox Series X)', 10000.00, 'https://content.konzolvilag.hu/product_instances2/985623/xboxseries-grand-theft-auto-v_thumb674.jpg?lmod=1651736766', 3),
(5, 'Far Cry 6 (Xbox Series X)', 15000.00, 'https://content.konzolvilag.hu/product_instances2/898651/xboxone-far-cry-6_thumb674.jpg?lmod=1687790568', 3),
(6, 'FC 25 (PlayStation 5)', 12000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143289391?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 2),
(7, 'Hogwarts Legacy (PlayStation 5)', 15000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_100544660?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 2),
(9, 'NBA 2K25 (Xbox Series X & Xbox One)', 20000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143979958?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 3),
(10, 'Marvel\'s Spider-Man 2 (PlayStation 5)', 10000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_0/1034549/playstation5-marvels-spider-man-2_thumb674.jpg?lmod=1718291146', 2),
(11, 'PlayStation 4 Slim', 57900.00, 'https://platinumshop.hu/assets/cache/images/products/medium/8407/vgd.jpg', 4),
(12, 'PlayStation 5 Slim', 220000.00, 'https://image.alza.cz/products/MSX005DE2ab/MSX005DE2ab-02.jpg?width=2000&height=2000', 4),
(13, 'Microsoft Xbox One S', 62000.00, 'https://d2j6dbq0eux0bg.cloudfront.net/images/96571256/4800142589.png', 5),
(14, 'Xbox Series X', 250000.00, 'https://image.alza.cz/products/MXO001aDE/MXO001aDE.jpg?width=2000&height=2000', 5),
(15, 'Playstation 4 Dualshock 4 kontroller (Fekete)', 24000.00, 'https://content.konzolvilag.hu/product_instances/215171/playstation4-ps4-sony-dualshock-4-wireless-controller-2016_thumb320.jpg?lmod=1677839110', 6),
(16, 'Playstation 4 Dualshock 4 kontroller (Fehér)', 24000.00, 'https://content.konzolvilag.hu/product_instances/235364/playstation4-playstation-4-ps4-dualshock-4-kontroller-white-2017_thumb320.jpg?lmod=1677839192', 6),
(17, 'PlayStation 5 DualSense Edge kontroller (Fekete)', 95000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_0/1405747/playstation5-playstation-5-ps5-dualsense-edge-controller-midnight-black_thumb320.jpg?lmod=1737018377', 6),
(18, 'Freaks and Geeks PS5 kontroller külső akkumulátor', 7000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_0/1410735/playstation5-ps5-controller-external-battery-2500mah-type-c-cable-white_thumb320.jpg?lmod=1739883519', 6),
(19, 'Xbox kontroller (Fekete)', 19000.00, 'https://content.konzolvilag.hu/product_instances2/734003/xboxseries-xbox-series-x-wireless-controller-black_thumb320.jpg?lmod=1696939306', 7),
(20, 'Xbox kontroller (Fehér)', 19000.00, 'https://content.konzolvilag.hu/product_instances2/1005344/xboxseries-xbox-wireless-controller-white_thumb320.jpg?lmod=1679573700', 7),
(21, 'Microsoft Xbox vezeték nélküli headset', 42000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_1/1403053/xboxseries-microsoft-xbox-wireless-headset_thumb320.jpg?lmod=1729755750', 7),
(22, 'Logitech G920 Driving Force Racing Kormány Xbox/PC', 100000.00, 'https://content.konzolvilag.hu/product_instances2/180840/multi-logitech-g920-driving-force-racing-wheel_thumb320.jpg?lmod=1728571385', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`, `role`) VALUES
(17, 'user', 'user@consolex.hu', '$2b$10$2A.ZbzRR6GvdOWze8InL4OgFl.fTmRUahAqj6dHMS4sQrelUPf5LO', '2025-03-30 20:24:01', 'user'),
(19, 'admin', 'admin@consolex.hu', '$2b$10$E.M4DO11sxRnm157cv6t5OE6Lbpt2sgZDBHRZ97K1dXYwbOHe54gi', '2025-03-30 20:52:58', 'admin');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order` (`order_id`),
  ADD KEY `product` (`product_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category` (`category`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `username` (`username`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT a táblához `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
