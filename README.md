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

## 🔗 API Backend

El frontend se conecta a: `https://ai-blog-rw4v.onrender.com`

### Endpoints disponibles:

- `POST /register` - Registrar usuario
- `POST /token` - Login (devuelve JWT)
- `GET /posts` - Obtener todos los posts (público)
- `POST /generate-post` - Generar post con IA (requiere autenticación)

## 📝 Usuario de Prueba

Para probar la aplicación, puedes registrar un nuevo usuario o usar una cuenta ya existente:
- Email: (crear tu propio usuario o usar : hola@gmail.com)
- Password: (crear tu propia contraseña o usar: 1234567)

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
