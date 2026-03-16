# PRD: Nhost Todo Application

## Original Problem Statement
Create a production-ready full-stack Todo application using Nhost as the backend and React (Vite) as the frontend. Requirements include:
- PostgreSQL database via Nhost
- GraphQL API (auto-generated)
- Email/Password authentication
- CRUD operations for todos
- Clean UI with input field, todo list, checkbox for completion, delete button
- Loading states and error handling

## User Personas
- **Primary**: Developers submitting technical assignments
- **Secondary**: Users learning Nhost/GraphQL integration

## Core Requirements (Static)
1. Email/Password authentication (sign up, sign in, sign out)
2. Todo CRUD operations via GraphQL
3. Protected routes
4. Dark theme UI
5. Comprehensive README with setup instructions

## What's Been Implemented (Jan 2026)
- [x] Nhost client configuration (`/app/frontend/src/lib/nhost.js`)
- [x] GraphQL queries/mutations (`/app/frontend/src/lib/graphql.js`)
- [x] Custom useTodos hook with optimistic updates
- [x] Sign In page with form validation
- [x] Sign Up page with email verification flow
- [x] Dashboard with todo list, add form, stats
- [x] TodoItem component with animated checkbox
- [x] TodoForm component for adding todos
- [x] ProtectedRoute wrapper for auth guard
- [x] Dark Obsidian theme with Manrope font
- [x] Framer Motion animations
- [x] Comprehensive README with Nhost setup instructions
- [x] Database schema SQL provided
- [x] GraphQL queries documented

## Tech Stack
- React 19 + React Router
- Nhost SDK (@nhost/nhost-js, @nhost/react)
- Tailwind CSS + Shadcn/UI
- Framer Motion
- GraphQL

## Environment Variables
```
REACT_APP_NHOST_SUBDOMAIN=your-project-subdomain
REACT_APP_NHOST_REGION=eu-central-1
```

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Authentication flow
- [x] Todo CRUD operations
- [x] Protected routes
- [x] README documentation

### P1 (Next Sprint)
- [ ] Real-time subscriptions for live updates
- [ ] User profile page
- [ ] Password reset functionality

### P2 (Future)
- [ ] Due dates for todos
- [ ] Categories/tags
- [ ] Search/filter functionality
- [ ] Drag-and-drop reordering

## Next Tasks
1. User configures Nhost project and updates .env credentials
2. User creates database schema using provided SQL
3. User sets Hasura permissions as documented in README
4. App is ready for use
