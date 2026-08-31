export const oxlint = {
  plugins: ['react', 'typescript', 'jsx-a11y', 'jest'],
  rules: {
    'array-callback-return': 'error',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    curly: 'error',
    'default-case': 'off',
    'default-case-last': 'error',
    'no-alert': 'error',
    'no-console': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-lonely-if': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-call': 'error',
    'no-useless-constructor': 'error',
    'no-useless-return': 'error',
    'operator-assignment': 'error',
    'prefer-const': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-object-has-own': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    yoda: 'error',
    radix: 'error',
    eqeqeq: ['error', 'smart'],
    'no-undef': 'off',
    'no-empty': 'off',
    'no-unused-expressions': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'no-loop-func': 'off',

    'typescript/no-explicit-any': 'off',
    'typescript/ban-ts-comment': 'off',
    'typescript/consistent-generic-constructors': 'error',
    'typescript/no-empty-object-type': 'off',
    'typescript/no-namespace': 'off',
    'typescript/no-unsafe-function-type': 'off',
    'typescript/no-deprecated': 'warn',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    'react/button-has-type': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'ignore' },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/no-children-prop': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-string-refs': 'error',
    'react/self-closing-comp': 'error',
    'react/void-dom-elements-no-children': 'error',

    // React Compiler rules, added to the `react` plugin in oxlint 1.79. They report where the
    // compiler bails out of optimizing rather than actual defects, and they misreport context
    // objects that hold DOM nodes: every field of such an object (booleans and callbacks
    // included) is treated as a ref. `preserve-manual-memoization` is `exhaustive-deps` under
    // a new name, which is turned off below on purpose.
    'react/refs': 'off',
    'react/immutability': 'off',
    'react/set-state-in-effect': 'off',
    'react/purity': 'off',
    'react/globals': 'off',
    'react/use-memo': 'off',
    'react/preserve-manual-memoization': 'off',
    'react/incompatible-library': 'off',

    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-has-content': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/prefer-tag-over-role': 'off',

    'jest/no-export': 'off',
    'jest/expect-expect': 'off',
    'jest/valid-title': 'off',
    'jest/require-to-throw-message': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'react/jsx-key': 'off',
        'no-unsafe-optional-chaining': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
      },
    },
    {
      files: ['**/*.story.tsx'],
      rules: {
        'no-console': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
      },
    },
  ],
};

export const oxfmt = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  sortImports: {
    // Required to move package styles (`@mantine/core/styles.css`) into the first group,
    // side effect imports are left in place by default.
    sortSideEffects: true,
    newlinesBetween: false,
    customGroups: [
      // Local styles are matched before `package_styles` so that a local `./styles.css`
      // is not treated as a package stylesheet.
      { groupName: 'css_modules', elementNamePattern: ['**/*.module.css'] },
      { groupName: 'local_css', elementNamePattern: ['./**/*.css', '../**/*.css'] },
      // `@mantine/core` styles must be imported before all other packages styles,
      // otherwise core resets (UnstyledButton, Input, etc.) win on source order and
      // override the styles of the components that build on them.
      {
        groupName: 'core_styles',
        elementNamePattern: ['@mantine/core/styles.css', '@mantine/core/styles.layer.css'],
      },
      {
        groupName: 'package_styles',
        elementNamePattern: ['**/styles.css', '**/styles.layer.css'],
      },
      { groupName: 'dayjs', elementNamePattern: ['dayjs', 'dayjs/**'] },
      { groupName: 'react', elementNamePattern: ['react'] },
      { groupName: 'next', elementNamePattern: ['next', 'next/**'] },
      { groupName: 'mantine', elementNamePattern: ['@mantine/**'] },
      { groupName: 'mantinex', elementNamePattern: ['@mantinex/**'] },
      { groupName: 'mantine_tests', elementNamePattern: ['@mantine-tests/**'] },
      { groupName: 'docs_alias', elementNamePattern: ['@docs/**'] },
      { groupName: 'root_alias', elementNamePattern: ['@/**'] },
    ],
    groups: [
      'core_styles',
      'package_styles',
      { newlinesBetween: true },
      'dayjs',
      'react',
      'next',
      'builtin',
      'external',
      'mantine',
      'mantinex',
      'mantine_tests',
      'docs_alias',
      'root_alias',
      'parent',
      'sibling',
      'index',
      'css_modules',
      'local_css',
      'unknown',
    ],
  },
  sortPackageJson: false,
  ignorePatterns: [
    '*.d.ts',
    '*.mdx',
    '*.md',
    'packages/*/*/styles.css',
    'packages/*/*/styles.layer.css',
    'packages/*/*/styles/*.css',
    'docs/.next',
    'docs/out',
  ],
};

export default {
  oxlint,
  oxfmt,
};
