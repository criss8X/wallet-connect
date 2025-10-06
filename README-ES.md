<h2 style="text-align: center;">Wallet Connect</h2>

<p align="center">
  <img alt="Wallet Connect Screenshots" src="https://github.com/user-attachments/assets/f9a31de5-43a9-4f2a-a25b-b5a52ca63c5a" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/Shadcn_UI-18181B?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
  <img src="https://img.shields.io/badge/Wagmi-181717?style=for-the-badge&logo=ethereum&logoColor=white" alt="Wagmi" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
</p>

---

**Wallet Connect** es un componente de copia y pega que facilita la integración de **connexión de billteras** de criptomonedas en los proyectos, y dándole capacidad de **personalización** a los **desarolladores**.

---

### 🧭 Antes de comenzar
Este componente fue creado para React-Ts y basado en **shadcn**, por lo que depende de **shadcn** para su funcionamiento. Como objetivo tengo propuesto adaptarlo a otros ecosistema, pero siempre priorizando la **capacidad de personalización**.

##### ⚙️ Que tecnologías usa el componente?
1. **Wagmi & Viem**: Manejar las conexiones a la billetera crypto.
2. **Shadcn**: Componentes de UI.
3. **Lucide React**: Librería de iconos.

---

### 📂 Estructura del Proyecto
```
wallet-connect/
│
├── apps/
│   ├── wc-doc/         # Documentación y sitio web principal (Astro)
│   └── wc-shadcn/      # App de componentes UI con Shadcn (React + Vite + Storybook)
│
├── packages/
│   └── wcs-shadcn/     # Paquete de utilidades y CLI para Wallet Connect y Shadcn (en desarrollo)
│
├── biome.json          # Configuración de Biome (linter/formatter)
├── package.json        # Configuración raíz de pnpm workspace
├── pnpm-lock.yaml      # Lockfile de pnpm
├── pnpm-workspace.yaml # Configuración de workspaces
└── LICENSE             # Licencia del proyecto
```

---

### 🧱 apps/wc-doc
- **Framework:** [Astro](https://astro.build/)
- **Propósito:** Documentación, guía de inicio.
- **Estructura Principal:**
  - `src/components/`: Componentes Astro reutilizables.
  - `src/layouts/`: Layouts base para las páginas.
  - `src/pages/`: Páginas principales y secciones de UI.
  - `src/styles/`: Estilos globales.
  - `src/lib/`: Utilidades compartidas.

---

### 🪄 apps/wc-shadcn
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [Storybook](https://storybook.js.org/)
- **Propósito:** Componentes y Previsualización.
- **Estructura:**
  - `src/components/`: Componentes UI (Button, Card, Avatar, etc).
  - `src/lib/`: Utilidades compartidas.
  - `src/sections/`: Proveedores y secciones de la app.
  - `src/stories/`: Historias para Storybook.
  - `src/styles/`: Estilos CSS.

---

### 📦 packages/wcs-shadcn
- **Propósito:** Paquete de utilidades, CLI y templates para Wallet Connect y Shadcn.

> ⚠️ Este paquete está en proceso de desarollo.

---

## 🚀 Instalación y Uso

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

---

## 🧩 Tecnologías Principales
- **pnpm**: Gestión de monorepo y dependencias.
- **Astro**: Generación de sitios estáticos y documentación.
- **React + Vite + Storybook**: Desarrollo de componentes UI modernos y previsualización.
- **Shadcn UI**: Componentes UI accesibles y personalizables.
- **Biome**: Linter y formateador para TypeScript/JavaScript.

---

## 🤝 Contribuir
De momento no tengo definido como se harán las contribuciones pero si deseas contribuir puedes hacerlo.

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.

---