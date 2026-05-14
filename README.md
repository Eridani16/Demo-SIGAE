Diseno e implementacion de un sistema de informacion academico inteligente para instituciones educativas publicas con limitaciones tecnologicas, particularmente en el municipio de Planeta Rica, Cordoba.
SIGAE - Sistema Inteligente de Gestion Academica Escolar

## Publicacion en GitHub Pages

Este repositorio queda listo para desplegarse automaticamente en GitHub Pages con cada `push` a la rama `main`.

URL esperada:

`https://eridani16.github.io/Demo-SIGAE/`

Pasos para activarlo en GitHub:

1. Entra al repositorio en GitHub.
2. Ve a `Settings` > `Pages`.
3. En `Source`, selecciona `GitHub Actions`.
4. Haz `push` de estos cambios a `main`.

Como la app usa `hash routing` (`#/ruta`), GitHub Pages puede servirla sin configuracion adicional de rutas.

## Volcado de datos demo

Se agrego un volcado de datos de ejemplo en `data/firestore-dump.demo.json` con colecciones coherentes para pruebas de la interfaz:

- `students`
- `teachers`
- `grades`
- `attendance`
- `alerts`
- `survey_responses`
- `access_logs`

Los campos `createdAt` se dejaron en formato ISO 8601 para facilitar importacion manual, transformacion a `Timestamp` o uso como dataset de referencia.
