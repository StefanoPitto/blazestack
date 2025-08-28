#!/bin/bash

echo "🚀 Starting Fire Incident Mini-Portal Development Environment"
echo "=========================================================="
echo "📦 TypeScript + Modular Architecture v2.0"
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! curl -s http://localhost:27017 > /dev/null 2>&1; then
    echo "⚠️  Warning: MongoDB might not be running on localhost:27017"
    echo "   Please start MongoDB or update the MONGODB_URI in apps/server/.env"
    echo "   You can use MongoDB Atlas or start MongoDB locally with: mongod"
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists in server
if [ ! -f "apps/server/.env" ]; then
    echo "⚙️  Creating .env file for server..."
    cp apps/server/env.example apps/server/.env
fi

# Type checking
echo "🔍 Running TypeScript type checking..."
npm run type-check

# Linting
echo "🧹 Running ESLint..."
npm run lint

echo ""
echo "🎯 Starting development servers..."
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo "   Health Check: http://localhost:3001/api/health"
echo ""
echo "📋 Available commands:"
echo "   npm run type-check    - TypeScript type checking"
echo "   npm run lint          - ESLint linting"
echo "   npm run lint:fix      - Auto-fix linting issues"
echo "   npm run build         - Build both apps"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev
