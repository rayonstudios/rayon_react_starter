# Rayon React Starter

An opinionated React starter kit for rapid frontend development. Built with TypeScript, Vite, and a modern stack, this starter provides authentication, routing, state management, and seamless backend integration out of the box.

**[Live Demo](https://fe.starters.rayonstudios.com/)** | **[Backend Counterpart](https://github.com/rayonstudios/rayon_gcp_express_psql_starter)**

---

## Tech Stack

### Core

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 5** - Fast build tool with SWC
- **Redux Toolkit 2** - State management

### UI & Styling

- **Ant Design 5** - Component library
- **Tailwind CSS 3** - Utility-first CSS
- **React JSS** - CSS-in-JS for dynamic styling
- **Lucide** - Icon library

### API & Data

- **OpenAPI Fetch** - Type-safe API client from OpenAPI schemas
- **Axios** - HTTP client (fetch implementation)
- **React Router 6** - Client-side routing
- **ahooks** - React hooks library

### Authentication & Security

- **Firebase** - Firestore (ex: real-time background job status), Storage, Cloud Messaging
- **hCaptcha** - Bot protection

### Internationalization

- **i18next** - i18n framework with multi-language support (English, Urdu)

---

## Features

### Authentication & Security

- **JWT Authentication** - Access/refresh token flow with automatic token refresh
- **Role-Based Access Control (RBAC)** - Route-level permission checks
- **Firebase Integration** - Firestore for real-time updates (e.g., background job status), Storage, Cloud Messaging
- **hCaptcha Protection** - Bot prevention on public routes

### Routing & Navigation

- **Config-based Routing** - Declarative route definitions with automatic menu generation
- **Per-route Layouts** - Empty, Auth, and Dashboard layouts
- **Nested Routes** - Support for parent/child/grandchild routes
- **Protected Routes** - Public/private route configuration

### UI & Theming

- **Dark/Light Mode** - System-aware theme switching with Tailwind integration
- **i18n Support** - Multi-language with RTL support (English, Urdu)
- **Ant Design Components** - Pre-configured with custom theming
- **Responsive Layouts** - Mobile-first design patterns

### State & Data Management

- **Redux Toolkit** - Slices, thunks, and async state handling
- **OpenAPI Type Generation** - Automatic type-safe API client from backend schema
- **Server-side Pagination** - Built-in `ServerPaginatedTable` component
- **Global Error Handling** - Centralized error management with automatic token refresh on 401

### Developer Experience

- **Three Environments** - Separate dev, test, and production configs
- **Automatic Loading States** - Built-in loading management for async operations
- **Feature-based Structure** - Clean separation between lib (shared) and modules (features)
- **Code Quality Tools** - ESLint, Prettier, and Husky pre-commit hooks
- **CI/CD Pipeline** - Automated deployment to Firebase Hosting via GitHub Actions

---

## Getting Started

### Prerequisites

- **Node.js 20+** and **npm 10+**
- **Backend running** - This starter requires [rayon_gcp_express_psql_starter](https://github.com/rayonstudios/rayon_gcp_express_psql_starter) running locally or deployed

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rayonstudios/rayon_react_starter
   cd rayon_react_starter
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment** (optional):

   By default, `.env.development` points to `http://localhost:3000/api/v1`. Update if your backend runs elsewhere.

4. **Start development server**:
   ```bash
   npm run dev
   ```

The app will be available at **http://localhost:5173** with hot module replacement enabled.

---

## Available Scripts

### Development

```bash
npm run dev           # Start dev server (uses .env.development)
npm run test          # Start test server (uses .env.test)
npm run prod          # Start prod server (uses .env.production)
```

### Building

```bash
npm run build:dev     # Build for development
npm run build:test    # Build for test environment
npm run build:prod    # Build for production
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
npm run preview          # Preview production build locally
```

---

## Environment Configuration

Three environment files are included:

| File               | Backend URL                                                    | Purpose                                                                        |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `.env.development` | `https://rayon-gcp-express-psql-starter-dev-*.run.app/api/v1`  | Development environment (can be changed to `localhost:3000` for local backend) |
| `.env.test`        | `https://rayon-gcp-express-psql-starter-test-*.run.app/api/v1` | Testing environment for QA                                                     |
| `.env.production`  | `https://be.starters.rayonstudios.com/api`                     | Production environment                                                         |

### Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1    # Backend API URL
VITE_ENV=dev                                       # Environment identifier
VITE_HCAPTCHA_SITE_KEY=your-site-key              # hCaptcha site key
FIREBASE_AUTH_ENABLED=true                         # Enable/disable Firebase features
```

**Note**: Create `.env.local` (gitignored) to override any environment-specific values locally.

---

## Backend Integration

This starter is designed to work with **[rayon_gcp_express_psql_starter](https://github.com/rayonstudios/rayon_gcp_express_psql_starter)** backend.

### OpenAPI Type Generation

The starter automatically generates TypeScript types from the backend's OpenAPI schema:

1. **Backend exposes schema** at `/api/v1/openapi.json`
2. **Script fetches schema** from `VITE_API_BASE_URL`
3. **Types are generated** in `src/lib/types/openapi-fetch.d.ts`
4. **API client is fully typed** for all backend endpoints

Run type generation manually:

```bash
npm run gen-types:dev    # Fetch schema from dev backend
npm run gen-types:test   # Fetch schema from test backend
npm run gen-types:prod   # Fetch schema from prod backend
```

**Note**: Type generation runs automatically when starting dev servers (`npm run dev`, etc.).

### Making API Calls

Use the pre-configured `openapi-fetch` client for type-safe API calls:

```typescript
import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";

// Type-safe API call with automatic error handling
const { data } = await withApiResponseHandling(
  apiClient.GET("/users/{id}", {
    params: { path: { id: userId } },
  })
);
```

**Features**:

- Full TypeScript type inference for request/response
- Automatic token refresh on 401 errors
- Global error handling for 403 (permission errors)
- Request/response interceptors

---

## Project Structure

```
rayon_react_starter/
├── .github/workflows/     # CI/CD pipelines (Firebase deployment)
├── .husky/                # Git hooks (pre-commit)
├── public/                # Static assets
├── scripts/               # Build scripts (OpenAPI type generation)
├── src/
│   ├── lib/               # Shared, reusable code
│   │   ├── components/    # Shared UI components
│   │   ├── contexts/      # React contexts (theme, language)
│   │   ├── firebase/      # Firebase configuration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components (auth, dashboard, empty)
│   │   ├── redux/         # Redux store, slices, middleware
│   │   ├── router/        # Routing configuration
│   │   ├── styles/        # Global styles
│   │   ├── translations/  # i18n translation files
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── modules/           # Feature-specific code
│   │   ├── auth/          # Authentication module
│   │   ├── file/          # File management
│   │   ├── posts/         # Posts module
│   │   └── user/          # User management
│   └── pages/             # Page components
│       ├── 404/
│       ├── auth/          # Login, forgot password, reset password
│       ├── posts/
│       ├── settings/
│       └── users/
├── .env.development       # Dev environment variables
├── .env.test              # Test environment variables
├── .env.production        # Prod environment variables
├── firebase.json          # Firebase Hosting config
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite build config
```

### Organization Principles

- **`lib/`** - Reusable, feature-independent code
- **`modules/`** - Feature-specific code organized by domain
- **`pages/`** - Page components that compose modules and lib components
- **snake_case** - Used for file and folder names

---

## Key Components

### ServerPaginatedTable

Advanced table component with built-in server-side operations:

```typescript
import ServerPaginatedTable from '@/lib/components/server-paginated-table/server-paginated-table';

<ServerPaginatedTable
  url="/users"                           // API endpoint
  columns={columns}                      // Column definitions
  filters={[                             // Optional filter configurations
    {
      label: "Status",
      type: "select",
      key: "status",
      filterProps: {
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" }
        ]
      }
    }
  ]}
/>
```

**Features**:

- Server-side pagination, sorting, and filtering
- URL state management (filters persist in URL)
- Automatic loading and error states
- Ant Design Table integration

### Other Notable Components

- **ServerPaginatedSelect** - Lazy-loaded select with server-side search
- **FilePicker / ImagePicker** - File upload with preview
- **ServerImg** - Optimized image loading with fallback
- **AlertPopup** - Confirmation dialogs
- **ErrorBoundary** - React error boundaries
- **PageSpinner** - Loading states

---

## Deployment

### Firebase Hosting

The project deploys to Firebase Hosting with three targets:

| Branch | Target | URL                                  |
| ------ | ------ | ------------------------------------ |
| `main` | `prod` | https://fe.starters.rayonstudios.com |
| `dev`  | `dev`  | Firebase preview URL                 |
| `test` | `test` | Firebase preview URL                 |

### Automated Deployment

Deployments are triggered automatically via GitHub Actions on push to `main`, `dev`, or `test` branches.

**Workflow**:

1. Install dependencies
2. Generate types from backend OpenAPI schema
3. Build for the target environment
4. Deploy to Firebase Hosting

**Note**: Manual deployments are not recommended. Use the CI/CD pipeline by pushing to the appropriate branch.

---

## Best Practices

### Code Organization

- **Shared code** → `lib/` folder
- **Feature-specific code** → `modules/` folder
- **Page components** → `pages/` folder
- **Use snake_case** for file and folder names

### Development

- Type generation runs automatically with `npm run dev` - no need to run manually
- Use Redux Toolkit for state management
- Leverage OpenAPI Fetch for type-safe API calls
- Use `ServerPaginatedTable` for data tables
- No need for try-catch in services unless handling specific errors - global error handler is in place

### Routing

- Define routes in `src/lib/router/router-config.tsx`
- Specify layout type (`empty`, `auth`, `dashboard`)
- Configure auth requirements (`public`, `private`, `none`)
- Set allowed roles for RBAC

### Redux State Management

- **Automatic Loading States**: The project uses a status enhancer that automatically tracks loading states for all async thunks
- **Use `useIsLoading` hook**: Listen to thunk loading states without manual state management

  ```typescript
  import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";

  // Automatically tracks loading state of 'fetchUsers' thunk in 'user' slice
  const isLoading = useIsLoading("user", "fetchUsers");
  ```

- **No manual status management needed**: The enhancer automatically sets `{thunkName}Status` field to `LOADING`, `IDLE`, or `FAILED`
- **Works across all slices**: Any thunk in any slice gets automatic loading state tracking

---

## Roadmap

- [ ] E2E test support
- [ ] Analytics and error reporting integration
- [ ] Convert to CLI-based scaffolding tool

---

## Contributing

We welcome contributions! Whether it's bug fixes, new features, or documentation improvements, your help is appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the code style guidelines
4. Test thoroughly
5. Commit with clear messages: `git commit -m "feat: add dark mode toggle"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Guidelines

- Follow the existing code style (snake_case for files, ESLint/Prettier configs)
- Update documentation for user-facing changes
- Test changes in at least the dev environment

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built by [Rayon Studios](https://rayonstudios.com). If this starter helped you ship faster, consider giving it a ⭐ on GitHub!
