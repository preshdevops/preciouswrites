# PreciousWrites — Tech & Creative Journal

**PreciousWrites** is a sleek, modern personal journal and blog built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Turso (LibSQL SQLite)**. It serves as the digital home of **Precious Olonade** — Computer Science student, full-stack builder, and designer — covering thoughts on **Faith**, **Football** (Man United), **Film**, **Tech**, and **Life**.

---

## 🎨 Design Philosophy & Identity

PreciousWrites features a high-craft, bespoke tech identity:
- **Typography**: Clean, high-legibility UI typography powered by `Plus Jakarta Sans` for titles and prose, paired with `JetBrains Mono` for code snippets and metadata tags.
- **Color System**: Obsidian Dark Mode (`#090D16`) with electric indigo & sky cyan accents, alongside a crisp Slate Light Mode (`#F8FAFC`).
- **Glassmorphism & Micro-Interactions**: Subtle glass card containers, interactive search modals with `Ctrl+K` keyboard shortcuts, live status playback indicators, and category-tailored color accents (Faith: Purple, Football: Emerald, Film: Amber, Tech: Sky, Life: Pink).

---

## 🚀 Feature Highlights

- ⚡ **Next.js 16 App Router & React 19**: Server Components, streaming, and client-side state hydration.
- 🗄️ **Turso / LibSQL Database Integration**: Serverless edge SQLite database with fallback static posts.
- 🎵 **Real-Time Spotify "Now Playing" Widget**: Displays live playback status, album art, and animated equalizer bars using Spotify API.
- 🔍 **Interactive Global Search Overlay**: Fast client-side search across titles, categories, and post excerpts (`Ctrl + K` or `Cmd + K`).
- 🏷️ **Category Filter**: Instant client-side post filtering with animated pill tabs and live article counts.
- 🌓 **Theme Switcher**: Dark and Light mode support via `next-themes`.
- 🔐 **Admin Dashboard & Management Console**: Protected route (`/admin/dashboard`) to compose, edit, delete, and seed database articles using SQLite or static fallback data.
- 🛡️ **Sanitization & Security**: Markdown content rendered securely with `isomorphic-dompurify`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 + `@tailwindcss/typography`
- **Fonts**: `next/font/google` (`Plus Jakarta Sans` & `JetBrains Mono`)
- **Database**: LibSQL / Turso (`@libsql/client`)
- **Icons**: Lucide React
- **Theme**: `next-themes`

---

## 📁 Project Structure

```sh
preciouswrites/
├── src/
│   ├── app/
│   │   ├── about/              # About Precious page
│   │   ├── admin/              # Admin login & dashboard routes
│   │   ├── api/                # API routes (posts, spotify, admin authentication, subscribe)
│   │   ├── blog/               # Articles index & single article page ([slug])
│   │   ├── globals.css         # Modern design tokens, themes, & glass utilities
│   │   ├── layout.jsx          # Root layout with fonts & theme provider
│   │   └── page.jsx            # Bespoke homepage with hero & sidebar
│   ├── components/
│   │   ├── admin/              # Admin guard & post editor form
│   │   ├── CategoryFilter.jsx  # Category pill bar & grid filter
│   │   ├── Footer.jsx          # Modern tech footer with live status & social links
│   │   ├── Header.jsx          # Glass navbar with search overlay & theme toggle
│   │   ├── NewsletterForm.jsx  # Newsletter input component
│   │   ├── PostCard.jsx        # Glass article card with category pills
│   │   ├── SpotifyWidget.jsx   # Live Spotify playback player
│   │   ├── ThemeProvider.jsx   # next-themes wrapper
│   │   └── ThemeToggle.jsx     # Dark/Light mode toggle button
│   ├── data/
│   │   └── posts.js            # Default static posts fallback
│   └── lib/
│       ├── auth.js             # Admin session cookie helper
│       ├── db.js               # LibSQL database connection client
│       ├── posts.js            # Post retrieval & database query helpers
│       └── spotify.js          # Spotify API OAuth token refresh & status fetcher
├── public/                     # Static assets
└── README.md
```

---

## 🔧 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18.17+)** installed on your system.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/preshdevops/preciouswrites.git
cd preciouswrites
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Admin Password
ADMIN_PASSWORD=your_secure_admin_password

# Turso DB Configuration (Optional - falls back to static data if omitted)
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token

# Spotify API Configuration (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

### 4. Running Locally
Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧪 Build & Lint

To build the production bundle:

```bash
npm run build
```

To run lint checks:

```bash
npm run lint
```

---

## 📄 License

Created by **Precious Olonade** &copy; 2026. All rights reserved.
