# SaborLab – Plataforma de Gestión Culinaria

**Autor:** Jaime Mora González  
**Curso:** Proyecto Integrador I  
**Profesor:** Verónica Isabel Mora Lezcano  
**Fecha:** 27/10/2025  

---

## Descripción general
**SaborLab** es una plataforma web que permitirá a los usuarios registrar, buscar y gestionar recetas culinarias de forma accesible y colaborativa.  
El sistema busca optimizar la planificación de comidas según presupuesto e ingredientes disponibles, promoviendo una comunidad digital de cocina.

---

## Convenciones de código
- Archivos y carpetas: `lowercase-kebab-case`  
- Variables y funciones: `camelCase`  
- Componentes Vue (si aplica): `PascalCase`  
- Archivos Markdown: inglés, extensión `.md`

---

## Estrategia de ramas y commits
- Rama principal: `main`  
- Rama de desarrollo: `dev`  
- Convención de commits:
  - `feat:` nueva funcionalidad  
  - `fix:` corrección de error  
  - `style:` formato o estilos  
  - `docs:` cambios en documentación  
  - `refactor:` reestructuración interna  
  - `chore:` tareas de mantenimiento  
  - `test:` pruebas o validación de código  
  - `build:` configuración o compilación  

**Ejemplo:**  
`feat: agregar búsqueda por ingredientes disponibles`

---

## Estructura del repositorio
```text
docs/
├── team-agreements.md
├── minuta-validacion-saborlab.md
requirements/
├── functional-requirements.md
└── non-functional-requirements.md
src/
├── css/
├── js/
├── assets/
└── views/
```

📄 Documentos de validación: [Minuta de validación con cliente](./docs/minuta-validacion-saborlab.md)

---

### Convenciones de nomenclatura y formato de código

**Archivos y carpetas**
- Todos los nombres en `kebab-case` (ej. `main-page.html`, `event-card.css`).
- Estructura general:
  ```
  /css/
  /js/
  /img/
  /docs/
  /requirements/
  ```

---

**HTML**
- Indentación de 2 espacios.  
- Atributos en minúsculas.  
- Uso de `alt` descriptivo en imágenes.  
- Clases CSS con `kebab-case` (`.main-header`, `.btn-primary`).  

**CSS**
- Variables o tokens de color en `:root`.  
- Comentarios con `/* descripción corta */`.  
- Un selector por línea, llaves alineadas.  

**JavaScript**
- Variables y funciones en `camelCase`.  
- Clases (si se usan) en `PascalCase`.  
- Constantes globales en `UPPER_SNAKE_CASE`.  
- Comentarios con `//` para inline y `/** */` para funciones.  

---

## Contacto
📧 **Jaime Mora** – jmoragon@ucenfotec.ac.cr  

---

Proyecto académico – *Avance 1, Proyecto integrador 1*  
> Este repositorio corresponde al avance del proyecto académico **SaborLab** dentro del curso *Proyecto Integrador I*, y tiene fines estrictamente educativos.