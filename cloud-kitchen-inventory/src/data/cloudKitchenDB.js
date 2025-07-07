// Multi-tenant Cloud Kitchen Database System
// Each cloud kitchen has its own isolated database

// Cloud Kitchen Registry - stores all cloud kitchen information
export const cloudKitchenRegistry = [
  {
    id: 'ck_001',
    name: 'Spice Garden Kitchen',
    location: 'Downtown District',
    owner: 'John Smith',
    email: 'john@spicegarden.com',
    phone: '+1-555-0101',
    status: 'active',
    createdAt: '2024-01-01',
    subscription: 'premium',
    maxUsers: 10
  },
  {
    id: 'ck_002', 
    name: 'Fresh Bites Express',
    location: 'Westside Mall',
    owner: 'Sarah Johnson',
    email: 'sarah@freshbites.com',
    phone: '+1-555-0102',
    status: 'active',
    createdAt: '2024-01-15',
    subscription: 'basic',
    maxUsers: 5
  },
  {
    id: 'ck_003',
    name: 'Urban Pizza Hub',
    location: 'University District',
    owner: 'Mike Chen',
    email: 'mike@urbanpizza.com',
    phone: '+1-555-0103',
    status: 'active',
    createdAt: '2024-02-01',
    subscription: 'premium',
    maxUsers: 15
  }
];

// User Management for each cloud kitchen
export const cloudKitchenUsers = {
  'ck_001': [
    {
      id: 'u_001',
      username: 'admin_spice',
      password: 'hashed_password_here', // In real app, use bcrypt
      name: 'John Smith',
      email: 'john@spicegarden.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: 'u_002',
      username: 'chef_spice',
      password: 'hashed_password_here',
      name: 'Maria Garcia',
      email: 'maria@spicegarden.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-01-02',
      lastLogin: '2024-01-15T09:15:00Z'
    },
    {
      id: 'u_003',
      username: 'prep_spice',
      password: 'hashed_password_here',
      name: 'David Wilson',
      email: 'david@spicegarden.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-01-03',
      lastLogin: '2024-01-15T08:45:00Z'
    }
  ],
  'ck_002': [
    {
      id: 'u_004',
      username: 'admin_fresh',
      password: 'hashed_password_here',
      name: 'Sarah Johnson',
      email: 'sarah@freshbites.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-15T11:20:00Z'
    },
    {
      id: 'u_005',
      username: 'chef_fresh',
      password: 'hashed_password_here',
      name: 'Lisa Brown',
      email: 'lisa@freshbites.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-01-16',
      lastLogin: '2024-01-15T10:30:00Z'
    }
  ],
  'ck_003': [
    {
      id: 'u_006',
      username: 'admin_urban',
      password: 'hashed_password_here',
      name: 'Mike Chen',
      email: 'mike@urbanpizza.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-02-01',
      lastLogin: '2024-01-15T12:15:00Z'
    },
    {
      id: 'u_007',
      username: 'chef_urban',
      password: 'hashed_password_here',
      name: 'Alex Rodriguez',
      email: 'alex@urbanpizza.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-02-02',
      lastLogin: '2024-01-15T11:45:00Z'
    },
    {
      id: 'u_008',
      username: 'prep_urban',
      password: 'hashed_password_here',
      name: 'Emma Davis',
      email: 'emma@urbanpizza.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-02-03',
      lastLogin: '2024-01-15T10:20:00Z'
    }
  ]
};

// Separate inventory databases for each cloud kitchen
export const cloudKitchenInventory = {
  'ck_001': {
    categories: [
      { id: 1, name: 'Vegetables' },
      { id: 2, name: 'Meat' },
      { id: 3, name: 'Herbs' },
      { id: 4, name: 'Dry Goods' },
      { id: 5, name: 'Oils & Sauces' }
    ],
    units: [
      { id: 1, name: 'kg' },
      { id: 2, name: 'g' },
      { id: 3, name: 'L' },
      { id: 4, name: 'ml' },
      { id: 5, name: 'pieces' }
    ],
    suppliers: [
      { id: 1, name: 'Fresh Farm Co.' },
      { id: 2, name: 'Quality Meats Ltd.' },
      { id: 3, name: 'Herb Garden' },
      { id: 4, name: 'Italian Foods Inc.' }
    ],
    locations: [
      { id: 1, name: 'Cold Storage A' },
      { id: 2, name: 'Freezer B' },
      { id: 3, name: 'Refrigerator C' },
      { id: 4, name: 'Dry Storage D' }
    ],
    ingredients: [
      {
        id: 1,
        code: 'TOM001',
        name: 'Fresh Tomatoes',
        categoryId: 1,
        category: 'Vegetables',
        quantity: 25,
        unitId: 1,
        unit: 'kg',
        price: 248.67,
        supplierId: 1,
        supplier: 'Fresh Farm Co.',
        status: 'In Stock',
        locationId: 1,
        location: 'Cold Storage A',
        expiryDate: '2024-01-25',
        minThreshold: 5,
        maxThreshold: 50,
        description: 'Fresh organic tomatoes',
        barcode: '123456789',
        lastUpdated: '2024-01-15T10:30:00Z',
        createdBy: 'u_001',
        notes: 'Best quality tomatoes'
      }
      // Add more ingredients as needed
    ]
  },
  'ck_002': {
    categories: [
      { id: 1, name: 'Vegetables' },
      { id: 2, name: 'Meat' },
      { id: 3, name: 'Dairy' },
      { id: 4, name: 'Bread' },
      { id: 5, name: 'Condiments' }
    ],
    units: [
      { id: 1, name: 'kg' },
      { id: 2, name: 'g' },
      { id: 3, name: 'L' },
      { id: 4, name: 'ml' },
      { id: 5, name: 'pieces' }
    ],
    suppliers: [
      { id: 1, name: 'Local Farm Market' },
      { id: 2, name: 'Premium Meats' },
      { id: 3, name: 'Dairy Fresh' },
      { id: 4, name: 'Bakery Express' }
    ],
    locations: [
      { id: 1, name: 'Cold Storage A' },
      { id: 2, name: 'Freezer B' },
      { id: 3, name: 'Refrigerator C' },
      { id: 4, name: 'Dry Storage D' }
    ],
    ingredients: [
      {
        id: 1,
        code: 'LET001',
        name: 'Fresh Lettuce',
        categoryId: 1,
        category: 'Vegetables',
        quantity: 15,
        unitId: 1,
        unit: 'kg',
        price: 165.57,
        supplierId: 1,
        supplier: 'Local Farm Market',
        status: 'In Stock',
        locationId: 1,
        location: 'Cold Storage A',
        expiryDate: '2024-01-20',
        minThreshold: 3,
        maxThreshold: 30,
        description: 'Fresh crisp lettuce',
        barcode: '987654321',
        lastUpdated: '2024-01-15T09:15:00Z',
        createdBy: 'u_004',
        notes: 'Organic lettuce'
      }
      // Add more ingredients as needed
    ]
  },
  'ck_003': {
    categories: [
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Meat' },
      { id: 3, name: 'Vegetables' },
      { id: 4, name: 'Flour' },
      { id: 5, name: 'Sauces' }
    ],
    units: [
      { id: 1, name: 'kg' },
      { id: 2, name: 'g' },
      { id: 3, name: 'L' },
      { id: 4, name: 'ml' },
      { id: 5, name: 'pieces' }
    ],
    suppliers: [
      { id: 1, name: 'Cheese Masters' },
      { id: 2, name: 'Pizza Meats' },
      { id: 3, name: 'Fresh Veggies' },
      { id: 4, name: 'Flour Mill' }
    ],
    locations: [
      { id: 1, name: 'Cold Storage A' },
      { id: 2, name: 'Freezer B' },
      { id: 3, name: 'Refrigerator C' },
      { id: 4, name: 'Dry Storage D' }
    ],
    ingredients: [
      {
        id: 1,
        code: 'MOZ001',
        name: 'Fresh Mozzarella',
        categoryId: 1,
        category: 'Cheese',
        quantity: 20,
        unitId: 1,
        unit: 'kg',
        price: 747.67,
        supplierId: 1,
        supplier: 'Cheese Masters',
        status: 'In Stock',
        locationId: 1,
        location: 'Cold Storage A',
        expiryDate: '2024-01-22',
        minThreshold: 5,
        maxThreshold: 40,
        description: 'Fresh mozzarella for pizzas',
        barcode: '456789123',
        lastUpdated: '2024-01-15T11:45:00Z',
        createdBy: 'u_006',
        notes: 'Premium mozzarella'
      }
      // Add more ingredients as needed
    ]
  }
};

// Menu items for each cloud kitchen
export const cloudKitchenMenus = {
  'ck_001': [
    {
      id: 1,
      name: 'Spicy Chicken Pasta',
      category: 'Pasta',
      price: 1080.47,
      status: 'Active',
      description: 'Spicy chicken pasta with herbs',
      recipe: [
        { ingredientId: 1, name: 'Fresh Tomatoes', quantity: 0.5, unit: 'kg' },
        { ingredientId: 2, name: 'Pasta', quantity: 0.2, unit: 'kg' },
        { ingredientId: 3, name: 'Chicken Breast', quantity: 0.15, unit: 'kg' },
      ],
      prepTime: 15,
      createdBy: 'u_001'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: 1246.97,
      status: 'Active',
      description: 'Classic margherita pizza',
      recipe: [
        { ingredientId: 4, name: 'Pizza Dough', quantity: 1, unit: 'pieces' },
        { ingredientId: 1, name: 'Fresh Tomatoes', quantity: 0.2, unit: 'kg' },
        { ingredientId: 5, name: 'Mozzarella', quantity: 0.1, unit: 'kg' },
      ],
      prepTime: 20,
      createdBy: 'u_001'
    }
  ],
  'ck_002': [
    {
      id: 1,
      name: 'Caesar Salad',
      category: 'Salad',
      price: 747.67,
      status: 'Active',
      description: 'Fresh caesar salad',
      recipe: [
        { ingredientId: 1, name: 'Lettuce', quantity: 0.15, unit: 'kg' },
        { ingredientId: 2, name: 'Croutons', quantity: 0.05, unit: 'kg' },
        { ingredientId: 3, name: 'Parmesan', quantity: 0.02, unit: 'kg' },
        { ingredientId: 4, name: 'Caesar Dressing', quantity: 0.05, unit: 'L' },
      ],
      prepTime: 8,
      createdBy: 'u_004'
    },
    {
      id: 2,
      name: 'Grilled Chicken Sandwich',
      category: 'Sandwich',
      price: 830.47,
      status: 'Active',
      description: 'Grilled chicken sandwich',
      recipe: [
        { ingredientId: 2, name: 'Chicken', quantity: 0.1, unit: 'kg' },
        { ingredientId: 5, name: 'Bread', quantity: 0.05, unit: 'pieces' },
        { ingredientId: 1, name: 'Lettuce', quantity: 0.05, unit: 'kg' },
        { ingredientId: 6, name: 'Tomato', quantity: 0.05, unit: 'pieces' },
      ],
      prepTime: 12,
      createdBy: 'u_004'
    }
  ],
  'ck_003': [
    {
      id: 1,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      price: 1413.47,
      status: 'Active',
      description: 'Classic pepperoni pizza',
      recipe: [
        { ingredientId: 4, name: 'Pizza Dough', quantity: 1, unit: 'pieces' },
        { ingredientId: 7, name: 'Pepperoni', quantity: 0.1, unit: 'kg' },
        { ingredientId: 5, name: 'Mozzarella', quantity: 0.1, unit: 'kg' },
        { ingredientId: 8, name: 'Tomato Sauce', quantity: 0.05, unit: 'L' },
      ],
      prepTime: 18,
      createdBy: 'u_006'
    },
    {
      id: 2,
      name: 'BBQ Chicken Pizza',
      category: 'Pizza',
      price: 1496.47,
      status: 'Active',
      description: 'BBQ chicken pizza',
      recipe: [
        { ingredientId: 4, name: 'Pizza Dough', quantity: 1, unit: 'pieces' },
        { ingredientId: 2, name: 'Chicken', quantity: 0.15, unit: 'kg' },
        { ingredientId: 9, name: 'BBQ Sauce', quantity: 0.05, unit: 'L' },
        { ingredientId: 5, name: 'Mozzarella', quantity: 0.1, unit: 'kg' },
      ],
      prepTime: 20,
      createdBy: 'u_006'
    }
  ]
};

// Helper functions for multi-tenant operations
export const CloudKitchenDB = {
  // Get cloud kitchen by ID
  getCloudKitchen: (kitchenId) => {
    return cloudKitchenRegistry.find(kitchen => kitchen.id === kitchenId);
  },

  // Get users for a specific cloud kitchen
  getUsers: (kitchenId) => {
    return cloudKitchenUsers[kitchenId] || [];
  },

  // Get inventory for a specific cloud kitchen
  getInventory: (kitchenId) => {
    return cloudKitchenInventory[kitchenId] || {};
  },

  // Get menu for a specific cloud kitchen
  getMenu: (kitchenId) => {
    return cloudKitchenMenus[kitchenId] || [];
  },

  // Authenticate user for a specific cloud kitchen
  authenticateUser: (kitchenId, username, password) => {
    const users = cloudKitchenUsers[kitchenId] || [];
    const user = users.find(u => u.username === username && u.password === password);
    return user ? { ...user, cloudKitchenId: kitchenId } : null;
  },

  // Add new user to a cloud kitchen
  addUser: (kitchenId, userData) => {
    if (!cloudKitchenUsers[kitchenId]) {
      cloudKitchenUsers[kitchenId] = [];
    }
    const newUser = {
      id: `u_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    cloudKitchenUsers[kitchenId].push(newUser);
    return newUser;
  },

  // Update user in a cloud kitchen
  updateUser: (kitchenId, userId, updates) => {
    const users = cloudKitchenUsers[kitchenId] || [];
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      return users[userIndex];
    }
    return null;
  },

  // Delete user from a cloud kitchen
  deleteUser: (kitchenId, userId) => {
    const users = cloudKitchenUsers[kitchenId] || [];
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
};

// --- Platform Level Data ---

// Platform Admins - have access to the super admin panel
export const platformAdmins = [
  {
    id: 'pa_001',
    username: 'superadmin',
    password: 'super_password', // In real app, use bcrypt
    name: 'Platform Admin',
    email: 'admin@platform.com',
    role: 'super_admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15T14:00:00Z'
  }
];

// Add super admin authentication to the main DB object
CloudKitchenDB.authenticateSuperAdmin = (username, password) => {
  const admin = platformAdmins.find(
    (a) => a.username === username && a.password === password
  );
  return admin || null;
};

export default CloudKitchenDB; 