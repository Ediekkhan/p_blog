import { client } from './sanity'

export async function getSermons() {
  const query = `*[_type == "sermon"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    publishedAt,
    contentType,
    videoUrl,
    audioUrl,
    "audioFile": audioFile.asset->url,
    thumbnail,
    speaker,
    duration,
    featured,
    category->{
      _id,
      name,
      slug
    }
  }`
  return client.fetch(query)
}

export async function getSermonBySlug(slug: string) {
  const query = `*[_type == "sermon" && slug.current == "${slug}"] {
    _id,
    title,
    slug,
    description,
    date,
    publishedAt,
    contentType,
    videoUrl,
    audioUrl,
    "audioFile": audioFile.asset->url,
    textContent,
    thumbnail,
    speaker,
    duration,
    featured,
    category->{
      _id,
      name,
      slug
    }
  }[0]`
  return client.fetch(query)
}

export async function getSermonsByCategory(categorySlug: string) {
  const query = `*[_type == "sermon" && category->slug.current == "${categorySlug}"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    publishedAt,
    contentType,
    videoUrl,
    audioUrl,
    "audioFile": audioFile.asset->url,
    thumbnail,
    speaker,
    duration,
    featured,
    category->{
      _id,
      name,
      slug
    }
  }`
  return client.fetch(query)
}

export async function getFeaturedSermons(limit: number = 3) {
  const query = `*[_type == "sermon" && featured == true] | order(date desc)[0...${limit}] {
    _id,
    title,
    slug,
    description,
    date,
    publishedAt,
    contentType,
    videoUrl,
    audioUrl,
    "audioFile": audioFile.asset->url,
    thumbnail,
    speaker,
    duration,
    category->{
      _id,
      name,
      slug
    }
  }`
  return client.fetch(query)
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description
  }`
  return client.fetch(query)
}

export async function getCategoryBySlug(slug: string) {
  const query = `*[_type == "category" && slug.current == "${slug}"] {
    _id,
    name,
    slug,
    description
  }[0]`
  return client.fetch(query)
}
