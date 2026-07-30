# Novaderm — Project Structure

This document is written for a future AI developer or junior developer.
Read this before making any changes to the project.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility-based styling |
| Framer Motion | Animations and transitions |
| GSAP | (installed but not actively used — avoid adding new GSAP usage) |
| lucide-react | Icon library (used in chatbot and a few sections) |
| jsPDF + html2canvas | PDF generation inside the chatbot booking confirmation |

---

## Folder Structure

```
novaderm/
├── public/
│   ├── favicon.svg          — Browser tab icon
│   └── icons.svg            — SVG sprite (not actively used in code)
│
├── src/
│   ├── main.jsx             — React entry point, renders <App />
│   ├── App.jsx              — Root component, all sections assembled here
│   ├── index.css            — Global CSS: Tailwind base, custom CSS variables, utility classes
│   │
│   ├── assets/              — All static images used in the site
│   │   ├── hero-images/     — Before/after images for the hero slider (desktop + mobile variants)
│   │   ├── beforeafter/     — Before/after images for the Transformations section
│   │   ├── serviceimages/   — Service card images (first.png through fifth.png)
│   │   ├── clinicimages/    — Gallery section photos (13 clinic interior images)
│   │   ├── doctorsimages/   — Doctor profile photo (ateeq.png)
│   │   ├── backgroundall/   — Section background texture (bacrkound.png) used in App.jsx
│   │   ├── novalogo.png     — Novaderm logo (used in the Hero navbar)
│   │   ├── ourstory.jpg     — About section main image
│   │   ├── antiaging.jpg    — About section secondary image
│   │   ├── laser2.jpg       — WhatWeDo stat card background
│   │   ├── videocardimage.jpg — WhatWeDo center card background
│   │   ├── asian1/2/3.jpg   — Avatar stack in WhatWeDo stat card
│   │   ├── whychooseusen.png — WhyChooseUs main image
│   │   ├── replace.jpg      — WhyChooseUs secondary image
│   │   ├── thirdimage.png   — WhyChooseUs tertiary image
│   │   ├── what-we-item-image-1-royal*.jpg — WhatWeDo contact card + side images (5 files)
│   │   └── (other .jpg/.png files are mapped in siteContent.js)
│   │
│   ├── data/
│   │   └── siteContent.js   — THE SINGLE SOURCE OF TRUTH for all text, links, and images.
│   │                           Edit this file to change any copy, CTA text, phone numbers,
│   │                           social links, or images shown in any section.
│   │
│   ├── hooks/
│   │   ├── animations.js    — Shared animation helpers (fadeUp, revealLeft, VP_ONCE, EASE,
│   │   │                       useReducedMotion, useIsMobile). Use these in new components.
│   │   └── useReveal.js     — IntersectionObserver hook that adds CSS classes (is-visible,
│   │                           reveal-*) for CSS-based reveal animations. Used in WhatWeDo
│   │                           and Footer only.
│   │
│   ├── components/
│   │   ├── hero/
│   │   │   ├── Hero.jsx         — Full-screen hero section with before/after drag slider,
│   │   │   │                       navbar, botanical leaf, stats bar, and CTA buttons.
│   │   │   │                       The navbar lives INSIDE Hero.jsx (not a separate file).
│   │   │   └── HeroStatsCard.jsx — Floating stats card that appears in the hero (patients,
│   │   │                           rating). Imported inside Hero.jsx.
│   │   │
│   │   ├── about/
│   │   │   └── About.jsx        — About section: image collage (left), text + progress bars
│   │   │                           (right), and animated number counters below.
│   │   │                           All sub-components (AboutImageCollage, AboutContent,
│   │   │                           AboutCounters) live as functions INSIDE this one file.
│   │   │
│   │   ├── transformations/
│   │   │   └── TransformationSection.jsx — Two side-by-side before/after drag sliders
│   │   │                                    (Hair Restoration + Jawline Contouring).
│   │   │
│   │   ├── whatwedo/
│   │   │   └── WhatWeDo.jsx     — Two-card layout: stat card (left) + video/quote card (right).
│   │   │
│   │   ├── whyus/
│   │   │   └── WhyChooseUs.jsx  — Accordion section explaining clinic differentiators,
│   │   │                           with image collage on the left.
│   │   │
│   │   ├── services/
│   │   │   └── Services.jsx     — 5-card services grid. Card 1 is a large featured card,
│   │   │                           cards 2–5 are smaller image+text cards.
│   │   │
│   │   ├── doctors/
│   │   │   └── DoctorsSection.jsx — Doctor profile card with photo, bio, and credentials.
│   │   │
│   │   ├── gallery/
│   │   │   └── ClinicGallery.jsx  — Filterable photo gallery of the clinic interior.
│   │   │                            13 images with category filters and a marquee strip.
│   │   │
│   │   ├── testimonials/
│   │   │   └── Testimonials.jsx   — Patient review cards in a scrollable layout.
│   │   │
│   │   ├── appointment/
│   │   │   └── BookAppointment.jsx — Multi-step booking form. Submits to Google Sheets.
│   │   │                             Final step generates and downloads a PDF confirmation.
│   │   │
│   │   ├── chatbot/
│   │   │   ├── ClinicChatbot.jsx  — Floating AI chat widget. Handles FAQ replies and
│   │   │   │                         walks users through a booking flow step by step.
│   │   │   ├── ClinicChatbot.css  — All styles for the chatbot widget (standalone CSS,
│   │   │   │                         not Tailwind, uses CSS custom properties under :root).
│   │   │   └── clinicData.js      — All chatbot responses, keywords, and FAQ data.
│   │   │                             Edit this file to change what the chatbot says.
│   │   │
│   │   ├── layout/
│   │   │   └── Footer.jsx         — Site footer with links, social icons, and a contact form.
│   │   │
│   │   └── ui/
│   │       ├── ScrollToTop.jsx    — "Back to top" floating button that appears after scrolling.
│   │       ├── TextReveal.jsx     — Animates text word-by-word as it enters the viewport.
│   │       ├── ArrowUpRight.jsx   — Small reusable SVG arrow icon used in Footer and
│   │       │                         BookAppointment CTA buttons.
│   │       └── PillButton.jsx     — Animated pill-shaped button with optional arrow icon.
│   │                                 Uses ArrowUpRight internally.
│
├── index.html               — HTML shell. Loads Google Fonts and mounts the React app.
├── package.json             — Dependencies and npm scripts (dev, build, preview, lint)
├── eslint.config.js         — ESLint rules
└── PROJECT_STRUCTURE.md     — This file
```

---

## How Sections Are Assembled

`App.jsx` is the only place all sections come together.

- `Hero` is imported **normally** (eager) because it is above the fold and must show immediately.
- Every other section is wrapped in `React.lazy()` + `<Suspense>` so they only load when the browser is idle or the user scrolls toward them.
- All sections sit inside a wrapper div that has the `bacrkound.png` texture as a `background-image` (fixed attachment). This gives the whole page a consistent warm texture. Do NOT move sections outside this wrapper or they will lose the background.
- `ClinicChatbot` sits **outside** the main wrapper div. This is intentional — it prevents any parent `z-index` stacking context from clipping the chatbot's `z-index: 999999` fixed container.

---

## The Data File — `siteContent.js`

All content is centralized in `src/data/siteContent.js`.

To change any text, image, link, phone number, or social URL:
1. Open `src/data/siteContent.js`
2. Find the relevant section key (`hero`, `about`, `services`, `whyUs`, `whatWeDo`, etc.)
3. Edit the value directly

Images are imported at the top of the file and referenced by variable name in the exported object. To swap an image, replace the import path — the variable name in the data object stays the same.

The chatbot has its own data file at `src/components/chatbot/clinicData.js`. Edit that file to change FAQ answers, keywords, or booking flow messages.

---

## Animation System

The project uses two animation approaches side by side:

**1. Framer Motion** (most sections)
- `hooks/animations.js` exports ready-made animation prop objects: `fadeUp()`, `revealLeft()`, `revealScale()`, `VP_ONCE`, `EASE`, `EASE_EXPO`.
- Spread them directly: `<motion.div {...fadeUp(0.2)}>`

**2. CSS Reveal Classes** (WhatWeDo, Footer)
- `hooks/useReveal.js` attaches an `IntersectionObserver` to a section ref.
- When the section enters the viewport, it adds `is-visible` to matching child elements.
- Animated children use class names like `reveal reveal-up reveal-duration-600`.
- The actual CSS for these classes is in `src/index.css`.

---

## Design Overview

| Property | Value |
|---|---|
| **Primary color** | `#C4614A` — terracotta / burnt orange |
| **Gold accent** | `#c19a6b` — warm gold (used in Transformations, Gallery) |
| **Dark brown text** | `#3d2e24` |
| **Background** | `#FDFBF7` — off-white warm beige |
| **Section texture** | `bacrkound.png` — subtle warm texture, fixed to the viewport |
| **Heading font** | Playfair Display (serif, italic for emphasis) |
| **Body font** | Nunito / Nunito Sans (humanist sans-serif) |
| **Border radius style** | Asymmetric corners (`2rem 0.5rem 2rem 0.5rem`) for a signature look on image cards |
| **UI direction** | Luxury medical aesthetic — warm, not clinical. Gold accents, organic shapes, soft shadows |
| **Animation style** | Scroll-triggered fade-up reveals, subtle parallax, spring-based hover lifts |
| **Responsiveness** | Mobile-first. Most sections use CSS Grid with `clamp()` sizing. Hero switches images at 768px. |

---

## Image Loading Strategy

- **Hero images** (before/after slider): `loading="eager"` + `fetchpriority="high"` — loaded immediately because they are above the fold.
- **Logo**: `loading="eager"` — visible immediately in the navbar.
- **All other images**: `loading="lazy"` + `decoding="async"` — the browser only fetches them when they are near the viewport, keeping the initial page load fast.

---

## Where to Find Things Quickly

| I want to change... | Open this file |
|---|---|
| Any text or heading | `src/data/siteContent.js` |
| The chatbot responses | `src/components/chatbot/clinicData.js` |
| The chatbot styling | `src/components/chatbot/ClinicChatbot.css` |
| The hero slider images | `src/assets/hero-images/` + `src/data/siteContent.js` (hero.slides[0].image) |
| Nav links | `src/data/siteContent.js` → `nav.links` |
| Social media links | `src/data/siteContent.js` → `topBar.social` |
| Section order | `src/App.jsx` |
| Global colors / CSS variables | `src/index.css` |
| Shared animation helpers | `src/hooks/animations.js` |
| Gallery photos | `src/components/gallery/ClinicGallery.jsx` → `GALLERY` array |
| Service cards | `src/data/siteContent.js` → `services.cards` |
| Before/after slider pairs | `src/components/transformations/TransformationSection.jsx` → `PAIRS` array |
