// Cloud Kitchen Inventory Management System - Database Index
// Main entry point for all database operations

import DATABASE, { DatabaseHelpers } from './database.js';
import INVENTORY_DATABASE, { InventoryHelpers } from './inventoryDatabase.js';
import ORDERS_DATABASE, { OrdersHelpers } from './ordersDatabase.js';
import ANALYTICS_DATABASE, { AnalyticsHelpers } from './analyticsDatabase.js';

// Unified database object
export const CloudKitchenDB = {
  // Core database
  users: DATABASE.users,
  categories: DATABASE.categories,
  locations: DATABASE.locations,
  suppliers: DATABASE.suppliers,
  units: DATABASE.units,
  menuItems: DATABASE.menuItems,
  menuCategories: DATABASE.menuCategories,

  // Inventory database
  ingredients: INVENTORY_DATABASE.ingredients,
  transactions: INVENTORY_DATABASE.transactions,
  stockAlerts: INVENTORY_DATABASE.stockAlerts,
  expiryAlerts: INVENTORY_DATABASE.expiryAlerts,

  // Orders database
  orders: ORDERS_DATABASE.orders,
  orderItems: ORDERS_DATABASE.orderItems,
  menuItemRecipes: ORDERS_DATABASE.menuItemRecipes,
  orderStatusHistory: ORDERS_DATABASE.orderStatusHistory,
  dailyOrderSummary: ORDERS_DATABASE.dailyOrderSummary,

  // Analytics database
  dailyMetrics: ANALYTICS_DATABASE.dailyMetrics,
  hourlyDistribution: ANALYTICS_DATABASE.hourlyDistribution,
  menuItemPerformance: ANALYTICS_DATABASE.menuItemPerformance,
  ingredientUsageAnalytics: ANALYTICS_DATABASE.ingredientUsageAnalytics,
  staffPerformance: ANALYTICS_DATABASE.staffPerformance,
  customerAnalytics: ANALYTICS_DATABASE.customerAnalytics,
  financialAnalytics: ANALYTICS_DATABASE.financialAnalytics
};

// Unified helper functions
export const DBHelpers = {
  // User management
  ...DatabaseHelpers,

  // Inventory management
  ...InventoryHelpers,

  // Order management
  ...OrdersHelpers,

  // Analytics
  ...AnalyticsHelpers,

  // Cross-database operations
  getCompleteIngredientInfo: (ingredientId) => {
    const ingredient = InventoryHelpers.getIngredientById(ingredientId);
    if (!ingredient) return null;

    const category = DatabaseHelpers.getCategoryById(ingredient.categoryId);
    const supplier = DatabaseHelpers.getSupplierById(ingredient.supplierId);
    const location = DatabaseHelpers.getLocationById(ingredient.locationId);
    const unit = DatabaseHelpers.getUnitById(ingredient.unitId);
    const transactions = InventoryHelpers.getTransactionsByIngredient(ingredientId);

    return {
      ...ingredient,
      category,
      supplier,
      location,
      unit,
      transactions
    };
  },

  getCompleteOrderInfo: (orderId) => {
    const order = OrdersHelpers.getOrderById(orderId);
    if (!order) return null;

    const orderItems = OrdersHelpers.getOrderItemsByOrderId(orderId);
    const statusHistory = OrdersHelpers.getOrderStatusHistory(orderId);
    const assignedUser = DatabaseHelpers.getUserById(order.assignedTo);
    const ingredientUsage = OrdersHelpers.calculateIngredientUsage(orderId);

    return {
      ...order,
      orderItems,
      statusHistory,
      assignedUser,
      ingredientUsage
    };
  },

  getStaffCompleteInfo: (userId) => {
    const user = DatabaseHelpers.getUserById(userId);
    if (!user) return null;

    const orders = OrdersHelpers.getOrdersByUser(userId);
    const transactions = InventoryHelpers.getTransactionsByUser(userId);
    const performance = ANALYTICS_DATABASE.staffPerformance.find(p => p.userId === userId);

    return {
      ...user,
      orders,
      transactions,
      performance
    };
  },

  // Dashboard data aggregation
  getDashboardData: () => {
    const today = new Date().toISOString().split('T')[0];
    const todayMetrics = AnalyticsHelpers.getTodayMetrics();
    const inventoryStats = InventoryHelpers.getInventoryStats();
    const orderStats = OrdersHelpers.getOrderStats();
    const pendingOrders = OrdersHelpers.getPendingOrders();
    const lowStockItems = InventoryHelpers.getLowStockIngredients();
    const activeAlerts = InventoryHelpers.getActiveStockAlerts();

    return {
      today: {
        orders: todayMetrics?.totalOrders || 0,
        revenue: todayMetrics?.totalRevenue || 0,
        ingredientsUsed: todayMetrics?.totalIngredientsUsed || 0,
        waste: todayMetrics?.totalIngredientsWasted || 0
      },
      inventory: inventoryStats,
      orders: orderStats,
      alerts: {
        pendingOrders: pendingOrders.length,
        lowStockItems: lowStockItems.length,
        activeAlerts: activeAlerts.length
      },
      quickStats: {
        totalIngredients: inventoryStats.totalIngredients,
        totalOrders: orderStats.totalOrders,
        totalRevenue: orderStats.totalRevenue,
        averageOrderValue: orderStats.averageOrderValue
      }
    };
  },

  // Search across all databases
  globalSearch: (query) => {
    const searchTerm = query.toLowerCase();
    const results = {
      ingredients: [],
      orders: [],
      users: [],
      menuItems: []
    };

    // Search ingredients
    results.ingredients = INVENTORY_DATABASE.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm) ||
      ingredient.code.toLowerCase().includes(searchTerm) ||
      ingredient.category.toLowerCase().includes(searchTerm)
    );

    // Search orders
    results.orders = ORDERS_DATABASE.orders.filter(order =>
      order.orderNumber.toLowerCase().includes(searchTerm) ||
      order.customerName.toLowerCase().includes(searchTerm)
    );

    // Search users
    results.users = DATABASE.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.position.toLowerCase().includes(searchTerm)
    );

    // Search menu items
    results.menuItems = DATABASE.menuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );

    return results;
  },

  // Data export functions
  exportInventoryData: () => {
    return {
      ingredients: INVENTORY_DATABASE.ingredients,
      transactions: INVENTORY_DATABASE.transactions,
      stockAlerts: INVENTORY_DATABASE.stockAlerts,
      expiryAlerts: INVENTORY_DATABASE.expiryAlerts,
      exportDate: new Date().toISOString()
    };
  },

  exportOrderData: () => {
    return {
      orders: ORDERS_DATABASE.orders,
      orderItems: ORDERS_DATABASE.orderItems,
      orderStatusHistory: ORDERS_DATABASE.orderStatusHistory,
      exportDate: new Date().toISOString()
    };
  },

  exportAnalyticsData: () => {
    return {
      dailyMetrics: ANALYTICS_DATABASE.dailyMetrics,
      menuItemPerformance: ANALYTICS_DATABASE.menuItemPerformance,
      ingredientUsageAnalytics: ANALYTICS_DATABASE.ingredientUsageAnalytics,
      staffPerformance: ANALYTICS_DATABASE.staffPerformance,
      exportDate: new Date().toISOString()
    };
  },

  // Data validation
  validateIngredient: (ingredient) => {
    const errors = [];
    
    if (!ingredient.name) errors.push('Ingredient name is required');
    if (!ingredient.categoryId) errors.push('Category is required');
    if (ingredient.quantity < 0) errors.push('Quantity cannot be negative');
    if (!ingredient.unitId) errors.push('Unit is required');
    if (ingredient.price < 0) errors.push('Price cannot be negative');
    if (!ingredient.supplierId) errors.push('Supplier is required');
    if (!ingredient.locationId) errors.push('Location is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validateOrder: (order) => {
    const errors = [];
    
    if (!order.customerName) errors.push('Customer name is required');
    if (!order.customerPhone) errors.push('Customer phone is required');
    if (!order.orderType) errors.push('Order type is required');
    if (order.totalAmount < 0) errors.push('Total amount cannot be negative');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validateUser: (user) => {
    const errors = [];
    
    if (!user.username) errors.push('Username is required');
    if (!user.name) errors.push('Name is required');
    if (!user.email) errors.push('Email is required');
    if (!user.role) errors.push('Role is required');
    if (!user.position) errors.push('Position is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };  
  }
};

// Database initialization and setup
export const DBInit = {
  // Initialize database with sample data
  initialize: () => {
    console.log('Cloud Kitchen Database initialized successfully');
    console.log(`- ${DATABASE.users.length} users`);
    console.log(`- ${INVENTORY_DATABASE.ingredients.length} ingredients`);
    console.log(`- ${ORDERS_DATABASE.orders.length} orders`);
    console.log(`- ${ANALYTICS_DATABASE.dailyMetrics.length} daily metrics`);
  },

  // Reset database to initial state
  reset: () => {
    console.log('Database reset to initial state');
    // In a real application, this would reset all data to initial values
  },

  // Backup database
  backup: () => {
    const backup = {
      timestamp: new Date().toISOString(),
      data: CloudKitchenDB
    };
    console.log('Database backup created:', backup.timestamp);
    return backup;
  },

  // Restore database from backup
  restore: (backup) => {
    if (backup && backup.data) {
      console.log('Database restored from backup:', backup.timestamp);
      return true;
    }
    return false;
  }
};

// Export individual databases for specific use cases
export { DATABASE, DatabaseHelpers };
export { INVENTORY_DATABASE, InventoryHelpers };
export { ORDERS_DATABASE, OrdersHelpers };
export { ANALYTICS_DATABASE, AnalyticsHelpers };

export default CloudKitchenDB; 