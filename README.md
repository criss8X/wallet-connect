# Wallet Connect Monorepo

Este proyecto es un monorepo que agrupa varias aplicaciones y paquetes relacionados con la integración de Wallet Connect y componentes UI modernos. Utiliza `pnpm` para la gestión de dependencias y workspaces, permitiendo un desarrollo eficiente y modular.

## Estructura del Proyecto

```
wallet-connect/
│
├── apps/
│   ├── wc-doc/         # Documentación y sitio web principal (Astro)
│   └── wc-shadcn/      # App de componentes UI con Shadcn (React + Vite)
│
├── packages/
│   └── wcs-shadcn/     # Paquete de utilidades y CLI para Wallet Connect y Shadcn
│
├── biome.json          # Configuración de Biome (linter/formatter)
├── package.json        # Configuración raíz de pnpm workspace
├── pnpm-lock.yaml      # Lockfile de pnpm
├── pnpm-workspace.yaml # Configuración de workspaces
└── LICENSE             # Licencia del proyecto
```

### apps/wc-doc
- **Framework:** [Astro](https://astro.build/)
- **Propósito:** Documentación, guía de inicio y showcase de componentes.
- **Estructura:**
  - `src/components/`: Componentes Astro reutilizables.
  - `src/layouts/`: Layouts base para las páginas.
  - `src/pages/`: Páginas principales y secciones de UI.
  - `src/styles/`: Estilos globales.
  - `public/`: Recursos estáticos (favicon, imágenes, etc).

### apps/wc-shadcn
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Propósito:** Biblioteca de componentes UI reutilizables y demo.
- **Estructura:**
  - `src/components/`: Componentes UI (Button, Card, Avatar, etc).
  - `src/hooks/`: Hooks personalizados (useAccountActions).
  - `src/lib/`: Utilidades compartidas.
  - `src/sections/`: Proveedores y secciones de la app.
  - `src/stories/`: Historias para Storybook.
  - `src/styles/`: Estilos CSS.

### packages/wcs-shadcn
- **Propósito:** Paquete de utilidades, CLI y templates para Wallet Connect y Shadcn.
- **Estructura:**
  - `src/cli.ts`: CLI para generar componentes y utilidades.
  - `src/constants.ts`: Constantes globales.
  - `src/IO.ts`: Utilidades de entrada/salida.
  - `src/validations.ts`: Validaciones de datos.
  - `src/templates/`: Templates para generación de componentes y hooks.
  - `src/wallet-connect/`: Lógica de Wallet Connect.
  - `test_environment/`: Entorno de pruebas con proyectos de ejemplo.

## Instalación y Uso

1. **Instalar dependencias:**
   ```zsh
   pnpm install
   ```

2. **Levantar la documentación (Astro):**
   ```zsh
   pnpm --filter wc-doc dev
   ```

3. **Levantar la app de componentes (React/Vite):**
   ```zsh
   pnpm --filter wc-shadcn dev
   ```

4. **Usar el CLI de wcs-shadcn:**
   ```zsh
   pnpm --filter wcs-shadcn cli
   ```

## Tecnologías Principales
- **pnpm**: Gestión de monorepo y dependencias.
- **Astro**: Generación de sitios estáticos y documentación.
- **React + Vite**: Desarrollo de componentes UI modernos.
- **Shadcn UI**: Componentes UI accesibles y personalizables.
- **Biome**: Linter y formateador para TypeScript/JavaScript.

## Contribuir
1. Haz un fork del repositorio.
2. Crea una rama con tu feature/fix: `git checkout -b mi-feature`
3. Realiza tus cambios y haz commit.
4. Haz push y abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

**¡Gracias por contribuir y usar Wallet Connect Monorepo!**
