# GUÍA DE CODIFICACIÓN PARA AGENTES - wc-doc

Este documento describe las convenciones técnicas y comandos para la codificación asistida por agentes en el proyecto `wc-doc` (documentación).

## 1. Comandos de Construcción, Linting y Pruebas

Todos los comandos deben ejecutarse usando `pnpm` desde la raíz del proyecto o dentro de este directorio.

| Acción | Comando | Notas |
| :--- | :--- | :--- |
| **Construir** | `pnpm build` | Construye el sitio web estático de Astro. |
| **Lint/Check** | `pnpm check` (desde la raíz) | Ejecuta Biome check para todo el monorepo. |
| **Formato/Arreglar** | `pnpm biome format --write .` (desde la raíz) | Formatea y corrige código automáticamente. |
| **Verificación de Tipos** | *No se encontró script de verificación de tipos.* | |
| **Ejecutar Pruebas** | *No se encontró script de prueba explícito.* | Asumir que no hay pruebas unitarias configuradas. |

## 2. Guía de Estilo de Código

El proyecto utiliza **Biome** para linting y formato, configurado en la raíz.

*   **Formato:** Usar **tabulaciones** para la indentación.
*   **Comillas:** Usar **comillas dobles** para strings en JavaScript/TypeScript.
*   **Imports:** Los imports deben ser organizados automáticamente (`organizeImports: on`).
*   **Nombres:** Seguir convenciones estándar (PascalCase para componentes/tipos, camelCase para variables/funciones).
*   **Tipos:** Usar tipos explícitos de TypeScript siempre que sea posible.
*   **Manejo de Errores:** Seguir patrones idiomáticos encontrados en el código existente.
