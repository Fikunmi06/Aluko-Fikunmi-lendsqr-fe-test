# Lendsqr Frontend Test — My Implementation

This is my implementation of the Lendsqr frontend assessment. I built it with a modern React + TypeScript stack, wired to a local mock API so I could iterate quickly on UI, routing, and data flows.

## What I built (scope)
- A responsive login page using a custom Material UI theme. The page has a left panel with the Lendsqr logo and illustration, and a right panel with the login form.
- A mock authentication flow: on submit, I set a token in localStorage and navigate to the dashboard.
- A simple dashboard placeholder page.
- A Users page that loads a list of users from a local mock API, with links to detail pages.
- A User Details page that fetches data by id and lets me persist edits to localStorage (simple client-side persistence).
- A basic test for the login page using Vitest and React Testing Library.

## Tech stack and why I chose each piece
- Vite: super-fast dev server and build for React + TS.
- React 18: component model and ecosystem I’m most productive in.
- TypeScript: type-safety for better refactoring and fewer runtime errors.
- React Router v6: client-side routing for pages and nested routes.
- Material UI (v5) + Emotion: accessible, consistent, and themeable UI primitives; faster to achieve design parity.
- SCSS: flexibility to add custom styles alongside MUI.
- Axios: straightforward HTTP client with typed responses.
- json-server: instant REST API over a static JSON file for local development.
- Faker: generate realistic mock data to populate the API (500 users).
- Vitest + @testing-library/react + @testing-library/jest-dom + jsdom: fast unit tests in a DOM-like environment.
- concurrently: run the dev server and mock API server together for convenience.

## Project structure
```
src/
  App.tsx                 # App routes
  main.tsx                # React entry + BrowserRouter + global styles
  styles/main.scss        # Global styles
  pages/
    Login.tsx             # Login page using MUI + custom theme
    Dashboard.tsx         # Dashboard placeholder
    Users.tsx             # Fetch users from mock API and list
    UserDetails.tsx       # Fetch by id; save edits to localStorage
  components/
    LoginForm/LoginForm.tsx  # Login form UI and logic (MUI-styled components)
    icons/LendsqrLogo.tsx    # SVG logo
  theme/
    index.ts              # MUI theme (palette, typography, shape, shadows)
  __tests__/
    Login.test.tsx        # Basic render test
  setupTests.ts           # Jest-DOM matchers setup
scripts/
  generate-mock.js        # Generates mock/db.json using faker
mock/
  db.json                 # Generated dataset (created by script)
```

## How I implemented key parts
- Login page and theme
  - I created an MUI theme (palette, typography, shape, shadows) in src/theme and applied it with ThemeProvider in the Login page.
  - The form is split into a presentational component (LoginForm) styled with MUI’s styled() API.
  - On submit, I set a mock token to localStorage and navigate to /dashboard.
- Routing
  - App.tsx defines routes for /login, /dashboard, /users, and /users/:id, with a default redirect from / to /login.
  - main.tsx wraps App in BrowserRouter and applies global SCSS.
- Data fetching and persistence
  - I used json-server to serve a generated mock dataset at http://localhost:4000.
  - Users.tsx fetches a list with Axios and links to UserDetails.
  - UserDetails.tsx loads by id; if there’s an overridden version in localStorage (key: user:<id>) it uses that; otherwise it fetches from the API. Save persists to localStorage.
- Testing setup
  - Vitest uses the jsdom environment, and setupTests.ts imports @testing-library/jest-dom for extended assertions.
  - tsconfig includes vitest/globals types so TypeScript recognizes test and expect.

## Getting started
1) Install dependencies
```
npm install
```

2) Generate mock data (creates mock/db.json with 500 users)
```
npm run generate:mock
```

3) Start the mock API server and dev server concurrently
```
npm run start:all
```
- Dev server: http://localhost:5173
- Mock API:  http://localhost:4000/users

Alternatively, run them separately:
```
# Start mock API only
npm run mock:server

# Start Vite dev server only
npm run dev
```

4) Run tests
```
npm test
```

5) Build for production and preview locally
```
npm run build
npm run preview
```

## API shape (mock)
The generator creates a simple user shape like:
```
{
  id: number,
  fullName: string,
  email: string,
  phone: string
}
```
Served by json-server at /users and /users/:id.

## Troubleshooting
- Missing Material UI packages
  - If you see errors about @mui/material or @mui/material/styles, install:
    npm i @mui/material @emotion/react @emotion/styled
- Missing jsdom for tests
  - If Vitest prompts for jsdom, install it:
    npm i -D jsdom
- TypeScript can’t find test globals (test, expect)
  - Ensure tsconfig.json has:
    "types": ["vitest/globals", "vite/client"]
- Port conflicts
  - If 4000 or 5173 is taken, stop the other process or change the port in package.json (vite preview) and scripts.

## Notes and next steps
- UI polish: integrate more of the Figma design (spacing, states, and responsive details).
- Table enhancements on Users page: pagination, sorting, filtering.
- Form validation and better UX for User Details edits.
- Route guards and a simple auth context.
- Improved accessibility (labels, focus states, keyboard navigation).
- Add more unit tests and possibly e2e tests.
- Deployment: containerize and/or deploy to Vercel/Netlify.

## Scripts reference
- dev — start Vite dev server.
- build — build for production.
- preview — preview the production build.
- generate:mock — produce mock/db.json with faker.
- mock:server — run json-server on port 4000.
- start:all — run mock API and dev server concurrently.
- test — run Vitest.

---
I approached this project to prioritize a clean structure, fast iteration, and a realistic development workflow: local API mocking, component-driven UI with a shared theme, and a TypeScript-first codebase to keep refactors safe.

## Deployment (Vercel / Netlify)

This project can be deployed to a static host like Vercel or Netlify. The `public/mock/db.json` file is included so the app will work without a running json-server in production.

Recommended quick deploy with Vercel:

1. Sign in to Vercel and create a new project from your GitHub repository `Fikunmi06/lendsqr-fe-test`.
2. For build settings, the defaults should work: Framework preset = `Vite`, Build command = `npm run build`, Output directory = `dist`.
3. After deploy, your site will be available at a URL like:

  https://aluko-fikunmi-lendsqr-fe-test.vercel.app

If you prefer Netlify, drag-and-drop the `dist` folder or connect your Git repo and set build command `npm run build` and publish directory `dist`.