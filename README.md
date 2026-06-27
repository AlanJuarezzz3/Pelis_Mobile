# 🎬 Pelis Mobile — Netflix UI Clone

Monorepo con dos proyectos complementarios que replican la experiencia de Netflix, tanto en mobile como en web.

## 📱 netflix_ui — Flutter (Mobile)

App mobile para Android desarrollada con Flutter que consume la API de TMDB en tiempo real.

### Funcionalidades
- 🏠 Home con banner destacado y filas de películas por categoría
- 🔍 Búsqueda en tiempo real contra la API
- ⭐ Sistema de Mi Lista con estado global (Provider)
- 🎬 Pantalla de detalle con sinopsis y rating
- 💀 Skeleton loading con efecto Shimmer
- 📱 Optimizada para dispositivo físico Android

### Stack
- Flutter / Dart
- Provider (gestión de estado)
- HTTP (consumo de API REST)
- Cached Network Image
- TMDB API

---

## 🌐 netflix-dashboard — Next.js (Web)

Dashboard web que replica la experiencia Netflix en el navegador, consumiendo la misma API.

### Funcionalidades
- 🏠 Home con hero banner y filas horizontales por categoría
- 🔍 Búsqueda con filtros por género en tiempo real
- 🎬 Página de detalle con póster, sinopsis y rating
- 🔖 Mi Lista persistida en localStorage
- 📱 Diseño responsive

### Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- TMDB API

---

## 🚀 Cómo correr los proyectos

### Mobile (Flutter)
```bash
cd netflix_ui
flutter pub get
flutter run
```

### Web (Next.js)
```bash
cd netflix-dashboard
npm install
npm run dev
```
Abrí http://localhost:3000

---

## 🔑 Variables de entorno

Para el proyecto web, creá un archivo `.env.local` dentro de `netflix-dashboard/`:

```
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key
NEXT_PUBLIC_TMDB_TOKEN=tu_token
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
NEXT_PUBLIC_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
```

Obtené tu API key gratis en [themoviedb.org](https://www.themoviedb.org/settings/api)

---

## 📁 Estructura del monorepo

```
Pelis_Mobile/
├── netflix_ui/          # Flutter — App Mobile Android
│   ├── lib/
│   │   ├── config/      # Constantes y configuración
│   │   ├── models/      # Modelos de datos
│   │   ├── services/    # Llamadas a la API
│   │   ├── providers/   # Estado global
│   │   ├── screens/     # Pantallas
│   │   └── widgets/     # Componentes reutilizables
│   └── pubspec.yaml
│
└── netflix-dashboard/   # Next.js — Dashboard Web
    └── src/
        ├── app/         # Rutas (App Router)
        ├── components/  # Componentes React
        ├── services/    # Llamadas a la API
        └── types/       # Tipos TypeScript
```

---

## 👨‍💻 Autor

**Alan Juarez** — Desarrollador Frontend
[GitHub](https://github.com/AlanJuarezzz3)
