# 🚀 Production Deployment Guide

## Complete guide to deploy your School Inventory System for public access

---

## 📋 Table of Contents
1. [Quick Deployment Options](#quick-deployment-options)
2. [Local Network Access](#local-network-access)
3. [Cloud Deployment](#cloud-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Security Checklist](#security-checklist)

---

## 🎯 Quick Deployment Options

### Option 1: Deploy to Vercel + Railway (Easiest)
**Best for:** Quick deployment, automatic SSL, free tier available

**Frontend (Vercel):**
- Free hosting
- Automatic builds from Git
- Free SSL certificates
- Global CDN

**Backend (Railway):**
- Free tier available
- PostgreSQL included
- Automatic deployments
- Environment variables

### Option 2: VPS (DigitalOcean, AWS, etc.)
**Best for:** Full control, custom configuration

### Option 3: Docker on Your Server
**Best for:** Self-hosting, complete control

---

## 🏠 Local Network Access (For Testing)

### Make Your App Accessible on Local Network

**Step 1: Get Your IP Address**

Windows:
```bash
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

Linux/Mac:
```bash
ifconfig
# or
ip addr show
```

**Step 2: Update Backend .env**
```env
HOST=0.0.0.0  # Already configured!
PORT=3001
ALLOWED_ORIGINS="http://192.168.1.100:3000,http://localhost:3000"
```

**Step 3: Update Frontend .env**
```env
VITE_API_BASE_URL=http://192.168.1.100:3001/api
```

**Step 4: Start Servers**
```bash
# Backend
cd Development/BE
pnpm dev

# Frontend (new terminal)
cd Development/FE
pnpm dev
```

**Step 5: Access from Other Devices**
- Open browser on phone/tablet/other computer
- Go to: `http://192.168.1.100:3000`
- Replace `192.168.1.100` with your actual IP

✅ **Now accessible on your WiFi network!**

---

## ☁️ Cloud Deployment

### Deploy to Vercel (Frontend)

**1. Install Vercel CLI**
```bash
npm install -g vercel
```

**2. Deploy Frontend**
```bash
cd Development/FE
vercel
```

**3. Set Environment Variables in Vercel Dashboard**
```
VITE_API_BASE_URL=https://your-backend.railway.app/api
```

**4. Deploy**
```bash
vercel --prod
```

---

### Deploy to Railway (Backend)

**1. Create Railway Account**
- Go to https://railway.app
- Sign up with GitHub

**2. Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Select your repository

**3. Configure Backend Service**
- Set root directory: `Development/BE`
- Add environment variables:

```env
DATABASE_URL=postgresql://... (Railway provides this)
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
ALLOWED_ORIGINS=https://yourapp.vercel.app
```

**4. Add PostgreSQL Database**
- Click "New" → "Database" → "PostgreSQL"
- Railway automatically connects it

**5. Deploy**
- Railway automatically deploys on push
- Get your backend URL: `https://your-app.railway.app`

---

### Deploy to AWS/DigitalOcean/Linode

**1. Create a Server**
- Ubuntu 22.04 LTS recommended
- Minimum: 1GB RAM, 1 CPU

**2. Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install nginx
sudo apt install -y nginx

# Install PostgreSQL (optional)
sudo apt install -y postgresql postgresql-contrib
```

**3. Clone Repository**
```bash
git clone https://github.com/yourusername/School-Inventory-Management-System-Llama.git
cd School-Inventory-Management-System-Llama
```

**4. Setup Backend**
```bash
cd Development/BE
pnpm install
cp .env.production .env
# Edit .env with your values
nano .env

# Setup database
pnpm db:push
pnpm db:seed

# Build
pnpm build
```

**5. Setup Frontend**
```bash
cd ../FE
pnpm install
cp .env.production .env
# Edit .env with your backend URL
nano .env

# Build
pnpm build
```

**6. Setup PM2 (Process Manager)**
```bash
npm install -g pm2

# Start backend
cd Development/BE
pm2 start dist/server.js --name "inventory-backend"

# Save PM2 config
pm2 save
pm2 startup
```

**7. Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/inventory
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/Development/FE/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/inventory /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**8. Setup SSL (HTTPS)**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🐳 Docker Deployment

### Local Docker (Already Configured!)

**Development:**
```bash
docker compose up -d
```

**Production:**
```bash
docker compose -f docker-compose.prod.yml up -d
```

### Deploy to Docker VPS

**1. Install Docker on Server**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**2. Clone & Deploy**
```bash
git clone https://github.com/yourusername/School-Inventory-Management-System-Llama.git
cd School-Inventory-Management-System-Llama

# Create production .env
nano .env

# Add:
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
ALLOWED_ORIGINS=https://yourdomain.com
API_URL=http://backend:3001

# Deploy
docker compose -f docker-compose.prod.yml up -d
```

**3. View Logs**
```bash
docker compose logs -f
```

---

## 🔐 Environment Configuration

### Backend (.env)

**Development:**
```env
DATABASE_URL="file:./dev.db"
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
JWT_SECRET="dev-secret-key"
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
```

**Production:**
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
JWT_SECRET="STRONG-RANDOM-SECRET-HERE"
ALLOWED_ORIGINS="https://yourschool.com,https://www.yourschool.com"
```

### Frontend (.env)

**Development:**
```env
VITE_API_BASE_URL=http://localhost:3001/api
NODE_ENV=development
```

**Production:**
```env
VITE_API_BASE_URL=https://api.yourschool.com/api
NODE_ENV=production
```

---

## 🔒 Security Checklist

Before going live, ensure:

### Backend Security:
- [ ] Change JWT_SECRET to strong random value
- [ ] Update ALLOWED_ORIGINS to only your domains
- [ ] Use PostgreSQL/MySQL instead of SQLite
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Regular backups configured
- [ ] Update dependencies regularly
- [ ] Add rate limiting (optional)

### Frontend Security:
- [ ] Remove console.logs in production
- [ ] Enable HTTPS
- [ ] Set proper CORS headers
- [ ] Validate all user inputs
- [ ] Sanitize data before display

### Infrastructure:
- [ ] Use strong passwords
- [ ] Enable firewall (ufw)
- [ ] Keep system updated
- [ ] Monitor server resources
- [ ] Set up error logging
- [ ] Configure backups

---

## 🌐 Popular Hosting Services

### Free Tier Options:

| Service | Frontend | Backend | Database |
|---------|----------|---------|----------|
| **Vercel** | ✅ Free | ❌ | ❌ |
| **Netlify** | ✅ Free | ❌ | ❌ |
| **Railway** | ❌ | ✅ Free tier | ✅ Included |
| **Render** | ✅ Free | ✅ Free tier | ✅ Free PostgreSQL |
| **Fly.io** | ✅ Free tier | ✅ Free tier | ✅ Free tier |

### Recommended Combos:
1. **Vercel (FE) + Railway (BE)** - Easiest, good free tier
2. **Netlify (FE) + Render (BE)** - All-in-one free
3. **VPS (DigitalOcean)** - $5/month, full control

---

## 📊 Testing Deployment

### 1. Health Check
```bash
curl https://your-api.com/api/health
```

Should return:
```json
{"status":"ok","message":"School Inventory API is running!"}
```

### 2. Test Frontend
Open browser: `https://yourschool.com`

### 3. Test API Connection
- Open browser dev tools (F12)
- Go to Network tab
- Try to add an item
- Check if API calls succeed

---

## 🆘 Troubleshooting

### Frontend can't connect to Backend
- Check CORS settings in backend .env
- Verify VITE_API_BASE_URL is correct
- Check browser console for errors

### Docker containers can't communicate
- Ensure both in same network
- Use service names (backend, frontend) not localhost
- Check docker logs: `docker compose logs`

### Server not accessible externally
- Check firewall: `sudo ufw status`
- Open ports: `sudo ufw allow 3000` and `sudo ufw allow 3001`
- Verify HOST=0.0.0.0 in backend

---

## ✅ Quick Deploy Commands

**Local Network:**
```bash
# Set HOST=0.0.0.0 in .env, then:
cd Development/BE && pnpm dev &
cd Development/FE && pnpm dev
```

**Docker:**
```bash
docker compose up -d
```

**Production Build:**
```bash
cd Development/FE && pnpm build
cd Development/BE && pnpm build
```

---

## 🎉 Success!

Your app is now accessible! 

**Next steps:**
1. Get a domain name (optional)
2. Set up monitoring
3. Configure backups
4. Add analytics
5. Customize for your school

**Need help?** Check the documentation or deployment service docs.

