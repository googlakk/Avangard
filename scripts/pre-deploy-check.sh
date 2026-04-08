#!/bin/bash

# Pre-deployment checks for AvangardIntellect
# Runs all critical checks before production deployment

set -e

echo "=========================================="
echo "🚀 AvangardIntellect Pre-Deployment Checks"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

error_count=0
warning_count=0

# 1. Type checking
echo "📝 Running TypeScript type-check..."
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Type-check passed${NC}"
else
    echo -e "${RED}✗ Type-check failed${NC}"
    error_count=$((error_count + 1))
fi

# 2. Linting
echo "🔍 Running ESLint..."
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Lint passed${NC}"
else
    echo -e "${RED}✗ Lint failed${NC}"
    error_count=$((error_count + 1))
fi

# 3. i18n check
echo "🌍 Checking i18n translations..."
if npm run check:i18n > /dev/null 2>&1; then
    echo -e "${GREEN}✓ i18n check passed${NC}"
else
    echo -e "${YELLOW}⚠ i18n check has warnings${NC}"
    warning_count=$((warning_count + 1))
fi

# 4. Migration types sync
echo "🗄️  Checking database type sync..."
if npm run check:migration-types > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Migration types in sync${NC}"
else
    echo -e "${RED}✗ Migration types out of sync${NC}"
    error_count=$((error_count + 1))
fi

# 5. Build
echo "🔨 Building production bundle..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    error_count=$((error_count + 1))
fi

# 6. Check for large files in public/
echo "📦 Checking for oversized assets..."
large_files=$(find public/images -size +500k -o -size +5M | wc -l)
if [ "$large_files" -eq 0 ]; then
    echo -e "${GREEN}✓ All assets optimized${NC}"
else
    echo -e "${YELLOW}⚠ Found $large_files large files in public/${NC}"
    find public/images -size +500k -o -size +5M -exec ls -lh {} \;
    warning_count=$((warning_count + 1))
fi

# 7. Check for unused PNG/MP4 files
echo "🎬 Checking for unoptimized media..."
png_count=$(find public -name "*.png" | wc -l)
large_mp4=$(find public/videos -name "*.mp4" -size +50M | wc -l)

if [ "$png_count" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $png_count PNG files (should be JPG)${NC}"
    warning_count=$((warning_count + 1))
fi

if [ "$large_mp4" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $large_mp4 large MP4 files${NC}"
    warning_count=$((warning_count + 1))
fi

if [ "$png_count" -eq 0 ] && [ "$large_mp4" -eq 0 ]; then
    echo -e "${GREEN}✓ Media optimized${NC}"
fi

# 8. Verify critical files exist
echo "📄 Verifying required files..."
missing_files=0

required_files=(
    "public/og-image.jpg"
    "public/robots.txt"
    "public/sitemap.xml"
    ".env.local"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file (missing)"
        missing_files=$((missing_files + 1))
    fi
done

if [ "$missing_files" -gt 0 ]; then
    error_count=$((error_count + missing_files))
fi

# Summary
echo ""
echo "=========================================="
echo "📋 SUMMARY"
echo "=========================================="
echo -e "Errors: ${RED}$error_count${NC}"
echo -e "Warnings: ${YELLOW}$warning_count${NC}"
echo ""

if [ "$error_count" -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    if [ "$warning_count" -gt 0 ]; then
        echo -e "${YELLOW}⚠ ($warning_count warnings to review)${NC}"
    fi
    echo ""
    echo "Next steps:"
    echo "1. npm run start  (test production build locally)"
    echo "2. git add ."
    echo "3. git commit -m 'deploy: production release'"
    echo "4. git push origin master"
    exit 0
else
    echo -e "${RED}✗ Deployment blocked ($error_count critical errors)${NC}"
    exit 1
fi
