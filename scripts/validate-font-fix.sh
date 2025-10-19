#!/bin/bash

# Google Font Preconnect Fix Validation Script

echo "🔍 Validating Google Font Preconnect Fix..."

# Check 1: Verify font configuration
echo "✅ Checking font configuration..."
if grep -q 'subsets: \["latin"\]' lib/font-loader.ts; then
    echo "   ✓ Font subsets properly specified"
else
    echo "   ❌ Font subsets missing"
fi

if grep -q 'display: "swap"' lib/font-loader.ts; then
    echo "   ✓ Font display swap enabled"
else
    echo "   ❌ Font display swap missing"
fi

if grep -q 'preload: true' lib/font-loader.ts; then
    echo "   ✓ Font preload enabled"
else
    echo "   ❌ Font preload missing"
fi

# Check 2: Verify no manual preconnect links
echo "✅ Checking for manual preconnect links..."
if ! grep -q 'rel="preconnect".*fonts\.googleapis\.com' app/layout.tsx; then
    echo "   ✓ No conflicting manual preconnect links"
else
    echo "   ❌ Manual preconnect links found (should be removed)"
fi

# Check 3: TypeScript validation
echo "✅ Running TypeScript validation..."
npx tsc --noEmit --skipLibCheck 2>/dev/null
if [ $? -eq 0 ]; then
    echo "   ✓ No TypeScript errors"
else
    echo "   ❌ TypeScript errors found"
fi

# Check 4: ESLint validation
echo "✅ Running ESLint validation..."
npx eslint lib/font-loader.ts app/layout.tsx 2>/dev/null
if [ $? -eq 0 ]; then
    echo "   ✓ No ESLint errors"
else
    echo "   ❌ ESLint errors found"
fi

echo ""
echo "🎉 Google Font Preconnect Fix Validation Complete!"
echo "   Next.js will automatically handle preconnect for Google Fonts"
echo "   No manual preconnect links needed when using next/font/google"