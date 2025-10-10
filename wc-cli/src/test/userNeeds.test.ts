import {
	MOCK_PACKAGE_JSON_ALL_DEPS_INSTALLED,
	MOCK_PACKAGE_JSON_DEV_DEPS_ONLY,
	MOCK_PACKAGE_JSON_MIXED_DEPS,
	MOCK_PACKAGE_JSON_NO_DEPS_INSTALLED,
	MOCK_PACKAGE_JSON_MISSING_ONE_DEP,
	MOCK_PACKAGE_JSON_MISSING_TWO_DEPS,
} from "@mock/packageJson.mock.js";
import {
	MOCK_COMPONENTS_JSON_ALL_ALIASES,
	MOCK_COMPONENTS_JSON_NO_ALIASES,
} from "@mock/componentsJson.mock.js";
import {
	MOCK_TSCONFIG_JSON_MISSING_PATHS,
	MOCK_TSCONFIG_JSON_ALL_PATHS,
} from "@mock/tsconfigJson.mock.js";
import { assert } from "@test/utils.test.js";
import {
	NeededDependencies,
	whatsDepsUserNeeds,
} from "@/utils/whatsUserNeeds.js";

export function whatsDepsUserNeedsTest() {
	const EXPECTED_NO_INSTALLED = Object.values(NeededDependencies);
	const EXPECTED_ALL_INSTALLED: string[] = [];

	const noInstalled = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_NO_DEPS_INSTALLED);
	assert(
		JSON.stringify(noInstalled) === JSON.stringify(EXPECTED_NO_INSTALLED),
		"NO_DEPS_INSTALLED: Should return all dependencies",
	);

	const allInstalled = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_ALL_DEPS_INSTALLED);
	assert(
		JSON.stringify(allInstalled) === JSON.stringify(EXPECTED_ALL_INSTALLED),
		"ALL_DEPS_INSTALLED: Should return no dependencies",
	);

	const mixedDeps = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_MIXED_DEPS);
	assert(
		JSON.stringify(mixedDeps) === JSON.stringify(EXPECTED_ALL_INSTALLED),
		"MIXED_DEPS: Should return no dependencies (all are present)",
	);

	const devDepsOnly = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_DEV_DEPS_ONLY);
	assert(
		JSON.stringify(devDepsOnly) === JSON.stringify(EXPECTED_ALL_INSTALLED),
		"DEV_DEPS_ONLY: Should return no dependencies (all are present in devDeps)",
	);

	const EXPECTED_MISSING_ONE_DEP = [NeededDependencies.WAGMI];
	const missingOneDep = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_MISSING_ONE_DEP);
	assert(
		JSON.stringify(missingOneDep) === JSON.stringify(EXPECTED_MISSING_ONE_DEP),
		"MISSING_ONE_DEP: Should return only wagmi",
	);

	const EXPECTED_MISSING_TWO_DEPS = [
		NeededDependencies.WAGMI,
		NeededDependencies.TAILWINDCSS,
	];
	const missingTwoDeps = whatsDepsUserNeeds(MOCK_PACKAGE_JSON_MISSING_TWO_DEPS);
	assert(
		JSON.stringify(missingTwoDeps) ===
			JSON.stringify(EXPECTED_MISSING_TWO_DEPS),
		"MISSING_TWO_DEPS: Should return wagmi and tailwindcss",
	);
}
