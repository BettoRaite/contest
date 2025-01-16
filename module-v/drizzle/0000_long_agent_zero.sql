-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `menu_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `menu_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`price` double(8,2) NOT NULL,
	`menu_category_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_menus` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`menu_id` bigint unsigned NOT NULL,
	`order_id` bigint unsigned NOT NULL,
	`count` int NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`number_of_person` int,
	`table_id` bigint unsigned NOT NULL,
	`shift_worker_id` bigint unsigned NOT NULL,
	`status_order_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`code` varchar(50) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `shift_workers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`work_shift_id` bigint unsigned NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `shift_workers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `status_orders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`code` varchar(100) NOT NULL,
	CONSTRAINT `status_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`capacity` smallint NOT NULL,
	CONSTRAINT `tables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`surname` varchar(100),
	`patronymic` varchar(100),
	`login` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`photo_file` varchar(255),
	`api_token` varchar(255),
	`status` enum('working','fired') NOT NULL DEFAULT 'working',
	`role_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_login_unique` UNIQUE(`login`)
);
--> statement-breakpoint
CREATE TABLE `work_shifts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`start` datetime NOT NULL,
	`end` datetime NOT NULL,
	`active` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `work_shifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `menus` ADD CONSTRAINT `menus_menu_category_id_foreign` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_menus` ADD CONSTRAINT `order_menus_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_menus` ADD CONSTRAINT `order_menus_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_shift_worker_id_foreign` FOREIGN KEY (`shift_worker_id`) REFERENCES `shift_workers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_status_order_id_foreign` FOREIGN KEY (`status_order_id`) REFERENCES `status_orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `tables`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shift_workers` ADD CONSTRAINT `shift_workers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shift_workers` ADD CONSTRAINT `shift_workers_work_shift_id_foreign` FOREIGN KEY (`work_shift_id`) REFERENCES `work_shifts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;
*/