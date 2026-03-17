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
            .replace("ú", "u")
            .replace(/[^a-z0-9-]/g, '');
}

export function toLowerCaseAndReplaceHyphensWithSpaces(str: string | undefined): string {
  if (!str) {
    return ""; // Handles undefined or empty strings
  }
  return str.toLowerCase()
            .replace(/-/g, ' ')
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u")
            .replace(/[^a-z0-9-]/g, '');
}

export function toLabel(value: string) {
    return (value.charAt(0).toUpperCase() + value.slice(1))
        .replace(/-/g, " ")
        .replace(/_/g, " ");
}

export function formatDate(iso?: string) {
    if (!iso) return "—";
    return new Intl.DateTimeFormat("es", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(iso));
}