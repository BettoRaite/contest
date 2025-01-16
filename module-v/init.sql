-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 04 2021 г., 08:14
-- Версия сервера: 5.7.25
-- Версия PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cafe-api`
--

-- --------------------------------------------------------

--
-- Структура таблицы `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `menu_category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `menus`
--

INSERT INTO `menus` (`id`, `name`, `description`, `price`, `menu_category_id`, `created_at`, `updated_at`) VALUES
(1, 'Impedit ipsam ut laboriosam qui debitis.', 'Quia voluptates est cumque vel quia. Quae laborum corrupti qui quae. Quaerat distinctio non officiis ratione. Libero itaque quae quae incidunt delectus.', 726.00, 3, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(2, 'Exercitationem ipsam et tempora asperiores nemo maxime ut dicta.', 'Vel culpa esse adipisci quibusdam eos. Quia qui veritatis aut harum aut laboriosam. Et ipsum quasi cum qui. Rem aliquam voluptatum est at possimus. Deserunt minus et omnis est ducimus. Maxime sed ducimus consectetur consequatur rerum quia qui.', 1381.00, 2, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(3, 'Exercitationem qui sint necessitatibus inventore.', 'Magnam modi sed aut. Magni cum consequuntur doloribus minima debitis qui aut suscipit. Amet voluptate nobis aut ut incidunt omnis. Voluptatem officiis nobis inventore.', 1820.00, 2, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(4, 'Qui aut molestiae molestiae aut consequatur soluta in voluptate.', 'Culpa quibusdam adipisci sed. Placeat non neque rerum in. Nulla maiores deleniti aut commodi voluptas praesentium. Amet velit totam iusto. Porro laborum placeat qui ut dolor officia. Cum quia esse sed ad minima atque quam.', 600.00, 3, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(5, 'Non eligendi commodi officia sed provident molestiae.', 'Consectetur nam et eum fuga ratione nobis exercitationem. Voluptatum et in modi fugiat recusandae. Consequuntur autem repudiandae fugiat porro labore. Aspernatur est eveniet sit dignissimos non.', 639.00, 3, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(6, 'Rerum voluptatem porro minima qui.', 'Ut et et minus voluptatibus. Accusamus nemo placeat ut et eos voluptatem alias impedit.', 1490.00, 1, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(7, 'Dolorem id et similique eos laborum.', 'Labore non exercitationem omnis voluptas. Sunt et tenetur quod provident quod incidunt. Odio accusantium possimus ducimus iure. Eum tempore repudiandae at alias. Beatae non cupiditate unde blanditiis et minima debitis et.', 1871.00, 3, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(8, 'Cupiditate quia quia fugiat aut est alias.', 'Sequi harum aspernatur veniam amet minus pariatur. Placeat et est saepe eum voluptas. Tenetur recusandae omnis dolorem mollitia placeat ut sint. Corrupti ducimus doloribus et sed animi aut.', 1157.00, 2, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(9, 'Delectus incidunt numquam libero facilis atque soluta commodi.', 'Qui aut consequatur dolores dolor sit a omnis. Perferendis quo quia et expedita. Eos est inventore ad rerum consequuntur non. Fugiat fugiat incidunt tempore quod ipsa et. Sit non facere placeat quo autem. Molestiae voluptas quo laborum a.', 1582.00, 1, '2021-12-02 12:27:35', '2021-12-02 12:27:35'),
(10, 'Hic eos qui et eum ipsa.', 'Odit et eos dolore odit. Aliquid qui voluptates tempora autem molestias est quo est. Labore vitae ducimus sit enim consequatur enim porro nulla. Itaque quo voluptate sequi ad. Esse neque aut quia enim.', 1660.00, 3, '2021-12-02 12:27:35', '2021-12-02 12:27:35');

-- --------------------------------------------------------

--
-- Структура таблицы `menu_categories`
--

CREATE TABLE `menu_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `menu_categories`
--

INSERT INTO `menu_categories` (`id`, `name`) VALUES
(1, 'Основные блюда'),
(2, 'Напитки'),
(3, 'Десерты');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `number_of_person` int(11) DEFAULT NULL,
  `table_id` bigint(20) UNSIGNED NOT NULL,
  `shift_worker_id` bigint(20) UNSIGNED NOT NULL,
  `status_order_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `number_of_person`, `table_id`, `shift_worker_id`, `status_order_id`, `created_at`, `updated_at`) VALUES
(1, 2, 4, 2, 1, NULL, NULL),
(2, 1, 6, 2, 2, NULL, NULL),
(3, 2, 9, 2, 3, NULL, NULL),
(4, 8, 4, 2, 4, NULL, NULL),
(5, 2, 8, 2, 5, NULL, NULL),
(6, 3, 7, 5, 1, NULL, NULL),
(7, 6, 2, 5, 2, NULL, NULL),
(8, 2, 7, 5, 3, NULL, NULL),
(9, 7, 7, 5, 4, NULL, NULL),
(10, 2, 8, 5, 5, NULL, NULL),
(11, 2, 1, 8, 1, NULL, NULL),
(12, 2, 7, 8, 2, NULL, NULL),
(13, 10, 6, 8, 3, NULL, NULL),
(14, 1, 3, 8, 4, NULL, NULL),
(15, 10, 5, 8, 5, NULL, NULL),
(17, 2, 1, 2, 1, '2021-12-02 15:27:15', '2021-12-02 15:27:15');

-- --------------------------------------------------------

--
-- Структура таблицы `order_menus`
--

CREATE TABLE `order_menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `count` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_menus`
--

INSERT INTO `order_menus` (`id`, `menu_id`, `order_id`, `count`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 3, NULL, NULL),
(2, 8, 1, 3, NULL, NULL),
(3, 9, 1, 1, NULL, NULL),
(4, 10, 1, 1, NULL, NULL),
(5, 3, 2, 3, NULL, NULL),
(6, 10, 2, 2, NULL, NULL),
(7, 1, 3, 1, NULL, NULL),
(8, 3, 3, 1, NULL, NULL),
(9, 5, 3, 3, NULL, NULL),
(10, 7, 3, 1, NULL, NULL),
(11, 8, 3, 2, NULL, NULL),
(12, 4, 4, 2, NULL, NULL),
(13, 5, 4, 3, NULL, NULL),
(14, 7, 4, 1, NULL, NULL),
(15, 8, 4, 1, NULL, NULL),
(16, 2, 5, 2, NULL, NULL),
(17, 7, 5, 2, NULL, NULL),
(18, 8, 5, 1, NULL, NULL),
(19, 9, 5, 2, NULL, NULL),
(20, 7, 6, 1, NULL, NULL),
(21, 2, 7, 3, NULL, NULL),
(22, 4, 7, 2, NULL, NULL),
(23, 8, 7, 3, NULL, NULL),
(24, 5, 8, 3, NULL, NULL),
(25, 8, 8, 1, NULL, NULL),
(26, 9, 8, 2, NULL, NULL),
(27, 3, 9, 3, NULL, NULL),
(28, 4, 9, 1, NULL, NULL),
(29, 6, 9, 1, NULL, NULL),
(30, 5, 10, 1, NULL, NULL),
(31, 6, 10, 1, NULL, NULL),
(32, 8, 10, 2, NULL, NULL),
(33, 9, 10, 1, NULL, NULL),
(34, 10, 10, 1, NULL, NULL),
(35, 4, 11, 1, NULL, NULL),
(36, 6, 11, 2, NULL, NULL),
(37, 7, 11, 1, NULL, NULL),
(38, 8, 11, 3, NULL, NULL),
(39, 5, 12, 3, NULL, NULL),
(40, 3, 13, 1, NULL, NULL),
(41, 4, 13, 2, NULL, NULL),
(42, 5, 13, 3, NULL, NULL),
(43, 7, 13, 2, NULL, NULL),
(44, 1, 14, 2, NULL, NULL),
(45, 2, 14, 1, NULL, NULL),
(46, 4, 14, 1, NULL, NULL),
(47, 3, 15, 1, NULL, NULL),
(48, 5, 15, 1, NULL, NULL),
(49, 7, 15, 2, NULL, NULL),
(50, 9, 15, 2, NULL, NULL),
(51, 10, 15, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `code`) VALUES
(1, 'Администратор', 'admin'),
(2, 'Официант', 'waiter'),
(3, 'Повар', 'cook');

-- --------------------------------------------------------

--
-- Структура таблицы `shift_workers`
--

CREATE TABLE `shift_workers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `work_shift_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `shift_workers`
--

INSERT INTO `shift_workers` (`id`, `work_shift_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 2, 1, NULL, NULL),
(5, 2, 2, NULL, NULL),
(6, 2, 3, NULL, NULL),
(7, 3, 1, NULL, NULL),
(8, 3, 2, NULL, NULL),
(9, 3, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `status_orders`
--

CREATE TABLE `status_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `status_orders`
--

INSERT INTO `status_orders` (`id`, `name`, `code`) VALUES
(1, 'Принят', 'taken'),
(2, 'Готовится', 'preparing'),
(3, 'Готов', 'ready'),
(4, 'Оплачен', 'paid-up'),
(5, 'Отменен', 'canceled');

-- --------------------------------------------------------

--
-- Структура таблицы `tables`
--

CREATE TABLE `tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tables`
--

INSERT INTO `tables` (`id`, `name`, `capacity`) VALUES
(1, 'Столик №1', 4),
(2, 'Столик №2', 6),
(3, 'Столик №3', 4),
(4, 'Столик №4', 6),
(5, 'Столик №5', 6),
(6, 'Столик №6', 7),
(7, 'Столик №7', 5),
(8, 'Столик №8', 7),
(9, 'Столик №9', 4),
(10, 'Столик №10', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `patronymic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('working','fired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'working',
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `patronymic`, `login`, `password`, `photo_file`, `api_token`, `status`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Brain', 'Joanny', 'Fidel', 'admin', 'admin', NULL, '$2y$10$TTgKnW.kEs8jFD9rA1bp4eywmVheLGJIYnpm6Sxkn5upXSQCv4wrW', 'working', 1, '2021-12-02 12:27:34', '2021-12-03 23:10:16'),
(2, 'Charity', 'Dasia', 'Kenton', 'waiter', 'waiter', NULL, NULL, 'working', 2, '2021-12-02 12:27:34', '2021-12-02 15:47:57'),
(3, 'Herman', 'Elva', 'Isaiah', 'cook', 'cook', NULL, NULL, 'fired', 3, '2021-12-02 12:27:35', '2021-12-02 13:34:47'),
(5, 'test2', NULL, NULL, 'test2', 'test2', NULL, NULL, 'working', 3, '2021-12-03 23:59:41', '2021-12-03 23:59:41');

-- --------------------------------------------------------

--
-- Структура таблицы `work_shifts`
--

CREATE TABLE `work_shifts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `work_shifts`
--

INSERT INTO `work_shifts` (`id`, `start`, `end`, `active`, `created_at`, `updated_at`) VALUES
(1, '2021-04-19 08:00:00', '2021-04-19 18:00:00', 1, NULL, '2021-12-02 14:43:03'),
(2, '2021-04-20 08:00:00', '2021-04-20 18:00:00', 0, NULL, NULL),
(3, '2021-04-21 08:00:00', '2021-04-21 18:00:00', 0, NULL, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menus_menu_category_id_foreign` (`menu_category_id`);

--
-- Индексы таблицы `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_table_id_foreign` (`table_id`),
  ADD KEY `orders_shift_worker_id_foreign` (`shift_worker_id`),
  ADD KEY `orders_status_order_id_foreign` (`status_order_id`);

--
-- Индексы таблицы `order_menus`
--
ALTER TABLE `order_menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_menus_menu_id_foreign` (`menu_id`),
  ADD KEY `order_menus_order_id_foreign` (`order_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_code_unique` (`code`);

--
-- Индексы таблицы `shift_workers`
--
ALTER TABLE `shift_workers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shift_workers_work_shift_id_foreign` (`work_shift_id`),
  ADD KEY `shift_workers_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `status_orders`
--
ALTER TABLE `status_orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_login_unique` (`login`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Индексы таблицы `work_shifts`
--
ALTER TABLE `work_shifts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `order_menus`
--
ALTER TABLE `order_menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `shift_workers`
--
ALTER TABLE `shift_workers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `status_orders`
--
ALTER TABLE `status_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `tables`
--
ALTER TABLE `tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `work_shifts`
--
ALTER TABLE `work_shifts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_menu_category_id_foreign` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_shift_worker_id_foreign` FOREIGN KEY (`shift_worker_id`) REFERENCES `shift_workers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_status_order_id_foreign` FOREIGN KEY (`status_order_id`) REFERENCES `status_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_menus`
--
ALTER TABLE `order_menus`
  ADD CONSTRAINT `order_menus_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_menus_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `shift_workers`
--
ALTER TABLE `shift_workers`
  ADD CONSTRAINT `shift_workers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shift_workers_work_shift_id_foreign` FOREIGN KEY (`work_shift_id`) REFERENCES `work_shifts` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
