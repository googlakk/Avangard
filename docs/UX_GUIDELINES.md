# UX Guidelines for Corporate Website

**Version:** 1.0  
**Purpose:** Prevent "brochure/PDF-style" pages. Ensure all pages feel like a living, interactive corporate website.

---

## ❌ What NOT to Do (Brochure Syndrome)

### Symptoms of "Brochure Pages":
1. **Endless vertical scroll** with 5+ identical sections stacked.
2. **No clear hierarchy** - every section has equal visual weight.
3. **No interactivity** - just read, read, read.
4. **Missing CTAs** - no clear "next step" for the user.
5. **Identical card grids** repeated over and over (3 cards, then 3 cards, then 3 cards...).

---

## ✅ Corporate Website Principles

### 0. **VISUAL PROOF FIRST** (School-Specific Rule)
**For educational institutions, photos are NOT decoration — they are PROOF.**

Parents decide with emotions. Show, don't just tell.

**Requirements:**
- **Every major claim** needs a supporting photo:
  - "Modern labs" → Photo of students in the lab
  - "Experienced teachers" → Photo of teacher with students
  - "Cambridge curriculum" → Photo of classroom/certificate
- **Minimum photo ratio:** 1 photo per 2 text blocks.
- **Hero sections:** MUST have background image or video (like main page).
- **Avoid:** Stock photos of random buildings. Use REAL school photos or high-quality placeholders that match the school's actual aesthetic.

**Photo Types by Section:**
| Section | Photo Style | Example |
|---------|-------------|----------|
| Hero | Full-screen background (students in action) | Classroom, sports, assembly |
| Programs | Card images (specific to program) | Science lab for STEM, art room for Arts |
| Team | Portraits (warm, approachable) | Headshots of teachers/staff |
| Infrastructure | Wide shots (bright, clean spaces) | Library, cafeteria, playground |
| Achievements | Event photos (trophies, competitions) | Students with awards, on stage |

### 1. **Content Hierarchy (Inverted Pyramid)**
Every page should follow this structure:

```
┌─────────────────────────────┐
│   HERO (What is this?)      │  ← 1 screen height max
├─────────────────────────────┤
│   KEY VALUE PROPS (Why?)    │  ← 2-3 cards, concise
├─────────────────────────────┤
│   PROOF/DETAILS (How?)      │  ← 1-2 sections max
├─────────────────────────────┤
│   CTA (What's next?)        │  ← Clear action
└─────────────────────────────┘
```

**Rule:** If a page has more than 4 major sections (excluding header/footer), it's a brochure. Split into multiple pages.

### 2. **Use Tabs/Accordions for Dense Content**
Instead of stacking 6 "Program Features" sections vertically:
- Use **Tabs** to switch between categories.
- Use **Accordions** to hide/show details.

**Example:**
```tsx
// ❌ BAD (Brochure style)
<Section title="Mathematics Program" />
<Section title="Science Program" />
<Section title="Arts Program" />
<Section title="Sports Program" />
<Section title="Languages Program" />

// ✅ GOOD (Interactive)
<Tabs>
  <Tab label="🔢 Math" content={<MathProgram />} />
  <Tab label="🔬 Science" content={<ScienceProgram />} />
  <Tab label="🎨 Arts" content={<ArtsProgram />} />
</Tabs>
```

### 3. **Every Section Needs a Purpose**
Before adding a section, ask:
- **What action** should the user take after reading this?
- **Is this essential** for decision-making, or just "nice to know"?

If it's "nice to know" → move to an FAQ or downloadable PDF.

### 4. **Call-to-Actions (CTAs)**
Every page must guide the user to the **next logical step**:

| Page Type | Primary CTA | Secondary CTA |
|-----------|-------------|---------------|
| Program Page | "Apply Now" / "Book Tour" | "Download Brochure" |
| About Page | "Contact Admissions" | "Meet the Team" |
| Services Page | "Get a Quote" | "Learn More" |

**Placement:** At least one CTA in the hero, and one at the bottom.

### 5. **White Space & Breathing Room**
- **Between sections:** `py-16` minimum (desktop).
- **Max content width:** `max-w-6xl` for readability.
- **Avoid:** Wall-to-wall text or back-to-back card grids.

### 6. **Interactivity Checklist**
Each page should have at least 2 of these:
- [ ] Hover effects (cards lift, images zoom).
- [ ] Clickable elements (tabs, accordions, modals).
- [ ] Smooth scroll anchors (jump to sections).
- [ ] Embedded media (video, carousel).

---

## 📋 Page Types & Templates

### **Program/Service Page**
```
1. Hero (Title + Tagline + CTA)
2. Overview (3 key benefits in cards)
3. Details (Tabs OR single rich section with images)
4. Testimonial/Proof
5. CTA Section
```

### **About Page**
```
1. Hero (Mission statement)
2. Story/Timeline (Interactive or visual)
3. Team (Grid of people with hover details)
4. CTA (Join Us / Contact)
```

### **Landing Page (Main)**
```
1. Hero (Video + Stats)
2. Programs Grid (6 cards MAX)
3. Philosophy (3 cards)
4. Contact Form
```

---

## 🚫 Anti-Patterns to Avoid

1. **"Feature List Overload":**  
   Don't list 15 bullet points. Use 3-5 highlights, link to details.

2. **"Clone Sections":**  
   If you find yourself copy-pasting the same section structure 5 times, use Tabs instead.

3. **"Wall of Text":**  
   Paragraphs > 3 lines should be rare. Use lists, bold keywords, and images.

4. **"Hidden CTA":**  
   If the user has to scroll 3 screens to find a button, it's too late.

---

## Agent Instructions

When creating a page:
1. Read this UX Guidelines document FIRST.
2. Sketch the page structure (Hero → Value → Proof → CTA).
3. Ask: "Does this feel dynamic or static?"
4. If unsure, reference the Main Page (`app/page.tsx`) as the gold standard.
