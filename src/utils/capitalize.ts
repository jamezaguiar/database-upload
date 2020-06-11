export default function capitalize(text: string): string {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

  return capitalizedText;
}
