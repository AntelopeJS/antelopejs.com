import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const variantEnum = z.enum(["solid", "outline", "subtle", "soft", "ghost", "link"]);
const colorEnum = z.enum([
  "primary",
  "secondary",
  "neutral",
  "error",
  "warning",
  "success",
  "info",
]);
const sizeEnum = z.enum(["xs", "sm", "md", "lg", "xl"]);

const linkSchema = z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional(),
  size: sizeEnum,
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum,
  variant: variantEnum,
});

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: "data",
      source: "index.yml",
      schema: z.object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
        }),
        hero: z.object({
          title: z.string(),
          title_suffix: z.string(),
          description: z.string(),
          features: z.array(
            linkSchema.extend({
              description: z.string(),
            })
          ),
          links: z.array(linkSchema),
        }),
        cli: z.object({
          title: z.string(),
          description: z.string(),
        }),
        features: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({
              icon: z.string(),
              title: z.string(),
              description: z.string(),
            })
          ),
        }),
        roadmap: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({
              label: z.string(),
              content: z.string(),
              icon: z.string(),
              status: z.enum(["done", "in-progress", "upcoming"]),
              date: z.string(),
              datetime: z.string(),
            })
          ),
        }),
        modules: z.object({
          title: z.string(),
          title_suffix: z.string(),
        }),
        cta: z.object({
          title: z.string(),
          title_suffix: z.string(),
          description: z.string(),
          links: z.array(linkSchema),
        }),
      }),
    }),
    module: defineCollection({
      type: "data",
      source: "module.yml",
      schema: z.object({
        title: z.string(),
        title_suffix: z.string(),
        description: z.string(),
        links: z.array(linkSchema),
      }),
    }),
    interfaces: defineCollection({
      type: "data",
      source: "interfaces.yml",
      schema: z.object({
        title: z.string(),
        title_suffix: z.string(),
        description: z.string(),
        links: z.array(linkSchema),
        interfaces: z.array(
          z.object({
            title: z.string(),
            slug: z.string(),
            description: z.string().optional(),
            thumbnail: z.string().optional(),
            docs: z.string().optional(),
            links: z.array(linkSchema),
            features: z.array(
              z.union([linkSchema, z.object({ title: z.string(), description: z.string() })])
            ),
          })
        ),
      }),
    }),
    docs: defineCollection({
      type: "page",
      source: { include: "docs/**/*", prefix: "/docs" },
    }),
  },
});
