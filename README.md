# 🏫 School Inventory Management System

A complete full-stack application for managing school inventory items.

![Status](https://img.shields.io/badge/status-complete-success)
![Frontend](https://img.shields.io/badge/frontend-React%2018-blue)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green)
![Database](https://img.shields.io/badge/database-SQLite-yellow)

---

## 🚀 Quick Start

### Backend
```bash
cd Development/BE
pnpm install
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```
Runs on: **http://localhost:3001**

### Frontend
```bash
cd Development/FE
pnpm install
cp .env.example .env
pnpm dev
```
Runs on: **http://localhost:5173**

---

## 📖 Documentation

- **[START_HERE.md](./START_HERE.md)** - Quick start guide
- **[FULLSTACK_GUIDE.md](./FULLSTACK_GUIDE.md)** - Complete development guide
- **[BUILD_GUIDE.md](./BUILD_GUIDE.md)** - Build & deployment guide
- **[CI_CD_FIXES.md](./CI_CD_FIXES.md)** - CI/CD configuration
- **[FEATURES_COMPLETE.md](./FEATURES_COMPLETE.md)** - Feature list
- **[ALL_FIXES_SUMMARY.md](./ALL_FIXES_SUMMARY.md)** - Recent fixes

---

## ✅ Build Status

All builds verified and working:
- ✅ Frontend Build: Clean (0 errors)
- ✅ Backend Build: Clean (0 errors)
- ✅ TypeScript: All errors fixed
- ✅ Docker: Full-stack configured
- ✅ CI/CD: Azure + GitHub Actions

**Verify builds:** Run `./verify-build.ps1` (Windows) or `./verify-build.sh` (Linux/Mac)

---

## ✨ Features

- ✅ Modern React UI with Tailwind CSS
- ✅ REST API with Express + TypeScript
- ✅ SQLite database with Prisma ORM
- ✅ User authentication (JWT)
- ✅ Real-time inventory management
- ✅ Status tracking (Available / In Use / Needs Repair)
- ✅ Fully typed with TypeScript

---

## 🗂️ Project Structure

```
Development/
├── FE/         # React frontend
└── BE/         # Express backend
```

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, TypeScript, Prisma, SQLite, JWT  
**Tools:** pnpm, ESLint, Prettier

---

## 📝 Default Credentials

**Admin:** admin@school.com / admin123

---

## 📞 API Endpoints

- `GET /api/inventory` - Get all items
- `POST /api/inventory` - Create item
- `PATCH /api/inventory/:id/status` - Update status
- `POST /auth/login` - Login
- `POST /auth/register` - Register

Full API docs in [FULLSTACK_GUIDE.md](./FULLSTACK_GUIDE.md)

---

## 🎯 For AI Best 2025 Competition

Built with modern best practices and production-ready architecture.

---

**License:** ISC  
**Author:** AI Best 2025 Team

