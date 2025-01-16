import { relations } from "drizzle-orm/relations";
import { menuCategories, menus, orderMenus, orders, shiftWorkers, statusOrders, tables, users, workShifts, roles } from "./schema";

export const menusRelations = relations(menus, ({one, many}) => ({
	menuCategory: one(menuCategories, {
		fields: [menus.menuCategoryId],
		references: [menuCategories.id]
	}),
	orderMenus: many(orderMenus),
}));

export const menuCategoriesRelations = relations(menuCategories, ({many}) => ({
	menus: many(menus),
}));

export const orderMenusRelations = relations(orderMenus, ({one}) => ({
	menu: one(menus, {
		fields: [orderMenus.menuId],
		references: [menus.id]
	}),
	order: one(orders, {
		fields: [orderMenus.orderId],
		references: [orders.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	orderMenus: many(orderMenus),
	shiftWorker: one(shiftWorkers, {
		fields: [orders.shiftWorkerId],
		references: [shiftWorkers.id]
	}),
	statusOrder: one(statusOrders, {
		fields: [orders.statusOrderId],
		references: [statusOrders.id]
	}),
	table: one(tables, {
		fields: [orders.tableId],
		references: [tables.id]
	}),
}));

export const shiftWorkersRelations = relations(shiftWorkers, ({one, many}) => ({
	orders: many(orders),
	user: one(users, {
		fields: [shiftWorkers.userId],
		references: [users.id]
	}),
	workShift: one(workShifts, {
		fields: [shiftWorkers.workShiftId],
		references: [workShifts.id]
	}),
}));

export const statusOrdersRelations = relations(statusOrders, ({many}) => ({
	orders: many(orders),
}));

export const tablesRelations = relations(tables, ({many}) => ({
	orders: many(orders),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	shiftWorkers: many(shiftWorkers),
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id]
	}),
}));

export const workShiftsRelations = relations(workShifts, ({many}) => ({
	shiftWorkers: many(shiftWorkers),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(users),
}));