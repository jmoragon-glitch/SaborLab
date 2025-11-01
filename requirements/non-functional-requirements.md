# Requerimientos Funcionales – SaborLab

El sistema permitirá gestionar recetas culinarias, buscar platos según ingredientes y generar menús semanales con su presupuesto total.

---

### RF-01 – Crear receta
El sistema permitirá registrar una receta con nombre, descripción, tipo de plato, dificultad y presupuesto estimado.  
**Verificación:** la receta aparecerá en el listado con su ID.

### RF-02 – Ingredientes de receta
El sistema permitirá agregar ingredientes con cantidad y costo aproximado.  
**Verificación:** los ingredientes quedarán asociados a la receta.

### RF-03 – Pasos de preparación
El sistema permitirá registrar pasos numerados con texto y, opcionalmente, imágenes.  
**Verificación:** los pasos se visualizarán en orden.

### RF-04 – Lectura de recetas
El sistema permitirá listar recetas con paginación básica mostrando nombre, tipo y presupuesto.  
**Verificación:** el listado cargará 10 recetas por página.

### RF-05 – Edición de receta
El sistema permitirá editar los campos de una receta existente.  
**Verificación:** los cambios se reflejarán tras guardar.

### RF-06 – Eliminación de receta
El sistema permitirá eliminar recetas con confirmación previa.  
**Verificación:** la receta dejará de mostrarse.

### RF-07 – Búsqueda por ingredientes
El sistema permitirá buscar recetas ingresando uno o más ingredientes.  
**Verificación:** los resultados incluirán coincidencias parciales.

### RF-08 – Filtros de búsqueda
El sistema permitirá filtrar por tipo de plato, dificultad y presupuesto.  
**Verificación:** el listado se actualizará dinámicamente.

### RF-09 – Favoritos
El sistema permitirá marcar y desmarcar recetas como favoritas.  
**Verificación:** la receta aparecerá en la lista de favoritas.

### RF-10 – Menú semanal
El sistema permitirá construir un menú semanal seleccionando recetas por día.  
**Verificación:** el menú quedará almacenado y podrá consultarse.

### RF-11 – Lista de compras
El sistema permitirá generar una lista de compras consolidada a partir del menú.  
**Verificación:** la lista sumará cantidades y mostrará total estimado.

### RF-12 – Exportar lista
El sistema permitirá exportar la lista de compras en formato CSV o PDF.  
**Verificación:** se descargará un archivo válido.

### RF-13 – Categorías y etiquetas
El sistema permitirá crear, editar y eliminar categorías y etiquetas.  
**Verificación:** las categorías podrán asignarse y filtrar el listado.

### RF-14 – Calificaciones
El sistema permitirá registrar una calificación (1–5) por receta.  
**Verificación:** el promedio se actualizará tras cada calificación.

### RF-15 – Comentarios
El sistema permitirá publicar y eliminar comentarios en recetas.  
**Verificación:** los comentarios aparecerán bajo la receta con fecha.

### RF-16 – Versiones derivadas
El sistema permitirá crear versiones derivadas manteniendo la atribución a la original.  
**Verificación:** la versión mostrará referencia a la receta fuente.
