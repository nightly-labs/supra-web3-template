import pluginJs from '@eslint/js'
import pluginImport from 'eslint-plugin-import' // Dodaj ten plugin
import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      noInlineConfig: false
    }
  },
  {
    ignores: [
      '**/.prettierrc.js',
      '**/.eslintignore',
      '**/node_modules/**',
      '**/.storybook/**',
      '**/out/',
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/build/**/*',
      '**/custom.d.ts',
      '**/vitest.config.ts',
      '**/global.d.ts',
      '**/uno.config.ts',
      '**/vite.config.ts',
      '**/vite-env.d.ts'
    ]
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      //tmp reg
      'no-empty': 'off',
      'require-yield': 'off',
      'import/first': 'off',
      'no-undef': 'off',
      'prefer-const': 'warn',
      'prefer-spread': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unsafe-optional-chaining': 'warn',
      'no-constant-binary-expression': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['**/tsconfig.json'],
        tsconfigRootDir: '.'
        // ecmaVersion: 'latest',
        // sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      'no-empty': 'warn',
      'multiline-ternary': 'off',
      'no-unused-vars': 'off', // off by typescript-eslint
      'react/react-in-jsx-scope': 'off',
      'import/first': 'warn',
      'prefer-const': 'warn',
      'prefer-spread': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      // complexity: ['warn', 10] // switch on soon, limits the length of the function to a certain line length
      'require-yield': 'warn',
      'require-await': 'error',
      'react/prop-types': 'off',
      'dot-notation': ['warn', { allowKeywords: true }],
      "object-shorthand": ["error", "always"],

      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true
        }
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      // '@typescript-eslint/unbound-method': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['PascalCase'],
          filter: {
            regex:
              '(Component|Provider|Container|Root|Page|View|Modal|Dialog|Form|List|Button|Input|Wrapper)$',
            match: true
          }
        },
        {
          selector: 'function',
          format: ['PascalCase'],
          filter: {
            regex:
              '(Component|Provider|Container|Root|Page|View|Modal|Dialog|Form|List|Button|Input|Wrapper)$',
            match: true
          }
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },

        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },

        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },

        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'method',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },

        {
          selector: 'property',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },

        {
          selector: ['enumMember', 'enum'],
          format: ['UPPER_CASE']
        },
        {
          selector: 'objectLiteralProperty',
          filter: {
            regex: '^(Authorization|Content-Type|Accept|X-[A-Za-z-]+)$',
            match: true
          },
          format: null
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple'
        }
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowTernary: true,
          allowShortCircuit: true
        }
      ]

      // tmp reg
      // '@typescript-eslint/no-unused-expressions': 'off',
      // 'require-yield': 'off',
      // '@typescript-eslint/no-require-imports': 'off',
      // 'no-undef': 'off',

      // 'react/react-in-jsx-scope': 'off',
      // 'react/prop-types': 'off',
      // 'no-unsafe-optional-chaining': 'warn',
      // 'no-constant-binary-expression': 'warn'
    }
  },

  {
    plugins: {
      react: pluginReact,
      import: pluginImport
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
