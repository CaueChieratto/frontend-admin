export function ensurePdfExtension(url: string): string {
  const endsWithPdf = url.toLowerCase().endsWith(".pdf");
  return endsWithPdf ? url : `${url}.pdf`;
}
