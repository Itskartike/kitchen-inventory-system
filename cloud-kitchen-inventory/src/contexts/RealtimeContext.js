import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNotifications } from './NotificationContext';

const RealtimeContext = createContext();

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

export const RealtimeProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [realTimeData, setRealTimeData] = useState({
    inventory: [],
    orders: [],
    alerts: [],
    transactions: []
  });

  const { addNotification } = useNotifications();

  // Initialize WebSocket connection
  const connectWebSocket = useCallback(() => {
    try {
      // In production, replace with your actual WebSocket server URL
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';
      const newSocket = new WebSocket(wsUrl);

      newSocket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        // toast.success('Real-time connection established');
      };

      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleRealtimeUpdate(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      newSocket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        // toast.error('Real-time connection lost. Falling back to polling.');
        
        // Fallback to polling
        startPolling();
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // toast.error('Real-time connection error. Falling back to polling.');
        // Fallback to polling
        startPolling();
      };

      setSocket(newSocket);
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      // Fallback to polling if WebSocket fails
      startPolling();
    }
  }, []);

  // Handle real-time updates
  const handleRealtimeUpdate = useCallback((data) => {
    const { type, payload, timestamp } = data;
    setLastUpdate(timestamp);

    switch (type) {
      case 'INVENTORY_UPDATE':
        setRealTimeData(prev => ({
          ...prev,
          inventory: payload
        }));
        // toast.success('Inventory updated in real-time');
        break;

      case 'ORDER_UPDATE':
        setRealTimeData(prev => ({
          ...prev,
          orders: payload
        }));
        // toast.success('New order received!');
        break;

      case 'ALERT_UPDATE':
        setRealTimeData(prev => ({
          ...prev,
          alerts: payload
        }));
        // toast.error('New alert: ' + payload.message);
        break;

      case 'TRANSACTION_UPDATE':
        setRealTimeData(prev => ({
          ...prev,
          transactions: payload
        }));
        // toast.success('Transaction completed');
        break;

      case 'STOCK_ALERT':
        // toast.error(`Low stock alert: ${payload.itemName} (${payload.quantity} remaining)`);
        // if (window.Notification && Notification.permission === 'granted') {
        //   new Notification('Low Stock Alert', {
        //     body: `${payload.itemName} is low on stock (${payload.quantity} remaining)`
        //   });
        // }
        addNotification({
          type: 'low_stock',
          message: `Low stock: ${payload.itemName} (${payload.quantity} remaining)`,
          timestamp: timestamp || new Date().toISOString()
        });
        break;

      case 'EXPIRY_ALERT':
        // toast.error(`Expiry alert: ${payload.itemName} expires on ${payload.expiryDate}`);
        break;

      default:
        console.log('Unknown real-time update type:', type);
    }
  }, []);

  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent:', message);
    }
  }, [socket]);

  // Polling fallback
  const startPolling = useCallback(() => {
    const pollInterval = setInterval(async () => {
      try {
        // Simulate real-time updates with mock data
        const mockUpdates = [
          {
            type: 'INVENTORY_UPDATE',
            payload: generateMockInventoryData(),
            timestamp: new Date().toISOString()
          },
          {
            type: 'ORDER_UPDATE',
            payload: generateMockOrderData(),
            timestamp: new Date().toISOString()
          }
        ];

        mockUpdates.forEach(update => {
          handleRealtimeUpdate(update);
        });
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [handleRealtimeUpdate]);

  // Generate mock inventory data
  const generateMockInventoryData = () => {
    return [
      { id: 1, name: 'Fresh Tomatoes', quantity: Math.floor(Math.random() * 50) + 10, category: 'Vegetables' },
      { id: 2, name: 'Chicken Breast', quantity: Math.floor(Math.random() * 30) + 5, category: 'Meat' },
      { id: 3, name: 'Basil Leaves', quantity: Math.floor(Math.random() * 20) + 2, category: 'Herbs' },
      { id: 4, name: 'Olive Oil', quantity: Math.floor(Math.random() * 15) + 3, category: 'Oils' }
    ];
  };

  // Generate mock order data
  const generateMockOrderData = () => {
    return [
      { id: Date.now(), customer: 'Customer ' + Math.floor(Math.random() * 100), items: Math.floor(Math.random() * 5) + 1, status: 'pending' },
      { id: Date.now() + 1, customer: 'Customer ' + Math.floor(Math.random() * 100), items: Math.floor(Math.random() * 5) + 1, status: 'preparing' }
    ];
  };

  // Subscribe to specific data types
  const subscribe = useCallback((dataType) => {
    sendMessage({
      type: 'SUBSCRIBE',
      dataType: dataType
    });
  }, [sendMessage]);

  // Unsubscribe from specific data types
  const unsubscribe = useCallback((dataType) => {
    sendMessage({
      type: 'UNSUBSCRIBE',
      dataType: dataType
    });
  }, [sendMessage]);

  // Initialize connection on mount
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  // Request notification permission on mount
  // useEffect(() => {
  //   if (window.Notification && Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  // }, []);

  const value = {
    isConnected,
    lastUpdate,
    realTimeData,
    sendMessage,
    subscribe,
    unsubscribe,
    connectWebSocket
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}; 