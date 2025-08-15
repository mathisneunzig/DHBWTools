import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.test.ts'],
  transform: {},
  transformIgnorePatterns: [
    '/node_modules/(?!marked)' 
  ],
};

export default config;