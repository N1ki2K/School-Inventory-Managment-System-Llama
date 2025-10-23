# School Inventory Backend

Backend API for the School Inventory Management System.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd Development/BE
pnpm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Database
```bash
pnpm db:push
```

### 4. Seed Database
```bash
pnpm db:seed
```

### 5. Start Development Server
```bash
pnpm dev
```

Server will run on `http://localhost:3001`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/:id` - Get single item
- `POST /api/inventory` - Create item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item
- `PATCH /api/inventory/:id/status` - Update item status

### Requests
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Create request
- `PATCH /api/requests/:id/status` - Update request status
- `DELETE /api/requests/:id` - Delete request

### Health Check
- `GET /api/health` - Server health status

---

## 🗄️ Database

Using SQLite with Prisma ORM for simplicity.

### Schema
- **Users** - User authentication and roles
- **InventoryItem** - Inventory items
- **Request** - Item requests

### Commands
- `pnpm db:push` - Push schema to database
- `pnpm db:seed` - Seed with initial data
- `pnpm db:studio` - Open Prisma Studio GUI

---

## 🔐 Default Credentials

**Admin User:**
- Email: `admin@school.com`
- Password: `admin123`

---

## 🛠️ Tech Stack

- **Node.js** + **TypeScript**
- **Express** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

---

## 📦 Scripts

- `pnpm dev` - Start dev server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:push` - Update database schema
- `pnpm db:seed` - Seed database
- `pnpm db:studio` - Open database GUI

---

## 🔧 Environment Variables

```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:5173
```

---

Created for AI Best 2025 Competition

