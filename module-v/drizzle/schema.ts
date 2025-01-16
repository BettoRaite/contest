import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, bigint, varchar, foreignKey, double, timestamp, int, unique, smallint, mysqlEnum, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const menuCategories = mysqlTable("menu_categories", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "menu_categories_id"}),
]);

export const menus = mysqlTable("menus", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	price: double({ precision: 8, scale: 2 }).notNull(),
	menuCategoryId: bigint("menu_category_id", { mode: "number", unsigned: true }).notNull().references(() => menuCategories.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "menus_id"}),
]);

export const orderMenus = mysqlTable("order_menus", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	menuId: bigint("menu_id", { mode: "number", unsigned: true }).notNull().references(() => menus.id, { onDelete: "cascade" } ),
	orderId: bigint("order_id", { mode: "number", unsigned: true }).notNull().references(() => orders.id, { onDelete: "cascade" } ),
	count: int().default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "order_menus_id"}),
]);

export const orders = mysqlTable("orders", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	numberOfPerson: int("number_of_person"),
	tableId: bigint("table_id", { mode: "number", unsigned: true }).notNull().references(() => tables.id, { onDelete: "cascade" } ),
	shiftWorkerId: bigint("shift_worker_id", { mode: "number", unsigned: true }).notNull().references(() => shiftWorkers.id, { onDelete: "cascade" } ),
	statusOrderId: bigint("status_order_id", { mode: "number", unsigned: true }).notNull().references(() => statusOrders.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "orders_id"}),
]);

export const roles = mysqlTable("roles", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 50 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "roles_id"}),
	unique("roles_code_unique").on(table.code),
]);

export const shiftWorkers = mysqlTable("shift_workers", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	workShiftId: bigint("work_shift_id", { mode: "number", unsigned: true }).notNull().references(() => workShifts.id, { onDelete: "cascade" } ),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "shift_workers_id"}),
]);

export const statusOrders = mysqlTable("status_orders", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 100 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "status_orders_id"}),
]);

export const tables = mysqlTable("tables", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	capacity: smallint().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "tables_id"}),
]);

export const users = mysqlTable("users", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	surname: varchar({ length: 100 }),
	patronymic: varchar({ length: 100 }),
	login: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	photoFile: varchar("photo_file", { length: 255 }),
	apiToken: varchar("api_token", { length: 255 }),
	status: mysqlEnum(['working','fired']).default('working').notNull(),
	roleId: bigint("role_id", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_login_unique").on(table.login),
]);

export const workShifts = mysqlTable("work_shifts", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	start: datetime({ mode: 'string'}).notNull(),
	end: datetime({ mode: 'string'}).notNull(),
	active: tinyint().default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "work_shifts_id"}),
]);
