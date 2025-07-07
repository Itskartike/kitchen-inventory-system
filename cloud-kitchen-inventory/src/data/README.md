# Cloud Kitchen Database Documentation

This directory contains the complete database structure for the Cloud Kitchen Inventory Management System. The database is organized into multiple modules for better maintainability and scalability.

## Database Structure

### 📁 **File Organization**

```
src/data/
├── index.js                 # Main database index and unified access
├── database.js              # Core database (users, categories, suppliers, etc.)
├── inventoryDatabase.js     # Inventory and ingredient management
├── ordersDatabase.js        # Order management and menu items
├── analyticsDatabase.js     # Analytics and performance metrics
└── README.md               # This documentation file
```

## 🗄️ **Database Modules**

### 1. **Core Database** (`database.js`)
Contains fundamental system data:
- **Users/Staff**: Kitchen staff information and roles
- **Categories**: Ingredient and menu categories
- **Locations**: Storage locations and their specifications
- **Suppliers**: Vendor information and contact details
- **Units**: Measurement units (kg, L, pieces, etc.)
- **Menu Items**: Available menu items and their details
- **Menu Categories**: Menu item categorization

### 2. **Inventory Database** (`inventoryDatabase.js`)
Manages ingredient and stock data:
- **Ingredients**: Complete ingredient information with tracking
- **Transactions**: All inventory movements and changes
- **Stock Alerts**: Low stock and out-of-stock notifications
- **Expiry Alerts**: Ingredient expiration tracking

### 3. **Orders Database** (`ordersDatabase.js`)
Handles order management:
- **Orders**: Customer order information
- **Order Items**: Individual items within orders
- **Menu Item Recipes**: Ingredient requirements for each menu item
- **Order Status History**: Complete order lifecycle tracking
- **Daily Order Summary**: Aggregated order statistics

### 4. **Analytics Database** (`analyticsDatabase.js`)
Performance and business intelligence:
- **Daily Metrics**: Daily performance indicators
- **Hourly Distribution**: Order patterns by hour
- **Menu Item Performance**: Sales and rating analytics
- **Ingredient Usage Analytics**: Consumption and waste tracking
- **Staff Performance**: Employee productivity metrics
- **Customer Analytics**: Customer behavior and preferences
- **Financial Analytics**: Revenue, costs, and profit analysis

## 🔧 **Usage Examples**

### Basic Database Access
```javascript
import { CloudKitchenDB, DBHelpers } from '../data/index.js';

// Access all ingredients
const allIngredients = CloudKitchenDB.ingredients;

// Get specific ingredient
const tomato = DBHelpers.getIngredientById(1);

// Search ingredients
const searchResults = DBHelpers.searchIngredients('tomato');
```

### Inventory Operations
```javascript
import { InventoryHelpers } from '../data/inventoryDatabase.js';

// Get low stock items
const lowStockItems = InventoryHelpers.getLowStockIngredients();

// Update ingredient quantity
InventoryHelpers.updateIngredientQuantity(
  ingredientId, 
  newQuantity, 
  userId, 
  'usage', 
  'Used for order ORD-1234'
);

// Get inventory statistics
const stats = InventoryHelpers.getInventoryStats();
```

### Order Management
```javascript
import { OrdersHelpers } from '../data/ordersDatabase.js';

// Get today's orders
const todayOrders = OrdersHelpers.getTodayOrders();

// Get pending orders
const pendingOrders = OrdersHelpers.getPendingOrders();

// Update order status
OrdersHelpers.updateOrderStatus(
  orderId, 
  'completed', 
  userId, 
  'Order delivered successfully'
);
```

### Analytics and Reporting
```javascript
import { AnalyticsHelpers } from '../data/analyticsDatabase.js';

// Get today's metrics
const todayMetrics = AnalyticsHelpers.getTodayMetrics();

// Get weekly performance
const weeklyMetrics = AnalyticsHelpers.getWeeklyMetrics();

// Get top performing items
const topItems = AnalyticsHelpers.getTopPerformingItems(5);
```

### Cross-Database Operations
```javascript
import { DBHelpers } from '../data/index.js';

// Get complete ingredient information
const completeIngredient = DBHelpers.getCompleteIngredientInfo(1);

// Get complete order information
const completeOrder = DBHelpers.getCompleteOrderInfo(1);

// Get staff complete information
const staffInfo = DBHelpers.getStaffCompleteInfo(2);

// Get dashboard data
const dashboardData = DBHelpers.getDashboardData();
```

## 📊 **Data Relationships**

### Ingredient Relationships
```
Ingredient → Category → Color/Style
Ingredient → Supplier → Contact Info
Ingredient → Location → Storage Details
Ingredient → Unit → Measurement Type
Ingredient → Transactions → Usage History
```

### Order Relationships
```
Order → Customer → Contact Info
Order → Order Items → Menu Items
Order Items → Menu Item Recipes → Ingredients
Order → Status History → Timeline
Order → Assigned User → Staff Member
```

### Analytics Relationships
```
Daily Metrics → Orders → Revenue
Menu Performance → Order Items → Sales
Staff Performance → Orders → Productivity
Ingredient Usage → Transactions → Consumption
```

## 🔍 **Search and Filtering**

### Global Search
```javascript
const searchResults = DBHelpers.globalSearch('tomato');
// Returns: { ingredients: [], orders: [], users: [], menuItems: [] }
```

### Specific Searches
```javascript
// Search ingredients
const ingredients = InventoryHelpers.searchIngredients('chicken');

// Search users
const users = DatabaseHelpers.searchUsers('chef');

// Search orders
const orders = OrdersHelpers.getOrdersByStatus('pending');
```

## 📈 **Data Validation**

### Ingredient Validation
```javascript
const validation = DBHelpers.validateIngredient(ingredientData);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}
```

### Order Validation
```javascript
const validation = DBHelpers.validateOrder(orderData);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}
```

### User Validation
```javascript
const validation = DBHelpers.validateUser(userData);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}
```

## 💾 **Data Export and Backup**

### Export Functions
```javascript
// Export inventory data
const inventoryExport = DBHelpers.exportInventoryData();

// Export order data
const orderExport = DBHelpers.exportOrderData();

// Export analytics data
const analyticsExport = DBHelpers.exportAnalyticsData();
```

### Database Backup
```javascript
import { DBInit } from '../data/index.js';

// Create backup
const backup = DBInit.backup();

// Restore from backup
DBInit.restore(backup);
```

## 🚀 **Database Initialization**

```javascript
import { DBInit } from '../data/index.js';

// Initialize database
DBInit.initialize();

// Reset database (use with caution)
DBInit.reset();
```

## 📋 **Sample Data Structure**

### Ingredient Example
```javascript
{
  id: 1,
  code: 'TOM001',
  name: 'Fresh Tomatoes',
  category: 'Vegetables',
  categoryId: 1,
  quantity: 25,
  unit: 'kg',
  unitId: 1,
  price: 2.99,
  supplier: 'Fresh Farm Co.',
  supplierId: 1,
  status: 'In Stock',
  location: 'Cold Storage A',
  locationId: 1,
  expiryDate: '2024-01-25',
  minThreshold: 5,
  maxThreshold: 50,
  description: 'Fresh vine-ripened tomatoes',
  barcode: '1234567890123',
  lastUpdated: '2024-01-15 14:30:00',
  createdBy: 1,
  notes: 'Organic tomatoes from local farm'
}
```

### Order Example
```javascript
{
  id: 1,
  orderNumber: 'ORD-1234',
  customerName: 'John Smith',
  customerPhone: '+1 (555) 123-4567',
  customerEmail: 'john.smith@email.com',
  orderType: 'delivery',
  status: 'completed',
  totalAmount: 32.97,
  tax: 2.64,
  tip: 5.00,
  finalAmount: 40.61,
  orderDate: '2024-01-15 14:25:00',
  completedDate: '2024-01-15 14:45:00',
  deliveryAddress: '123 Main St, City, State 12345',
  notes: 'Extra spicy please',
  assignedTo: 2,
  paymentMethod: 'credit_card',
  paymentStatus: 'paid'
}
```

## 🔧 **Extending the Database**

### Adding New Tables
1. Create a new database file (e.g., `newModuleDatabase.js`)
2. Define the data structure and helper functions
3. Import and integrate into `index.js`
4. Update the unified database object and helper functions

### Adding New Fields
1. Update the data structure in the appropriate database file
2. Update related helper functions
3. Update validation functions if needed
4. Update any dependent components

## 📝 **Best Practices**

1. **Always use helper functions** instead of direct data access
2. **Validate data** before performing operations
3. **Use the unified database object** for cross-module operations
4. **Keep data consistent** across related tables
5. **Use proper error handling** for database operations
6. **Document any schema changes** in this README

## 🔒 **Security Considerations**

- All sensitive data should be encrypted in production
- Implement proper access controls for different user roles
- Validate all user inputs before database operations
- Use prepared statements when connecting to real databases
- Implement audit logging for critical operations

---

**Note**: This is a mock database implementation for demonstration purposes. In a production environment, this would be replaced with a real database system (PostgreSQL, MySQL, MongoDB, etc.) with proper authentication, authorization, and data persistence. 