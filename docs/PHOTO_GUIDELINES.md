# Photo & Visual Content Guidelines

**For:** Intellect Pro School Website  
**Principle:** "Show, Don't Tell" — Visual Proof First

---

## 📸 Core Philosophy

Parents choosing a school make **emotional decisions** based on **trust**. Photos are not decoration — they are **proof of your claims**.

**Bad Example:**
```
❌ "We have modern STEAM laboratories"
   [No photo]
```

**Good Example:**
```
✅ "We have modern STEAM laboratories"
   [Large photo: Students working with robotics equipment, bright lighting, engaged faces]
```

---

## 🎯 Photo Requirements by Page Type

### **Program Pages** (e.g., `/programs/junior`)
| Section | Photo Type | Purpose |
|---------|-----------|---------|
| Hero | Full-width background (student activity) | Create emotional connection |
| Key Benefits | 3 cards with relevant images | Visual proof of claims |
| Curriculum Details | Inline photos (classroom, materials) | Show real teaching environment |
| Teachers/Staff | Portrait photos | Build trust through faces |

**Example Hero:**
```tsx
<section className="relative h-[60vh]">
  <Image 
    src="/photos/junior-classroom-hero.jpg" 
    fill 
    className="object-cover brightness-75"
  />
  <div className="absolute inset-0 flex items-center">
    <h1>Intellect Junior: Foundation of the Future</h1>
  </div>
</section>
```

### **About/Team Page**
- **Team portraits:** Warm, natural light, smiling (not stiff corporate headshots)
- **Candid moments:** Teachers interacting with students
- **Facilities:** Bright, clean, welcoming spaces

### **Infrastructure/Facilities Page**
- **Wide shots:** Show scale and cleanliness
- **Detail shots:** Highlight modern equipment (whiteboards, computers, sports gear)
- **Natural light:** Avoid dark, dingy photos

---

## 📐 Technical Specs

### Image Sizes & Ratios
| Use Case | Aspect Ratio | Recommended Size |
|----------|-------------|------------------|
| Hero Background | 16:9 | 1920x1080px minimum |
| Card Images | 5:3 or 4:3 | 1200x720px |
| Portraits (Team) | 1:1 (square) | 800x800px |
| Gallery/Thumbnails | 4:3 | 800x600px |

### Optimization
- **Format:** Use `next/image` component (automatic WebP conversion)
- **Quality:** `quality={85}` for hero images, `quality={75}` for cards
- **Lazy Loading:** Enabled by default with Next.js Image

---

## 🚫 What to Avoid

1. **Generic Stock Photos:**  
   ❌ Random kids with tablets (obvious stock photo)  
   ✅ Actual Intellect Pro students (even if placeholder, make it look authentic)

2. **Empty Spaces:**  
   ❌ Text paragraph → Text paragraph → Text paragraph  
   ✅ Text → Photo → Text → Photo

3. **Low Quality:**  
   - Blurry, pixelated, or dark photos
   - Photos with harsh shadows or overexposed areas

4. **Mismatched Aesthetics:**  
   - Mixing modern minimalist photos with old-style framed portraits
   - Inconsistent color grading (warm vs cool tones)

---

## 💡 Placeholder Strategy (Until Real Photos Available)

Use **Unsplash** with specific search terms that match the school vibe:

```tsx
// Example: Modern classroom
<Image src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920" />

// Example: Happy students
<Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" />

// Example: Science lab
<Image src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200" />
```

**Search Keywords:**
- "modern classroom bright"
- "students laboratory science"
- "school library natural light"
- "teacher student interaction"

---

## Agent Instructions

When creating/updating a page:
1. For every **claim** or **feature**, ask: "Where's the photo proof?"
2. Hero sections are **NEVER** text-only.
3. If you don't have a real photo, use a high-quality Unsplash placeholder that matches the context.
4. Maintain 1:2 photo-to-text ratio (1 photo for every 2 text blocks).
