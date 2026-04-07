export const normalizeText = (value: string): string =>
  value.trim().replace(/\s+/g, " ");

export const toLower = (value: string): string => normalizeText(value).toLowerCase();
