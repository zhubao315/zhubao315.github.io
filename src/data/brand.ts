import type { ImageMetadata } from 'astro';
import fieldBuild from '../assets/brand/field-build.png';
import fieldThink from '../assets/brand/field-think.png';
import fieldMeasure from '../assets/brand/field-measure.png';
import fieldCreate from '../assets/brand/field-create.png';

/**
 * Abstract brand fields. These are generated colour fields, not product
 * screenshots: they sit behind scrims as texture, or act as the base layer of
 * an abstract visual study. Never label them as a UI or a demo.
 */
export const brandFields = {
  build: fieldBuild,
  think: fieldThink,
  measure: fieldMeasure,
  create: fieldCreate,
} as const satisfies Record<string, ImageMetadata>;

export type BrandFieldKey = keyof typeof brandFields;

/** Which field represents each project category when no real cover exists. */
export const categoryField: Record<string, BrandFieldKey> = {
  agent: 'build',
  infrastructure: 'build',
  knowledge: 'think',
  investment: 'think',
  research: 'think',
  quantified: 'measure',
  product: 'create',
  creative: 'create',
};
