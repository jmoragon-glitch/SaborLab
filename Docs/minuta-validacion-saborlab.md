# Minuta de Validación – Sistema de Gestión Culinaria (SaborLab)
**Fecha:** 1 de noviembre de 2025  
**Modalidad:** Revisión asincrónica de encuesta respondida por la cliente  

## 1) Antecedentes
- El equipo envió una **encuesta de validación** de requerimientos. La cliente (profesora) respondió parcialmente, indicando que **no comprendió** varias preguntas por el uso de lenguaje técnico.
- El objetivo de esta sesión es **documentar hallazgos**, **ajustar el alcance** y **definir acciones** para la siguiente iteración.

## 2) Participantes
- **Cliente:** representante académico actuando como cliente no técnico.  
- **Equipo:** Estudiante desarrollador – Jaime Mora.

## 3) Insumo analizado
- Documento "Validación de Requerimientos del Sistema de Gestión Culinaria + encuesta" (respuesta parcial).  

## 4) Hallazgos clave
- **Lenguaje técnico no comprendido:** términos como *módulo*, *funcionalidad*, *requerimiento*, *exportación CSV* generaron confusión.
- **Modelo mental de la cliente:** visualiza SaborLab como **plataforma comunitaria** para compartir y consultar recetas (vecinos + público), no como un ERP culinario.
- **Dispositivos:** la cliente usaría **celular y computadora** con prioridad en **accesibilidad** (texto legible, alto contraste, navegación simple).

## 5) Decisiones
1. **Reformular la comunicación** a lenguaje natural, orientado a “lo que la persona puede hacer” en la página.  
2. **Ajustar el alcance** para reflejar el carácter **colaborativo** (usuarios pueden publicar, comentar y compartir recetas).  
3. **Priorización por valor de uso** (lectura/consulta, publicación sencilla, búsqueda) sobre funciones avanzadas (p. ej., exportaciones y menús semanales pasan a fase 2 si el tiempo es limitado).  

## 6) Ajustes al alcance (versión orientada a cliente)
### 6.1 Funciones **Prioridad Alta (Fase 1)**
- **Cuenta básica de usuario:** registrarse/iniciar sesión de forma simple (correo o social si el tiempo lo permite).  
- **Publicar recetas:** título, descripción corta, lista de ingredientes con cantidades, pasos (con soporte opcional de foto).  
- **Explorar y buscar:** ver recetas por más recientes y buscar por texto/ingredientes.  
- **Comentarios y calificación simple:** estrellas (1–5) y comentarios moderados.  
- **Accesibilidad y móvil primero:** tipografías legibles, contraste AA, navegación clara.

### 6.2 Funciones **Prioridad Media (Fase 2)**
- **Favoritos/guardadas.**  
- **Menú semanal** (seleccionar recetas por día) y **lista de compras** generada automáticamente.  
- **Exportar** lista/recetas a **PDF** (CSV queda como extra docente).

### 6.3 Funciones **Prioridad Baja / Futuras (Fase 3)**
- **Versiones derivadas** con atribución.  
- **Categorías/etiquetas avanzadas** (autocompletado, multietiqueta) y analítica de uso.

## 7) Requerimientos reformulados (lenguaje cliente)
### 7.1 Funcionales (extracto)
- **RF-01. Crear receta:** “Puedo guardar una receta con su nombre, descripción, ingredientes y pasos. Opcional: foto.”  
- **RF-02. Buscar por ingredientes:** “Puedo escribir uno o más ingredientes y ver recetas que los usan.”  
- **RF-03. Explorar recetas:** “Puedo ver recetas más nuevas y filtrarlas por tipo o dificultad.”  
- **RF-04. Comentar y valorar:** “Puedo dejar estrellas y comentarios; el autor puede moderar sus comentarios.”  
- **RF-05. Cuentas:** “Puedo registrarme e iniciar sesión para publicar o comentar.”  
- **RF-06. Accesibilidad:** “La página se lee bien en celular y compu, con botones grandes y buen contraste.”

### 7.2 No funcionales (extracto)
- **Usabilidad (RNF-U):** flujo claro, onboarding minimal, textos cortos.  
- **Rendimiento (RNF-R):** carga inicial ≤ 3 s en condiciones estándar.  
- **Compatibilidad (RNF-C):** navegadores modernos; diseño responsive.  
- **Seguridad (RNF-S):** validaciones básicas de entrada; protección de formularios.  
- **Mantenibilidad (RNF-M):** estructura modular y documentación breve.

## 8) Criterios de aceptación (muestras)
- **Crear receta:** dado que estoy autenticado, cuando lleno título, ingredientes y pasos y guardo, entonces la receta aparece en el listado con su imagen (si la adjunté).  
- **Buscar por ingrediente:** dado que escribo “tomate”, cuando busco, entonces veo recetas que contienen “tomate” en sus ingredientes.  
- **Accesibilidad:** usando un emulador móvil o un celular real, todos los textos tienen tamaño legible y el contraste supera AA.

## 9) Próximos pasos
1. **Entregar esta minuta** con anexos.  
2. **Compartir encuesta reformulada** (sin esperar respuesta inmediata; quedará lista para próxima iteración).  
3. **Actualizar el backlog**: priorizar Fase 1 para el entregable inmediato.  

---

## 📝 Nota sobre el proceso de validación
Durante el proceso de validación de requerimientos, la cliente manifestó dificultad para comprender algunos términos técnicos presentes en la encuesta original (por ejemplo: *módulo, funcionalidad, requerimiento, exportación CSV*).  
Este hallazgo permitió identificar una oportunidad de mejora en la comunicación entre el equipo desarrollador y el cliente no técnico.

A partir de esta retroalimentación, el equipo decidió:
- **Mantener el lenguaje técnico** en los documentos formales del proyecto (requerimientos funcionales, no funcionales, trazabilidad, etc.), dado que son de uso interno y académico.  
- **Reformular la comunicación con el cliente** utilizando lenguaje natural y ejemplos prácticos, para asegurar la comprensión de las funcionalidades sin requerir conocimientos técnicos.  
- **Diseñar una nueva versión de la encuesta** más intuitiva, enfocada en lo que el cliente puede “hacer” dentro del sistema, en lugar de cómo está implementado.

Este ajuste refuerza la empatía y claridad en el proceso de levantamiento de requerimientos, manteniendo al mismo tiempo la rigurosidad técnica en la documentación.

---

## Anexo A – Encuesta reformulada (lenguaje natural)
**Objetivo:** confirmar utilidad de funciones con lenguaje no técnico.  
**Instrucciones:** marque qué tan útil le parece cada opción (1 = poco útil, 5 = muy útil).

**A. ¿Qué cosas le gustaría poder hacer en la página? (marque 1–5)**  
- Ver recetas recientes y populares. 
- Buscar recetas escribiendo ingredientes que tengo. 
- Guardar una receta propia con foto. 
- Dejar estrellas y comentarios en recetas. 
- Guardar recetas como favoritas para verlas luego. 
- Armar un plan sencillo para la semana con recetas. 
- Descargar una receta o una lista de compras en PDF para imprimir.

**B. Uso y accesibilidad**  
- ¿Desde qué dispositivo la usaría más? (Celular / Computadora / Tablet)  
- ¿Qué tan importante es que los textos se lean fácil y tenga buen contraste? (Poco / Moderado / Muy)  
- ¿Le resultaría útil que los botones sean grandes y la navegación sea simple? (Sí / No)

**C. Comentarios**  
- ¿Qué idea o función extra le gustaría tener en el futuro? (respuesta abierta)

---

## Anexo B – Tabla de trazabilidad (propuesta)
| ID | Requerimiento (cliente) | Fase | Criterio de aceptación (resumen) |
|---|---|---|---|
| RF-01 | Publicar receta con foto | F1 | Guarda con éxito y aparece en el listado |
| RF-02 | Buscar por ingredientes | F1 | Coincidencias por texto/ingrediente |
| RF-03 | Explorar y filtrar | F1 | Ver recientes y filtrar por tipo |
| RF-04 | Comentar y valorar | F1 | Enviar estrellas y comentarios |
| RF-05 | Guardar favoritas | F2 | Marcar/Desmarcar y ver favoritas |
| RF-06 | Menú semanal | F2 | Asignar recetas a días |
| RF-07 | Lista de compras + PDF | F2 | Generar e imprimir |

---

## Anexo C – Consideraciones de diseño y accesibilidad
- Tipografía legible (≥16px base), contrastes AA, botones con tamaños tocables (≥44px).  
- Formularios con etiquetas visibles y mensajes de error claros.  
- Navegación consistente (header fijo, buscador visible, filtro accesible).  
- Pruebas rápidas con usuarios (2–3 personas) para validar comprensión de textos y flujo.
