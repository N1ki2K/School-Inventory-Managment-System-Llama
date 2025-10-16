# School Inventory Management System

[![CI/CD Pipeline](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/ci.yml/badge.svg)](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/ci.yml)
[![Dependency Management](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/dependencies.yml/badge.svg)](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/dependencies.yml)
[![Performance Testing](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/performance.yml/badge.svg)](https://github.com/N1ki2K/School-Inventory-Managment-System-Llama/actions/workflows/performance.yml)

A modern, full-featured inventory management system built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite
- **UI Components**: Tailwind CSS, Radix UI, shadcn/ui
- **State Management**: Zustand, TanStack Query, Apollo Client
- **Forms**: React Hook Form with Zod validation
- **Routing**: TanStack Router
- **Internationalization**: i18next
- **Testing**: Playwright for E2E testing
- **Data Visualization**: Recharts, TanStack Table
- **Notifications**: Sonner toast notifications
- **Deployment**: Docker with Nginx

## 🛠️ Tech Stack

### Build Tools & Development
- **Vite** - Modern build tool and dev server
- **TypeScript** - Static typing for reliable code
- **ESLint** - Code linting for quality
- **Prettier** - Automatic code formatting

### React Ecosystem
- **React 18** - Main UI framework
- **React DOM** - Browser rendering
- **React Hook Form** - Form management with validation
- **TanStack Router** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Icons
- **shadcn/ui** - Ready-made UI components

### State Management & Data Fetching
- **TanStack Query** - Server state management and caching
- **Apollo Client** - GraphQL client for data fetching
- **Zustand** - Lightweight state management
- **Zod** - Schema validation

### Internationalization
- **i18next** - Multi-language support
- **react-i18next** - React integration for i18n

### Testing
- **Playwright** - End-to-end testing

### Data Visualization
- **Recharts** - Charts and diagrams
- **TanStack Table** - Complex tables with features

### Deployment & DevOps
- **Docker** - Containerization
- **Nginx** - Web server for production

### Additional Libraries
- **Sonner** - Toast notifications

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/N1ki2K/School-Inventory-Managment-System-Llama.git
cd School-Inventory-Managment-System-Llama
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

## 🚀 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run Playwright tests
- `pnpm test:ui` - Run tests with UI
- `pnpm docker:build` - Build Docker image
- `pnpm docker:run` - Run Docker container
- `pnpm docker:compose` - Run with Docker Compose

## 🐳 Docker Deployment

### Build and run with Docker:
```bash
pnpm docker:build
pnpm docker:run
```

### Using Docker Compose:
```bash
pnpm docker:compose
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run end-to-end tests:
```bash
pnpm test
```

Run tests with UI:
```bash
pnpm test:ui
```

## 🚀 CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with GitHub Actions:

### Automated Workflows
- **CI/CD Pipeline**: Lint, test, build, and deploy
- **Dependency Management**: Automated updates and security scanning
- **Release Management**: Automated releases with Docker images
- **Preview Deployments**: Automatic previews for pull requests
- **Performance Testing**: Lighthouse, bundle analysis, and load testing
- **Infrastructure Management**: Terraform and database migrations
- **Monitoring & Alerting**: Health checks and notifications

### Quality Gates
- ✅ Code linting and type checking
- ✅ Automated testing with Playwright
- ✅ Security vulnerability scanning
- ✅ Performance testing with Lighthouse
- ✅ Docker image building and scanning
- ✅ Automated dependency updates

### Deployment Strategy
- **Staging**: Automatic deployment on `develop` branch
- **Production**: Manual approval required for `main` branch
- **Preview**: Automatic preview deployments for pull requests

For detailed CI/CD documentation, see [.github/README.md](.github/README.md)

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── stores/        # Zustand stores
├── lib/           # Library configurations
└── locales/       # Internationalization files
```

## 🔧 Configuration

### Environment Variables
- `VITE_GRAPHQL_ENDPOINT` - GraphQL API endpoint
- `VITE_API_BASE_URL` - API base URL
- `VITE_ENABLE_ANALYTICS` - Enable analytics
- `VITE_ENABLE_DEBUG` - Enable debug mode

### Tailwind CSS
The project uses Tailwind CSS with custom design tokens for consistent theming.

### ESLint & Prettier
Configured for TypeScript and React with strict rules for code quality.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For support, please open an issue in the GitHub repository.