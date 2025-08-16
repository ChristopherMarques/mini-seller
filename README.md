# 🚀 Mini Seller Console

> A lightweight, modern sales management console built with React + Vite + Tailwind CSS for efficient lead management and opportunity conversion.

![Mini Seller Console](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎯 Core Functionality

- **📋 Lead Management**: Comprehensive lead listing with advanced filtering and sorting capabilities
- **🔍 Smart Search**: Real-time search by name or company with instant results
- **📊 Lead Scoring**: Visual score indicators with sorting by highest potential
- **📝 Inline Editing**: Quick status updates and email validation directly in the interface
- **🔄 Lead Conversion**: One-click conversion from leads to opportunities
- **📈 Opportunity Tracking**: Dedicated opportunity management with stage tracking

### 🎨 User Experience

- **🌓 Dark/Light Theme**: Automatic theme switching with system preference detection
- **🌍 Internationalization**: Multi-language support (English/Portuguese) with react-i18next
- **📱 Responsive Design**: Seamless experience across desktop and mobile devices
- **⚡ Real-time Updates**: Instant UI updates with optimistic rendering
- **🎭 Loading States**: Elegant loading animations and error handling
- **💾 Persistent Filters**: LocalStorage integration for filter and sort preferences

### 🛠️ Technical Highlights

- **⚡ Lightning Fast**: Vite-powered development with HMR (Hot Module Replacement)
- **🎯 Type Safety**: Full TypeScript implementation with strict type checking
- **🎨 Modern UI**: Radix UI components with Tailwind CSS styling
- **📦 Optimized Bundle**: Tree-shaking and code splitting for minimal bundle size
- **🔧 Developer Experience**: ESLint + Prettier configuration for code quality

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix + Tailwind)
│   ├── kpi-cards.tsx   # Dashboard KPI metrics
│   ├── leads-table.tsx # Lead management table
│   ├── opportunities-table.tsx # Opportunity tracking
│   └── lead-detail-sheet.tsx   # Lead detail panel
├── lib/                # Utilities and configurations
│   ├── utils.ts        # Helper functions
│   └── i18n.ts         # Internationalization setup
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mini-seller

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler
```

## 📊 Data Structure

### Lead Object
```typescript
interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: 'new' | 'contacted' | 'qualified' | 'lost'
}
```

### Opportunity Object
```typescript
interface Opportunity {
  id: string
  name: string
  stage: string
  amount?: number
  accountName: string
  createdAt: string
}
```

## 🎯 Key Features Breakdown

### Lead Management
- **Dynamic Filtering**: Filter by status with real-time updates
- **Advanced Search**: Search across name and company fields
- **Smart Sorting**: Sort by score (descending) for priority management
- **Bulk Operations**: Handle 100+ leads efficiently

### Lead Detail Panel
- **Slide-over Design**: Non-intrusive detail view
- **Inline Editing**: Direct status and email editing
- **Email Validation**: Real-time email format validation
- **Save/Cancel Actions**: Proper state management with error handling

### Opportunity Conversion
- **One-click Conversion**: Seamless lead-to-opportunity workflow
- **Automatic Data Mapping**: Smart field mapping during conversion
- **Stage Management**: Opportunity pipeline tracking
- **Amount Tracking**: Optional financial data management

## 🎨 Design System

- **Color Palette**: Carefully crafted color system with CSS custom properties
- **Typography**: Responsive typography scale with proper hierarchy
- **Spacing**: Consistent spacing system using Tailwind's spacing scale
- **Components**: Reusable component library built on Radix UI primitives
- **Animations**: Smooth transitions and micro-interactions

## 🌍 Internationalization

Supported languages:
- 🇺🇸 English (default)
- 🇧🇷 Portuguese

Easily extensible for additional languages through the `public/locales/` directory.

## 🔧 Technical Stack

| Technology | Version | Purpose |
|------------|---------|----------|
| React | 18.2.0 | UI Framework |
| Vite | 5.4.19 | Build Tool |
| TypeScript | 5.6.2 | Type Safety |
| Tailwind CSS | 3.4.1 | Styling |
| Radix UI | Latest | UI Primitives |
| React i18next | Latest | Internationalization |
| Lucide React | Latest | Icons |

## 📈 Performance

- **Bundle Size**: Optimized for minimal bundle size
- **Loading Time**: Fast initial load with code splitting
- **Runtime Performance**: Efficient rendering with React 18 features
- **Memory Usage**: Optimized for handling large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by contemporary sales management tools
- Designed for developer experience and user satisfaction

---

**Made with ❤️ for efficient sales management**
