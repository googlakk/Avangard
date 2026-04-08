#!/bin/bash

# Image optimization script using macOS sips
# Converts PNG → JPEG for better compression
# Target: <300KB per image, max width 1920px

set -e

IMAGES_DIR="public/images"
TEMP_DIR="public/images/.temp"
QUALITY=85
MAX_WIDTH=1920

echo "🖼️  Starting image optimization..."
echo "Target quality: $QUALITY%"
echo "Max width: ${MAX_WIDTH}px"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Get all PNG files
total_before=0
total_after=0

for png_file in "$IMAGES_DIR"/*.png; do
  [ -f "$png_file" ] || continue

  basename=$(basename "$png_file" .png)
  output_file="$IMAGES_DIR/${basename}.jpg"

  before_size=$(stat -f%z "$png_file" 2>/dev/null || echo 0)
  before_mb=$(echo "scale=2; $before_size / 1024 / 1024" | bc)

  echo -n "Processing: $basename.png ($before_mb MB) → "

  # Use sips to convert PNG to JPEG with quality setting
  sips -s format jpeg \
       -s formatOptions $QUALITY \
       --resampleWidth $MAX_WIDTH \
       "$png_file" \
       --out "$output_file" 2>/dev/null

  # Get size of resulting JPEG
  after_size=$(stat -f%z "$output_file" 2>/dev/null || echo 0)
  after_kb=$(echo "scale=0; $after_size / 1024" | bc)
  reduction=$(echo "scale=0; ($before_size - $after_size) * 100 / $before_size" | bc)

  echo "${after_kb}KB (↓ ${reduction}%)"

  total_before=$((total_before + before_size))
  total_after=$((total_after + after_size))

  # Keep PNG as backup (not deleting yet)
done

# Cleanup
rm -rf "$TEMP_DIR"

# Summary
total_before_mb=$(echo "scale=2; $total_before / 1024 / 1024" | bc)
total_after_mb=$(echo "scale=2; $total_after / 1024 / 1024" | bc)
total_reduction=$(echo "scale=0; ($total_before - $total_after) * 100 / $total_before" | bc)

echo ""
echo "✅ Optimization complete!"
echo "Before: ${total_before_mb}MB"
echo "After:  ${total_after_mb}MB"
echo "Saved:  ${total_reduction}% reduction"
echo ""
echo "Next steps:"
echo "1. Review generated .jpg files"
echo "2. Delete original .png files: rm public/images/*.png"
echo "3. Update Image components to use .jpg extensions"
