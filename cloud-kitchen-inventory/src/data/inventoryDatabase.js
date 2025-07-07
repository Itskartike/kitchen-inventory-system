// Cloud Kitchen Inventory Database
// Contains all ingredient and inventory-related data

export const INVENTORY_DATABASE = {
  // Ingredients/Inventory Items
  ingredients: [
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
    },
    {
      id: 2,
      code: 'CHK001',
      name: 'Chicken Breast',
      category: 'Meat',
      categoryId: 2,
      quantity: 15,
      unit: 'kg',
      unitId: 1,
      price: 8.99,
      supplier: 'Quality Meats Ltd.',
      supplierId: 2,
      status: 'In Stock',
      location: 'Freezer B',
      locationId: 2,
      expiryDate: '2024-01-20',
      minThreshold: 8,
      maxThreshold: 30,
      description: 'Boneless skinless chicken breast',
      barcode: '1234567890124',
      lastUpdated: '2024-01-15 13:45:00',
      createdBy: 1,
      notes: 'Premium grade chicken breast'
    },
    {
      id: 3,
      code: 'BAS001',
      name: 'Basil Leaves',
      category: 'Herbs',
      categoryId: 3,
      quantity: 2,
      unit: 'kg',
      unitId: 1,
      price: 12.99,
      supplier: 'Herb Garden',
      supplierId: 3,
      status: 'Low Stock',
      location: 'Refrigerator C',
      locationId: 3,
      expiryDate: '2024-01-18',
      minThreshold: 3,
      maxThreshold: 10,
      description: 'Fresh basil leaves',
      barcode: '1234567890125',
      lastUpdated: '2024-01-15 12:20:00',
      createdBy: 1,
      notes: 'Freshly harvested basil'
    },
    {
      id: 4,
      code: 'PAS001',
      name: 'Pasta Spaghetti',
      category: 'Dry Goods',
      categoryId: 4,
      quantity: 30,
      unit: 'kg',
      unitId: 1,
      price: 3.99,
      supplier: 'Italian Foods Inc.',
      supplierId: 4,
      status: 'In Stock',
      location: 'Dry Storage D',
      locationId: 4,
      expiryDate: '2024-12-15',
      minThreshold: 10,
      maxThreshold: 50,
      description: 'Premium spaghetti pasta',
      barcode: '1234567890126',
      lastUpdated: '2024-01-15 10:30:00',
      createdBy: 1,
      notes: 'Durum wheat spaghetti'
    },
    {
      id: 5,
      code: 'OIL001',
      name: 'Olive Oil',
      category: 'Oils & Sauces',
      categoryId: 5,
      quantity: 0,
      unit: 'L',
      unitId: 2,
      price: 15.99,
      supplier: 'Mediterranean Imports',
      supplierId: 5,
      status: 'Out of Stock',
      location: 'Dry Storage E',
      locationId: 5,
      expiryDate: '2024-06-30',
      minThreshold: 5,
      maxThreshold: 20,
      description: 'Extra virgin olive oil',
      barcode: '1234567890127',
      lastUpdated: '2024-01-15 11:15:00',
      createdBy: 1,
      notes: 'Italian extra virgin olive oil'
    },
    {
      id: 6,
      code: 'CHE001',
      name: 'Fresh Mozzarella',
      category: 'Dairy',
      categoryId: 6,
      quantity: 8,
      unit: 'kg',
      unitId: 1,
      price: 9.99,
      supplier: 'Dairy Delights',
      supplierId: 6,
      status: 'In Stock',
      location: 'Cold Storage A',
      locationId: 1,
      expiryDate: '2024-01-22',
      minThreshold: 3,
      maxThreshold: 15,
      description: 'Fresh mozzarella cheese',
      barcode: '1234567890128',
      lastUpdated: '2024-01-15 09:45:00',
      createdBy: 1,
      notes: 'Buffalo mozzarella'
    },
    {
      id: 7,
      code: 'GAR001',
      name: 'Garlic',
      category: 'Vegetables',
      categoryId: 1,
      quantity: 5,
      unit: 'kg',
      unitId: 1,
      price: 4.99,
      supplier: 'Fresh Farm Co.',
      supplierId: 1,
      status: 'In Stock',
      location: 'Dry Storage D',
      locationId: 4,
      expiryDate: '2024-02-15',
      minThreshold: 2,
      maxThreshold: 10,
      description: 'Fresh garlic bulbs',
      barcode: '1234567890129',
      lastUpdated: '2024-01-15 08:30:00',
      createdBy: 1,
      notes: 'Local garlic'
    },
    {
      id: 8,
      code: 'ONI001',
      name: 'Onions',
      category: 'Vegetables',
      categoryId: 1,
      quantity: 12,
      unit: 'kg',
      unitId: 1,
      price: 1.99,
      supplier: 'Fresh Farm Co.',
      supplierId: 1,
      status: 'In Stock',
      location: 'Dry Storage D',
      locationId: 4,
      expiryDate: '2024-02-10',
      minThreshold: 5,
      maxThreshold: 20,
      description: 'Yellow onions',
      barcode: '1234567890130',
      lastUpdated: '2024-01-15 07:15:00',
      createdBy: 1,
      notes: 'Sweet yellow onions'
    }
  ],

  // Inventory Transactions
  transactions: [
    {
      id: 1,
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      type: 'usage',
      quantity: -2.5,
      unit: 'kg',
      previousQuantity: 27.5,
      newQuantity: 25,
      user: 'Head Chef',
      userId: 2,
      timestamp: '2024-01-15 14:30:00',
      orderNumber: 'ORD-1234',
      status: 'completed',
      notes: 'Used for Spicy Chicken Pasta',
      cost: 7.48
    },
    {
      id: 2,
      ingredientId: 2,
      ingredientName: 'Chicken Breast',
      type: 'restock',
      quantity: 5,
      unit: 'kg',
      previousQuantity: 10,
      newQuantity: 15,
      user: 'Prep Cook',
      userId: 3,
      timestamp: '2024-01-15 13:45:00',
      orderNumber: 'SUP-5678',
      status: 'completed',
      notes: 'New delivery from Quality Meats',
      cost: 44.95
    },
    {
      id: 3,
      ingredientId: 3,
      ingredientName: 'Basil Leaves',
      type: 'usage',
      quantity: -0.5,
      unit: 'kg',
      previousQuantity: 2.5,
      newQuantity: 2,
      user: 'Head Chef',
      userId: 2,
      timestamp: '2024-01-15 12:20:00',
      orderNumber: 'ORD-1235',
      status: 'completed',
      notes: 'Used for Margherita Pizza',
      cost: 6.50
    },
    {
      id: 4,
      ingredientId: 5,
      ingredientName: 'Olive Oil',
      type: 'adjustment',
      quantity: -1,
      unit: 'L',
      previousQuantity: 1,
      newQuantity: 0,
      user: 'Prep Cook',
      userId: 3,
      timestamp: '2024-01-15 11:15:00',
      orderNumber: 'ADJ-001',
      status: 'completed',
      notes: 'Spilled during preparation',
      cost: 15.99
    },
    {
      id: 5,
      ingredientId: 4,
      ingredientName: 'Pasta Spaghetti',
      type: 'restock',
      quantity: 10,
      unit: 'kg',
      previousQuantity: 20,
      newQuantity: 30,
      user: 'Kitchen Manager',
      userId: 1,
      timestamp: '2024-01-15 10:30:00',
      orderNumber: 'SUP-5679',
      status: 'completed',
      notes: 'Bulk order from Italian Foods',
      cost: 39.90
    },
    {
      id: 6,
      ingredientId: 6,
      ingredientName: 'Fresh Mozzarella',
      type: 'usage',
      quantity: -1.5,
      unit: 'kg',
      previousQuantity: 9.5,
      newQuantity: 8,
      user: 'Head Chef',
      userId: 2,
      timestamp: '2024-01-15 09:45:00',
      orderNumber: 'ORD-1236',
      status: 'completed',
      notes: 'Used for multiple pizzas',
      cost: 14.99
    },
    {
      id: 7,
      ingredientId: 7,
      ingredientName: 'Garlic',
      type: 'waste',
      quantity: -0.5,
      unit: 'kg',
      previousQuantity: 5.5,
      newQuantity: 5,
      user: 'Prep Cook',
      userId: 3,
      timestamp: '2024-01-15 08:30:00',
      orderNumber: 'WASTE-001',
      status: 'completed',
      notes: 'Expired garlic disposal',
      cost: 2.50
    },
    {
      id: 8,
      ingredientId: 8,
      ingredientName: 'Onions',
      type: 'usage',
      quantity: -2,
      unit: 'kg',
      previousQuantity: 14,
      newQuantity: 12,
      user: 'Head Chef',
      userId: 2,
      timestamp: '2024-01-14 16:20:00',
      orderNumber: 'ORD-1233',
      status: 'completed',
      notes: 'Used for various dishes',
      cost: 3.98
    }
  ],

  // Stock Alerts
  stockAlerts: [
    {
      id: 1,
      ingredientId: 3,
      ingredientName: 'Basil Leaves',
      type: 'low_stock',
      currentQuantity: 2,
      threshold: 3,
      unit: 'kg',
      status: 'active',
      createdAt: '2024-01-15 12:20:00',
      resolvedAt: null,
      priority: 'high'
    },
    {
      id: 2,
      ingredientId: 5,
      ingredientName: 'Olive Oil',
      type: 'out_of_stock',
      currentQuantity: 0,
      threshold: 5,
      unit: 'L',
      status: 'active',
      createdAt: '2024-01-15 11:15:00',
      resolvedAt: null,
      priority: 'critical'
    },
    {
      id: 3,
      ingredientId: 6,
      ingredientName: 'Fresh Mozzarella',
      type: 'low_stock',
      currentQuantity: 8,
      threshold: 3,
      unit: 'kg',
      status: 'active',
      createdAt: '2024-01-15 09:45:00',
      resolvedAt: null,
      priority: 'medium'
    }
  ],

  // Expiry Alerts
  expiryAlerts: [
    {
      id: 1,
      ingredientId: 3,
      ingredientName: 'Basil Leaves',
      expiryDate: '2024-01-18',
      daysUntilExpiry: 3,
      status: 'active',
      priority: 'high'
    },
    {
      id: 2,
      ingredientId: 2,
      ingredientName: 'Chicken Breast',
      expiryDate: '2024-01-20',
      daysUntilExpiry: 5,
      status: 'active',
      priority: 'medium'
    },
    {
      id: 3,
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      expiryDate: '2024-01-25',
      daysUntilExpiry: 10,
      status: 'active',
      priority: 'low'
    }
  ]
};

// Inventory helper functions
export const InventoryHelpers = {
  // Get ingredient by ID
  getIngredientById: (id) => {
    return INVENTORY_DATABASE.ingredients.find(ingredient => ingredient.id === id);
  },

  // Get ingredient by code
  getIngredientByCode: (code) => {
    return INVENTORY_DATABASE.ingredients.find(ingredient => ingredient.code === code);
  },

  // Get ingredients by category
  getIngredientsByCategory: (categoryId) => {
    return INVENTORY_DATABASE.ingredients.filter(ingredient => ingredient.categoryId === categoryId);
  },

  // Get ingredients by status
  getIngredientsByStatus: (status) => {
    return INVENTORY_DATABASE.ingredients.filter(ingredient => ingredient.status === status);
  },

  // Get low stock ingredients
  getLowStockIngredients: () => {
    return INVENTORY_DATABASE.ingredients.filter(ingredient => 
      ingredient.quantity <= ingredient.minThreshold
    );
  },

  // Get out of stock ingredients
  getOutOfStockIngredients: () => {
    return INVENTORY_DATABASE.ingredients.filter(ingredient => ingredient.quantity === 0);
  },

  // Get transactions by ingredient
  getTransactionsByIngredient: (ingredientId) => {
    return INVENTORY_DATABASE.transactions.filter(transaction => 
      transaction.ingredientId === ingredientId
    );
  },

  // Get transactions by user
  getTransactionsByUser: (userId) => {
    return INVENTORY_DATABASE.transactions.filter(transaction => 
      transaction.userId === userId
    );
  },

  // Get transactions by type
  getTransactionsByType: (type) => {
    return INVENTORY_DATABASE.transactions.filter(transaction => 
      transaction.type === type
    );
  },

  // Get active stock alerts
  getActiveStockAlerts: () => {
    return INVENTORY_DATABASE.stockAlerts.filter(alert => alert.status === 'active');
  },

  // Get active expiry alerts
  getActiveExpiryAlerts: () => {
    return INVENTORY_DATABASE.expiryAlerts.filter(alert => alert.status === 'active');
  },

  // Search ingredients
  searchIngredients: (query) => {
    const searchTerm = query.toLowerCase();
    return INVENTORY_DATABASE.ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm) ||
      ingredient.code.toLowerCase().includes(searchTerm) ||
      ingredient.category.toLowerCase().includes(searchTerm)
    );
  },

  // Get inventory stats
  getInventoryStats: () => {
    const ingredients = INVENTORY_DATABASE.ingredients;
    return {
      totalIngredients: ingredients.length,
      inStock: ingredients.filter(i => i.status === 'In Stock').length,
      lowStock: ingredients.filter(i => i.status === 'Low Stock').length,
      outOfStock: ingredients.filter(i => i.status === 'Out of Stock').length,
      totalValue: ingredients.reduce((sum, i) => sum + (i.quantity * i.price), 0),
      lowStockValue: ingredients
        .filter(i => i.status === 'Low Stock')
        .reduce((sum, i) => sum + (i.quantity * i.price), 0)
    };
  },

  // Update ingredient quantity
  updateIngredientQuantity: (ingredientId, newQuantity, userId, type, notes) => {
    const ingredient = INVENTORY_DATABASE.ingredients.find(i => i.id === ingredientId);
    if (!ingredient) return false;

    const previousQuantity = ingredient.quantity;
    const quantityChange = newQuantity - previousQuantity;
    
    // Update ingredient
    ingredient.quantity = newQuantity;
    ingredient.lastUpdated = new Date().toISOString();
    
    // Update status based on thresholds
    if (newQuantity === 0) {
      ingredient.status = 'Out of Stock';
    } else if (newQuantity <= ingredient.minThreshold) {
      ingredient.status = 'Low Stock';
    } else {
      ingredient.status = 'In Stock';
    }

    // Add transaction record
    const transaction = {
      id: INVENTORY_DATABASE.transactions.length + 1,
      ingredientId,
      ingredientName: ingredient.name,
      type,
      quantity: quantityChange,
      unit: ingredient.unit,
      previousQuantity,
      newQuantity,
      user: 'User', // This would be replaced with actual user name
      userId,
      timestamp: new Date().toISOString(),
      orderNumber: type === 'restock' ? `SUP-${Date.now()}` : `TXN-${Date.now()}`,
      status: 'completed',
      notes,
      cost: Math.abs(quantityChange * ingredient.price)
    };

    INVENTORY_DATABASE.transactions.push(transaction);
    return true;
  }
};

export default INVENTORY_DATABASE; 