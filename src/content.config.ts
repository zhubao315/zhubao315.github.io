import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('ZHUBAO'),
    keywords: z.array(z.string()).default([]),
    project: z.string().optional(),
    category: z.enum(['agent', 'knowledge', 'investment', 'quantified', 'creative']).default('agent'),
  }),
});

export const collections = { articles };
