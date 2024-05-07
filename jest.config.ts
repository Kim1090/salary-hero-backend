import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  coverageReporters: ["text", "text-summary"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
};

export default config;
