# Cloud Kitchen Inventory Management System

A React-based inventory management system with real-time data management, admin and operator panels for cloud kitchen operations.

## Features

- **Real-time Data Management**: WebSocket connections with polling fallback
- **Role-based Access**: Admin and Operator panels
- **Cloud Kitchen Focused**: Ingredient tracking, expiry management, order integration
- **Interactive Dashboards**: Clickable elements with real-time updates
- **Material-UI Design**: Modern, responsive interface
- **Comprehensive Database**: Dedicated databases for users, inventory, orders, and analytics

## Demo Credentials

### Admin Access
- **Username:** admin@kitchen.com
- **Password:** admin123

### Operator Access
- **Username:** operator@kitchen.com
- **Password:** operator123

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd inventory-management

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

## Hosting Options

### Option 1: Vercel (Recommended - Free & Easy)

#### Step 1: Prepare for Deployment
```bash
# Build the project
npm run build

# Test the build locally
npx serve -s build
```

#### Step 2: Deploy to Vercel
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   # Login to Vercel
   vercel login

   # Deploy (run from project root)
   vercel

   # Follow the prompts:
   # - Set up and deploy? Y
   # - Which scope? Select your account
   # - Link to existing project? N
   # - Project name: inventory-management
   # - Directory: ./
   # - Override settings? N
   ```

3. **Environment Variables (if needed):**
   ```bash
   vercel env add REACT_APP_WS_URL
   # Enter your WebSocket server URL
   ```

4. **Custom Domain (Optional):**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Domains
   - Add your custom domain

#### Step 3: Automatic Deployments
- Connect your GitHub repository to Vercel
- Every push to main branch will auto-deploy
- Preview deployments for pull requests

### Option 2: Netlify (Free & Easy)

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Deploy to Netlify
1. **Drag & Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag the `build` folder to the deploy area

2. **Git Integration (Recommended):**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy automatically on push

3. **Environment Variables:**
   - Go to Site Settings > Environment Variables
   - Add `REACT_APP_WS_URL` if needed

### Option 3: GitHub Pages (Free)

#### Step 1: Add GitHub Pages Dependency
```bash
npm install --save-dev gh-pages
```

#### Step 2: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Step 3: Deploy
```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront (Production)

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Create S3 Bucket
1. Go to AWS S3 Console
2. Create a new bucket with your domain name
3. Enable static website hosting
4. Set bucket policy for public read access

#### Step 3: Upload Files
```bash
# Install AWS CLI
aws configure

# Sync build folder to S3
aws s3 sync build/ s3://your-bucket-name --delete
```

#### Step 4: Set Up CloudFront (Optional)
1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Configure custom domain and SSL certificate

### Option 5: Firebase Hosting (Google)

#### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### Step 2: Initialize Firebase
```bash
firebase login
firebase init hosting

# Select your project
# Set public directory: build
# Configure as single-page app: Y
# Don't overwrite index.html: N
```

#### Step 3: Deploy
```bash
npm run build
firebase deploy
```

## Environment Configuration

### Create .env file
```bash
# Create .env file in project root
touch .env
```

### Add Environment Variables
```env
# WebSocket Server URL (for real-time features)
REACT_APP_WS_URL=wss://your-websocket-server.com

# API Base URL (if you have a backend)
REACT_APP_API_URL=https://your-api-server.com

# Google Analytics (optional)
REACT_APP_GA_TRACKING_ID=GA_TRACKING_ID
```

## Production Optimizations

### 1. Performance Optimization
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze
```

### 2. SEO Optimization
- Add meta tags in `public/index.html`
- Implement React Helmet for dynamic meta tags
- Add sitemap.xml and robots.txt

### 3. Security Headers
Add to your hosting platform or server:
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Backend Integration

### WebSocket Server Setup
For real-time features, you'll need a WebSocket server:

#### Node.js + Socket.io Example
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://your-frontend-domain.com",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server running on port 8080');
});
```

## Monitoring & Analytics

### 1. Error Tracking
- Set up Sentry for error monitoring
- Configure error boundaries in React

### 2. Performance Monitoring
- Use Google Analytics
- Implement Core Web Vitals tracking
- Set up uptime monitoring

### 3. User Analytics
- Track user interactions
- Monitor real-time connection status
- Analyze dashboard usage patterns

## Troubleshooting

### Common Issues

1. **Build Fails:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues (404 on refresh):**
   - Configure your hosting platform for SPA routing
   - Add redirect rules for all routes to index.html

3. **WebSocket Connection Fails:**
   - Check CORS settings on your WebSocket server
   - Verify the WebSocket URL in environment variables
   - Ensure SSL certificates are valid for WSS connections

4. **Performance Issues:**
   - Enable gzip compression
   - Optimize images and assets
   - Use CDN for static assets

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the console for error messages
- Ensure all environment variables are set correctly
- Verify your hosting platform's configuration

## License

This project is licensed under the MIT License. 