<div align="center">

![Starships Banner](./apps/host/public/og.jpg)

# ⭐ Starships

**Explore the galaxy of starships from the Star Wars universe**

_A modern microfrontend application built with Module Federation, React, and TypeScript_

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Webpack](https://img.shields.io/badge/Webpack-5.101-8DD6F9.svg)](https://webpack.js.org/)
[![Module Federation](https://img.shields.io/badge/Module%20Federation-Enabled-FF6B6B.svg)](https://module-federation.github.io/)

</div>

---

## 🚀 Overview

**Starships** is a sophisticated microfrontend application that demonstrates the power of **Webpack Module Federation** for building distributed, scalable frontend architectures. The application showcases starships from the Star Wars universe with a beautiful, space-themed UI built using React and TypeScript.

### ✨ Key Features

- 🎯 **Microfrontend Architecture** - Independent, deployable frontend modules
- 🔧 **Module Federation** - Runtime integration of remote modules
- ⚡ **Hot Module Replacement** - Fast development experience
- 🎨 **Styled Components** - Beautiful, themeable UI components
- 📦 **Monorepo Structure** - Organized with pnpm workspaces
- 🔍 **Type Safety** - Full TypeScript support with generated type definitions
- 🌐 **Multi-Page Application** - Home and Ship detail pages as separate microfrontends

---

## 🏗️ Architecture

This project follows a **microfrontend architecture** where different parts of the application are developed, built, and deployed independently as separate packages:

```
┌─────────────────────────────────────────────────────────┐
│                      Host App                           │
│                  (apps/host)                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │ Home Page  │  │ Ship Page  │  │ UI Components│       │
│  │ (Remote)   │  │  (Remote)  │  │  (Remote)  │         │
│  └────────────┘  └────────────┘  └────────────┘         │
│         │              │                  │             │
│         └──────────────┼──────────────────┘             │
│                        │                                │
│         ┌──────────────┼──────────────┐                 │
│         ▼              ▼              ▼                 │
│  ┌─────────┐   ┌──────────┐  ┌─────────────┐            │
│  │  API    │   │  Hooks   │  │   Styles    │            │
│  │ (Remote)│   │ (Remote) │  │  (Remote)   │            │
│  └─────────┘   └──────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### 📦 Packages

#### **Apps**

- `apps/host` - Main host application that orchestrates all microfrontends

#### **Pages** (Microfrontend Pages)

- `pages/home` - Home page with starship list and search
- `pages/ship` - Individual starship detail page

#### **Packages** (Shared Microfrontends)

- `packages/api` - API client and types
- `packages/hooks` - Shared React hooks (useApi, etc.)
- `packages/ui_components` - Reusable UI component library
- `packages/styles` - Shared styles, colors, fonts, and utilities
- `packages/utils` - Utility functions (debounce, search params, etc.)
- `packages/webpack` - Shared webpack configuration
- `packages/builder` - Build orchestration script
- `packages/eslint-config` - Shared ESLint configuration
- `packages/tsconfig` - Shared TypeScript configurations

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.5
- **Build Tool**: Webpack 5.101
- **Module Federation**: @module-federation/typescript
- **Styling**: Styled Components
- **Routing**: React Router
- **Package Manager**: pnpm 10.10.0
- **Linting**: ESLint 9 + Prettier

---

## 📋 Prerequisites

- **Node.js**: 22.x
- **pnpm**: 10.10.0

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start all microfrontends in development mode
pnpm dev

# Or start in prepare mode (builds all packages first, then serves)
pnpm dev:prepare
```

The application will be available at:

- **Host**: http://localhost:3000
- **API**: http://localhost:3002
- **UI Components**: http://localhost:3005
- **Home Page**: http://localhost:3006
- **Ship Page**: http://localhost:3007

### Building

```bash
# Build all packages for production
pnpm build
```

This will:

1. Build all remote microfrontends
2. Build the host application
3. Bundle everything into a single `dist/` directory

### Other Commands

```bash
# Run type checking across all packages
pnpm typecheck

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Clean build artifacts
pnpm clean
```

---

## 🎨 Features

### Home Page

- Browse starships from the Star Wars universe
- Real-time search by name or model
- Pagination for easy navigation
- Beautiful card-based UI

### Ship Detail Page

- Detailed information about each starship
- Dynamic background images
- Responsive design

### Shared Components

- Reusable UI components (Cards, Buttons, Pagination, etc.)
- Consistent styling system
- Type-safe component library

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
APP_BASE_URL=http://localhost:3000
STAGE=development
```

### Module Federation

Module federation configuration is centralized in `packages/module-federation-config`. Each microfrontend exposes specific components and consumes remote modules as needed.

---

## 📁 Project Structure

```
starships/
├── apps/
│   └── host/              # Main host application
├── pages/
│   ├── home/              # Home page microfrontend
│   └── ship/              # Ship detail page microfrontend
├── packages/
│   ├── api/               # API client
│   ├── hooks/             # Shared React hooks
│   ├── ui_components/     # UI component library
│   ├── styles/            # Shared styles
│   ├── utils/             # Utility functions
│   ├── webpack/           # Webpack configuration
│   ├── builder/           # Build scripts
│   ├── eslint-config/     # ESLint configuration
│   └── tsconfig/          # TypeScript configurations
└── package.json
```
