# Rayon React Starter

Rayon React Starter is an opinionated starter kit designed to scaffold React projects quickly with a comprehensive and well-structured environment. Built with a modern tech stack and batteries included, it helps you start building your project in no time.

[Live Demo](https://fe.starters.rayonstudios.com/)

## Tech Stack

- **React**: For building user interfaces
- **TypeScript**: Type-safe JavaScript at any scale
- **Vite**: Next generation front-end tooling
- **Redux Toolkit**: State management with slices and thunks
- **Ant Design**: Elegant and consistent UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **OpenAPI Fetch**: Type-safe API client generated from OpenAPI schemas
- **Axios**: Promise-based HTTP client for making requests (used as the fetch implementation for OpenAPI Fetch)

## Features

- 🌗 **Light / Dark Theme**: Easily switch between light and dark modes
- 🌍 **i18n**: Internationalization support for multilingual applications
- 🗂 **Config-based Routing & Menu**: Declarative and flexible route management with automatic menu generation
- 🔐 **Token-based Authentication**: Secure public and protected routes with token authentication
- 🖼 **Per-page Layouts**: Customize layouts for different pages
- ⚙️ **RBAC**: Role-Based Access Control with route-level role checks
- 🔄 **Environment Separation**: Setup development and production environments distinguishably
- 🚦 **Global Error Handling**: Comprehensive error management throughout the application
- 🌀 **Automatic Loading States**: Built-in loading state management for async thunks
- 📂 **Feature-based Folder Structure**: Maintain clean separation of concerns
- 🛠 **Built-in Utilities**: Handy utility functions, hooks, and components to cover common use cases
- 🧹 **Prettier and ESLint Config**: Enforce code style and quality with Prettier and ESLint configurations
- 🚀 **CI/CD with Firebase Hosting**: Continuous Integration and Deployment setup using Firebase Hosting and Github Actions for seamless deployment
- 📊 **ServerPaginatedTable**: Automatic server-side pagination, filtering, and sorting for data tables
- 📝 **OpenAPI Type Generation**: Automatic type generation from OpenAPI schemas for type-safe API calls

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rayonstudios/rayon_react_starter
    cd rayon_react_starter
    ```
2. Install dependencies:
    ```bash
    yarn
    ```
3. Start the development server:
    ```bash
    yarn dev
    ```

The application should now be running on http://localhost:5173

## Environment Configuration

The project supports different environments:

```bash
# Development mode
yarn dev          # Run with development configuration
yarn build:dev    # Build with development configuration

# Production mode
yarn prod         # Run with production configuration
yarn build:prod   # Build with production configuration
```

## API Integration

### OpenAPI Type Generation

The project includes a script to generate TypeScript types from an OpenAPI schema:

```bash
yarn gen-api-types:dev  # Generate types from development API
yarn gen-api-types:prod # Generate types from production API
```

The script fetches the OpenAPI schema from the API endpoint (configured via `VITE_API_BASE_URL` in the environment files) and generates TypeScript types in `src/lib/types/openapi-fetch.d.ts`.

### Making API Calls

The project uses `openapi-fetch` with Axios as the fetch implementation for type-safe API calls:

```typescript
import apiClient, { withApiResponseHandling } from '@/lib/openapi-fetch.config';

// Example API call with type safety
const { data } = await withApiResponseHandling(
  apiClient.GET('/api/users/{id}', {
    params: { path: { id: userId } }
  })
);
```

## Folder Structure

```bash
├── lib/         # Reusable, feature-independent code
│   ├── components/  # Shared UI components
│   ├── hooks/       # Custom React hooks
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Utility functions
├── modules/     # Feature-dependent code
│   ├── auth/        # Authentication related components and logic
│   └── ...          # Other feature modules
├── pages/       # Page components
└── scripts/     # Build and utility scripts
```

- Use **snake_case** for file and folder names to maintain consistency.
- Feature-based folder structure ensures a clean separation of concerns for better scalability and maintainability.

## Common Components

### ServerPaginatedTable

`ServerPaginatedTable` is a powerful component for handling server-side paginated data:

```typescript
import { ServerPaginatedTable } from '@/lib/components/table/server_paginated_table';

// Example usage
<ServerPaginatedTable
  url="/api/users"
  columns={columns}
  queryParams={{ status: 'active' }}
/>
```

The component automatically handles:
- Pagination
- Sorting
- Filtering
- Loading states
- Error handling

## Best Practices

- Reusable code should generally reside in the `lib` folder.
- Feature-dependent code should be organized under `modules`.
- Pages components should be placed under the `pages` folder.
- Use TypeScript for type safety across the application.
- Follow the established patterns for state management with Redux Toolkit.
- Use OpenAPI Fetch for API calls to ensure type safety.
- Use ServerPaginatedTable for displaying data from API endpoints with pagination.

## Roadmap

- [ ] Detailed Developer Documentation
- [ ] Add unit, integration and e2e tests support
- [ ] Convert to a modular CLI based tool
