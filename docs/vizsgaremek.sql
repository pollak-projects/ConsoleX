-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 05. 10:23
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vizsgaremek`
--

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
-- Tábla szerkezet ehhez a táblához `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `houseNumber` varchar(10) NOT NULL,
  `otherDetails` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Call Of Duty: Black Ops 6 (PlayStation 4)', 25000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142344989?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation'),
(2, 'The Witcher 3: Wild Hunt Game of The Year Edition (GOTY)\r\nPC', 10000.00, 'https://content.konzolvilag.hu/product_instances2/189820/pc-the-witcher-3-wild-hunt-game-of-the-year-edition-goty_thumb674.jpg?lmod=1701862650', 'PC'),
(3, 'Grand Theft Auto V (GTA 5)', 10000.00, 'https://content.konzolvilag.hu/product_instances2/985623/xboxseries-grand-theft-auto-v_thumb674.jpg?lmod=1651736766', 'Xbox'),
(5, 'Far Cry 6', 15000.00, 'https://content.konzolvilag.hu/product_instances2/898651/xboxone-far-cry-6_thumb674.jpg?lmod=1687790568', 'Xbox'),
(6, 'FC 25 (PlayStation)', 12000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143289391?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation'),
(7, 'Hogwarts Legacy (PlayStation 5)', 15000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_100544660?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'PlayStation'),
(9, 'NBA 2K25 (Xbox Series X & Xbox One)', 20000.00, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143979958?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800', 'Xbox'),
(10, 'Marvel\'s Spider-Man 2 (használt)', 10000.00, 'https://content.konzolvilag.hu/product_instances_cover/Konzolvilag_0/1034549/playstation5-marvels-spider-man-2_thumb674.jpg?lmod=1718291146', 'Használt PlayStation');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product_category`
--

CREATE TABLE `product_category` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'asd', 'asd@gmail.com', '$2b$10$uMvaTgU17DSKT3vNMcC6kuQUJ5B9.31jtWr3nydpWwBKcLkddYpA2'),
(4, 'dsasadsda', 'sdasadsda@gmail.com', '$2b$10$ZuC9W81ITTSY1inv83mvzOsWmJULuvY/vDNJ4iXSunbGV3n55eiJ6'),
(5, 'proba1', 'proba1@gmail.com', '$2b$10$fRBqtBFjG4d8QRh/B35HtOmYhjXsI7UWdA8hLqctUeOHFB4F75Pu.'),
(6, 'valami', 'valami@gmail.com', '$2b$10$Zl81FAantc76BPxgtxDVn.dl8q/as5L/eAlu/KKjg2XkbeSfAn9xa');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- A tábla indexei `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- A tábla indexei `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
