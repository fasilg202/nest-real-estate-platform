### 1. Project Summary

This is a real-estate listing platform inspired by Zillow. It's built so visitors can browse and search property listings, while owners/agents can manage listings (including image uploads), using JWT-based authentication and protected backend routes.

Core flows:
- Visitors browse/search listings.
- Agents/owners create and manage listings (with images).
- Basic auth and protected routes.

### 2. Tech Stack and Architecture

Backend (real estate API):
- Built with **NestJS** (Node.js + TypeScript).
- Uses **MongoDB** for persistence via **Mongoose** (`@nestjs/mongoose`).
- Authentication uses:
  - **JWT** (`@nestjs/jwt`) with **passport-jwt**.
  - Local strategy (**passport-local**) for credential validation.
- Passwords are hashed with **`bcryptjs`**.
- Image upload pipeline uses **multer** (Nest interceptors) + **Cloudinary** (`cloudinary`).
- Security/ops:
  - **CORS** with `credentials: true`.
  - **Rate limiting** with `@nestjs/throttler` (100 requests/min per config).
- Testing/tooling:
  - **Jest**
  - **ESLint**
  - **Prettier**

Key NestJS modules in this repo:
- `AuthModule` (`backend/src/auth/*`)
- `UsersModule` (`backend/src/users/*`)
- `PropertiesModule` (`backend/src/properties/*`) (this is effectively the listings module)
- `UploadsModule` (`backend/src/uploads/*`)

Frontend (web UI):
- Built with **React 19 + TypeScript**.
- Uses **Vite** with `@vitejs/plugin-react`.
- Styling is **Tailwind CSS v4** (`@tailwindcss/vite`).
- Routing uses **`react-router-dom`** (routing is configured in `frontend/src/App.tsx`).
- HTTP calls use **axios**.
- Icons are rendered with **`lucide-react`**.

Key frontend folders:
- `/frontend/src/pages` (pages like `HomePage`, `PropertyListPage`, `PropertyDetailPage`, `LoginPage`, etc.)
- `/frontend/src/components` (ex: `Navbar`)
- `/frontend/src/context` (ex: `AuthContext` for token + user state)
- `TODO: VERIFY` any additional folders used for listings/forms (e.g. if a `/src/routes` folder exists; current routing is centralized in `App.tsx`).

How frontend talks to backend:
- The frontend sends REST requests over HTTP using axios.
- `frontend/src/context/AuthContext.tsx` sets:
  - `axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'`
  - Then calls like `axios.get('/properties/:id')` (no `/api` prefix in code because `baseURL` already includes it).
- The backend uses `app.setGlobalPrefix('api')` in `backend/src/main.ts`, and enables CORS for the configured `FRONTEND_URL`.

### 3. Project Structure

High-level layout (expected / current):
- `/backend` - NestJS app
  - `/src`
    - `/auth` (auth controller/service, strategies, guards)
    - `/users` (users controller/service)
    - `/properties` (property/listing controller/service + DTOs)
    - `/uploads` (uploads controller/service)
    - `/schemas` (Mongoose schemas: `User`, `Property`, `Favorite`, `Contact`, etc.)
    - `/database` (seed/reset scripts)
    - `main.ts`, `app.module.ts`
- `/frontend` - React/Vite app
  - `/src`
    - `/components` (ex: `Navbar`)
    - `/pages` (ex: `PropertyListPage`, `PropertyDetailPage`, `DashboardPage`, etc.)
    - `/context` (ex: `AuthContext`)
    - `main.tsx`, `App.tsx`
- Root (`/`)
  - `package.json` uses `concurrently` to run backend + frontend
  - `TODO: VERIFY` root-level ESLint/Prettier/TS configs (most tooling appears to be configured per-package)

If any of the above differs from the actual repo, mark it `TODO: VERIFY` and correct paths accordingly.

### 4. Current Status (Reality Check)

- **Authentication & Users**
  - What works:
    - Backend endpoints exist:
      - `POST /api/auth/register`
      - `POST /api/auth/login`
    - Password hashing uses `bcryptjs`.
    - Validation is enabled globally in `backend/src/main.ts` via `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })`.
    - JWT strategy validates tokens from the `Authorization: Bearer <token>` header.
  - What is partially implemented or broken:
    - Frontend token persistence:
      - `AuthContext` stores token in `localStorage` and sets axios default headers on load, but does not fully re-hydrate `user` state from the backend on refresh.
      - This means UI that depends on `user` (e.g. "List Property" link in `Navbar`) can be missing until a login/register occurs again.
    - Frontend does not appear to implement route guards for protected pages; it only gates UX visibility based on `user`.
  - TODO: VERIFY:
    - Whether `req.user.id` in `PropertiesController` always matches the structure returned by `JwtStrategy` / Mongoose document (likely works, but worth confirming with an end-to-end request).

- **Listing CRUD**
  - What works:
    - Backend listing/property CRUD exists in `backend/src/properties`:
      - `POST /api/properties` (protected via `JwtAuthGuard`)
      - `GET /api/properties` (public list with filters)
      - `GET /api/properties/:id` (public detail)
      - `GET /api/properties/my-properties` (protected)
      - `PATCH /api/properties/:id` (protected; owner-only)
      - `DELETE /api/properties/:id` (protected; owner-only)
    - Owner checks are enforced in `PropertiesService` with `ForbiddenException` for non-owners.
  - What is partially implemented or broken:
    - Image-to-listing wiring is likely incomplete end-to-end:
      - Backend supports separate image uploads (`/api/uploads/image`, `/api/uploads/images`), but the property create DTO currently does not define an `images` field.
      - Frontend has no UI/code that calls the uploads endpoints or sends `images` into property create/update.
  - Missing:
    - Frontend pages/components for creating/editing/deleting listings appear absent.
    - `DashboardPage` is largely mock data and does not load real listings from the backend.
    - `DashboardPage` navigates to `/properties/new`, but that route is not present in `frontend/src/App.tsx`.
    - `Navbar` links to `/dashboard/add-property`, but the corresponding route does not appear in `App.tsx`.
  - TODO: VERIFY:
    - Whether there is any additional "add/edit property" implementation in a different branch or missing files not detected by current scans.

- **Search & Filtering**
  - What works:
    - Backend filtering exists in `PropertiesService.findAll(query)`:
      - `city`, `state` (case-insensitive regex matching)
      - `propertyType`, `listingType`
      - `minPrice`, `maxPrice`
      - `bedrooms`, `bathrooms`
      - `limit` and `offset` for pagination (supported by service code)
    - Frontend `PropertyListPage`:
      - Uses query params from UI + `useSearchParams()`
      - Calls `GET /api/properties?${params}`
  - What is partially implemented or broken:
    - Frontend search input placeholder suggests "neighborhood or address", but backend filtering does not currently include an `address` or `neighborhood` filter (only city/state).
    - Frontend does not appear to use pagination/infinite scroll UI even though backend supports `limit/offset`.

- **Images & Uploads**
  - What works:
    - Backend upload endpoints exist:
      - `POST /api/uploads/image` (single file via multer `FileInterceptor('file')`)
      - `POST /api/uploads/images` (multiple via multer `FilesInterceptor('files', 10)`)
    - Backend validates uploads:
      - MIME type must start with `image/`
      - Max file size: 5MB per file
      - Max number of images: 10 per request
    - Uploads are transformed to WebP in Cloudinary.
  - What is partially implemented or broken:
    - There is no clear integration in code showing:
      - selecting images in the frontend
      - calling `/api/uploads/images`
      - persisting returned `publicId`/`url` into a property's `images` field
  - Missing:
    - Frontend listing form / upload UI + preview/error handling is not present.

- **Security & Rate Limiting**
  - What works:
    - CORS is enabled with:
      - `origin: FRONTEND_URL || http://localhost:5173`
      - `credentials: true`
    - Rate limiting is configured in `AppModule`:
      - TTL: 60s
      - Limit: 100 requests/min
    - Protected routes:
      - property create/update/delete and `my-properties` use `JwtAuthGuard`
      - ownership is enforced in service layer.
  - What is partially implemented or broken:
    - Upload endpoints are public (no `JwtAuthGuard`), which may be acceptable for early prototypes but is a likely gap for production.
    - Users endpoints appear public as well (ex: `POST /api/users` etc.), depending on desired product requirements.

- **Frontend UX**
  - What works:
    - Home/listing browsing UI is present (`PropertyListPage`) with interactive filters.
    - Property detail UI exists (`PropertyDetailPage`) including an image gallery that expects `property.images`.
    - Login/Register UI calls backend auth endpoints and stores JWT tokens.
  - What is partially implemented or broken:
    - Dashboard appears to be mock data; it does not call backend "my properties".
    - There is no listing create/edit/delete flow in the frontend.
    - Favorites appear to be purely client-side state (`useState(favorites)`), not persisted to backend (and there are backend schemas for favorites, but no endpoints verified here).
    - Contact form in `PropertyDetailPage` currently logs to console and does not call a backend contact/inquiry endpoint (verify via code).
  - Mobile responsiveness:
    - Many components use responsive Tailwind classes (`sm:`, `md:`, `lg:`), but full mobile QA is `TODO: VERIFY`.

- **Deployment Status**
  - `TODO: DEPLOYMENT NOT SET UP` (no deployment URLs found/verified in this workspace).
  - `TODO: VERIFY` whether backend/frontend are deployed anywhere and what base URLs should be used.

### 5. Definition of Done (MVP for This Project)

- [ ] User registration and login via JWT auth working end-to-end (backend + frontend).
- [ ] Protected routes for agent/owner dashboard and listing management.
- [ ] Agents/owners can create, edit, and delete listings with:
  - [ ] title, description, price, address, city, state, property type
  - [ ] bedrooms, bathrooms, square footage, and relevant rental fields (rent/deposit/lease term)
  - [ ] images uploaded and associated to the listing (multer + Cloudinary).
- [ ] Visitors can browse listings and search/filter by:
  - [ ] location (city/state)
  - [ ] price range (min/max)
  - [ ] beds/baths
  - [ ] property type / listing type (SALE/RENT)
- [ ] Pagination or infinite scroll for listing results.
- [ ] Core pages are reasonably mobile-friendly (home, listing detail, search results, dashboard).
- [ ] All main API endpoints have basic request validation and clear error responses.
- [ ] Backend test suite passes (`npm test`).
- [ ] `npm run build` works for both backend and frontend without errors.
- [ ] App is deployed to our cloud platform or a placeholder URL (example: `https://realestate.yourdomain.com`) with logs/monitoring enabled.
- [ ] README and this handoff doc reflect the current state.

Adjust naming/commands if the project uses `pnpm`/`yarn` instead of `npm`:
- TODO: ADJUST COMMANDS

### 6. Constraints and Guardrails for the AI Agent

DO keep using the existing stack:
- NestJS + MongoDB/Mongoose
- React 19 + Vite
- Tailwind CSS v4

DO keep JWT-based authentication:
- Preserve the current token strategy (JWT in `Authorization: Bearer ...`).
- Keep the existing local + JWT strategy approach unless a replacement is explicitly approved.

DO keep uploads on multer + Cloudinary:
- Continue using the established upload validation logic (image MIME type + size limits).
- Prefer wiring returned Cloudinary data (`secure_url`, `public_id`) into the existing `PropertyImage` schema.

DO improve robustness:
- Add/strengthen request validation for listing create/update flows.
- Add error handling that maps backend errors to user-friendly UI messages.
- Add at least minimal backend tests for critical controllers/services.

DON'T do these without human approval:
- Don't drop or rename MongoDB collections/documents destructively without a migration plan.
- Don't change fundamental auth flows (register/login payloads, JWT strategy, token storage pattern) without a deliberate plan.
- Don't introduce giant dependencies or rewrite to a different framework.
- Be careful when changing CORS and rate limiting; assume this app may be internet-facing.

### 7. How to Run and Test Locally

Prerequisites:
- Node.js 18+ (per `README.md`)
- MongoDB 6+ (per `README.md`)
- A Cloudinary account + credentials for image upload (if testing uploads)

From a clean clone:
- Root:
  - `npm install`
  - `npm run install:all` (installs dependencies for root + backend + frontend; preferred if scripts are consistent)
  - `npm run dev` (runs backend + frontend together via `concurrently`)

Backend (`/backend`):
- Install: `npm install`
- Dev: `npm run start:dev`
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

Frontend (`/frontend`):
- Install: `npm install`
- Dev: `npm run dev`
- Test: `TODO: VERIFY` (frontend `package.json` currently shows `lint`/`build`/`dev` but not an explicit `test` script)
- Lint: `npm run lint` (exists)
- Build: `npm run build`

Environment variables (required):

Backend:
- `MONGODB_URI` (default example: `mongodb://localhost:27017/nest-real-estate`)
- `JWT_SECRET` (JWT signing key)
- `JWT_EXPIRES_IN` (optional; default in strategy factory: `7d`)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `PORT` (backend port; default `3001`)
- `FRONTEND_URL` (CORS allowlist; default `http://localhost:5173`)
- `TODO: VERIFY` any additional env vars used by other modules

Frontend:
- `VITE_API_URL` (example: `http://localhost:3001/api`)

Local URLs:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001/api`

### 8. Known Issues and TODOs for the AI Agent

- Implement a real "add/edit property" frontend flow:
  - Create `/dashboard/add-property` and a `/properties/new` (or update redirects) page that calls `POST /api/properties` and supports editing via `PATCH /api/properties/:id`.
  - Ensure UI can attach uploaded images to the listing.
- Wire image upload end-to-end:
  - Build listing form file inputs, call `POST /api/uploads/images`, then persist `images` on the property model.
  - Add upload preview thumbnails and handle Cloudinary/validation errors gracefully.
- Add backend/frontend validation alignment:
  - Confirm `CreatePropertyDto` includes all fields required by the UI (e.g. any fields required to store `images` and `features/amenities`).
  - Add DTO validation for any missing fields (required vs optional, numeric ranges, string length).
- Add pagination/infinite scroll:
  - Use backend `limit/offset` and update `PropertyListPage` to request pages incrementally.
  - Keep sorting consistent between backend and frontend.
- Improve auth-driven UX and protected routing:
  - Re-hydrate `user` from token on refresh (or add a backend "current user" endpoint) so Navbar and protected UI work reliably.
  - Add route guards for protected pages (dashboard, listing management).
- Add tests:
  - Add Jest tests for auth and properties endpoints (register/login, property create/update/delete + owner checks).
  - Add a minimal test suite for upload validation paths.
- Favorites/messages persistence:
  - Verify whether backend favorites/messages endpoints exist; if not, add them or remove/disable misleading UI.

### 9. Acceptance Criteria for Successful Handoff

- All items in the Definition of Done checklist are checked.
- Backend test suite passes on a clean clone (`git clone` -> install -> test).
- Frontend builds and runs without errors, and can talk to the deployed backend.
- A human following the "How to Run and Test Locally" section can get a working dev setup in under 30 minutes.
- A human following the deployment instructions (if any) can deploy to production or staging and verify:
  - Sign up/login.
  - Create/edit/delete listing with image.
  - Search and filter listings.

