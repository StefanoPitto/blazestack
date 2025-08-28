# Fire Incident Mini-Portal

Un mini-portal para gestión de incidentes de incendios construido con React, Express y MongoDB, ahora con **TypeScript** y **arquitectura modular**.

## 🚀 Características

- **Frontend**: React + Vite + TypeScript con Material UI
- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Validaciones**: React Hook Form + Yup
- **Subida de archivos**: Multer para imágenes
- **Monorepo**: NPM Workspaces para gestión centralizada
- **TypeScript**: Tipado estático completo
- **Arquitectura Modular**: Separación clara de responsabilidades

## 📋 Funcionalidades

### Crear Incidentes
- Título (requerido)
- Descripción (opcional)
- Tipo de incidente (Fire, Explosion, Chemical Spill)
- Ubicación (opcional)
- Imagen (opcional, máximo 5MB)

### Listar Incidentes
- Vista en tarjetas con Material UI
- Orden cronológico inverso
- Thumbnails de imágenes
- Iconos por tipo de incidente

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite
- Material UI
- React Hook Form
- Yup (validaciones)
- Axios

### Backend
- Node.js + TypeScript
- Express
- MongoDB + Mongoose
- Multer (subida de archivos)
- CORS, Helmet, Rate Limiting

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- npm

### 1. Clonar y instalar dependencias
```bash
git clone <repository-url>
cd fire-incident-mini-portal
npm install
```

### 2. Configurar variables de entorno
```bash
# En apps/server/
cp env.example .env
```

Editar `apps/server/.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/fire-incidents
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Iniciar MongoDB
```bash
# Si tienes MongoDB local
mongod

# O usar MongoDB Atlas (cambiar URI en .env)
```

### 4. Ejecutar el proyecto

#### Opción A: Ejecutar ambos servicios (recomendado)
```bash
./start-dev.sh
```

#### Opción B: Ejecutar por separado
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:web
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health
- **API Endpoints**:
  - `GET /api/incidents` - Listar incidentes
  - `POST /api/incidents` - Crear incidente
  - `GET /api/incidents/:id` - Obtener incidente por ID
  - `PUT /api/incidents/:id` - Actualizar incidente
  - `DELETE /api/incidents/:id` - Eliminar incidente

## 📁 Estructura del Proyecto

```
fire-incident-mini-portal/
├── package.json              # Root con workspaces
├── apps/
│   ├── web/                  # Frontend React + TypeScript
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/       # Componentes reutilizables
│   │   │   │   ├── forms/    # Formularios
│   │   │   │   └── layout/   # Componentes de layout
│   │   │   ├── hooks/        # Custom hooks
│   │   │   ├── services/     # Servicios API
│   │   │   ├── types/        # Definiciones TypeScript
│   │   │   ├── utils/        # Utilidades
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── server/               # Backend Express + TypeScript
│       ├── src/
│       │   ├── config/       # Configuraciones
│       │   ├── controllers/  # Controladores
│       │   ├── middleware/   # Middlewares
│       │   ├── models/       # Modelos Mongoose
│       │   ├── routes/       # Rutas
│       │   ├── types/        # Tipos TypeScript
│       │   ├── utils/        # Utilidades
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── nodemon.json
└── README.md
```

## 🔧 Scripts Disponibles

### Root
- `npm run dev` - Ejecutar frontend y backend simultáneamente
- `npm run dev:web` - Solo frontend
- `npm run dev:server` - Solo backend
- `npm run build` - Build de ambos proyectos
- `npm run type-check` - Verificación de tipos TypeScript
- `npm run lint` - Linting con ESLint
- `npm run lint:fix` - Auto-fix de linting

### Frontend (apps/web)
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run type-check` - Verificación de tipos

### Backend (apps/server)
- `npm run dev` - Servidor con nodemon
- `npm run build` - Compilar TypeScript
- `npm run start` - Servidor de producción
- `npm run type-check` - Verificación de tipos

## 📝 API Documentation

### POST /api/incidents
Crea un nuevo incidente.

**Content-Type**: `multipart/form-data`

**Campos**:
- `title` (string, requerido) - Título del incidente
- `description` (string, opcional) - Descripción
- `incident_type` (string, requerido) - Tipo: "Fire", "Explosion", "Chemical Spill"
- `location` (string, opcional) - Ubicación
- `image` (file, opcional) - Imagen (máx 5MB, jpg/png/gif)

**Respuesta**:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Incendio en almacén",
    "description": "Descripción del incidente",
    "incident_type": "Fire",
    "location": "Almacén Central",
    "image": "/uploads/image-1234567890.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Incident created successfully"
}
```

### GET /api/incidents
Lista todos los incidentes ordenados por fecha de creación (más recientes primero).

**Respuesta**:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Incendio en almacén",
      "incident_type": "Fire",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "image": "/uploads/image-1234567890.jpg"
    }
  ]
}
```

## 🎨 Características de la UI

- **Tema personalizado**: Colores rojo/naranja para incidentes
- **Responsive**: Adaptable a móviles y tablets
- **Iconos**: Diferentes iconos por tipo de incidente
- **Validaciones en tiempo real**: Feedback inmediato al usuario
- **Estados de carga**: Indicadores visuales durante operaciones
- **Componentes modulares**: Reutilizables y mantenibles

## 🔒 Validaciones

### Frontend (Yup + TypeScript)
- Título: mínimo 3 caracteres, requerido
- Tipo de incidente: requerido, valores específicos
- Imagen: máximo 5MB, solo formatos de imagen
- Descripción y ubicación: opcionales
- Tipado estático completo

### Backend (TypeScript + Mongoose)
- Validación de campos requeridos
- Validación de tipo de incidente
- Validación de archivos (tamaño y tipo)
- Manejo de errores con respuestas apropiadas
- Tipado estático completo

## 🏗️ Arquitectura

### Frontend
- **Componentes UI**: Reutilizables y tipados
- **Hooks personalizados**: Lógica de estado reutilizable
- **Servicios API**: Cliente HTTP tipado
- **Utilidades**: Funciones helper tipadas
- **Tipos**: Definiciones TypeScript centralizadas

### Backend
- **Controladores**: Lógica de negocio
- **Modelos**: Esquemas Mongoose tipados
- **Rutas**: Definición de endpoints
- **Middleware**: Validación, autenticación, etc.
- **Configuración**: Variables de entorno tipadas

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
```bash
cd apps/web
npm run build
# Subir carpeta dist/
```

### Backend (Heroku/Railway)
```bash
cd apps/server
npm run build
# Configurar variables de entorno
# Subir código
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
