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
