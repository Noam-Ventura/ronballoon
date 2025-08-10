export function sanitizeText(input: string, maxLen = 500): string {
  return input
    .replace(/[\r\n\t]/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim()
    .slice(0, maxLen);
}

export function isSpamLike(text: string): boolean {
  const lowered = text.toLowerCase();
  const suspicious = ['http://', 'https://', 'viagra', 'bitcoin', 'loan'];
  return suspicious.some((w) => lowered.includes(w));
}


