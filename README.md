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
- **Axios**: Promise-based HTTP client for making requests

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

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rayonstudios/rayon_react_starter
    cd rayon-gcp-starter
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

## Folde Structure

```bash
├── lib/         # Reusable, feature-independent code
├── modules/     # Feature-dependent code
├── pages/       # Page components
└── ...
```

- Use **snake_case** for file and folder names to maintain consistency.
- Feature-based folder structure ensures a clean separation of concerns for better scalability and maintainability.

## Best Practices

- Reusable code should generally reside in the `lib` folder.
- Feature-dependent code should be organized under `modules`.
Pages components should be placed under the `pages` folder.

## Roadmap

- [ ] Detailed Developer Documentation
- [ ] Add unit, integration and e2e tests support
- [ ] Convert to a modular CLI based tools
