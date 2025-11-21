# AI Blog - Frontend

Plataforma de blogging con generación de contenido usando IA.

## 🚀 Características

- **Autenticación JWT**: Registro e inicio de sesión seguro
- **Generación con IA**: Crea artículos completos con Gemini AI
- **Feed Público**: Ve todos los artículos generados por la comunidad
- **Diseño Moderno**: UI oscura inspirada en iOS con Tailwind CSS

## 🛠️ Tecnologías

- **React** + **Vite** - Framework y build tool
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - Estilos
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción (genera carpeta docs/ para GitHub Pages)
npm run build

# Preview del build
npm run preview
```

## 🌐 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse en GitHub Pages usando la carpeta `docs/`:

1. Ejecuta `npm run build` para generar los archivos en `/docs`
2. Haz commit y push de la carpeta `docs/`
3. En GitHub, ve a Settings > Pages
4. Selecciona la rama `main` y carpeta `/docs` como fuente
5. Tu sitio estará disponible en `https://[tu-usuario].github.io/[repo-name]/`

## 🔗 API Backend

El frontend se conecta a: `https://ai-blog-rw4v.onrender.com`

### Endpoints disponibles:

- `POST /register` - Registrar usuario
- `POST /token` - Login (devuelve JWT)
- `GET /posts` - Obtener todos los posts (público)
- `POST /generate-post` - Generar post con IA (requiere autenticación)

## 📝 Usuario de Prueba

Para probar la aplicación, puedes crear un usuario o usar:
- Email: (crear tu propio usuario)
- Password: (crear tu propia contraseña)

## 🎨 Estructura del Proyecto

```
/
├── components/
│   ├── Login.tsx          # Componente de inicio de sesión
│   ├── Register.tsx       # Componente de registro
│   ├── Dashboard.tsx      # Generador de posts con IA
│   └── PublicFeed.tsx     # Feed público de artículos
├── styles/
│   └── globals.css        # Estilos globales y tema
├── App.tsx                # Componente principal
├── main.tsx              # Entry point
└── vite.config.ts        # Configuración de Vite

```

## 📄 Licencia

Proyecto académico - Full-Stack AI Blog
