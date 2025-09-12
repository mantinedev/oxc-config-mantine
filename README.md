# eslint-config-mantine

## Install

```sh
yarn add --dev @eslint/js eslint eslint-plugin-jsx-a11y eslint-plugin-react typescript-eslint eslint-config-mantine
```

## Usage

In your `eslint.config.js`:

```tsx
import mantine from "eslint-config-mantine";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// @ts-check
export default defineConfig(
  tseslint.configs.recommended,
  ...mantine,
  { ignores: ["**/*.{mjs,cjs,js,d.ts,d.mts}"] },
  {
    files: ["**/*.story.tsx"],
    rules: { "no-console": "off" },
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ["./tsconfig.json"],
      },
    },
  }
);
```

## License

MIT
