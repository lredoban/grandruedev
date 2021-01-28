export const getVilleSlug = (boutique) => {
  const [slug] = boutique.full_slug.split('/')
  return slug
}
