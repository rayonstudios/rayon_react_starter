# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rayon React Starter is an opinionated React starter kit with TypeScript, Vite, Redux Toolkit, and Ant Design. It features JWT authentication with automatic token refresh, RBAC routing, OpenAPI type generation, and Firebase integration. Designed to work with the [rayon_gcp_express_psql_starter](https://github.com/rayonstudios/rayon_gcp_express_psql_starter) backend.

## Commands

### Development

```bash
npm run dev              # Start dev server + generate types from dev backend
npm run test             # Start test server + generate types from test backend
npm run prod             # Start prod server + generate types from prod backend
```

### Building

```bash
npm run build:dev        # Build for development environment
npm run build:test       # Build for test environment
npm run build:prod       # Build for production environment
```

### Type Generation

```bash
npm run gen-types:dev    # Generate types from dev backend OpenAPI schema
npm run gen-types:test   # Generate types from test backend
npm run gen-types:prod   # Generate types from prod backend
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run watch:types      # Watch TypeScript compilation
npm run preview          # Preview production build locally
```

## Architecture

### 1. Routing System

**Config-based routing** (`src/lib/router/router-config.tsx`):

- Routes defined as hierarchical configuration with `layoutType`, `authType`, `allowedRoles`, and optional `menuItem`
- Automatic menu generation from route config with role-based filtering
- Three layout types: `empty` (minimal), `auth` (centered card), `dashboard` (sidebar + header)
- Three auth types: `public` (login/register), `private` (requires auth), `none` (always accessible like 404)

**Route rendering pipeline**:

```
RouterConfig → routeRenderer() → Wraps each route in:
  AuthWrapper (handles public/private/none)
    → RoleCheckWrapper (checks allowedRoles)
      → LayoutWrapper (applies layout)
        → Component
```

**RBAC Implementation**:

- User role stored in `profile.data?.role` (fetched via `profileActions.fetch()`)
- Role hierarchy: `SUPER_ADMIN` automatically gets `ADMIN` access
- Routes specify `allowedRoles: [Role.SUPER_ADMIN]` to restrict access
- Unauthorized users see 404 page (not 403 to avoid exposing route existence)
- Menu items automatically filtered based on user role

**Key files**:

- [src/lib/router/router-config.tsx](src/lib/router/router-config.tsx) - Route definitions
- [src/lib/router/router.tsx](src/lib/router/router.tsx) - Route rendering and wrapping logic
- [src/lib/layouts/dashboard-layout/components/main-menu.tsx](src/lib/layouts/dashboard-layout/components/main-menu.tsx) - Menu generation

### 2. Redux State Management

**Automatic Loading State Tracking**:

- Custom store enhancer (`src/lib/redux/enhancers/status.enhancer.ts`) **automatically** tracks all async thunk states
- For any thunk (e.g., `user/fetch`), creates a `fetchStatus` field in the slice with values: `LOADING | IDLE | FAILED`
- **No manual status management needed** - the enhancer intercepts Redux Toolkit thunk actions and updates state automatically

**Usage pattern**:

```typescript
// In slice: just create the thunk
const fetch = createAsyncThunk(`${name}/fetch`, userService.fetch);

// In component: status tracking is automatic
const isLoading = useIsLoading("user", "fetch"); // checks user.fetchStatus === LOADING
```

**Store structure**:

- Slices: `auth`, `profile`, `user`, `file`
- Custom middleware: `errorHandlerMiddleware` (catches rejected thunks, routes to global error handler)
- Custom enhancer: `statusHandlerEnahncer` (automatic loading state tracking)

**Module organization** (feature-based):

```
src/modules/{feature}/
├── hooks/         # Custom hooks for slice
├── services/      # API service methods
├── slices/        # Redux slice with thunks
└── types/         # TypeScript types
```

**Key files**:

- [src/lib/redux/store.ts](src/lib/redux/store.ts) - Store configuration
- [src/lib/redux/enhancers/status.enhancer.ts](src/lib/redux/enhancers/status.enhancer.ts) - Automatic loading state tracking
- [src/lib/redux/middlewares/errorHandler.middleware.ts](src/lib/redux/middlewares/errorHandler.middleware.ts) - Error handling middleware

### 3. API Client & Authentication

**OpenAPI-Fetch with Axios**:

- Uses `openapi-fetch` for type-safe API calls with Axios as the fetch implementation
- Types auto-generated from backend's `/openapi.json` endpoint (see `scripts/gen-openapi-types.ts`)
- Generated types in `src/lib/types/openapi-fetch.d.ts`

**Authentication flow**:

1. **Token storage**: `accessToken` and `refreshToken` in localStorage
2. **Request interceptor** (`src/lib/axios.config.ts`): Automatically adds `Authorization: Bearer {accessToken}` header
3. **401 handling**: Automatically calls `authService.refreshToken()`, updates tokens, retries original request
4. **Fallback**: If refresh fails, clears tokens and logs out

**Automatic token refresh logic**:

```typescript
// On 401 response (except for auth/login or auth/refresh endpoints):
const { accessToken, refreshToken } =
  await authService.refreshToken(refreshToken);
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);
return axios(error.config); // Retry original request
```

**Global error handling**:

- Axios interceptor handles 403 (permission modal) and all errors
- Redux middleware catches rejected thunks (filters out Axios errors to avoid double-handling)
- All errors routed through `globalErrorHandler()` which displays Ant Design notifications

**Making API calls**:

```typescript
import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";

const { data } = await withApiResponseHandling(
  apiClient.GET("/users/{id}", {
    params: { path: { id: userId } },
  })
);
```

**Key files**:

- [src/lib/openapi-fetch.config.ts](src/lib/openapi-fetch.config.ts) - API client configuration
- [src/lib/axios.config.ts](src/lib/axios.config.ts) - Axios interceptors and token refresh
- [scripts/gen-openapi-types.ts](scripts/gen-openapi-types.ts) - Type generation script

### 4. Firebase Integration

**Environment-based configuration**:

- Three Firebase databases: `starter-dev`, `starter-test`, `starter-prod`
- Three storage buckets: `rayon-gcp-starter-dev`, `rayon-gcp-starter-test`, `rayon-gcp-starter`
- Environment detected via `VITE_ENV` (dev/test/production)

**Services available**:

```typescript
import { firebase } from "@/lib/firebase/firebase.service";

firebase.db; // Firestore (for real-time job status, etc.)
firebase.storage; // Cloud Storage
firebase.messaging; // Cloud Messaging
firebase.auth; // Firebase Auth (not used for main auth, just for Firebase features)
firebase.isEnabled; // Check if Firebase is enabled (VITE_FIREBASE_AUTH_ENABLED)
```

**Key file**: [src/lib/firebase/firebase.service.ts](src/lib/firebase/firebase.service.ts)

### 5. Server-Paginated Components

**ServerPaginatedTable** (`src/lib/components/server-paginated-table/`):

- Built-in server-side pagination, sorting, and filtering
- URL state management (filters persist in query params)
- Automatic loading states
- Features: column visibility toggle, filter drawer, refresh button
- Backend expects: `?page=1&limit=10&sortBy=field&sortOrder=asc&filter[key]=value`
- Backend returns: `{ data: T[], total: number }`

**ServerPaginatedSelect** (`src/lib/components/server-paginated-select/`):

- Lazy-loaded select with server-side search
- Infinite scroll pagination
- Debounced search input

### 6. Project Structure

```
src/
├── lib/                      # Shared, reusable code
│   ├── components/           # Shared UI components
│   ├── contexts/             # React contexts (theme, language)
│   ├── firebase/             # Firebase configuration
│   ├── hooks/                # Custom React hooks
│   ├── layouts/              # Layout components (empty, auth, dashboard)
│   ├── redux/                # Redux store, slices, middleware, enhancers
│   ├── router/               # Routing configuration
│   ├── styles/               # Global styles
│   ├── translations/         # i18n files (en, ur)
│   ├── types/                # TypeScript types (including generated OpenAPI types)
│   └── utils/                # Utility functions
├── modules/                  # Feature-specific code
│   ├── auth/                 # Auth module (slices, services, hooks, types)
│   ├── user/                 # User module
│   ├── file/                 # File module
│   └── posts/                # Posts module
└── pages/                    # Page components
    ├── auth/                 # Login, forgot password, reset password
    ├── posts/
    ├── settings/
    └── users/
```

**Naming conventions**:

- Use **snake_case** for file and folder names
- Shared code → `lib/`
- Feature-specific code → `modules/`
- Page components → `pages/`

## Development Workflow

### Adding a New Feature Module

1. Create module structure:

   ```
   src/modules/{feature}/
   ├── hooks/{feature}.hooks.ts
   ├── services/{feature}.service.ts
   ├── slices/{feature}.slice.ts
   └── types/{feature}.types.ts
   ```

2. Define service methods (API calls):

   ```typescript
   async function fetch(id: string) {
     const { data } = await withApiResponseHandling(
       apiClient.GET("/endpoint/{id}", {
         params: { path: { id } },
       })
     );
     return data;
   }
   ```

3. Create slice with thunks:

   ```typescript
   const fetch = createAsyncThunk(`${name}/fetch`, service.fetch);

   export const slice = createSlice({
     name: "feature",
     initialState: { data: null },
     reducers: {},
     extraReducers: (builder) => {
       builder.addCase(fetch.fulfilled, (state, action) => {
         state.data = action.payload;
       });
     },
   });

   export const featureActions = { ...slice.actions, fetch };
   ```

4. Add slice to store (`src/lib/redux/store.ts`):

   ```typescript
   reducer: {
     // ...
     feature: featureSlice.reducer,
   }
   ```

5. Create hooks for selectors:
   ```typescript
   export const useFeature = () => {
     const { data, isLoading } = useAppSelector((state) => ({
       data: state.feature.data,
       isLoading: state.feature.fetchStatus === ThunkStatus.LOADING,
     }));
     return { data, isLoading };
   };
   ```

**Note**: Loading state tracking (`fetchStatus`) is automatic via store enhancer.

### Adding a New Route

1. Add route config to `src/lib/router/router-config.tsx`:

   ```typescript
   {
     layoutType: "dashboard",
     authType: "private",
     allowedRoles: [Role.ADMIN], // Optional, omit for all authenticated users
     route: { path: "/my-route" },
     component: <MyPage />,
     menuItem: { title: "My Route", icon: <Icon /> }, // Optional, omit to hide from menu
   }
   ```

2. Create page component in `src/pages/my-route/my-route.tsx`

3. Menu item will automatically appear (if `menuItem` provided and user has required role)

### Regenerating API Types

Type generation runs automatically with `npm run dev`, but to manually regenerate:

1. Ensure backend is running and exposes `/openapi.json`
2. Run `npm run gen-types:dev` (or test/prod)
3. Types generated in `src/lib/types/openapi-fetch.d.ts`

**Custom transformations**:

- `date-time` format → `Date` type
- `binary` format → `File` type
- Nullable types → `T | null`

### Working with ServerPaginatedTable

```typescript
import ServerPaginatedTable from "@/lib/components/server-paginated-table/server-paginated-table";

<ServerPaginatedTable
  url="/users"
  columns={[
    { title: "Name", dataIndex: "name", sorter: true },
    { title: "Email", dataIndex: "email" },
  ]}
  filters={[
    {
      label: "Status",
      type: "select",
      key: "status",
      filterProps: {
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
    },
  ]}
/>
```

Backend expectations:

- Query params: `?page=1&limit=10&sortBy=name&sortOrder=asc&filter[status]=active`
- Response: `{ data: User[], total: number }`

## Environment Configuration

Three environments with separate `.env` files:

- `.env.development` - Dev backend (can be localhost or Cloud Run dev)
- `.env.test` - Test backend
- `.env.production` - Production backend

Key variables:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENV=dev
VITE_HCAPTCHA_SITE_KEY=your-key
VITE_FIREBASE_AUTH_ENABLED=true
```

Create `.env.local` (gitignored) for local overrides.

## Deployment

Automated via GitHub Actions on push to `main`, `dev`, or `test` branches:

1. Install dependencies (`npm ci`)
2. Generate types from backend OpenAPI schema
3. Build for target environment
4. Deploy to Firebase Hosting

**Targets**:

- `main` branch → `prod` target (live site)
- `dev` branch → `dev` target
- `test` branch → `test` target

**Manual deployment not recommended** - use CI/CD pipeline.

## Key Patterns & Conventions

### Error Handling

- **No try-catch needed in services** - global error handler in place
- Axios interceptor handles all HTTP errors
- Redux middleware handles non-Axios errors
- All errors displayed as Ant Design notifications

### Loading States

- **Use `useIsLoading("slice", "thunkName")` hook** - automatically tracks thunk loading state
- **No manual status management** - store enhancer handles it
- Works for all async thunks across all slices

### Code Organization

- snake_case for files and folders
- PascalCase for components
- camelCase for functions and variables
- Prefix types with describing noun (e.g., `User`, `UserRole`)

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess: true` - always check array/object access
- Path alias: `@/` → `src/`
- All API responses fully typed via OpenAPI generation

### Styling

- Tailwind CSS for utility classes
- Ant Design for components
- React JSS for dynamic styles
- Tailwind config includes Ant Design color palette integration

### i18n

- i18next with multi-language support (English, Urdu)
- RTL support built-in
- Language switcher in settings
- Translation files in `src/lib/translations/`

## Testing & Quality

- ESLint with TypeScript, React Hooks, and Prettier configs
- Pre-commit hooks via Husky (lint + format)
- lint-staged for incremental checking
- No unit tests yet (roadmap item)

## Common Gotchas

1. **Type generation fails**: Ensure backend is running and accessible at `VITE_API_BASE_URL`
2. **401 loop**: Check refresh token endpoint isn't failing - look in browser console
3. **Menu not showing route**: Ensure `menuItem` is defined and user has required role
4. **RBAC not working**: Profile must be fetched first - happens automatically on private routes
5. **Firebase errors**: Check `VITE_FIREBASE_AUTH_ENABLED` is set correctly for environment
6. **State not updating**: If using direct Redux mutations outside reducers, ensure you're using slice actions or thunks
7. **Filters not persisting**: ServerPaginatedTable uses URL state - ensure browser history is working
