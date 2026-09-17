import { isErrorCode, type ErrorCode } from "@/shared/error-codes";
import { translateErrorCode } from "@/client/i18n";

// Setup errors cross the wire as "CODE: detail" (see toClientError) so the
// user sees the server's specific guidance while code-driven UI (error cards,
// redirects) still keys off the code.
function splitCodedMessage(
  message: string,
): { code: ErrorCode; detail: string } | null {
  const separatorIndex = message.indexOf(": ");
  if (separatorIndex === -1) return null;
  const code = message.slice(0, separatorIndex);
  if (!isErrorCode(code)) return null;
  return { code, detail: message.slice(separatorIndex + 2) };
}

export function getStandardErrorMessage(
  error: unknown,
  fallback?: string,
): string {
  const defaultFallback = translateErrorCode("INTERNAL_ERROR");
  const resolvedFallback = fallback ?? defaultFallback;
  if (!(error instanceof Error)) return resolvedFallback;
  if (isErrorCode(error.message)) return translateErrorCode(error.message);
  const coded = splitCodedMessage(error.message);
  if (coded) return coded.detail;
  if (error.message) return error.message;
  return resolvedFallback;
}

export function getErrorCode(error: unknown): ErrorCode | null {
  if (!(error instanceof Error)) return null;
  if (isErrorCode(error.message)) return error.message;
  return splitCodedMessage(error.message)?.code ?? null;
}
