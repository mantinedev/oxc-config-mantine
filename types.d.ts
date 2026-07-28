import type { OxfmtConfig } from 'oxfmt';
import type { OxlintConfig } from 'oxlint';

export type MantineOxfmtConfig = OxfmtConfig & {
  ignorePatterns: string[];
};

export declare const oxlint: OxlintConfig;
export declare const oxfmt: MantineOxfmtConfig;

declare const config: {
  oxlint: OxlintConfig;
  oxfmt: MantineOxfmtConfig;
};

export default config;
