// import path from "node:path";
// import { bold, green, magenta, yellow } from "colorette";
// import ora from "ora";
// import { TSCONIFG_COMPILER_OPTS } from "@/schemas/tsconfigJson.js";
// import { installDepsStep } from "@/steps/installDeps.js";
// import { getPackageJson, getTsConfigJson } from "@/utils/packageManager.js";
// import { getFileAndValidate, pathJoinAndValidate } from "@/utils.js";

import { COMPONENTS_JSON_SCHEMA } from "@/schemas/components.schema.js";
import { PACKAGE_JSON_SCHEMA } from "@/schemas/package.schema.js";
import { TSCONIFG_JSON_SCHEMA } from "@/schemas/tsconfig.schema.js";
import { resolveFile, resolveFileAndValidate } from "@/utils.js";

// const DEPENDENCIES = ["axios", "react-query", "tailwind-merge"];
// const SHADCN_COMPONENTS = [
// 	"Accordion",
// 	"Alert",
// 	"Badge",
// 	"Calendar",
// 	"Separator",
// ];

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function checkEnvironment() {
// 	console.log(bold(magenta("--- 1. Revisando Entorno de Desarrollo ---")));
// 	const spinner = ora({
// 		spinner: "dots",
// 		text: "Verificando configuración de proyecto y dependencias base...",
// 	}).start();

// 	await delay(1500);
// 	spinner.succeed(green("✅ Entorno verificado correctamente."));
// 	console.log("\n");
// }

// async function installDependencies() {
// 	// console.log(bold(magenta("--- 2. Instalando Dependencias Necesarias ---")));
// 	// console.log(yellow("Dependencias a instalar:"));
// 	// DEPENDENCIES.forEach((dep) => console.log(`\t- ${dep}`));
// 	// console.log("\n");

// 	for (const dep of DEPENDENCIES) {
// 		const spinner = ora({
// 			text: `Instalando dependencia: ${dep}...`,
// 			spinner: "dots",
// 		}).start();

// 		await delay(1000);
// 		spinner.succeed(green(`✅ ${dep} instalado.`));
// 	}
// 	console.log(bold(green("\n🎉 Instalación de dependencias completada.")));
// 	console.log("\n");
// }

// async function installComponents() {
// 	console.log(bold(magenta("--- 3. Instalando Componentes Shadcn/UI ---")));
// 	console.log(yellow("Componentes Shadcn a instalar:"));
// 	SHADCN_COMPONENTS.forEach((comp) => console.log(`\t- ${comp}`));
// 	console.log("\n");

// 	for (const component of SHADCN_COMPONENTS) {
// 		const spinner = ora({
// 			text: `Instalando componente: ${component}...`,
// 			spinner: "dots",
// 		}).start();

// 		await delay(1000);
// 		spinner.succeed(green(`✅ ${component} instalado.`));
// 	}
// 	console.log(
// 		bold(green("\n🎉 Instalación de componentes Shadcn completada.")),
// 	);
// 	console.log("\n");
// }

// async function startSimulation() {
// 	console.log({
// 		// tsConfig: getTsConfigJson(),
// 		pk: getPackageJson(),
// 		ts: getTsConfigJson(),
// 	});
// 	// await checkEnvironment();
// 	// await installDependencies();
// 	// await installComponents();
// 	// console.log(bold(magenta("--- Proceso Finalizado ---")));
// }

// startSimulation();

// TEST step handler
