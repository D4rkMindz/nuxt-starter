# HA External Client

A web-based administration interface for Home Assistant built with Nuxt 4 and Vue 3. This full-stack application provides user management and an external interface to interact with your Home Assistant instance.

## Features

- **User Management** - Registration, login, profile management with bcrypt-hashed passwords
- **Role-Based Access Control** - 6-tier RBAC hierarchy using CASL (ANYONE, GUEST, RENAMED, VERIFIED, OWNER, ADMIN)
- **Home Assistant Integration** - View entity states, attributes, and state changes
- **Session Authentication** - Secure server-side sessions with nuxt-auth-utils
- **Internationalization** - Support for English and German
- **Google Analytics** - Built-in GTags integration

## Tech Stack

**Frontend:**
- Nuxt 4 / Vue 3
- Tailwind CSS 4
- Motion V (animations)
- Lucide Vue (icons)

**Backend:**
- Nitro (Node.js)
- MongoDB with Mongoose
- CASL (authorization)
- bcryptjs (password hashing)

**Infrastructure:**
- Docker / Docker Compose
- Node.js 22

## Prerequisites

- Node.js 22+
- MongoDB instance
- Home Assistant instance with a long-lived access token

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Setup secrets using the `.env` file configuration. Copy the example file to create your configurations:

```bash
cp .env.example .env
cp .env.example .env.docker
cp .env.example .env.production
```

#### Required Variables

| Variable | Description |
|----------|-------------|
| `G_TAG_ID` | Google Analytics ID (e.g., `G-XXXXXXXXXX`) |
| `HA_TOKEN` | Home Assistant long-lived access token |
| `HA_URL` | Home Assistant URL (e.g., `https://home.example.com`) |
| `NUXT_SESSION_PASSWORD` | Session encryption key (32+ characters) |
| `MONGODB_HOST` | MongoDB hostname (`heimr-mongodb` for Docker, `localhost` for local) |
| `MONGODB_USERNAME` | MongoDB username |
| `MONGODB_PASSWORD` | MongoDB password |
| `ENCRYPTION_SECRET` | Data encryption key |

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Docker Development

```bash
# With daemon
npm run docker:dev

# Without daemon (see logs)
npm run docker:devnd

# Full rebuild
npm run docker:dev:rebuild
```

In development Docker mode, a MongoDB Express admin UI is available at port 8012 (credentials: dev/dev).

### Styling

Styles are done using [Tailwind CSS 4](https://tailwindcss.com/).

### Translations

Translations are handled by [@nuxtjs/i18n](https://i18n.nuxtjs.org/). Extract all translations with:

```bash
npm run extract:i18n
```

## Production

Build the application for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

### Docker Production

```bash
# Start containers
npm run docker

# Stop containers
npm run docker:stop

# Clean up volumes
npm run docker:clean

# Full rebuild
npm run docker:rebuild
```

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Project Structure

```
home-ui/
├── app/                     # Frontend (Nuxt/Vue)
│   ├── assets/css/          # Tailwind CSS
│   ├── components/          # Vue components
│   ├── composables/         # Vue composables
│   ├── layouts/             # Page layouts
│   ├── middleware/          # Route middleware
│   ├── pages/               # Page components
│   └── utils/               # Client utilities
├── server/                  # Backend (Nitro)
│   ├── middleware/          # Server middleware (auth, context)
│   ├── routes/              # API endpoints
│   ├── models/              # Mongoose schemas
│   ├── plugins/             # Nitro plugins
│   └── utils/               # Server utilities (RBAC, crypto, etc.)
├── shared/                  # Shared code (client & server)
├── i18n/locales/            # Translations (en.json, de.json)
├── public/                  # Static assets
├── Dockerfile               # Docker build config
├── compose.yaml             # Production Docker Compose
└── compose.dev.yaml         # Development Docker Compose
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/profile` | Update user profile |
| GET | `/user` | List all users |

## Docker Services

**Production:**
- `nuxt` - Main application (port 8020)
- `mongodb` - Database with persistent volume

**Development (additional):**
- `mongodb-express` - MongoDB admin UI (port 8012)

## Updating Dependencies

```bash
npm run updates
```

Or manually:

```bash
npx npm-check-updates -u && npm install
```

## Debugging

> Note: Currently not working

```bash
npm run dev:debug
```

Then use the run configuration `dev:debug` and set your breakpoints.

## Known Issues

### Vue Router: No match found for location with path "/uxsw/scope/root.js"

This happens if other applications developed on the same host (e.g., localhost:3000) use service workers. Your browser tries to load scripts for those service workers which don't exist in this project.

**Resolution:** Clear all service workers in the browser.
