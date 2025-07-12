# Frontend Vibes - AI Coding Assistant Instructions

## Stack

Next.js 15 (App Router), React 19, TypeScript, Shadcn UI ("new-york" style), Tailwind 4, OpenRouter/OpenAI integration.

## Development Server

- Use **Turbopack** for dev: `npm run dev` (already configured with `--turbopack` flag)
- Images pre-configured for `images.unsplash.com` domain in `next.config.ts`

## Architecture Patterns

### Component Organization
- **Layout Components**: `src/components/layout/` (e.g., `header.tsx` with NavigationMenu pattern)
- **Feature Components**: Organize by feature in `src/components/[feature]/`
- **UI Components**: Shadcn components in `src/components/ui/` managed via `components.json`

### Responsive Design
- **Mobile-first approach** with `useIsMobile` hook (`src/hooks/use-mobile.ts`)
- Breakpoint: 768px (`MOBILE_BREAKPOINT = 768`)
- Usage: `const isMobile = useIsMobile()` for conditional rendering

### Color System
- **OKLCH color space** in `globals.css` for better perceptual uniformity
- CSS custom properties pattern: `--color-primary: oklch(0.63 0.17 149)`
- Dark mode via `.dark` class with automatic variable switching

# Planning

Use todo lists to break down planning and implementation tasks.

## Error Monitoring Integration

- Error handling via console logging and custom error classes
- Use LLM wrapper in `src/lib/llm.ts` for OpenRouter API calls with built-in error handling
- Custom `OpenRouterError` class for LLM-specific error handling

# Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

# Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

# Recommended Tools

- For frontend qna and review, use the `browser_*` tools (by playwright)
- For research and web search use the `perplexity_ask` tool.
- To access developer documentation, use the `get-library-docs` tool with these library IDs (don't call resolve-library-id before).
  - `shadcn-ui/ui` for Shadcn UI components
  - `lucide-icons/lucide` for Lucide icons
  - `vercel/next.js` for Next.js documentation

# UI and Styling

- Use Shadcn UI components, managing installed components via [components.json](../components.json), [components/ui](../src/components/ui/)
  - Install using `npx shadcn@latest`, `shadcn-ui` is deprecated.
- Use Lucide icons.
- Use `cn` (from [utils](../src/lib/utils.ts)) for conditional class names.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.
- Apply beautiful, balanced, and modern UI designs, imbued with best UX and typography practices.
- For image placeholders use unsplash.com.

# Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

# Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

# Key Conventions

- Use OpenAI/OpenRouter for LLM functionality via the helper methods in [lib/llm.ts](/Users/digitarald/Developer/frontend-vibes/src/lib/llm.ts).
- Limit 'use client':
  - Favor server components and Next.js SSR.
  - Use only for Web API access in small components.
  - Avoid for data fetching or state management.
- Follow Next.js docs for Data Fetching, Rendering, and Routing.
