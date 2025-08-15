#!/bin/bash

echo "🗄️  Setting up database..."

cd server

# Install dependencies
echo "📦 Installing server dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push schema to database
echo "📊 Creating database tables..."
npm run db:push

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo "✅ Database setup complete!"
echo "🚀 You can now start the server with: cd server && npm run dev"
