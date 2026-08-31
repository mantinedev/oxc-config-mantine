import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { format } from 'oxfmt';
import { oxfmt } from './index.js';

const input = `import './local.css';
import './nested/deep.css';
import '../parent.css';
import './styles.css';
import classes from './Component.module.css';
import { helper } from './helper';
import { parentUtil } from '../parent-util';
import { rootAlias } from '@/root-alias';
import { docsAlias } from '@docs/docs-alias';
import { render } from '@mantine-tests/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Container } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import path from 'node:path';
import { useRouter } from 'next/router';
import next from 'next';
import React from 'react';
import dayjs from 'dayjs';
import '@mantine/core/styles.layer.css';
import '@mantine/core/styles.css';

export const X = () => <Container className={classes.root} />;
`;

const expected = `import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';

import dayjs from 'dayjs';
import React from 'react';
import next from 'next';
import { useRouter } from 'next/router';
import path from 'node:path';
import { IconCode } from '@tabler/icons-react';
import { Container } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { render } from '@mantine-tests/core';
import { docsAlias } from '@docs/docs-alias';
import { rootAlias } from '@/root-alias';
import { parentUtil } from '../parent-util';
import { helper } from './helper';
import classes from './Component.module.css';
import '../parent.css';
import './local.css';
import './nested/deep.css';
import './styles.css';

export const X = () => <Container className={classes.root} />;
`;

test('oxfmt config sorts imports into the Mantine group order', async () => {
  const { code, errors } = await format('sample.tsx', input, oxfmt);
  assert.deepEqual(errors, []);
  assert.equal(code, expected);
});

test('oxfmt config sorts @mantine/core styles before other packages styles', async () => {
  const stylesInput = `import '@docs/demos/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantinex/demo/styles.css';
import './variables.css';
`;

  const stylesExpected = `import '@mantine/core/styles.css';
import '@docs/demos/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantinex/demo/styles.css';

import './variables.css';
`;

  const { code, errors } = await format('sample.tsx', stylesInput, oxfmt);
  assert.deepEqual(errors, []);
  assert.equal(code, stylesExpected);
});

test('oxfmt config only uses options oxfmt recognises', async () => {
  const schemaUrl = new URL('../configuration_schema.json', import.meta.resolve('oxfmt'));
  const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));

  const known = Object.keys(schema.properties);
  const unknown = Object.keys(oxfmt).filter((key) => !known.includes(key));
  assert.deepEqual(unknown, []);
});
