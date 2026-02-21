import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const clubsSchema = z.object({
        name: z.string(),
        description: z.string(),
        links: z.object({
            website: z.string().url(),
            instagram: z.string().url(),
            whatsapp: z.string().url()
        }),
        type: z.tuple([
            z.enum(['club', 'team']),
            z.enum(['tech', 'cultural']),
            z.union([
                z.enum(['cse', 'ece', 'eee', 'mech']).transform(v => [v]),
                z.array(z.enum(['cse', 'ece', 'eee', 'mech']))
            ])
        ])
    })

const clubs = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/clubs' }),
    schema: clubsSchema
});

type e = z.infer<typeof clubsSchema>

export const collections = { clubs };