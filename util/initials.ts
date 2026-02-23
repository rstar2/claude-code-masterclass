export function getInitials(name: string, maxLength = 2): string {
  const words = name.split(" ").filter((word) => word.length > 0);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase().slice(0, maxLength);

  const first = words[0][0].toUpperCase();
  const last = words[words.length - 1][0].toUpperCase();

  return (first + last).slice(0, maxLength);
}
