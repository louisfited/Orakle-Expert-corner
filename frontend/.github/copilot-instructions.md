# Orakle Expert's Corner - AI Coding Instructions

## Architecture Overview

Medical education platform built with **Next.js 14 (App Router)** using a dual-data-source architecture:

- **Supabase**: User auth, profiles, bookmarks, likes, case status tracking
- **Hygraph (GraphQL CMS)**: Medical case content, patient data, rich text content

Route groups organize the app:

- `app/(application)/` - Authenticated pages wrapped in `Home` layout
- `app/(authentication)/` - Login/signup with split-screen layout
- `app/api/v1/` - API routes for auth callbacks

## Key Patterns

### Server vs Client Components

- Page components are Server Components by default (async data fetching)
- Interactive components use `'use client'` directive at top
- Example: [app/(application)/cases/[id]/page.tsx](<app/(application)/cases/[id]/page.tsx>) is server-side, wraps `<SimulationPageWrapper>` client component

### Supabase Client Pattern

```typescript
// Server Components/Actions → lib/supabase/server.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Client Components → lib/supabase/client.ts
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
```

### Server Actions

Located in `lib/actions/`. Use `'use server'` directive. Handle form submissions and mutations:

- `userActions.ts` - Auth flows (login, signup, password reset)
- `adminActions.ts` - Admin-only operations

### Data Repository Pattern

`lib/data/repository/` contains typed database operations returning `ServerActionReturn<T>`:

```typescript
type ServerActionReturn<T> = { data: T | null; error: { message: string } | null }
```

### Hygraph GraphQL Fetching

`lib/hygraph/` contains case/patient queries. Uses raw `fetch()` with GraphQL strings:

```typescript
await fetch(HYGRAPH_URL, {
  method: 'POST',
  body: JSON.stringify({ query: `{...}` }),
  cache: 'no-store',
})
```

## Component Conventions

### UI Components (shadcn/ui)

- Located in `components/ui/` - Radix UI primitives with Tailwind
- Use `cn()` from `lib/utils.ts` for class merging
- Button variants: `primary`, `default`, `outline`, `destructive`

### Form Validation

Uses **Zod schemas** in `lib/schemas/auth-schemas.ts` with `react-hook-form`:

```typescript
import { fullAccountSchema } from '@/lib/schemas/auth-schemas'
const { data, error } = fullAccountSchema.safeParse(formData)
```

### Context Providers

- `UserContextProvider` (root layout) - Auth state via `useContext`
- `CaseContextProvider` - Medical case simulation state with dirty form tracking

### Internationalization

Cookie-based language (`'en' | 'fr' | 'de'`). Use `languageTexts(lang)` from `lib/utils/language`:

```typescript
const lang = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined
```

## Styling

- **Tailwind CSS** with custom colors: `textPrimary`, `grayBg`, `darkBlue`, etc.
- **SCSS** for globals: `app/globals.scss`
- Custom font: Ubuntu (via `next/font`)

## Type System

- `interface.ts` - Hygraph response types (MedicalCase, PatientCase, etc.)
- `lib/types/database.types.ts` - Auto-generated Supabase types via `npm run genTypes`
- `lib/types/types.ts` - Shared app types

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase project credentials
- `NEXT_PUBLIC_HYGRAPH_URL` / `HYGRAPH_API_KEY` - Hygraph CMS endpoint and auth
- `RESEND_API_KEY` - Email service for notifications
- `NEXT_PUBLIC_PREVIEW_TOKEN` - Hygraph draft content preview

## Commands

```bash
npm run dev          # Start development server
npm run genTypes     # Regenerate Supabase types from remote schema
npm run build        # Production build
npm run lint         # ESLint check
```

## Medical Case Types

Two case formats exist based on simulation duration:

- **15-minute cases (v1)**: `app/(application)/cases/` → `MedicalCase` type, `simulation-page.tsx`
- **5-minute cases (v2)**: `app/(application)/cases-v2/` → `MedicalCaseV2` type, `simulation-page-v2.tsx`

Both share the same Hygraph structure but v2 has a streamlined step flow.

## Medical Case Simulation Flow

Cases progress through steps defined in `components/simulation-page.tsx`:

1. Introduction → 2. PatientInterview → 3. Tests → 4. Diagnoses → 5. Orders → 6. CaseReview

Each step component lives in `components/steps/`. Steps are conditionally shown based on case content.
