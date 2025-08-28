## Fire Incident Mini‑Portal

A mini‑portal to manage fire incidents built with React, Express and MongoDB, using TypeScript and a modular architecture.

### Quick start

```bash
./start-dev.sh
# or
npm run dev
```

Access the app at `http://localhost:3000` and the API at `http://localhost:3001`.

### Tech stack and architecture

- **Frontend**: React 18, Vite, TypeScript, Material UI, React Hook Form, Yup, Axios
- **Backend**: Node.js, Express, TypeScript, MongoDB + Mongoose, Multer, Helmet, CORS, rate limiting
- **Monorepo**: NPM workspaces (`apps/web`, `apps/server`) with clear separation of concerns

The frontend consumes a REST API exposed by the backend. The backend handles validation, authentication, file uploads and persistence in MongoDB. Shared types keep contracts reliable across packages.

### What’s implemented

- Create incidents: title, description, incident type (Fire, Explosion, Chemical Spill), location, optional image (max 5MB)
- Incident listing with cards, reverse‑chronological order, type icons and image thumbnails
- Client‑side validation (React Hook Form + Yup)
- Authentication flow (login/register) and protected routes
- Draft persistence for the creation form (text fields saved to `localStorage` so a page refresh keeps inputs)

### Trade‑offs and assumptions

- Simplicity over completeness: basic auth only; no RBAC yet
- Form draft persistence excludes file inputs by design (browsers do not allow restoring selected files for security)
- Local development focus (no Docker by default). MongoDB expected locally or via a URI
- Minimal error surfaces in UI; server returns typed API responses

### What I’d add with more time

- Edit/update flow: `PUT /api/incidents/:id` and edit forms in the UI
- Role‑based creation: creators vs view‑only users (form availability by role)
- User profile page (view/update name, email, password)
- Search, filters and pagination on incidents
- Better image handling (thumbnails, deletion, validations)

### If AI was used

- Accelerated form draft persistence implementation and edge-case review
- Generated project boilerplate for clarity and speed
- Assisted minor refactors and type tightening across the codebase
