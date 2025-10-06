<h2 style="text-align: center;">Wallet Connect</h2>

<p align="center">
  <img alt="Wallet Connect Screenshots" src="https://github.com/user-attachments/assets/f9a31de5-43a9-4f2a-a25b-b5a52ca63c5a" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Shadcn_UI-18181B?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
  <img src="https://img.shields.io/badge/Wagmi-181717?style=for-the-badge&logo=ethereum&logoColor=white" alt="Wagmi" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
</p>

---

**Wallet Connect** is a plug-and-play component that simplifies the integration of **cryptocurrency wallet connections** into projects, while giving **developers** the ability to **customize** it.

---

### 🧭 Before You Begin

This component was built for React-TS and based on **shadcn**, so it depends on **shadcn** to function.
My goal is to adapt it to other ecosystems in the future, always prioritizing **customizability**.

#### ⚙️ Technologies Used

1. **Wagmi & Viem** — Handle crypto wallet connections.
2. **Shadcn** — Modern UI components.
3. **Lucide React** — Icon library.

---

### 📂 Project Structure

```
wallet-connect/
│
├── apps/
│   ├── wc-doc/         # Documentation and main website (Astro)
│   └── wc-shadcn/      # UI components app with Shadcn (React + Vite + Storybook)
│
├── packages/
│   └── wcs-shadcn/     # Utilities and CLI package for Wallet Connect and Shadcn (in development)
│
├── biome.json          # Biome configuration (linter/formatter)
├── package.json        # Root pnpm workspace configuration
├── pnpm-lock.yaml      # pnpm lockfile
├── pnpm-workspace.yaml # Workspace configuration
└── LICENSE             # Project license
```

---

### 🧱 apps/wc-doc

* **Framework:** [Astro](https://astro.build/)
* **Purpose:** Documentation and getting started guide.
* **Structure:**

  * `src/components/` – Reusable Astro components
  * `src/layouts/` – Base layouts for pages
  * `src/pages/` – Main pages and UI sections
  * `src/styles/` – Global styles
  * `src/lib/` – Shared utilities

---

### 🪄 apps/wc-shadcn

* **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [Storybook](https://storybook.js.org/)
* **Purpose:** Component development and preview.
* **Structure:**

  * `src/components/` – UI components (Button, Card, Avatar, etc.)
  * `src/lib/` – Shared utilities
  * `src/sections/` – Providers and app sections
  * `src/stories/` – Storybook stories
  * `src/styles/` – CSS styles

---

### 📦 packages/wcs-shadcn

* **Purpose:** Utilities, CLI, and templates package for Wallet Connect and Shadcn.

> ⚠️ This package is currently under development.

---

## 🚀 Installation and Usage

1. **Install dependencies**

   ```zsh
   pnpm install
   ```

2. **Run the documentation site (Astro)**

   ```zsh
   pnpm --filter wc-doc dev
   ```

3. **Run the components app (React/Vite)**

   ```zsh
   pnpm --filter wc-app dev
   ```

---

## 🧩 Main Technologies

* **pnpm** — Monorepo and dependency management
* **Astro** — Static site generation and documentation
* **React + Vite + Storybook** — Modern UI component development and preview
* **Shadcn UI** — Accessible and customizable UI components
* **Biome** — Linter and formatter for TypeScript/JavaScript

---

## 🤝 Contributing

Contribution guidelines are not yet defined, but if you’d like to contribute, you’re welcome to do so!

---

## 📜 License

This project is licensed under the **MIT License**.
See the [`LICENSE`](./LICENSE) file for more details.

---