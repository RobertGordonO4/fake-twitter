module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json', // Points to your main tsconfig for type-aware linting
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'], // 'prettier' plugin to run Prettier as an ESLint rule
  extends: [
    'plugin:@typescript-eslint/recommended', // Recommended TypeScript rules
    'plugin:prettier/recommended', // Integrates Prettier, disables ESLint rules that conflict with Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/'], // Files/folders to ignore
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // Can be 'warn' or 'error' if you prefer strict return types
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Similar to above, for exported functions/methods
    '@typescript-eslint/no-explicit-any': 'warn', // Warns about 'any' type, consider 'error' for stricter projects
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warn on unused vars, ignore if prefixed with _
    'prettier/prettier': ['error', {
      // Prettier options from .prettierrc.js will be used here
      // but you can override or specify them directly if needed.
      // For example:
      // "semi": false,
      // "singleQuote": true
    }],
    // Add any other custom ESLint rules here
  },
};