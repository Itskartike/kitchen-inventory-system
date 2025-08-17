# Cloud Kitchen Inventory Management System

A comprehensive full-stack inventory management system designed specifically for cloud kitchens, featuring real-time inventory tracking, menu management, order processing, and automated stock deduction.

## 🌟 Features

### Core Functionality
- **Real-time Inventory Management**: Track ingredients, quantities, expiry dates, and stock levels
- **Automated Stock Deduction**: Automatic ingredient deduction based on order recipes
- **Low Stock Alerts**: Smart notifications when inventory falls below threshold levels
- **Menu & Recipe Management**: Create and manage menu items with ingredient mappings
- **SOP Management**: Upload and manage Standard Operating Procedures for recipes
- **Order Processing**: Complete order management with real-time inventory updates
- **Multi-role Access**: Role-based dashboards for Super Admin, Admin, and Operator users

### Advanced Features
- **Real-time Notifications**: Instant updates across all connected users
- **Supplier Management**: Track suppliers and procurement details
- **Location Tracking**: Organize inventory by storage locations
- **Expiry Date Management**: Monitor and alert for expiring ingredients
- **Comprehensive Reporting**: Generate detailed inventory and sales reports
- **Responsive Design**: Optimized for desktop and mobile devices

## 🏗️ System Architecture

### Backend (Node.js + Express)
- RESTful API design
- PostgreSQL database integration
- Real-time WebSocket connections
- Role-based authentication middleware
- Automated inventory calculation logic

### Frontend (React)
- Component-based architecture
- Real-time state management
- Responsive UI with custom CSS
- Context API for global state
- Dynamic dashboard routing based on user roles

### Database (PostgreSQL)
- Normalized database schema
- Foreign key relationships
- ACID compliance for inventory transactions
- Optimized queries for real-time performance

## 📦 Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)

**Frontend:**
- React.js
- Context API
- Custom CSS
- Responsive Design

**Deployment:**
- Backend: Render
- Frontend: Netlify/Vercel
- Database: Render PostgreSQL

**Development Tools:**
- DBeaver (Database Management)
- VS Code
- Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Itskartike/kitchen-inventory-system.git
cd kitchen-inventory-system
```

2. Navigate to Backend directory:
```bash
cd Backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file with your database configuration:
```env
DB_HOST=your_database_host
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

5. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd cloud-kitchen-inventory
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration in `src/apiConfig.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000'; // or your deployed backend URL
```

4. Start the development server:
```bash
npm start
```

### Database Setup

Execute the following SQL scripts in your PostgreSQL database:

```sql
-- Create tables
CREATE TABLE ingredients (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100),
    quantity INT NOT NULL,
    unit VARCHAR(20),
    price NUMERIC(10,2),
    supplier VARCHAR(100),
    location VARCHAR(100),
    expiry_date DATE,
    status VARCHAR(20),
    traceable BOOLEAN DEFAULT TRUE,
    threshold INT DEFAULT 5
);

CREATE TABLE menu_categories (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE menu_items (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT REFERENCES menu_categories(id),
    price NUMERIC(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE recipe_sops (
    id INT PRIMARY KEY,
    menu_item_id INT REFERENCES menu_items(id) ON DELETE CASCADE,
    notes TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE menu_item_ingredients (
    id INT PRIMARY KEY,
    menu_item_id INT REFERENCES menu_items(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
    amount NUMERIC(10,2)
);

CREATE TABLE recipe_sop_ingredients (
    id INT PRIMARY KEY,
    sop_id INT REFERENCES recipe_sops(id) ON DELETE CASCADE,
    ingredient_name VARCHAR(100),
    quantity NUMERIC(10,2),
    unit VARCHAR(20)
);

CREATE TABLE recipe_sop_steps (
    id INT PRIMARY KEY,
    sop_id INT REFERENCES recipe_sops(id) ON DELETE CASCADE,
    step_number INT,
    description TEXT
);
```

## 📊 System Workflow

### User Authentication Flow
1. Users log in with role-specific credentials
2. System validates user and assigns appropriate permissions
3. Dashboard interface adapts based on user role (Super Admin, Admin, Operator)

### Inventory Management Flow
1. **Add Ingredients**: Users input ingredient details (name, quantity, supplier, expiry date)
2. **Stock Monitoring**: System continuously tracks stock levels and expiry dates
3. **Alert Generation**: Automatic notifications for low stock and expiring items
4. **Supplier Tracking**: Maintain supplier information and procurement history

### Order Processing Flow
1. **Order Creation**: Orders are created with menu items and quantities
2. **Ingredient Calculation**: System calculates required ingredients based on recipes
3. **Stock Validation**: Verifies sufficient inventory before processing
4. **Automatic Deduction**: Deducts ingredients from inventory in real-time
5. **Status Updates**: Real-time notifications to all connected users

### Recipe & SOP Management
1. **Menu Item Creation**: Define menu items with pricing and categories
2. **Recipe Mapping**: Associate ingredients with menu items and quantities
3. **SOP Documentation**: Upload and manage cooking procedures and guidelines
4. **Version Control**: Track changes and updates to recipes

## 🔧 API Endpoints

### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `POST /api/ingredients` - Add new ingredient
- `PUT /api/ingredients/:id` - Update ingredient
- `DELETE /api/ingredients/:id` - Delete ingredient

### Menu Items
- `GET /api/menu-items` - Get all menu items
- `POST /api/menu-items` - Create menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order status

### SOPs
- `GET /api/sop/:menuItemId` - Get SOP for menu item
- `POST /api/sop/:menuItemId` - Create/Update SOP

## 🎯 Key Features Explained

### Automated Stock Deduction Logic
The system implements intelligent inventory deduction:
- When an order is placed, the system identifies required ingredients from recipes
- Calculates total ingredient requirements for all ordered items
- Validates sufficient stock availability before processing
- Automatically deducts ingredients from inventory upon order confirmation
- Updates stock status (In Stock, Low Stock, Out of Stock) in real-time
- Triggers notifications for low stock conditions

### Real-time Notifications
- WebSocket-based real-time updates
- Instant alerts for low stock conditions
- Status changes broadcast to all connected users
- Email/SMS notification integration ready

### Role-based Access Control
- **Super Admin**: Full system access, user management, global reports
- **Admin**: Inventory management, menu creation, local reports
- **Operator**: Order processing, inventory viewing, basic operations

## 🔒 Security Features
- Input validation and sanitization
- SQL injection prevention
- Role-based route protection
- Secure database connections
- Environment variable configuration

## 📈 Performance Optimizations
- Database query optimization
- Efficient real-time updates
- Responsive design for all devices
- Scalable architecture for growth

## 🚀 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Configure environment variables
3. Deploy with automatic builds

### Frontend Deployment (Netlify/Vercel)
1. Build the React application: `npm run build`
2. Deploy build folder to Netlify or Vercel
3. Configure API endpoints for production

### Database Deployment
- Use Render PostgreSQL or any cloud PostgreSQL service
- Import database schema and initial data
- Configure connection strings in environment variables

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer
**Hukum kumar**
- GitHub: [@Itskartike](https://github.com/Itskartike)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/itskartike/)

## 🙏 Acknowledgments
- Thanks to the open-source community for excellent tools and libraries
- Special thanks to contributors and testers

---

For questions, issues, or contributions, please feel free to reach out or create an issue on GitHub.
