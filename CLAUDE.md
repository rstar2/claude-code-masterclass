# Funny Heist app

## Architecture

### Project Type

Next.js application - a playful mission/task management app themed around "office mischief heists."

### Tech Stack

- **Next.js 16** with App Router (React Server Components by default)
- **React 19.2.0** with TypeScript
- **Tailwind CSS v4** - using new CSS-in-JS approach with `@import "tailwindcss"` directive
- **Vitest** + Testing Library for component tests
- **Lucide React** for icons

### Route Structure

Uses route groups for logical separation:

- **`(public)`** - Unauthenticated routes (splash, login, signup)
  - Splash page (`page.tsx`) should redirect based on auth state: `/heists` if logged in, `/login` if not
  - Shared layout with public-specific styles

- **`(dashboard)`** - Protected routes requiring authentication
  - `heists/` - Main heist management (list active/assigned/expired)
  - `heists/create` - Create new heist
  - `heists/[id]` - Individual heist details
  - Shared layout includes Navbar component

### Styling Architecture

- **Global theme**: Defined in `app/globals.css` using Tailwind v4 `@theme` directive
  - Primary: `#C27AFF` (purple), Secondary: `#FB64B6` (pink)
  - Custom color tokens: `primary`, `secondary`, `dark`, `light`, `lighter`, `success`, `error`, `heading`, `body`
- **Component styles**: CSS modules (`.module.css`) for component-specific styles
- **Shared utilities**: Generic classes in `globals.css` like `.page-content`, `.center-content`, `.form-title`
- **Font**: Inter via Google Fonts import

### Component Patterns

- Server Components by default (use `'use client'` directive for interactivity)
- Navbar in `components/Navbar/` uses CSS modules alongside global utilities
- Tests mirror component structure in `tests/` directory
- Barrel export convention, (example for a `Navbar` component: `components/Navbar/index.ts`, `components/Navbar/Navbar.ts` and `components/Navbar/Navbar.module.css`)

### TypeScript Config

- Path aliases: `@/*` maps to project root (standard Next.js)
- Type checking runs via Next.js build process

## Key Concepts

### Authentication Flow

- Not yet implemented, but planned architecture:

### Domain Model

Heists are the core entity with:

- Status tracking: active, assigned, expired
- CRUD operations via dedicated routes
- User assignment system

## Others

- Always when implementing a new feature try to check the latest documentation fo the technologies you tend to use by calling the Context7 MCP server.
