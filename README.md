# oxc-config-mantine

Mantine Oxc configuration for [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

## Install

```sh
yarn add --dev oxlint oxfmt oxc-config-mantine
```

## Usage

In your `oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint';
import { oxlint } from 'oxc-config-mantine';

export default defineConfig({
  extends: [oxlint],
  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}'],
});
```

In your `oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt';
import { oxfmt } from 'oxc-config-mantine';

export default defineConfig(oxfmt);
```

You can extend the formatter config with project-specific options:

```ts
import { defineConfig } from 'oxfmt';
import { oxfmt } from 'oxc-config-mantine';

export default defineConfig({
  ...oxfmt,
  ignorePatterns: [...oxfmt.ignorePatterns, 'dist'],
});
```

## Import order

The formatter config sorts imports into the following groups:

1. Package styles – `@mantine/core/styles.css`, `@mantine/core/styles.layer.css` (followed by a blank line)
2. `dayjs`
3. `react`
4. `next`, `next/*`
5. Node.js built-in modules
6. Other external packages
7. `@mantine/*`
8. `@mantinex/*`
9. `@mantine-tests/*`
10. `@docs/*`
11. `@/*`
12. Parent imports (`../*`)
13. Sibling imports (`./*`)
14. Index imports
15. CSS modules (`*.module.css`)
16. Local styles (`*.css`)

Note that this config sets `sortImports.sortSideEffects` to `true`, which oxfmt disables by
default. It is required to move package styles into the first group – without it, side effect
imports stay where they are.

If you need to change the order, override `sortImports` entirely – spreading the config does not
merge nested objects:

```ts
export default defineConfig({
  ...oxfmt,
  sortImports: { ...oxfmt.sortImports, newlinesBetween: true },
});
```

## License

MIT
