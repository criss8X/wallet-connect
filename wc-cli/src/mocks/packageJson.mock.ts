import type { PackageJson } from "@/schemas/packageJson.js";

const ALL_DEPS = {
	wagmi: "1.0.0",
	tailwindcss: "3.0.0",
	clsx: "2.0.0",
	"class-variance-authority": "0.7.0",
};

export const MOCK_PACKAGE_JSON_ALL_DEPS_INSTALLED: PackageJson = {
	dependencies: ALL_DEPS,
	devDependencies: {},
} as const;

const MISSING_WAGMI = {
	tailwindcss: "3.0.0",
	clsx: "2.0.0",
	"class-variance-authority": "0.7.0",
};

export const MOCK_PACKAGE_JSON_MISSING_ONE_DEP: PackageJson = {
	dependencies: MISSING_WAGMI,
	devDependencies: {},
} as const;

const MISSING_WAGMI_TAILWINDCSS = {
	clsx: "2.0.0",
	"class-variance-authority": "0.7.0",
};

export const MOCK_PACKAGE_JSON_MISSING_TWO_DEPS: PackageJson = {
	dependencies: MISSING_WAGMI_TAILWINDCSS,
	devDependencies: {},
} as const;

export const MOCK_PACKAGE_JSON_NO_DEPS_INSTALLED: PackageJson = {
	dependencies: {},
	devDependencies: {},
} as const;

export const MOCK_PACKAGE_JSON_MIXED_DEPS: PackageJson = {
	dependencies: {
		wagmi: "1.0.0",
		tailwindcss: "3.0.0",
	},
	devDependencies: {
		clsx: "2.0.0",
		"class-variance-authority": "0.7.0",
	},
} as const;

export const MOCK_PACKAGE_JSON_DEV_DEPS_ONLY: PackageJson = {
	dependencies: {},
	devDependencies: ALL_DEPS,
} as const;
