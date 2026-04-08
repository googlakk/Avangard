#!/usr/bin/env python3
"""
Create Open Graph (OG) image for social sharing
Size: 1200x630px (optimal for most social platforms)
Quality: 85% for JPEG compression
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Configuration
OUTPUT_PATH = "public/og-image.jpg"
WIDTH, HEIGHT = 1200, 630
QUALITY = 85

# Colors matching brand
NAVY_900 = (11, 27, 61)
WHITE = (255, 255, 255)
GRAY_100 = (243, 244, 246)
ELECTRIC_BLUE = (37, 99, 235)

# Create base image
img = Image.new('RGB', (WIDTH, HEIGHT), NAVY_900)
draw = ImageDraw.Draw(img)

# Add gradient-like overlay (darker top, lighter bottom)
for y in range(HEIGHT):
    ratio = y / HEIGHT
    r = int(NAVY_900[0] * (1 - ratio * 0.2))
    g = int(NAVY_900[1] * (1 - ratio * 0.2))
    b = int(NAVY_900[2] * (1 - ratio * 0.15) + 40 * ratio)
    draw.rectangle([(0, y), (WIDTH, y+1)], fill=(r, g, b))

# Add decorative circles (top right)
circle_color = (37, 99, 235, 30)  # Electric Blue with transparency
draw.ellipse([800, -100, 1200, 300], outline=ELECTRIC_BLUE, width=3)
draw.ellipse([950, 0, 1300, 350], outline=ELECTRIC_BLUE, width=2)

# Add text
# School name
text = "INTELLECT"
fontsize = 120
try:
    # Try to use a nice font, fallback to default
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", fontsize)
except:
    font = ImageFont.load_default()

text_bbox = draw.textbbox((0, 0), text, font=font)
text_width = text_bbox[2] - text_bbox[0]
text_x = (WIDTH - text_width) // 2
text_y = 150

draw.text((text_x, text_y), text, fill=WHITE, font=font)

# Subtitle
subtitle = "INTERNATIONAL SCHOOL"
fontsize_sub = 40
try:
    font_sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", fontsize_sub)
except:
    font_sub = ImageFont.load_default()

sub_bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
sub_width = sub_bbox[2] - sub_bbox[0]
sub_x = (WIDTH - sub_width) // 2
sub_y = 320

draw.text((sub_x, sub_y), subtitle, fill=ELECTRIC_BLUE, font=font_sub)

# Tagline
tagline = "Excellence in Education"
fontsize_tag = 28
try:
    font_tag = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", fontsize_tag)
except:
    font_tag = ImageFont.load_default()

tag_bbox = draw.textbbox((0, 0), tagline, font=font_tag)
tag_width = tag_bbox[2] - tag_bbox[0]
tag_x = (WIDTH - tag_width) // 2
tag_y = 480

draw.text((tag_x, tag_y), tagline, fill=GRAY_100, font=font_tag)

# Add decorative line
draw.rectangle([(200, 450), (1000, 453)], fill=ELECTRIC_BLUE)

# Save image
img.save(OUTPUT_PATH, 'JPEG', quality=QUALITY, optimize=True)

# Check file size
file_size_kb = os.path.getsize(OUTPUT_PATH) / 1024
print(f"✅ OG image created: {OUTPUT_PATH}")
print(f"   Size: {WIDTH}x{HEIGHT}px")
print(f"   File size: {file_size_kb:.1f}KB")
print(f"   Quality: {QUALITY}%")
