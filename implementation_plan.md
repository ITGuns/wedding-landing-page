# Implementation Plan: 3D Wedding Photography Landing Page

## 1. Project Setup
- [x] Create Vite + React + TS project (in progress)
- [ ] Move files to root directory
- [ ] Install dependencies:
    - `three`
    - `@react-three/fiber`
    - `@react-three/drei`
    - `framer-motion`
    - `lucide-react`
    - `tailwindcss`
    - `clsx`
    - `tailwind-merge`

## 2. Structure & Assets
- [ ] Create `src/components` layout
- [ ] Move provided video/image files to `public/assets`
- [ ] Set up `index.css` with Tailwind directives
- [ ] Configure `tailwind.config.js` with custom colors/fonts

## 3. Components
- [ ] **Hero Section**: 
    - Fullscreen 3D Canvas
    - Floating animated camera/element or video texture on 3D plane
    - Large typography ("First Light Studios")
    - Scroll indicator
- [ ] **Showreel Section**:
    - Embedded video player or 3D video texture
    - "Watch Showreel" interaction
- [ ] **Portfolio Section**:
    - Horizontal scroll gallery
    - Image cards with 3D tilt effect on hover
- [ ] **Services Section**:
    - 3D card layout
    - Glassmorphism style
- [ ] **Contact Section**:
    - Simple form
    - Social links
    - Footer

## 4. Animations
- [ ] Page transitions (Framer Motion)
- [ ] Scroll-triggered animations (Framer Motion `whileInView`)
- [ ] 3D interactions (R3F `useFrame`)

## 5. Polish
- [ ] Responsive adjustments
- [ ] Performance optimization (lazy loading 3D assets)
