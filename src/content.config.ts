import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const clubsSchema = z.object({
        name: z.string(),
        description: z.string(),
        accent_color: z.string().optional(),
        links: z
            .object({
                Website: z.string().url().optional(),
                Instagram: z.string().url().optional(),
                X: z.string().url().optional(),
                Whatsapp: z.string().url().optional(),
                LinkedIn: z.string().url().optional(),
                Github: z.string().url().optional(),
            })
            .default({}),
        type: z.tuple([
            z.union([
                z.enum(['club', 'team']).transform(v => [v]),
                z.array(z.enum(['club', 'team'])).nonempty('Organization type (club/team) is required')
            ]).describe('Organization type: club, team, or both'),
            z.union([
                z.enum(['tech', 'cultural']).transform(v => [v]),
                z.array(z.enum(['tech', 'cultural'])).nonempty('Category (tech/cultural) is required')
            ]).describe('Category: tech, cultural, or both'),
            z.union([
                z.enum(['cse', 'ece', 'eee', 'mech']).transform(v => [v]),
                z.array(z.enum(['cse', 'ece', 'eee', 'mech'])).nonempty('At least one department is required')
            ]).describe('Relevant departments')
        ]).describe('Type information: [organization type, category, departments] - ALL REQUIRED')
    })

const clubs = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/clubs' }),
    schema: clubsSchema
});

type e = z.infer<typeof clubsSchema>

export const collections = { clubs };