# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Bimasakti Racing Team, built with Next.js 15 and featuring interactive 3D car models using React Three Fiber.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

Development server runs on http://localhost:3000

## Technology Stack

- **Framework**: Next.js 15 (App Router) with Turbopack
- **React**: v19.1.0
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4 (@tailwindcss/postcss)
- **3D Graphics**:
  - Three.js v0.180.0
  - @react-three/fiber v9.3.0
  - @react-three/drei v10.7.6
  - @react-spring/three v10.0.3 (for camera animations)
- **Linting**: ESLint with Next.js config

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Geist fonts
│   ├── page.tsx           # Home page with 3D car showcase
│   ├── globals.css        # Global styles, custom fonts, animations
│   └── favicon.ico
└── components/            # React components
    ├── Bm13Evo.tsx       # 3D car model (43KB - main showcase model)
    ├── cameraController.tsx  # Animated camera controls using @react-spring/three
    ├── Showroom.tsx      # 3D showroom environment (floor/walls)
    ├── header.tsx        # Site header navigation
    └── footer.tsx        # Site footer

public/
├── models/               # 3D model files (.glb/.gltf)
├── fonts/                # Custom fonts (Century Gothic, Monument Extended)
└── assets/               # Images and other static assets
```

## Key Architecture Patterns

### 3D Scene Organization
The main page (`src/app/page.tsx`) orchestrates the 3D car viewing experience:

- **Canvas Setup**: Uses `@react-three/fiber` Canvas with PCFSoftShadowMap shadows
- **Lighting System**: Combination of ambient, directional, point lights, and a red spotlight (#cc0100 - brand color) highlighting the car from above
- **Camera Control**: Custom `CameraController` component uses spring animations for smooth transitions between preset views (Front, Front Left, Top, Rear Right)
- **Interactive UI**: Camera position buttons trigger animated transitions while coordinating with title fade animations

### State Management Pattern
The home page manages camera and UI state locally:
- `camPos`: Current camera position [x, y, z]
- `lookAt`: Camera target point
- `showTitle`: Controls "BIMASAKTI" title visibility
- `isAnimatingOut`: Manages fade-out animation timing

Camera changes trigger 500ms title fade-out before repositioning, then fade back in when returning to default view.

### Custom Fonts
Four custom font faces defined in `globals.css`:
- Century Gothic (Regular, Bold)
- Monument Extended (Regular, Black)

Configured in Tailwind config for use via `font-monument-extended-regular` etc.

### Animation System
Custom CSS animations in `globals.css`:
- `fadeRevealIn/Out`: Opacity + scale + blur transitions (0.5s)
- `fadeRevealIntro`: Same as fadeRevealIn with gradient mask (5s)
- Applied via `.fade-reveal-in`, `.fade-reveal-out`, etc. classes

### Path Aliases
`@/*` maps to `./src/*` for clean imports:
```typescript
import Header from "@/components/header";
```

## 3D Model Integration

The `Bm13Evo` component is the primary 3D asset (likely loads a .glb/.gltf from `/public/models/`). It:
- Receives props: `scale`, `position`, `castShadow`, `receiveShadow`
- Currently scaled at 0.5 and positioned at origin [0, 0, 0]

When working with 3D models:
- Place model files in `/public/models/`
- Use `useGLTF` from `@react-three/drei` for loading
- Configure shadows on both the model and scene meshes
- Consider performance when adding complex models

## Styling Conventions

- Brand red: `#CC0100` (primary) and `#6B0000` (hover states)
- Brand dark: `#050014` (transitions)
- Uses Tailwind utility classes extensively
- Responsive sizing with `vw` units for key UI elements
- Custom hover effects with `before:` pseudo-elements for slide transitions

## Common Tasks

When adding new sections, follow the pattern in `page.tsx`:
- Wrap in semantic div with `id` for scroll navigation
- Use full viewport sizing: `w-screen min-h-screen`
- Maintain z-index hierarchy (header: z-50, UI controls: z-40, 3D canvas: z-5)

When modifying the 3D scene:
- Adjust lighting in `page.tsx` Canvas
- Camera positions are tuples: `[x, y, z]`
- Spring animation config in `cameraController.tsx`: `{ mass: 1, tension: 120, friction: 20 }`

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Path aliases configured for `@/*` imports
- Types for React, React DOM included
- Incremental compilation enabled
