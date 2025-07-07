// Cloud Kitchen Orders Database
// Contains order management, menu items, and order-ingredient relationships

export const ORDERS_DATABASE = {
  // Orders
  orders: [
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
      assignedTo: 2, // Head Chef
      paymentMethod: 'credit_card',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      orderNumber: 'ORD-1235',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 234-5678',
      customerEmail: 'sarah.johnson@email.com',
      orderType: 'pickup',
      status: 'completed',
      totalAmount: 28.97,
      tax: 2.32,
      tip: 0,
      finalAmount: 31.29,
      orderDate: '2024-01-15 12:15:00',
      completedDate: '2024-01-15 12:35:00',
      pickupTime: '12:30',
      notes: 'No onions in pizza',
      assignedTo: 2, // Head Chef
      paymentMethod: 'cash',
      paymentStatus: 'paid'
    },
    {
      id: 3,
      orderNumber: 'ORD-1236',
      customerName: 'Mike Wilson',
      customerPhone: '+1 (555) 345-6789',
      customerEmail: 'mike.wilson@email.com',
      orderType: 'delivery',
      status: 'in_progress',
      totalAmount: 45.96,
      tax: 3.68,
      tip: 7.00,
      finalAmount: 56.64,
      orderDate: '2024-01-15 09:40:00',
      estimatedDelivery: '10:15',
      deliveryAddress: '456 Oak Ave, City, State 12345',
      notes: 'Extra cheese on pasta',
      assignedTo: 2, // Head Chef
      paymentMethod: 'online',
      paymentStatus: 'paid'
    },
    {
      id: 4,
      orderNumber: 'ORD-1237',
      customerName: 'Emily Davis',
      customerPhone: '+1 (555) 456-7890',
      customerEmail: 'emily.davis@email.com',
      orderType: 'pickup',
      status: 'pending',
      totalAmount: 18.98,
      tax: 1.52,
      tip: 0,
      finalAmount: 20.50,
      orderDate: '2024-01-15 15:10:00',
      pickupTime: '15:30',
      notes: 'Gluten-free pasta',
      assignedTo: null,
      paymentMethod: 'credit_card',
      paymentStatus: 'pending'
    },
    {
      id: 5,
      orderNumber: 'ORD-1238',
      customerName: 'David Brown',
      customerPhone: '+1 (555) 567-8901',
      customerEmail: 'david.brown@email.com',
      orderType: 'delivery',
      status: 'cancelled',
      totalAmount: 25.97,
      tax: 2.08,
      tip: 4.00,
      finalAmount: 32.05,
      orderDate: '2024-01-15 13:20:00',
      cancelledDate: '2024-01-15 13:25:00',
      deliveryAddress: '789 Pine St, City, State 12345',
      notes: 'Customer cancelled - out of stock',
      assignedTo: 3, // Prep Cook
      paymentMethod: 'online',
      paymentStatus: 'refunded'
    }
  ],

  // Order Items (what was ordered)
  orderItems: [
    {
      id: 1,
      orderId: 1,
      orderNumber: 'ORD-1234',
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      quantity: 2,
      unitPrice: 15.99,
      totalPrice: 31.98,
      specialInstructions: 'Extra spicy',
      status: 'completed',
      preparedBy: 2, // Head Chef
      preparedAt: '2024-01-15 14:35:00'
    },
    {
      id: 2,
      orderId: 1,
      orderNumber: 'ORD-1234',
      menuItemId: 5,
      menuItemName: 'Garlic Bread',
      quantity: 1,
      unitPrice: 4.99,
      totalPrice: 4.99,
      specialInstructions: 'Extra garlic',
      status: 'completed',
      preparedBy: 3, // Prep Cook
      preparedAt: '2024-01-15 14:30:00'
    },
    {
      id: 3,
      orderId: 2,
      orderNumber: 'ORD-1235',
      menuItemId: 2,
      menuItemName: 'Margherita Pizza',
      quantity: 1,
      unitPrice: 14.99,
      totalPrice: 14.99,
      specialInstructions: 'No onions',
      status: 'completed',
      preparedBy: 2, // Head Chef
      preparedAt: '2024-01-15 12:25:00'
    },
    {
      id: 4,
      orderId: 2,
      orderNumber: 'ORD-1235',
      menuItemId: 3,
      menuItemName: 'Caesar Salad',
      quantity: 1,
      unitPrice: 12.99,
      totalPrice: 12.99,
      specialInstructions: 'Extra dressing on the side',
      status: 'completed',
      preparedBy: 3, // Prep Cook
      preparedAt: '2024-01-15 12:20:00'
    },
    {
      id: 5,
      orderId: 3,
      orderNumber: 'ORD-1236',
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      quantity: 2,
      unitPrice: 15.99,
      totalPrice: 31.98,
      specialInstructions: 'Extra cheese',
      status: 'in_progress',
      preparedBy: 2, // Head Chef
      preparedAt: null
    },
    {
      id: 6,
      orderId: 3,
      orderNumber: 'ORD-1236',
      menuItemId: 6,
      menuItemName: 'BBQ Chicken Wings',
      quantity: 1,
      unitPrice: 11.99,
      totalPrice: 11.99,
      specialInstructions: 'Extra BBQ sauce',
      status: 'in_progress',
      preparedBy: 2, // Head Chef
      preparedAt: null
    },
    {
      id: 7,
      orderId: 4,
      orderNumber: 'ORD-1237',
      menuItemId: 7,
      menuItemName: 'Vegetarian Lasagna',
      quantity: 1,
      unitPrice: 13.99,
      totalPrice: 13.99,
      specialInstructions: 'Gluten-free pasta',
      status: 'pending',
      preparedBy: null,
      preparedAt: null
    },
    {
      id: 8,
      orderId: 4,
      orderNumber: 'ORD-1237',
      menuItemId: 4,
      menuItemName: 'Chocolate Lava Cake',
      quantity: 1,
      unitPrice: 8.99,
      totalPrice: 8.99,
      specialInstructions: 'Extra chocolate sauce',
      status: 'pending',
      preparedBy: null,
      preparedAt: null
    }
  ],

  // Menu Item Recipes (ingredients needed for each menu item)
  menuItemRecipes: [
    {
      id: 1,
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      quantity: 0.5,
      unit: 'kg',
      isOptional: false,
      notes: 'Diced tomatoes for sauce'
    },
    {
      id: 2,
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      ingredientId: 2,
      ingredientName: 'Chicken Breast',
      quantity: 0.3,
      unit: 'kg',
      isOptional: false,
      notes: 'Diced chicken breast'
    },
    {
      id: 3,
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      ingredientId: 4,
      ingredientName: 'Pasta Spaghetti',
      quantity: 0.2,
      unit: 'kg',
      isOptional: false,
      notes: 'Cooked pasta'
    },
    {
      id: 4,
      menuItemId: 1,
      menuItemName: 'Spicy Chicken Pasta',
      ingredientId: 7,
      ingredientName: 'Garlic',
      quantity: 0.05,
      unit: 'kg',
      isOptional: false,
      notes: 'Minced garlic'
    },
    {
      id: 5,
      menuItemId: 2,
      menuItemName: 'Margherita Pizza',
      ingredientId: 6,
      ingredientName: 'Fresh Mozzarella',
      quantity: 0.2,
      unit: 'kg',
      isOptional: false,
      notes: 'Sliced mozzarella'
    },
    {
      id: 6,
      menuItemId: 2,
      menuItemName: 'Margherita Pizza',
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      quantity: 0.3,
      unit: 'kg',
      isOptional: false,
      notes: 'Sliced tomatoes'
    },
    {
      id: 7,
      menuItemId: 2,
      menuItemName: 'Margherita Pizza',
      ingredientId: 3,
      ingredientName: 'Basil Leaves',
      quantity: 0.05,
      unit: 'kg',
      isOptional: false,
      notes: 'Fresh basil leaves'
    },
    {
      id: 8,
      menuItemId: 3,
      menuItemName: 'Caesar Salad',
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      quantity: 0.1,
      unit: 'kg',
      isOptional: false,
      notes: 'Cherry tomatoes'
    },
    {
      id: 9,
      menuItemId: 3,
      menuItemName: 'Caesar Salad',
      ingredientId: 6,
      ingredientName: 'Fresh Mozzarella',
      quantity: 0.1,
      unit: 'kg',
      isOptional: false,
      notes: 'Cubed mozzarella'
    }
  ],

  // Order Status History
  orderStatusHistory: [
    {
      id: 1,
      orderId: 1,
      orderNumber: 'ORD-1234',
      status: 'pending',
      timestamp: '2024-01-15 14:25:00',
      updatedBy: 1, // Kitchen Manager
      notes: 'Order received'
    },
    {
      id: 2,
      orderId: 1,
      orderNumber: 'ORD-1234',
      status: 'confirmed',
      timestamp: '2024-01-15 14:26:00',
      updatedBy: 1,
      notes: 'Order confirmed'
    },
    {
      id: 3,
      orderId: 1,
      orderNumber: 'ORD-1234',
      status: 'in_progress',
      timestamp: '2024-01-15 14:30:00',
      updatedBy: 2, // Head Chef
      notes: 'Cooking started'
    },
    {
      id: 4,
      orderId: 1,
      orderNumber: 'ORD-1234',
      status: 'ready',
      timestamp: '2024-01-15 14:40:00',
      updatedBy: 2,
      notes: 'Order ready for delivery'
    },
    {
      id: 5,
      orderId: 1,
      orderNumber: 'ORD-1234',
      status: 'completed',
      timestamp: '2024-01-15 14:45:00',
      updatedBy: 1,
      notes: 'Order delivered'
    }
  ],

  // Daily Order Summary
  dailyOrderSummary: [
    {
      date: '2024-01-15',
      totalOrders: 5,
      completedOrders: 3,
      cancelledOrders: 1,
      pendingOrders: 1,
      totalRevenue: 152.85,
      averageOrderValue: 30.57,
      topSellingItem: 'Spicy Chicken Pasta',
      topSellingItemOrders: 4
    },
    {
      date: '2024-01-14',
      totalOrders: 8,
      completedOrders: 7,
      cancelledOrders: 0,
      pendingOrders: 1,
      totalRevenue: 245.67,
      averageOrderValue: 30.71,
      topSellingItem: 'Margherita Pizza',
      topSellingItemOrders: 3
    },
    {
      date: '2024-01-13',
      totalOrders: 6,
      completedOrders: 6,
      cancelledOrders: 0,
      pendingOrders: 0,
      totalRevenue: 189.45,
      averageOrderValue: 31.58,
      topSellingItem: 'Spicy Chicken Pasta',
      topSellingItemOrders: 3
    }
  ]
};

// Orders helper functions
export const OrdersHelpers = {
  // Get order by ID
  getOrderById: (id) => {
    return ORDERS_DATABASE.orders.find(order => order.id === id);
  },

  // Get order by order number
  getOrderByNumber: (orderNumber) => {
    return ORDERS_DATABASE.orders.find(order => order.orderNumber === orderNumber);
  },

  // Get orders by status
  getOrdersByStatus: (status) => {
    return ORDERS_DATABASE.orders.filter(order => order.status === status);
  },

  // Get orders by date
  getOrdersByDate: (date) => {
    return ORDERS_DATABASE.orders.filter(order => 
      order.orderDate.startsWith(date)
    );
  },

  // Get orders by assigned user
  getOrdersByUser: (userId) => {
    return ORDERS_DATABASE.orders.filter(order => order.assignedTo === userId);
  },

  // Get order items by order ID
  getOrderItemsByOrderId: (orderId) => {
    return ORDERS_DATABASE.orderItems.filter(item => item.orderId === orderId);
  },

  // Get menu item recipe
  getMenuItemRecipe: (menuItemId) => {
    return ORDERS_DATABASE.menuItemRecipes.filter(recipe => 
      recipe.menuItemId === menuItemId
    );
  },

  // Get order status history
  getOrderStatusHistory: (orderId) => {
    return ORDERS_DATABASE.orderStatusHistory.filter(history => 
      history.orderId === orderId
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },

  // Get today's orders
  getTodayOrders: () => {
    const today = new Date().toISOString().split('T')[0];
    return ORDERS_DATABASE.orders.filter(order => 
      order.orderDate.startsWith(today)
    );
  },

  // Get pending orders
  getPendingOrders: () => {
    return ORDERS_DATABASE.orders.filter(order => 
      order.status === 'pending' || order.status === 'in_progress'
    );
  },

  // Calculate order statistics
  getOrderStats: () => {
    const orders = ORDERS_DATABASE.orders;
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(order => order.orderDate.startsWith(today));
    
    return {
      totalOrders: orders.length,
      todayOrders: todayOrders.length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'in_progress').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders.reduce((sum, o) => sum + o.finalAmount, 0),
      todayRevenue: todayOrders.reduce((sum, o) => sum + o.finalAmount, 0),
      averageOrderValue: orders.length > 0 ? 
        orders.reduce((sum, o) => sum + o.finalAmount, 0) / orders.length : 0
    };
  },

  // Update order status
  updateOrderStatus: (orderId, newStatus, userId, notes) => {
    const order = ORDERS_DATABASE.orders.find(o => o.id === orderId);
    if (!order) return false;

    const oldStatus = order.status;
    order.status = newStatus;

    // Add status history
    const statusHistory = {
      id: ORDERS_DATABASE.orderStatusHistory.length + 1,
      orderId,
      orderNumber: order.orderNumber,
      status: newStatus,
      timestamp: new Date().toISOString(),
      updatedBy: userId,
      notes: notes || `Status changed from ${oldStatus} to ${newStatus}`
    };

    ORDERS_DATABASE.orderStatusHistory.push(statusHistory);

    // Update completion date if completed
    if (newStatus === 'completed') {
      order.completedDate = new Date().toISOString();
    }

    return true;
  },

  // Calculate ingredient usage for an order
  calculateIngredientUsage: (orderId) => {
    const orderItems = ORDERS_DATABASE.orderItems.filter(item => item.orderId === orderId);
    const usage = [];

    orderItems.forEach(item => {
      const recipe = ORDERS_DATABASE.menuItemRecipes.filter(r => r.menuItemId === item.menuItemId);
      
      recipe.forEach(ingredient => {
        const totalUsage = ingredient.quantity * item.quantity;
        usage.push({
          ingredientId: ingredient.ingredientId,
          ingredientName: ingredient.ingredientName,
          quantity: totalUsage,
          unit: ingredient.unit,
          menuItem: item.menuItemName,
          orderNumber: item.orderNumber
        });
      });
    });

    return usage;
  }
};

export default ORDERS_DATABASE; 