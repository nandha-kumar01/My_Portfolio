#!/bin/bash

# Portfolio Performance Optimization Script
# This script runs various optimizations for better performance

echo "🚀 Starting Portfolio Performance Optimization..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# 1. Clean up dependencies
print_status "Cleaning up dependencies..."
npm prune
npm audit fix --force 2>/dev/null || true
print_success "Dependencies cleaned up"

# 2. Clear Next.js cache
print_status "Clearing Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache
print_success "Next.js cache cleared"

# 3. Optimize images (if imagemin-cli is available)
if command -v imagemin &> /dev/null; then
    print_status "Optimizing images..."
    find public -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read img; do
        imagemin "$img" --out-dir="$(dirname "$img")" --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant 2>/dev/null || true
    done
    print_success "Images optimized"
else
    print_warning "imagemin-cli not found. Skipping image optimization."
fi

# 4. Build the project
print_status "Building optimized production build..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# 5. Analyze bundle size (if next-bundle-analyzer is available)
if grep -q "next-bundle-analyzer" package.json; then
    print_status "Analyzing bundle size..."
    ANALYZE=true npm run build 2>/dev/null || true
    print_success "Bundle analysis complete"
else
    print_warning "Bundle analyzer not configured. Consider adding @next/bundle-analyzer."
fi

# 6. Security audit
print_status "Running security audit..."
npm audit --audit-level moderate
if [ $? -eq 0 ]; then
    print_success "No security vulnerabilities found"
else
    print_warning "Security vulnerabilities detected. Run 'npm audit fix' to resolve."
fi

# 7. Check for unused dependencies
print_status "Checking for unused dependencies..."
if command -v depcheck &> /dev/null; then
    depcheck --ignore-bin-package --skip-missing
    print_success "Dependency check complete"
else
    print_warning "depcheck not found. Consider installing it globally: npm install -g depcheck"
fi

print_success "🎉 Portfolio optimization complete!"
print_status "Next steps:"
echo "  1. Run 'npm start' to test the optimized build"
echo "  2. Monitor performance using the built-in performance monitor"
echo "  3. Consider enabling compression at the server level"
echo "  4. Set up CDN for static assets"