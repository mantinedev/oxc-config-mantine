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

## License

MIT
