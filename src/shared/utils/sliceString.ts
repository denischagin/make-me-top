export function sliceString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}…`;
  }

  return str;
}