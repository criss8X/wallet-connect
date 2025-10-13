# GUÍA DE CODIFICACIÓN PARA AGENTES - wc-cli

Este documento describe las convenciones técnicas y comandos para la codificación asistida por agentes en el proyecto `wc-cli` (herramienta de línea de comandos).

## 1. Comandos de Construcción, Linting y Pruebas

Todos los comandos deben ejecutarse usando `pnpm` desde la raíz del proyecto o dentro de este directorio.

| Acción | Comando | Notas |
| :--- | :--- | :--- |
| **Construir** | `pnpm build` | Compila el CLI usando tsup. |
| **Desarrollo** | `pnpm dev` | Ejecuta el CLI directamente con tsx. |
| **Lint/Check** | `pnpm check` (desde la raíz) | Ejecuta Biome check para todo el monorepo. |
| **Formato/Arreglar** | `pnpm biome format --write .` (desde la raíz) | Formatea y corrige código automáticamente. |
| **Verificación de Tipos** | *No se encontró script de verificación de tipos.* | |
| **Ejecutar Pruebas** | *Pendiente de configuración* | Los archivos de prueba se encuentran en `wc-cli/tests/`. |

## 2. Estructura de Pruebas y Mocks

Para la organización de las pruebas unitarias y los datos de prueba:

*   **Archivos de Prueba:** Se encuentran en la carpeta `wc-cli/tests/`.
*   **Archivos Mock:** Se encuentran en la carpeta `wc-cli/src/mocks/`. Cada entidad (e.g., `package.json`, `tsconfig.json`) tiene su propio archivo mock dedicado para una mejor reutilización y claridad.

## 3. Guía de Estilo de Código

El proyecto utiliza **Biome** para linting y formato, configurado en la raíz.

*   **Formato:** Usar **tabulaciones** para la indentación.
*   **Comillas:** Usar **comillas dobles** para strings en JavaScript/TypeScript.
*   **Imports:** Los imports deben ser organizados automáticamente (`organizeImports: on`).
*   **Nombres:** Seguir convenciones estándar (PascalCase para componentes/tipos, camelCase para variables/funciones).
*   **Tipos:** Usar tipos explícitos de TypeScript siempre que sea posible.
*   **Manejo de Errores:** Seguir patrones idiomáticos encontrados en el código existente.

## 4. Dependencias del Agente

Para la implementación de la lógica del agente, se utilizarán las siguientes librerías:

*   **oda:** Para manejar el estado de carga y la visualización de spinners.
*   **colorette:** Para aplicar colores a la salida de la consola.

# AGENT CODING GUIDELINES

This document outlines the technical conventions and commands for agentic coding in this monorepo.

## 1. Build, Lint, and Test Commands

All commands should be run using `pnpm` from the project root.

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Build All** | `pnpm build:all` | Builds documentation and Storybook. |
| **Lint/Check** | `pnpm check` | Runs Biome check across the monorepo. |
| **Format/Fix** | `pnpm biome format --write .` | Automatically formats and fixes code. |
| **Type Check** | `pnpm app typecheck` | Runs TypeScript check for the `wc-app`. |
| **Run Tests** | *No explicit test script found.* | Assume no unit tests are configured. |

## 2. Code Style Guidelines

The project uses **Biome** for linting and formatting.

*   **Formatting:** Use **tabs** for indentation.
*   **Quotes:** Use **double quotes** for strings in JavaScript/TypeScript.
*   **Imports:** Imports must be automatically organized (`organizeImports: on`).
*   **Naming:** Follow standard TypeScript/JavaScript conventions (e.g., PascalCase for components/types, camelCase for variables/functions).
*   **Types:** Use explicit TypeScript types where possible.
*   **Error Handling:** Follow idiomatic patterns found in existing code.