# 🍽️ SaborLab -- Plataforma de Gestión Culinaria

**Proyecto Integrador -- Universidad Cenfotec**  
**Autor:** Jaime Mora González  
**Profesor:** Verónica Isabel Mora Lezcano  
**Fecha:** 01/12/2025  

---

## 🎯 1. Descripción del proyecto

SaborLab es una plataforma digital colaborativa para la gestión y descubrimiento de recetas culinarias.  
Permite a los usuarios crear, consultar y administrar recetas según presupuesto, dificultad, categoría e ingredientes disponibles.

El sistema implementa autenticación por roles (**chef** y **usuario regular**) y operaciones CRUD esenciales sobre recetas, incluyendo creación, lectura filtrada, vista detallada y eliminación (solo para chefs).

---

## 🏗️ 2. Arquitectura del sistema

### 🔹 Frontend (HTML + CSS + JS + Bootstrap local)

- Vistas estáticas accesibles (WCAG AA)
- Validación en formularios
- Navbar dinámico según rol
- Toasts accesibles
- Skip links, ARIA roles y estructura semántica

### 🔹 Backend (Node.js + Express)

- API REST estructurada  
- Validaciones de servidor  
- Control básico de roles  
- Manejo de sesiones vía frontend (localStorage)

### 🔹 Base de datos (MongoDB Atlas + Mongoose)

- Modelo Receta (ingredientes, pasos, categorías, presupuesto)
- Modelo Usuario (email, contraseña hasheada, rol)
- IDs relacionales

---

## 📦 3. Dependencias principales (backend)

```
express  
mongoose  
cors  
dotenv  
nodemon (dev)
```

---

## ⚙️ 4. Instalación

### 1) Clonar el repositorio

```bash
git clone <url-del-repo>
```

### 2) Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3) Crear archivo `.env`

En **/backend/.env**:

```
MONGODB_URI=mongodb+srv://jaime_mora_g:Pollo2025!@cluster0.qqcnqnj.mongodb.net/saborlab_db?appName=Cluster0
PORT=3000
```

> ⚠️ Importante: este archivo **NO se sube** al repositorio.

---

## ▶️ 5. Ejecutar el proyecto

### Iniciar backend

```bash
cd backend
npm run dev
```

### Ejecutar frontend

Abrir manualmente:

```
/frontend/index.html
```

---

## ⭐ 6. Funcionalidades actuales (MVP Final)

### ✔ Usuarios

- Registro (roles: regular y chef)
- Inicio de sesión
- Manejo de sesión con `localStorage`
- Navbar dinámico según rol
- Restricción de funciones según rol

### ✔ Recetas

- Crear receta (solo chef)
- Listar recetas
- Filtrar por categoría
- Filtrar por ingrediente (case-insensitive)
- Ver detalle
- Eliminar receta (solo chef)
- Validaciones de formulario
- Accesibilidad en vistas

---

## 👤 7. Roles del sistema

### 👨‍🍳 Chef

- Crear recetas  
- Eliminar recetas  
- Ver y buscar recetas  

### 🧑‍🍽️ Usuario regular

- Ver recetas  
- Buscar recetas  

---

## 📡 8. API -- Endpoints principales

### Usuarios

```
POST /api/usuarios
POST /api/usuarios/login
```

### Recetas

```
GET    /api/recetas
GET    /api/recetas/:id
POST   /api/recetas
DELETE /api/recetas/:id
```

---

## 🧱 9. Estructura del proyecto

```
/backend
 ├── models/
 ├── routes/
 ├── index.js
 ├── package.json
 └── .env  (ignorado)

/frontend
 ├── bootstrap/
 ├── css/
 ├── js/
 ├── index.html
 ├── recetas.html
 ├── crear-receta.html
 ├── login.html
 └── views/
      └── receta-detalle.html
```

---

## 📝 10. Convenciones de commits

| Tipo             | Uso                               |
|------------------|-----------------------------------|
| `feat:`          | Nuevas funcionalidades            |
| `fix:`           | Correcciones                       |
| `style:`         | Formato, espacios, comillas        |
| `docs:`          | Documentación                      |
| `refactor:`      | Reorganización del código          |
| `chore:`         | Configuración del proyecto         |
| `accessibility:` | Mejoras de accesibilidad           |

Ejemplo:

```
feat(recipes): add delete recipe confirmation modal
```

---

## 🚀 11. Trabajo futuro

- Sistema de comentarios y calificaciones  
- Versiones derivadas de recetas  
- Favoritos y colecciones personales  
- Panel de administración  
- Ranking de recetas y seguidores  
- Planificador semanal + lista de compras  
- Subida de imágenes y videos  
- Etiquetas avanzadas y más filtros  

---

## 🟢 Estado final del proyecto

La versión actual de **SaborLab** cumple con todos los requerimientos establecidos para el trabajo:  
CRUD completo de recetas, validaciones en frontend y backend, gestión de sesión por roles (chef y usuario regular), accesibilidad nivel AA, navegación por teclado, uso de Bootstrap local, API REST funcional y diseño responsivo.  

La plataforma se encuentra estable, probada y lista para su presentación formal.