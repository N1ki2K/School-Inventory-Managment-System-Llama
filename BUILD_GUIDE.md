# 🏗️ Build & Deployment Guide

This guide covers building, testing, and deploying the School Inventory Management System.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Development Build](#development-build)
- [Production Build](#production-build)
- [Docker Build](#docker-build)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js**: v18.x or v20.x
- **pnpm**: v8.x or higher
- **Docker**: (Optional) For containerized deployment
- **Git**: For version control

### Install pnpm
```bash
npm install -g pnpm
```

## Development Build

### Frontend Development

1. **Navigate to Frontend Directory**
   ```bash
   cd Development/FE
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   ```
   - Server runs on: `http://localhost:3000`
   - Hot Module Replacement (HMR) enabled
   - Auto-opens in browser

4. **Lint Code**
   ```bash
   pnpm lint          # Check for issues
   pnpm lint:fix      # Auto-fix issues
   ```

### Backend Development

1. **Navigate to Backend Directory**
   ```bash
   cd Development/BE
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Environment Variables**
   - Copy `.env.example` to `.env`
   - Update values as needed:
     ```env
     DATABASE_URL="file:./dev.db"
     PORT=3001
     JWT_SECRET="your-secret-key"
     ALLOWED_ORIGINS="http://localhost:3000"
     ```

4. **Initialize Database**
   ```bash
   pnpm db:push      # Create database schema
   pnpm db:seed      # Seed with initial data
   ```

5. **Run Development Server**
   ```bash
   pnpm dev
   ```
   - Server runs on: `http://localhost:3001`
   - API endpoint: `http://localhost:3001/api`
   - Auto-restart on file changes

## Production Build

### Frontend Production Build

1. **Clean Previous Build** (if exists)
   ```bash
   cd Development/FE
   rm -rf dist
   ```

2. **Build for Production**
   ```bash
   pnpm build
   ```
   - Output: `dist/` directory
   - Optimized and minified
   - Source maps included

3. **Preview Production Build**
   ```bash
   pnpm preview
   ```
   - Runs on: `http://localhost:4173`

### Backend Production Build

1. **Clean Previous Build** (if exists)
   ```bash
   cd Development/BE
   rm -rf dist
   ```

2. **Build for Production**
   ```bash
   pnpm build
   ```
   - Output: `dist/` directory
   - TypeScript compiled to JavaScript

3. **Run Production Server**
   ```bash
   pnpm start
   ```

### Build Verification

**Frontend Build Output:**
```
✓ 2266 modules transformed.
dist/index.html                   0.49 kB
dist/assets/index-[hash].css     68.26 kB
dist/assets/index-[hash].js     423.62 kB
✓ built in ~4s
```

**Backend Build Output:**
```
Successfully compiled TypeScript
dist/
  ├── server.js
  ├── routes/
  └── db/
```

## Docker Build

### Using Docker Compose (Recommended)

**Build and Run Full Stack:**
```bash
# From project root
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

**Services:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Build Individual Images

**Frontend:**
```bash
cd Development/FE
docker build -t school-inventory-frontend:latest .
docker run -p 3000:80 school-inventory-frontend
```

**Backend:**
```bash
cd Development/BE
docker build -t school-inventory-backend:latest .
docker run -p 3001:3001 school-inventory-backend
```

### Docker Build Options

**Clean Build (no cache):**
```bash
docker compose build --no-cache
```

**Rebuild Specific Service:**
```bash
docker compose up -d --build frontend
docker compose up -d --build backend
```

## CI/CD

### GitHub Actions

**Workflow File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Pipeline Stages:**
1. **Build & Test**
   - Node.js 18.x and 20.x
   - Install dependencies
   - Build frontend & backend
   - Run tests
   - Upload build artifacts

2. **Docker Build**
   - Build Docker images
   - Test Docker Compose

**View Status:**
- GitHub repository → Actions tab
- Build artifacts available for download

### Azure Pipelines

**Pipeline File:** `Development/FE/azure-pipelines.yml`

**Features:**
- Multi-stage build
- Frontend & backend builds
- Test execution
- Artifact publishing

**Trigger:** Push to `main` branch

## Testing

### Frontend Tests

**Run Tests:**
```bash
cd Development/FE
pnpm test              # Run all tests
pnpm test:ui           # Run with UI
```

**Test Framework:** Playwright

### Backend Tests

Currently no automated tests configured. Add as needed.

## Troubleshooting

### Build Errors

**TypeScript Errors:**
```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

**Unused Import Error:**
- Check the error message for the file and line
- Remove unused imports or use them

**Module Not Found:**
```bash
# Clear pnpm cache
pnpm store prune
pnpm install
```

### Docker Issues

**Port Already in Use:**
```bash
# Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill process or use different ports in docker-compose.yml
```

**Permission Denied:**
```bash
# Run with sudo (Linux/Mac)
sudo docker compose up -d

# Or add user to docker group
sudo usermod -aG docker $USER
```

**Build Fails:**
```bash
# Clean Docker build cache
docker system prune -a
docker compose build --no-cache
```

### Production Build Issues

**Frontend Shows 404:**
- Check `dist/` folder exists
- Verify nginx configuration
- Check build output for errors

**Backend API Not Responding:**
- Check environment variables
- Verify database connection
- Check server logs: `docker compose logs backend`

**Database Errors:**
```bash
# Recreate database
cd Development/BE
pnpm db:push
pnpm db:seed
```

### Performance Issues

**Slow Build Times:**
- Use `pnpm` instead of `npm`
- Enable caching in CI/CD
- Increase Node.js memory:
  ```bash
  export NODE_OPTIONS="--max-old-space-size=4096"
  ```

**Large Bundle Size:**
- Check Vite build output
- Use code splitting
- Lazy load components
- Remove unused dependencies

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
PORT=3001
JWT_SECRET="your-secret-key-change-in-production"
ALLOWED_ORIGINS="http://localhost:3000"
NODE_ENV="production"
```

## Build Optimization

### Frontend
- **Code Splitting:** Automatic with Vite
- **Tree Shaking:** Removes unused code
- **Minification:** Terser for JS, cssnano for CSS
- **Source Maps:** Enabled for debugging

### Backend
- **TypeScript Compilation:** Optimized for production
- **No Dev Dependencies:** Production Docker image
- **Multi-stage Build:** Smaller final image

## Next Steps

- **Deploy to Cloud:** AWS, Azure, Google Cloud
- **Setup CI/CD:** Automated deployments
- **Add Monitoring:** Error tracking, analytics
- **Setup Backups:** Database backups
- **Configure SSL:** HTTPS certificates

For more information, see:
- [README.md](./README.md) - Project overview
- [FULLSTACK_GUIDE.md](./FULLSTACK_GUIDE.md) - Development guide
- [FEATURES_COMPLETE.md](./FEATURES_COMPLETE.md) - Feature list

