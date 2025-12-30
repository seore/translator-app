import { pidginDictionary } from "./piginDictionary";

export function translateText(input, direction = "en-to-pidgin") {
  if (!input || !input.trim()) return null;

  const normalized = input.trim().toLowerCase();

  const [fromLang, toLang] =
    direction === "en-to-pidgin" ? ["en", "pidgin"] : ["pidgin", "en"];

  // Exact match
  const directMatch = pidginDictionary.find(
    (entry) =>
      entry.languageFrom === fromLang &&
      entry.languageTo === toLang &&
      entry.from.toLowerCase() === normalized
  );

  if (directMatch) return directMatch;

  // Loose "contains" match
  const looseMatch = pidginDictionary.find(
    (entry) =>
      entry.languageFrom === fromLang &&
      entry.languageTo === toLang &&
      normalized.includes(entry.from.toLowerCase())
  );

  return looseMatch || null;
}

export function getRandomPhrase() {
  if (!pidginDictionary.length) return null;
  const index = Math.floor(Math.random() * pidginDictionary.length);
  return pidginDictionary[index];
}
