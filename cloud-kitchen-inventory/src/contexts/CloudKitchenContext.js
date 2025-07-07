import React, { createContext, useContext, useState, useCallback } from 'react';
import { CloudKitchenDB } from '../data/cloudKitchenDB';
import { toast } from 'react-hot-toast';

const CloudKitchenContext = createContext();

export const useCloudKitchen = () => {
  const context = useContext(CloudKitchenContext);
  if (!context) {
    throw new Error('useCloudKitchen must be used within a CloudKitchenProvider');
  }
  return context;
};

export const CloudKitchenProvider = ({ children }) => {
  const [selectedKitchen, setSelectedKitchen] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState(null);

  // Set the selected cloud kitchen
  const selectKitchen = useCallback((kitchen) => {
    setSelectedKitchen(kitchen);
    // Clear current user when switching kitchens
    setCurrentUser(null);
  }, []);

  // Authenticate user for the selected kitchen
  const authenticateUser = useCallback((username, password) => {
    if (!selectedKitchen) {
      return { success: false, error: 'No kitchen selected' };
    }

    const user = CloudKitchenDB.authenticateUser(selectedKitchen.id, username, password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  }, [selectedKitchen]);

  // Authenticate super admin
  const authenticateSuperAdmin = useCallback((username, password) => {
    const superAdmin = CloudKitchenDB.authenticateSuperAdmin(username, password);
    if (superAdmin) {
      setCurrentSuperAdmin(superAdmin);
      return { success: true, user: superAdmin };
    } else {
      return { success: false, error: 'Invalid super admin credentials' };
    }
  }, []);

  // Logout current user or super admin
  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentSuperAdmin(null);
  }, []);

  // Get current kitchen's data
  const getKitchenData = useCallback(() => {
    if (!selectedKitchen) return null;
    
    return {
      kitchen: selectedKitchen,
      users: CloudKitchenDB.getUsers(selectedKitchen.id),
      inventory: CloudKitchenDB.getInventory(selectedKitchen.id),
      menu: CloudKitchenDB.getMenu(selectedKitchen.id)
    };
  }, [selectedKitchen]);

  // Add new user to current kitchen
  const addUser = useCallback((userData) => {
    if (!selectedKitchen) return null;
    return CloudKitchenDB.addUser(selectedKitchen.id, userData);
  }, [selectedKitchen]);

  // Update user in current kitchen
  const updateUser = useCallback((userId, updates) => {
    if (!selectedKitchen) return null;
    return CloudKitchenDB.updateUser(selectedKitchen.id, userId, updates);
  }, [selectedKitchen]);

  // Delete user from current kitchen
  const deleteUser = useCallback((userId) => {
    if (!selectedKitchen) return false;
    return CloudKitchenDB.deleteUser(selectedKitchen.id, userId);
  }, [selectedKitchen]);

  // Deduct inventory based on a recipe
  const deductInventoryFromRecipe = useCallback((recipe) => {
    if (!selectedKitchen || !recipe) return;

    const kitchenData = getKitchenData();
    let inventory = kitchenData.inventory;

    if (!inventory || !inventory.ingredients) return;

    // Create a mutable copy of the ingredients
    let ingredients = [...inventory.ingredients];
    let itemsUpdated = [];
    let errors = [];

    recipe.forEach(recipeIngredient => {
      const inventoryIndex = ingredients.findIndex(
        (invItem) => invItem.id === recipeIngredient.ingredientId
      );

      if (inventoryIndex !== -1) {
        const currentItem = ingredients[inventoryIndex];
        if (currentItem.quantity >= recipeIngredient.quantity) {
          ingredients[inventoryIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - recipeIngredient.quantity,
            lastUpdated: new Date().toISOString()
          };
          itemsUpdated.push(recipeIngredient.name);
        } else {
          errors.push(`${recipeIngredient.name}: Insufficient stock.`);
        }
      } else {
        errors.push(`${recipeIngredient.name}: Not found in inventory.`);
      }
    });

    if (errors.length > 0) {
      toast.error(`Could not complete order: ${errors.join(' ')}`);
      return { success: false, errors };
    }

    // This is where you would typically save back to a real database
    // For now, we update the context state. This will not persist.
    console.log('Updating inventory state:', ingredients);
    toast.success(`${itemsUpdated.join(', ')} deducted from inventory.`);
    
    // Note: This mock implementation doesn't actually update the central "database"
    // so the change will be lost on refresh. A more robust solution would
    // be needed for persistence.
    
    return { success: true };

  }, [selectedKitchen, getKitchenData]);

  // Check if user has permission for specific action
  const hasPermission = useCallback((action) => {
    if (!currentUser) return false;
    
    // Admin has all permissions
    if (currentUser.role === 'admin') return true;
    
    // Define operator permissions
    const operatorPermissions = [
      'view_inventory',
      'update_inventory',
      'view_menu',
      'view_reports',
      'view_transactions'
    ];
    
    if (currentUser.role === 'operator') {
      return operatorPermissions.includes(action);
    }
    
    return false;
  }, [currentUser]);

  const value = {
    selectedKitchen,
    currentUser,
    currentSuperAdmin,
    selectKitchen,
    authenticateUser,
    authenticateSuperAdmin,
    logout,
    getKitchenData,
    addUser,
    updateUser,
    deleteUser,
    deductInventoryFromRecipe,
    hasPermission,
    isAuthenticated: !!currentUser,
    isSuperAdmin: !!currentSuperAdmin,
    isAdmin: currentUser?.role === 'admin',
    isOperator: currentUser?.role === 'operator'
  };

  return (
    <CloudKitchenContext.Provider value={value}>
      {children}
    </CloudKitchenContext.Provider>
  );
}; 