// Cloud Kitchen Analytics Database
// Contains performance metrics, trends, and business intelligence data

export const ANALYTICS_DATABASE = {
  // Daily Performance Metrics
  dailyMetrics: [
    {
      date: '2024-01-15',
      totalOrders: 45,
      completedOrders: 42,
      cancelledOrders: 2,
      pendingOrders: 1,
      totalRevenue: 675.50,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 23.5,
      totalIngredientsWasted: 1.2,
      wasteCost: 18.50,
      topSellingItem: 'Spicy Chicken Pasta',
      topSellingItemOrders: 12,
      peakHour: '12:00-13:00',
      averagePreparationTime: 18,
      customerSatisfaction: 4.6
    },
    {
      date: '2024-01-14',
      totalOrders: 52,
      completedOrders: 50,
      cancelledOrders: 1,
      pendingOrders: 1,
      totalRevenue: 780.25,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 28.3,
      totalIngredientsWasted: 0.8,
      wasteCost: 12.40,
      topSellingItem: 'Margherita Pizza',
      topSellingItemOrders: 15,
      peakHour: '12:00-13:00',
      averagePreparationTime: 16,
      customerSatisfaction: 4.7
    },
    {
      date: '2024-01-13',
      totalOrders: 38,
      completedOrders: 37,
      cancelledOrders: 1,
      pendingOrders: 0,
      totalRevenue: 570.80,
      averageOrderValue: 15.02,
      totalIngredientsUsed: 20.1,
      totalIngredientsWasted: 1.5,
      wasteCost: 23.20,
      topSellingItem: 'Spicy Chicken Pasta',
      topSellingItemOrders: 10,
      peakHour: '11:00-12:00',
      averagePreparationTime: 19,
      customerSatisfaction: 4.5
    },
    {
      date: '2024-01-12',
      totalOrders: 61,
      completedOrders: 59,
      cancelledOrders: 2,
      pendingOrders: 0,
      totalRevenue: 915.75,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 32.8,
      totalIngredientsWasted: 1.8,
      wasteCost: 28.10,
      topSellingItem: 'Caesar Salad',
      topSellingItemOrders: 18,
      peakHour: '12:00-13:00',
      averagePreparationTime: 17,
      customerSatisfaction: 4.8
    },
    {
      date: '2024-01-11',
      totalOrders: 78,
      completedOrders: 76,
      cancelledOrders: 1,
      pendingOrders: 1,
      totalRevenue: 1170.90,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 41.2,
      totalIngredientsWasted: 2.1,
      wasteCost: 32.80,
      topSellingItem: 'Spicy Chicken Pasta',
      topSellingItemOrders: 22,
      peakHour: '13:00-14:00',
      averagePreparationTime: 20,
      customerSatisfaction: 4.6
    },
    {
      date: '2024-01-10',
      totalOrders: 85,
      completedOrders: 83,
      cancelledOrders: 1,
      pendingOrders: 1,
      totalRevenue: 1275.60,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 45.8,
      totalIngredientsWasted: 2.5,
      wasteCost: 39.20,
      topSellingItem: 'Margherita Pizza',
      topSellingItemOrders: 25,
      peakHour: '12:00-13:00',
      averagePreparationTime: 18,
      customerSatisfaction: 4.7
    },
    {
      date: '2024-01-09',
      totalOrders: 42,
      completedOrders: 41,
      cancelledOrders: 1,
      pendingOrders: 0,
      totalRevenue: 630.40,
      averageOrderValue: 15.01,
      totalIngredientsUsed: 22.5,
      totalIngredientsWasted: 1.0,
      wasteCost: 15.60,
      topSellingItem: 'Chocolate Lava Cake',
      topSellingItemOrders: 12,
      peakHour: '11:00-12:00',
      averagePreparationTime: 16,
      customerSatisfaction: 4.9
    }
  ],

  // Hourly Order Distribution
  hourlyDistribution: [
    { hour: '9:00', orders: 8, revenue: 120.08 },
    { hour: '10:00', orders: 12, revenue: 180.12 },
    { hour: '11:00', orders: 15, revenue: 225.15 },
    { hour: '12:00', orders: 25, revenue: 375.25 },
    { hour: '13:00', orders: 18, revenue: 270.18 },
    { hour: '14:00', orders: 10, revenue: 150.10 },
    { hour: '15:00', orders: 8, revenue: 120.08 },
    { hour: '16:00', orders: 6, revenue: 90.06 },
    { hour: '17:00', orders: 9, revenue: 135.09 },
    { hour: '18:00', orders: 12, revenue: 180.12 },
    { hour: '19:00', orders: 15, revenue: 225.15 },
    { hour: '20:00', orders: 10, revenue: 150.10 }
  ],

  // Menu Item Performance
  menuItemPerformance: [
    {
      id: 1,
      name: 'Spicy Chicken Pasta',
      category: 'Pasta Dishes',
      totalOrders: 156,
      totalRevenue: 2340.44,
      averageRating: 4.8,
      totalReviews: 89,
      costPerItem: 8.50,
      profitMargin: 46.8,
      popularity: 35,
      status: 'active'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      category: 'Pizza',
      totalOrders: 142,
      totalRevenue: 2128.58,
      averageRating: 4.6,
      totalReviews: 76,
      costPerItem: 7.20,
      profitMargin: 51.9,
      popularity: 32,
      status: 'active'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      category: 'Salads',
      totalOrders: 98,
      totalRevenue: 1273.02,
      averageRating: 4.7,
      totalReviews: 45,
      costPerItem: 6.80,
      profitMargin: 47.7,
      popularity: 22,
      status: 'active'
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      totalOrders: 87,
      totalRevenue: 782.13,
      averageRating: 4.9,
      totalReviews: 67,
      costPerItem: 3.50,
      profitMargin: 61.1,
      popularity: 20,
      status: 'active'
    },
    {
      id: 5,
      name: 'Garlic Bread',
      category: 'Sides',
      totalOrders: 76,
      totalRevenue: 379.24,
      averageRating: 4.5,
      totalReviews: 34,
      costPerItem: 2.20,
      profitMargin: 55.9,
      popularity: 17,
      status: 'active'
    }
  ],

  // Ingredient Usage Analytics
  ingredientUsageAnalytics: [
    {
      ingredientId: 1,
      ingredientName: 'Fresh Tomatoes',
      totalUsed: 45.5,
      totalWasted: 5.2,
      totalCost: 134.55,
      wasteCost: 15.55,
      usageTrend: 'increasing',
      wastePercentage: 10.3,
      averageDailyUsage: 6.5,
      peakUsageDay: 'Friday',
      supplier: 'Fresh Farm Co.'
    },
    {
      ingredientId: 2,
      ingredientName: 'Chicken Breast',
      totalUsed: 32.8,
      totalWasted: 2.1,
      totalCost: 287.68,
      wasteCost: 18.88,
      usageTrend: 'stable',
      wastePercentage: 6.0,
      averageDailyUsage: 4.7,
      peakUsageDay: 'Saturday',
      supplier: 'Quality Meats Ltd.'
    },
    {
      ingredientId: 3,
      ingredientName: 'Basil Leaves',
      totalUsed: 8.2,
      totalWasted: 2.5,
      totalCost: 103.92,
      wasteCost: 31.75,
      usageTrend: 'decreasing',
      wastePercentage: 23.4,
      averageDailyUsage: 1.2,
      peakUsageDay: 'Wednesday',
      supplier: 'Herb Garden'
    },
    {
      ingredientId: 4,
      ingredientName: 'Pasta Spaghetti',
      totalUsed: 28.5,
      totalWasted: 1.0,
      totalCost: 111.72,
      wasteCost: 3.99,
      usageTrend: 'stable',
      wastePercentage: 3.4,
      averageDailyUsage: 4.1,
      peakUsageDay: 'Friday',
      supplier: 'Italian Foods Inc.'
    },
    {
      ingredientId: 5,
      ingredientName: 'Olive Oil',
      totalUsed: 12.0,
      totalWasted: 0.0,
      totalCost: 191.88,
      wasteCost: 0.00,
      usageTrend: 'stable',
      wastePercentage: 0.0,
      averageDailyUsage: 1.7,
      peakUsageDay: 'Tuesday',
      supplier: 'Mediterranean Imports'
    }
  ],

  // Staff Performance Metrics
  staffPerformance: [
    {
      userId: 1,
      name: 'Sarah Johnson',
      position: 'Kitchen Manager',
      totalOrdersHandled: 0,
      averagePreparationTime: 0,
      customerSatisfaction: 0,
      efficiency: 95,
      attendance: 98,
      lastActive: '2024-01-15 16:30:00'
    },
    {
      userId: 2,
      name: 'Michael Chen',
      position: 'Head Chef',
      totalOrdersHandled: 245,
      averagePreparationTime: 16,
      customerSatisfaction: 4.7,
      efficiency: 92,
      attendance: 100,
      lastActive: '2024-01-15 15:45:00'
    },
    {
      userId: 3,
      name: 'Emily Rodriguez',
      position: 'Prep Cook',
      totalOrdersHandled: 189,
      averagePreparationTime: 18,
      customerSatisfaction: 4.5,
      efficiency: 88,
      attendance: 95,
      lastActive: '2024-01-15 15:20:00'
    },
    {
      userId: 5,
      name: 'Lisa Thompson',
      position: 'Sous Chef',
      totalOrdersHandled: 156,
      averagePreparationTime: 17,
      customerSatisfaction: 4.6,
      efficiency: 90,
      attendance: 97,
      lastActive: '2024-01-15 14:30:00'
    }
  ],

  // Customer Analytics
  customerAnalytics: [
    {
      customerId: 1,
      customerName: 'John Smith',
      totalOrders: 15,
      totalSpent: 450.75,
      averageOrderValue: 30.05,
      lastOrder: '2024-01-15 14:25:00',
      favoriteItem: 'Spicy Chicken Pasta',
      customerType: 'regular',
      satisfaction: 4.8
    },
    {
      customerId: 2,
      customerName: 'Sarah Johnson',
      totalOrders: 8,
      totalSpent: 240.50,
      averageOrderValue: 30.06,
      lastOrder: '2024-01-15 12:15:00',
      favoriteItem: 'Margherita Pizza',
      customerType: 'regular',
      satisfaction: 4.6
    },
    {
      customerId: 3,
      customerName: 'Mike Wilson',
      totalOrders: 12,
      totalSpent: 360.25,
      averageOrderValue: 30.02,
      lastOrder: '2024-01-15 09:40:00',
      favoriteItem: 'Spicy Chicken Pasta',
      customerType: 'regular',
      satisfaction: 4.7
    },
    {
      customerId: 4,
      customerName: 'Emily Davis',
      totalOrders: 3,
      totalSpent: 90.15,
      averageOrderValue: 30.05,
      lastOrder: '2024-01-15 15:10:00',
      favoriteItem: 'Vegetarian Lasagna',
      customerType: 'new',
      satisfaction: 4.5
    }
  ],

  // Financial Analytics
  financialAnalytics: {
    revenue: {
      daily: 675.50,
      weekly: 4728.50,
      monthly: 20265.00,
      growth: 12.5
    },
    costs: {
      ingredients: 234.50,
      labor: 180.00,
      overhead: 95.00,
      total: 509.50
    },
    profit: {
      daily: 166.00,
      margin: 24.6,
      growth: 8.2
    },
    waste: {
      daily: 18.50,
      percentage: 2.7,
      reduction: -15.3
    }
  }
};

// Analytics helper functions
export const AnalyticsHelpers = {
  // Get daily metrics by date range
  getDailyMetricsByRange: (startDate, endDate) => {
    return ANALYTICS_DATABASE.dailyMetrics.filter(metric => 
      metric.date >= startDate && metric.date <= endDate
    );
  },

  // Get today's metrics
  getTodayMetrics: () => {
    const today = new Date().toISOString().split('T')[0];
    return ANALYTICS_DATABASE.dailyMetrics.find(metric => metric.date === today);
  },

  // Get weekly metrics
  getWeeklyMetrics: () => {
    const last7Days = ANALYTICS_DATABASE.dailyMetrics.slice(0, 7);
    return {
      totalOrders: last7Days.reduce((sum, m) => sum + m.totalOrders, 0),
      totalRevenue: last7Days.reduce((sum, m) => sum + m.totalRevenue, 0),
      averageOrderValue: last7Days.reduce((sum, m) => sum + m.averageOrderValue, 0) / last7Days.length,
      totalWaste: last7Days.reduce((sum, m) => sum + m.totalIngredientsWasted, 0),
      wasteCost: last7Days.reduce((sum, m) => sum + m.wasteCost, 0)
    };
  },

  // Get top performing menu items
  getTopPerformingItems: (limit = 5) => {
    return ANALYTICS_DATABASE.menuItemPerformance
      .sort((a, b) => b.totalOrders - a.totalOrders)
      .slice(0, limit);
  },

  // Get ingredient usage trends
  getIngredientUsageTrends: () => {
    return ANALYTICS_DATABASE.ingredientUsageAnalytics
      .sort((a, b) => b.totalUsed - a.totalUsed);
  },

  // Get staff performance
  getStaffPerformance: () => {
    return ANALYTICS_DATABASE.staffPerformance
      .filter(staff => staff.totalOrdersHandled > 0)
      .sort((a, b) => b.efficiency - a.efficiency);
  },

  // Get customer analytics
  getCustomerAnalytics: () => {
    return ANALYTICS_DATABASE.customerAnalytics
      .sort((a, b) => b.totalSpent - a.totalSpent);
  },

  // Calculate growth percentage
  calculateGrowth: (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  },

  // Get peak hours
  getPeakHours: () => {
    return ANALYTICS_DATABASE.hourlyDistribution
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 3);
  },

  // Get financial summary
  getFinancialSummary: () => {
    return ANALYTICS_DATABASE.financialAnalytics;
  },

  // Get waste analytics
  getWasteAnalytics: () => {
    const wasteData = ANALYTICS_DATABASE.ingredientUsageAnalytics
      .filter(item => item.totalWasted > 0)
      .sort((a, b) => b.wasteCost - a.wasteCost);
    
    return {
      totalWasteCost: wasteData.reduce((sum, item) => sum + item.wasteCost, 0),
      topWasteItems: wasteData.slice(0, 5),
      averageWastePercentage: wasteData.reduce((sum, item) => sum + item.wastePercentage, 0) / wasteData.length
    };
  },

  // Generate performance report
  generatePerformanceReport: (dateRange = 'week') => {
    const today = new Date().toISOString().split('T')[0];
    const metrics = dateRange === 'week' ? 
      ANALYTICS_DATABASE.dailyMetrics.slice(0, 7) : 
      ANALYTICS_DATABASE.dailyMetrics.slice(0, 30);

    return {
      period: dateRange,
      totalOrders: metrics.reduce((sum, m) => sum + m.totalOrders, 0),
      totalRevenue: metrics.reduce((sum, m) => sum + m.totalRevenue, 0),
      averageOrderValue: metrics.reduce((sum, m) => sum + m.averageOrderValue, 0) / metrics.length,
      totalWaste: metrics.reduce((sum, m) => sum + m.totalIngredientsWasted, 0),
      wasteCost: metrics.reduce((sum, m) => sum + m.wasteCost, 0),
      customerSatisfaction: metrics.reduce((sum, m) => sum + m.customerSatisfaction, 0) / metrics.length,
      topSellingItem: metrics.sort((a, b) => b.topSellingItemOrders - a.topSellingItemOrders)[0]?.topSellingItem
    };
  }
};

export default ANALYTICS_DATABASE; 