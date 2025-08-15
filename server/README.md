# Mini Seller Console - Backend Server

Backend API server for the Mini Seller Console application built with Express.js, Prisma, and SQLite.

## Quick Start

1. **Install dependencies:**
   \`\`\`bash
   cd server
   npm install
   \`\`\`

2. **Setup database:**
   \`\`\`bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Create database tables
   npm run db:seed      # Populate with sample data
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

The server will be available at `http://localhost:3001`

## API Endpoints

### Leads
- `GET /api/leads` - Get all leads (supports search, status filter, sorting)
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/:id/convert` - Convert lead to opportunity

### Opportunities
- `GET /api/opportunities` - Get all opportunities

### KPIs
- `GET /api/kpis` - Get dashboard KPI data

## Database Schema

### Lead
- `id` - Auto-increment primary key
- `name` - Lead contact name
- `company` - Company name
- `email` - Email address (unique)
- `source` - Lead source (Website, LinkedIn, etc.)
- `score` - Lead score (0-100)
- `status` - Lead status (New, Contacted, Qualified)
- `createdAt` - Creation timestamp

### Opportunity
- `id` - Auto-increment primary key
- `name` - Opportunity name
- `accountName` - Account/company name
- `stage` - Sales stage (Discovery, Proposal, etc.)
- `amount` - Deal amount (optional)
- `createdAt` - Creation timestamp

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
