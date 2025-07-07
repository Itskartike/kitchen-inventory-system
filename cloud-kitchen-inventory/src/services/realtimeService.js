import { database } from '../data';

class RealtimeService {
  constructor() {
    this.subscribers = new Map();
    this.updateQueue = [];
    this.isProcessing = false;
    this.lastSyncTime = null;
  }

  // Subscribe to real-time updates
  subscribe(dataType, callback) {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, new Set());
    }
    this.subscribers.get(dataType).add(callback);

    return () => {
      const callbacks = this.subscribers.get(dataType);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(dataType);
        }
      }
    };
  }

  // Notify subscribers of updates
  notify(dataType, data) {
    const callbacks = this.subscribers.get(dataType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in real-time callback:', error);
        }
      });
    }
  }

  // Queue update for processing
  queueUpdate(update) {
    this.updateQueue.push({
      ...update,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    });

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process queued updates
  async processQueue() {
    if (this.isProcessing || this.updateQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.updateQueue.length > 0) {
        const update = this.updateQueue.shift();
        await this.processUpdate(update);
      }
    } catch (error) {
      console.error('Error processing update queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  // Process individual update
  async processUpdate(update) {
    const { type, data, operation, timestamp } = update;

    try {
      switch (type) {
        case 'INVENTORY':
          await this.handleInventoryUpdate(data, operation);
          break;
        case 'ORDER':
          await this.handleOrderUpdate(data, operation);
          break;
        case 'USER':
          await this.handleUserUpdate(data, operation);
          break;
        case 'TRANSACTION':
          await this.handleTransactionUpdate(data, operation);
          break;
        default:
          console.warn('Unknown update type:', type);
      }

      this.lastSyncTime = timestamp;
      this.notify(type, { data, operation, timestamp });
    } catch (error) {
      console.error('Error processing update:', error);
      // Re-queue failed updates
      this.updateQueue.unshift(update);
    }
  }

  // Handle inventory updates
  async handleInventoryUpdate(data, operation) {
    switch (operation) {
      case 'CREATE':
        await database.inventory.addItem(data);
        break;
      case 'UPDATE':
        await database.inventory.updateItem(data.id, data);
        break;
      case 'DELETE':
        await database.inventory.removeItem(data.id);
        break;
      case 'BULK_UPDATE':
        await database.inventory.bulkUpdate(data.items);
        break;
      default:
        throw new Error(`Unknown inventory operation: ${operation}`);
    }
  }

  // Handle order updates
  async handleOrderUpdate(data, operation) {
    switch (operation) {
      case 'CREATE':
        await database.orders.createOrder(data);
        break;
      case 'UPDATE':
        await database.orders.updateOrder(data.id, data);
        break;
      case 'UPDATE_STATUS':
        await database.orders.updateOrderStatus(data.id, data.status);
        break;
      case 'DELETE':
        await database.orders.deleteOrder(data.id);
        break;
      default:
        throw new Error(`Unknown order operation: ${operation}`);
    }
  }

  // Handle user updates
  async handleUserUpdate(data, operation) {
    switch (operation) {
      case 'CREATE':
        await database.users.addUser(data);
        break;
      case 'UPDATE':
        await database.users.updateUser(data.id, data);
        break;
      case 'DELETE':
        await database.users.removeUser(data.id);
        break;
      default:
        throw new Error(`Unknown user operation: ${operation}`);
    }
  }

  // Handle transaction updates
  async handleTransactionUpdate(data, operation) {
    switch (operation) {
      case 'CREATE':
        await database.inventory.addTransaction(data);
        break;
      case 'UPDATE':
        await database.inventory.updateTransaction(data.id, data);
        break;
      case 'DELETE':
        await database.inventory.removeTransaction(data.id);
        break;
      default:
        throw new Error(`Unknown transaction operation: ${operation}`);
    }
  }

  // Real-time inventory operations
  async addInventoryItem(item) {
    const update = {
      type: 'INVENTORY',
      operation: 'CREATE',
      data: item
    };

    this.queueUpdate(update);
    return item;
  }

  async updateInventoryItem(id, updates) {
    const update = {
      type: 'INVENTORY',
      operation: 'UPDATE',
      data: { id, ...updates }
    };

    this.queueUpdate(update);
    return { id, ...updates };
  }

  async deleteInventoryItem(id) {
    const update = {
      type: 'INVENTORY',
      operation: 'DELETE',
      data: { id }
    };

    this.queueUpdate(update);
    return { id };
  }

  // Real-time order operations
  async createOrder(order) {
    const update = {
      type: 'ORDER',
      operation: 'CREATE',
      data: order
    };

    this.queueUpdate(update);
    return order;
  }

  async updateOrderStatus(id, status) {
    const update = {
      type: 'ORDER',
      operation: 'UPDATE_STATUS',
      data: { id, status }
    };

    this.queueUpdate(update);
    return { id, status };
  }

  // Real-time transaction operations
  async addTransaction(transaction) {
    const update = {
      type: 'TRANSACTION',
      operation: 'CREATE',
      data: transaction
    };

    this.queueUpdate(update);
    return transaction;
  }

  // Conflict resolution
  async resolveConflict(localData, remoteData, dataType) {
    // Simple timestamp-based conflict resolution
    const localTimestamp = localData.lastModified || 0;
    const remoteTimestamp = remoteData.lastModified || 0;

    if (remoteTimestamp > localTimestamp) {
      // Remote data is newer, accept it
      return remoteData;
    } else {
      // Local data is newer or same, keep local
      return localData;
    }
  }

  // Sync with server
  async syncWithServer() {
    try {
      // In a real implementation, this would fetch changes from server
      const serverChanges = await this.fetchServerChanges();
      
      for (const change of serverChanges) {
        await this.processUpdate(change);
      }

      this.lastSyncTime = Date.now();
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  }

  // Mock server changes fetch
  async fetchServerChanges() {
    // Simulate server response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            type: 'INVENTORY',
            operation: 'UPDATE',
            data: {
              id: 1,
              quantity: Math.floor(Math.random() * 100),
              lastModified: Date.now()
            },
            timestamp: Date.now()
          }
        ]);
      }, 1000);
    });
  }

  // Get sync status
  getSyncStatus() {
    return {
      isProcessing: this.isProcessing,
      queueLength: this.updateQueue.length,
      lastSyncTime: this.lastSyncTime,
      subscribers: this.subscribers.size
    };
  }

  // Clear all data (for testing)
  clear() {
    this.updateQueue = [];
    this.subscribers.clear();
    this.isProcessing = false;
    this.lastSyncTime = null;
  }
}

// Create singleton instance
const realtimeService = new RealtimeService();

export default realtimeService; 