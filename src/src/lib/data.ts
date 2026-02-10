import { z } from "astro:schema"

export const Platform = z.enum([
  // Social
  "Discord",
  "Facebook",
  "Instagram",
  "Tiktok",
  "Tinder",
  "Youtube",
  "X",
  // Music
  "Spotify",
  "Soundcloud",
  // Development
  "Github",
])

export type Platform = z.infer<typeof Platform>

export const Link = z.object({
  platform: Platform,
  link: z.string().url(),
  name: z.string().optional(),
})

export type Link = z.infer<typeof Link>

export const Data = z.object({
  name: z.string(),
  image: z.string().url(),
  links: z.array(Link),
})

export type Data = z.infer<typeof Data>

let data: Data | undefined

export async function getData() {
  if (data) return data

  const result = await Bun.file("../data.yml")
    .text()
    .then(Bun.YAML.parse)
    .then(Data.safeParseAsync)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  data = result.data

  return data!
}
