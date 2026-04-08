const PREFIXES = ["healthimus", "HEALTHIMUS"] as const;

export const clearHealthimusClientStorage = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const keys = Object.keys(localStorage).filter((key) =>
      PREFIXES.some((p) => key.startsWith(p)),
    );
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
};
