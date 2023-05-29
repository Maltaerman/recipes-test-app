export function getSrc(file: File | string) {
  if (typeof file === "string") {
    return file;
  }

  return URL.createObjectURL(file);
}
