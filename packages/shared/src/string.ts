export type SlugifyOptions = {
  lowercase?: boolean
  separator?: '-' | '_'
}

export const slugify = (
  value: string,
  options: SlugifyOptions = {}
): string => {
  const separator = options.separator ?? '-'
  const normalized = value
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')

  return options.lowercase === false ? normalized : normalized.toLowerCase()
}
