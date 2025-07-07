// Cloud Kitchen Inventory Management System Database
// This file contains all the mock database structures and sample data

export const DATABASE = {
  // Users/Staff Management
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@cloudkitchen.com',
      role: 'admin',
      position: 'Kitchen Manager',
      status: 'active',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-01-15',
      avatar: 'SJ',
      permissions: ['dashboard', 'inventory', 'users', 'reports', 'settings']
    },
    {
      id: 2,
      username: 'chef',
      password: 'chef123',
      name: 'Michael Chen',
      email: 'michael.chen@cloudkitchen.com',
      role: 'operator',
      position: 'Head Chef',
      status: 'active',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-02-20',
      avatar: 'MC',
      permissions: ['dashboard', 'inventory_view', 'scan_items', 'transaction_history']
    },
    {
      id: 3,
      username: 'prep',
      password: 'prep123',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@cloudkitchen.com',
      role: 'operator',
      position: 'Prep Cook',
      status: 'active',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-03-10',
      avatar: 'ER',
      permissions: ['dashboard', 'inventory_view', 'scan_items', 'transaction_history']
    },
    {
      id: 4,
      username: 'manager',
      password: 'manager123',
      name: 'David Kim',
      email: 'david.kim@cloudkitchen.com',
      role: 'admin',
      position: 'Operations Manager',
      status: 'inactive',
      phone: '+1 (555) 456-7890',
      joinDate: '2022-11-05',
      avatar: 'DK',
      permissions: ['dashboard', 'inventory', 'users', 'reports', 'settings']
    },
    {
      id: 5,
      username: 'sous',
      password: 'sous123',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@cloudkitchen.com',
      role: 'operator',
      position: 'Sous Chef',
      status: 'active',
      phone: '+1 (555) 567-8901',
      joinDate: '2023-04-15',
      avatar: 'LT',
      permissions: ['dashboard', 'inventory_view', 'scan_items', 'transaction_history']
    }
  ],

  // Ingredient Categories
  categories: [
    { id: 1, name: 'Vegetables', description: 'Fresh vegetables and produce', color: '#4caf50' },
    { id: 2, name: 'Meat', description: 'Fresh and frozen meats', color: '#f44336' },
    { id: 3, name: 'Herbs', description: 'Fresh herbs and spices', color: '#8bc34a' },
    { id: 4, name: 'Dry Goods', description: 'Pasta, rice, and dry ingredients', color: '#ff9800' },
    { id: 5, name: 'Oils & Sauces', description: 'Cooking oils and sauces', color: '#9c27b0' },
    { id: 6, name: 'Dairy', description: 'Milk, cheese, and dairy products', color: '#2196f3' },
    { id: 7, name: 'Seafood', description: 'Fresh and frozen seafood', color: '#00bcd4' },
    { id: 8, name: 'Fruits', description: 'Fresh fruits and berries', color: '#e91e63' }
  ],

  // Storage Locations
  locations: [
    { id: 1, name: 'Cold Storage A', type: 'refrigerator', temperature: '2-4°C', capacity: '1000kg' },
    { id: 2, name: 'Freezer B', type: 'freezer', temperature: '-18°C', capacity: '800kg' },
    { id: 3, name: 'Refrigerator C', type: 'refrigerator', temperature: '2-4°C', capacity: '500kg' },
    { id: 4, name: 'Dry Storage D', type: 'shelf', temperature: '18-22°C', capacity: '2000kg' },
    { id: 5, name: 'Dry Storage E', type: 'shelf', temperature: '18-22°C', capacity: '1500kg' },
    { id: 6, name: 'Wine Cellar', type: 'cool', temperature: '12-14°C', capacity: '300L' }
  ],

  // Suppliers
  suppliers: [
    { id: 1, name: 'Fresh Farm Co.', contact: 'John Smith', phone: '+1 (555) 111-1111', email: 'john@freshfarm.com', category: 'Vegetables' },
    { id: 2, name: 'Quality Meats Ltd.', contact: 'Mary Johnson', phone: '+1 (555) 222-2222', email: 'mary@qualitymeats.com', category: 'Meat' },
    { id: 3, name: 'Herb Garden', contact: 'Tom Wilson', phone: '+1 (555) 333-3333', email: 'tom@herbgarden.com', category: 'Herbs' },
    { id: 4, name: 'Italian Foods Inc.', contact: 'Maria Rossi', phone: '+1 (555) 444-4444', email: 'maria@italianfoods.com', category: 'Dry Goods' },
    { id: 5, name: 'Mediterranean Imports', contact: 'Ahmed Hassan', phone: '+1 (555) 555-5555', email: 'ahmed@medimports.com', category: 'Oils & Sauces' },
    { id: 6, name: 'Dairy Delights', contact: 'Sarah Brown', phone: '+1 (555) 666-6666', email: 'sarah@dairydelights.com', category: 'Dairy' }
  ],

  // Units of Measurement
  units: [
    { id: 1, name: 'kg', description: 'Kilograms', type: 'weight' },
    { id: 2, name: 'L', description: 'Liters', type: 'volume' },
    { id: 3, name: 'pieces', description: 'Individual pieces', type: 'count' },
    { id: 4, name: 'packets', description: 'Packets or bags', type: 'count' },
    { id: 5, name: 'bottles', description: 'Bottles or containers', type: 'count' },
    { id: 6, name: 'cans', description: 'Canned goods', type: 'count' },
    { id: 7, name: 'g', description: 'Grams', type: 'weight' },
    { id: 8, name: 'ml', description: 'Milliliters', type: 'volume' }
  ],

  // Menu Items
  menuItems: [
    { id: 1, name: 'Spicy Chicken Pasta', category: 'Pasta Dishes', price: 15.99, status: 'active', rating: 4.8, orders: 156, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: 14.99, status: 'active', rating: 4.6, orders: 142, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: 12.99, status: 'active', rating: 4.7, orders: 98, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 4, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.99, status: 'active', rating: 4.9, orders: 87, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 5, name: 'Garlic Bread', category: 'Sides', price: 4.99, status: 'active', rating: 4.5, orders: 76, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 6, name: 'BBQ Chicken Wings', category: 'Appetizers', price: 11.99, status: 'active', rating: 4.4, orders: 65, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 7, name: 'Vegetarian Lasagna', category: 'Pasta Dishes', price: 13.99, status: 'active', rating: 4.6, orders: 54, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null },
    { id: 8, name: 'Tiramisu', category: 'Desserts', price: 9.99, status: 'active', rating: 4.8, orders: 43, sop: { steps: [], ingredients: [], notes: '' }, sopPdf: null }
  ],

  // Menu Categories
  menuCategories: [
    { id: 1, name: 'Pasta Dishes', description: 'Italian pasta dishes', color: '#8884d8' },
    { id: 2, name: 'Pizza', description: 'Traditional and specialty pizzas', color: '#82ca9d' },
    { id: 3, name: 'Salads', description: 'Fresh salads and greens', color: '#ffc658' },
    { id: 4, name: 'Desserts', description: 'Sweet treats and desserts', color: '#ff7300' },
    { id: 5, name: 'Beverages', description: 'Drinks and beverages', color: '#00C49F' },
    { id: 6, name: 'Appetizers', description: 'Starters and appetizers', color: '#FF8042' },
    { id: 7, name: 'Sides', description: 'Side dishes and accompaniments', color: '#0088FE' }
  ]
};

// Database helper functions
export const DatabaseHelpers = {
  // Get user by credentials
  authenticateUser: (username, password) => {
    return DATABASE.users.find(user => 
      user.username === username && user.password === password
    );
  },

  // Get user by ID
  getUserById: (id) => {
    return DATABASE.users.find(user => user.id === id);
  },

  // Get all active users
  getActiveUsers: () => {
    return DATABASE.users.filter(user => user.status === 'active');
  },

  // Get users by role
  getUsersByRole: (role) => {
    return DATABASE.users.filter(user => user.role === role);
  },

  // Get category by ID
  getCategoryById: (id) => {
    return DATABASE.categories.find(category => category.id === id);
  },

  // Get location by ID
  getLocationById: (id) => {
    return DATABASE.locations.find(location => location.id === id);
  },

  // Get supplier by ID
  getSupplierById: (id) => {
    return DATABASE.suppliers.find(supplier => supplier.id === id);
  },

  // Get unit by ID
  getUnitById: (id) => {
    return DATABASE.units.find(unit => unit.id === id);
  },

  // Get menu item by ID
  getMenuItemById: (id) => {
    return DATABASE.menuItems.find(item => item.id === id);
  },

  // Get menu items by category
  getMenuItemsByCategory: (categoryId) => {
    return DATABASE.menuItems.filter(item => item.category === categoryId);
  },

  // Search users
  searchUsers: (query) => {
    const searchTerm = query.toLowerCase();
    return DATABASE.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.position.toLowerCase().includes(searchTerm)
    );
  },

  // Get dashboard stats
  getDashboardStats: () => {
    return {
      totalUsers: DATABASE.users.length,
      activeUsers: DATABASE.users.filter(user => user.status === 'active').length,
      totalCategories: DATABASE.categories.length,
      totalMenuItems: DATABASE.menuItems.length,
      totalSuppliers: DATABASE.suppliers.length,
      totalLocations: DATABASE.locations.length
    };
  }
};

export default DATABASE; 