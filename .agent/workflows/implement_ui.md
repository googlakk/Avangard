---
description: Workflow for implementing UI components in Antigravity ensuring Design System compliance.
---

# UI Implementation Workflow

This workflow enforces the Design System rules for every UI task.

1. **Read Design System & UX Guidelines**
   - Read `docs/DESIGN_SYSTEM.md` to load color tokens, typography rules, and component patterns into context.
   - Read `docs/UX_GUIDELINES.md` to understand page structure and avoid "brochure syndrome".
   - Read `tailwind.config.ts` to verify available utility classes.

2. **Analyze Requirement**
   - Understand the user's request for the new UI component or page.
   - Check if existing components in `components/ui` can be reused (e.g., `Button.tsx`, `Card.tsx`).

3. **Plan Implementation**
   - Create a plan that strictly adheres to the styles in `docs/DESIGN_SYSTEM.md`.
   - **Constraint:** DO NOT use arbitrary hex colors (e.g. `bg-[#...]`). Use `bg-navy-900`, `bg-gray-50`, etc.
   - **Constraint:** Use `font-ibm-plex-serif` for stats/display headings and `font-sans` for body.

4. **Implementation**
   - Create or modify the file.
   - Ensure the code uses the extracted design tokens.
   - **Protocol:** Check for Hover, Focus, and Disabled states as per `docs/DESIGN_SYSTEM.md`.

5. **Verification**
   - Verify that the resulting code matches the "Academic Premium" aesthetic described in the Design System.

