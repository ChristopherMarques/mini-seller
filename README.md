# 🚀 Mini Seller Console

> A lightweight, modern sales management console built with React + Vite + Tailwind CSS for efficient lead management and opportunity conversion. This project demonstrates advanced React patterns, TypeScript implementation, and modern UI/UX practices.

**🎯 Purpose**: This project serves as a comprehensive technical demonstration showcasing modern frontend development practices, component architecture, and user experience design.

![Mini Seller Console](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript)

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
- **🏗️ Modular Architecture**: Component-based architecture with dedicated folders
- **🔄 Shared Resources**: Centralized types, utilities, and constants
- **📝 Clean Code**: English documentation and consistent code standards
- **🎓 Interactive Tutorial**: Built-in guided tutorial system for user onboarding
- **📊 Export Functionality**: Excel and CSV export capabilities for data analysis
- **🔍 Advanced Filtering**: Multi-criteria filtering with persistent preferences
- **📱 Mobile-First**: Responsive design optimized for all device sizes

## 🏗️ Architecture

```
src/
├── components/                    # Organized component library
│   ├── ui/                       # Base UI components (Radix + Tailwind)
│   ├── shared/                   # Shared utilities and types
│   │   ├── types.ts             # Common type definitions
│   │   ├── constants.ts         # Shared constants
│   │   ├── utils.ts             # Shared utility functions
│   │   └── index.ts             # Centralized exports
│   ├── kpi-cards/               # KPI dashboard components
│   │   ├── kpi-cards.tsx        # Main component
│   │   ├── types.ts             # Component-specific types
│   │   ├── utils.ts             # Component utilities
│   │   └── index.ts             # Component exports
│   ├── leads-table/             # Lead management components
│   │   ├── leads-table.tsx      # Main table component
│   │   ├── score-indicator.tsx  # Score visualization
│   │   ├── types.ts             # Lead table types
│   │   ├── utils.ts             # Table utilities
│   │   └── index.ts             # Component exports
│   ├── opportunities-table/     # Opportunity management
│   │   ├── opportunities-table.tsx    # Main component
│   │   ├── opportunities-header.tsx   # Table header
│   │   ├── empty-opportunities-state.tsx # Empty state
│   │   ├── types.ts             # Opportunity types
│   │   ├── utils.ts             # Opportunity utilities
│   │   └── index.ts             # Component exports
│   ├── lead-detail-sheet/       # Lead detail management
│   │   ├── lead-detail-sheet.tsx # Main sheet component
│   │   ├── lead-header.tsx      # Sheet header
│   │   ├── lead-form.tsx        # Form component
│   │   ├── sheet-actions.tsx    # Action buttons
│   │   ├── types.ts             # Sheet types
│   │   ├── utils.ts             # Sheet utilities
│   │   └── index.ts             # Component exports
│   ├── lead-import-dialog/      # Lead import functionality
│   │   ├── lead-import-dialog.tsx # Main dialog
│   │   ├── json-import-tab.tsx  # JSON import tab
│   │   ├── manual-import-tab.tsx # Manual import tab
│   │   ├── types.ts             # Import types
│   │   ├── utils.ts             # Import utilities
│   │   └── index.ts             # Component exports
│   └── language-switcher/       # Internationalization
│       ├── language-switcher.tsx # Language toggle
│       ├── types.ts             # Language types
│       ├── utils.ts             # Language utilities
│       └── index.ts             # Component exports
├── contexts/                    # React contexts
│   ├── leads-provider.tsx       # Lead state management
│   └── theme-provider.tsx       # Theme management
├── lib/                         # Utilities and configurations
│   ├── utils.ts                 # Helper functions
│   └── i18n.ts                  # Internationalization setup
├── types/                       # Global TypeScript definitions
└── App.tsx                      # Main application component
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
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report
pnpm test:ui          # Run tests with UI interface
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm type-check       # Run TypeScript compiler
pnpm format           # Format code with Prettier
```

### First Time Setup

1. **Start the development server**: `pnpm dev`
2. **Open your browser**: Navigate to `http://localhost:3000`
3. **Take the tutorial**: Click the "Start Tutorial" button to learn the interface
4. **Import sample data**: Use the import functionality to add leads
5. **Explore features**: Try filtering, searching, and converting leads to opportunities

### Testing

The project includes focused unit tests for core functionality:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

**Test Coverage:**
- ✅ Utility functions (`src/components/shared/utils.test.ts`) - 32 tests
- ✅ Score indicator component (`src/components/leads-table/score-indicator.test.tsx`) - 8 tests
- **Total: 40 unit tests**

The test suite focuses on:
- Core utility functions (validation, formatting, filtering)
- Component rendering and behavior
- Business logic validation
- Simple, maintainable test cases

### Code Quality & Formatting

```bash
# Check for linting issues
npm run lint:check

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check TypeScript types
npm run type-check

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
````

### Opportunity Object

```typescript
interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  createdAt: string;
}
```

## 🎯 Key Features Breakdown

### Lead Management

- **Dynamic Filtering**: Filter by status with real-time updates
- **Advanced Search**: Search across name and company fields
- **Smart Sorting**: Sort by score (descending) for priority management
- **Bulk Operations**: Handle 100+ leads efficiently
- **Lead Import**: JSON and manual lead import functionality
- **Score Visualization**: Color-coded score indicators with progress bars
- **Data Export**: Export filtered leads to Excel (.xlsx) or CSV formats
- **Always-Visible Import**: Import button available in leads table for easy access

### Interactive Tutorial System

- **Guided Onboarding**: Step-by-step tutorial for new users
- **Conditional Steps**: Tutorial adapts based on available UI elements
- **Visual Highlights**: Spotlight effect on tutorial targets
- **Progress Tracking**: Clear indication of tutorial progress
- **Skip Functionality**: Users can skip or restart the tutorial anytime

### Lead Detail Panel

- **Slide-over Design**: Non-intrusive detail view
- **Inline Editing**: Direct status and email editing
- **Email Validation**: Real-time email format validation
- **Save/Cancel Actions**: Proper state management with error handling
- **Form Validation**: Comprehensive form validation with error messages

### Opportunity Conversion

- **One-click Conversion**: Seamless lead-to-opportunity workflow
- **Automatic Data Mapping**: Smart field mapping during conversion
- **Stage Management**: Opportunity pipeline tracking
- **Amount Tracking**: Optional financial data management
- **Empty State Handling**: Elegant empty states with import suggestions

### Data Management

- **LocalStorage Persistence**: Automatic data persistence across sessions
- **JSON Fallback**: Initial data loading from JSON files
- **State Management**: Centralized state with React Context
- **Real-time Updates**: Instant UI updates with optimistic rendering

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

### Core Technologies

| Technology    | Version | Purpose                     |
| ------------- | ------- | --------------------------- |
| React         | 18      | UI Framework                |
| Vite          | 5.2.0   | Build Tool                  |
| TypeScript    | 5.2.2   | Type Safety                 |
| Tailwind CSS  | 3.4.17  | Styling                     |
| Radix UI      | Latest  | UI Primitives               |
| React i18next | Latest  | Internationalization        |
| Lucide React  | 0.454.0 | Icons                       |
| XLSX          | 0.18.5  | Excel Export Functionality  |
| File-Saver    | 2.0.5   | File Download Management    |
| React Joyride | 2.9.3   | Interactive Tutorial System |
| Sonner        | 2.0.7   | Toast Notifications         |

### Development Tools

| Technology           | Version | Purpose                     |
| -------------------- | ------- | --------------------------- |
| Vitest               | 3.2.4   | Testing Framework           |
| Testing Library      | 16.3.0  | React Testing Utilities     |
| Jest DOM             | 6.7.0   | DOM Testing Matchers        |
| ESLint               | 8.57.0  | Code Linting                |
| Prettier             | 3.6.2   | Code Formatting             |
| MSW                  | 2.10.5  | API Mocking                 |
| JSDOM                | 26.1.0  | DOM Environment for Tests   |

## ⚙️ Development Configuration

### Code Quality Tools

- **ESLint**: Configured for React, TypeScript, and React Hooks
- **Prettier**: Automatic code formatting with consistent style
- **VSCode Integration**: Auto-format on save and lint fixes
- **Batch Scripts**: Windows-compatible scripts for easy linting

### VSCode Setup

The project includes VSCode configuration files:

- `.vscode/settings.json`: Editor settings for consistent formatting
- `.vscode/extensions.json`: Recommended extensions for optimal development

### Linting Rules

- React Hooks validation
- Unused variables detection
- Console statement warnings
- Consistent code style enforcement
- TypeScript best practices

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

This project is licensed under a Custom Technical Assessment License - see the [LICENSE.md](LICENSE.md) file for details.

**⚠️ Important**: This project is intended exclusively for technical assessment purposes in job application processes. Commercial use, redistribution, or any other use is strictly prohibited.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by contemporary sales management tools
- Designed for developer experience and user satisfaction

---

**Made with ❤️ for efficient sales management**
