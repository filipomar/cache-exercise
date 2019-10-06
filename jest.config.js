module.exports = {
	verbose: true,
	roots: [
		"<rootDir>"
	],
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
	moduleFileExtensions: [
		"ts",
		"js",
		"json",
		"node"
	],
	moduleNameMapper: {
	},
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts"
	],
	coverageThreshold: {
		"./src/application": {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100,
		},
		"./src/infrastructure": {
			statements: 10,
			branches: 15,
			lines: 10,
			functions: 15,
		},
		"./src/model": {
			statements: 0,
			branches: 0,
			lines: 0,
			functions: 0,
		},
	}
}
