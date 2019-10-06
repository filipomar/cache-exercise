module.exports = {
	verbose: true,
	roots: [
		"<rootDir>"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)?$",
	moduleFileExtensions: [
		"ts",
		"js",
		"json",
		"node"
	],
	moduleNameMapper: {
	},
	collectCoverageFrom: [
		"<rootDir>/src/**/*.{ts}"
	],
	coverageThreshold: {
		"./src/": {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100,
		},
	}
}
