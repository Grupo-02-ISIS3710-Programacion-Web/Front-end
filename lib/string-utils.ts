export function capitalizeFirstLetter(str: string): string {
  if (!str) {
    return str; // Handles empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toLowerCaseAndReplaceSpacesWithHyphens(str: string): string {
  return str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u");
}