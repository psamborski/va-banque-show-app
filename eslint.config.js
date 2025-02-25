import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] }, // Ignore the 'dist' folder
  {
    files: ['**/*.{js,jsx}'], // Apply to all JS and JSX files
    languageOptions: {
      ecmaVersion: 2022, // Latest ECMAScript version
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.node, // Add Node.js globals (if needed)
      },
      parserOptions: {
        ecmaVersion: 'latest', // Latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module', // Use ES modules
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    plugins: {
      react, // React plugin
      'react-hooks': reactHooks, // React Hooks plugin
      'react-refresh': reactRefresh, // React Refresh plugin
    },
    rules: {
      // Rules from recommended configurations
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Custom rules
      'react/jsx-no-target-blank': 'off', // Disable target="_blank" security check
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports
      ],

      // react import
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',

      // Code formatting and style
      'indent': ['error', 2], // Indentation: 2 spaces
      'quotes': ['error', 'single'], // Use single quotes
      'semi': ['error', 'never'], // No semicolons
      'comma-dangle': ['error', 'always-multiline'], // Add trailing commas in multiline objects/arrays
      'object-curly-spacing': ['error', 'always'], // Spaces inside curly braces
      'array-bracket-spacing': ['error', 'never'], // No spaces inside array brackets
      'arrow-parens': ['error', 'always'], // Always use parentheses in arrow functions
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }], // Max 2 empty lines (but only 1 at the end of the file)
      'no-trailing-spaces': 'error', // Remove trailing spaces
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // Avoid unnecessary curly braces
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never', // No space before / in self-closing tags
          beforeSelfClosing: 'always', // Space before /> in self-closing tags
          afterOpening: 'never', // No space after <
          beforeClosing: 'never', // No space before >
        },
      ],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line', // Multiline declarations in parentheses
          assignment: 'parens-new-line', // Multiline assignments in parentheses
          return: 'parens-new-line', // Multiline return in parentheses
          arrow: 'parens-new-line', // Multiline arrow functions in parentheses
          condition: 'parens-new-line', // Multiline conditions in parentheses
          logical: 'parens-new-line', // Multiline logical operators in parentheses
          prop: 'parens-new-line', // Multiline props in parentheses
        },
      ],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // Closing bracket aligned with the opening tag
      'react/jsx-indent': ['error', 2], // JSX indentation: 2 spaces
      'react/jsx-indent-props': ['error', 2], // Props indentation: 2 spaces
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }], // Max 1 prop per line in multiline tags
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'], // First prop on a new line for multiline tags
    },
  },
]