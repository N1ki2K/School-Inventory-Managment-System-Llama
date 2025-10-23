#!/bin/bash
# Build Verification Script for Linux/Mac
# This script tests all builds to ensure everything works

echo "🔍 School Inventory System - Build Verification"
echo "================================================="
echo ""

ERROR_COUNT=0

# Test Frontend Build
echo "📦 Testing Frontend Build..."
cd Development/FE
if pnpm build; then
    echo "✅ Frontend Build: SUCCESS"
else
    echo "❌ Frontend Build: FAILED"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Test Backend Build
echo ""
echo "📦 Testing Backend Build..."
cd ../BE
if pnpm build; then
    echo "✅ Backend Build: SUCCESS"
else
    echo "❌ Backend Build: FAILED"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Return to root
cd ../..

# Summary
echo ""
echo "================================================="
if [ $ERROR_COUNT -eq 0 ]; then
    echo "🎉 All Builds Successful!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: docker compose up -d"
    echo "  2. Open: http://localhost:3000"
    echo ""
    exit 0
else
    echo "⚠️  $ERROR_COUNT build(s) failed"
    echo "Check the error messages above"
    exit 1
fi

