export const createSlug = (value: string): string => {
  const slug = value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'item';
};

export const createUniqueSlug = <T extends { id: string; slug: string }>(
  value: string,
  items: T[],
  currentId?: string
): string => {
  const baseSlug = createSlug(value);
  let candidate = baseSlug;
  let suffix = 2;

  while (items.some((item) => item.id !== currentId && item.slug === candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
};