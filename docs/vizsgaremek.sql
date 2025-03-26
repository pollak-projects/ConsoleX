-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 26. 08:20
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_name`, `product_price`) VALUES
(1, 1, 'The Witcher 3: Wild Hunt Game of The Year Edition (GOTY)\r\nPC', 10000.00),
(2, 1, 'Grand Theft Auto V (GTA 5)', 10000.00),
(3, 1, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00),
(4, 1, 'Game 1', 5000.00),
(5, 1, 'Far Cry 6', 15000.00),
(6, 2, 'Far Cry 6', 15000.00),
(7, 3, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00),
(8, 4, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00),
(9, 4, 'The Witcher 3: Wild Hunt Game of The Year Edition (GOTY)\r\nPC', 10000.00),
(10, 5, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `image`, `category`) VALUES
(1, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142344989?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation játékok'),
(2, 'The Witcher 3: Wild Hunt Game of The Year Edition (GOTY)\r\nPC', 10000.00, 'https://content.konzolvilag.hu/product_instances2/189820/pc-the-witcher-3-wild-hunt-game-of-the-year-edition-goty_thumb674.jpg?lmod=1701862650', 'PC'),
(3, 'Grand Theft Auto V (GTA 5)', 10000.00, 'https://content.konzolvilag.hu/product_instances2/985623/xboxseries-grand-theft-auto-v_thumb674.jpg?lmod=1651736766', 'Xbox'),
(5, 'Far Cry 6', 15000.00, 'https://content.konzolvilag.hu/product_instances2/898651/xboxone-far-cry-6_thumb674.jpg?lmod=1687790568', 'Xbox'),
(6, 'FC 25 (PlayStation)', 12000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143289391?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation'),
(7, 'Hogwarts Legacy (PlayStation 5)', 15000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_100544660?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation'),
(9, 'NBA 2K25 (Xbox Series X & Xbox One)', 20000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143979958?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'Xbox'),
(10, 'Marvel\'s Spider-Man 2 (használt)', 10000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_0/1034549/playstation5-marvels-spider-man-2_thumb674.jpg?lmod=1718291146', 'Használt PlayStation');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `role`) VALUES
(10, 'admin', 'admin@consolex.hu', '$2b$10$LIKJrZnIBl0O.aYa9Ya4nO.x/sUTjLPFcW1c7WOiZukgh8nf8f8dO', 'admin'),
(11, 'user', 'user@consolex.hu', '$2b$10$9Vqu1u0EakCpOYCqZZrj4ewCMeW09l35gqm3YM9NXGIIo5G5HAzXy', 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_orders`
--

CREATE TABLE `user_orders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment_method` enum('creditCard','cash') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_orders`
--

INSERT INTO `user_orders` (`id`, `name`, `address`, `payment_method`) VALUES
(1, 'asd', 'asdasd', 'creditCard'),
(2, 'd', 'gec', 'creditCard'),
(3, 'dasd', 'adadad', 'creditCard'),
(4, 'sad', 'asd', 'creditCard'),
(5, 'asd', 'asd', 'creditCard');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `user_orders`
--
ALTER TABLE `user_orders`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `user_orders`
--
ALTER TABLE `user_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`category_id`);

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
