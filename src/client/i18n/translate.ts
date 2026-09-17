import { FREE_MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import type { ErrorCode } from "@/shared/error-codes";
import { en, type MessageKey } from "./locales/en";
import { zhTW } from "./locales/zh-TW";
import { getActiveLocale, type AppLocale } from "./locale";

const catalogs: Record<AppLocale, Record<MessageKey, string>> = {
  en,
  "zh-TW": zhTW,
};

export type TranslateParams = Record<string, string | number>;

export function translate(
  key: MessageKey,
  params?: TranslateParams,
  locale: AppLocale = getActiveLocale(),
): string {
  const catalog = catalogs[locale] ?? catalogs.en;
  let message = catalog[key] ?? catalogs.en[key] ?? key;

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      message = message.replaceAll(`{${name}}`, String(value));
    }
  }

  return message;
}

/** Non-React helper that always reads the current active locale. */
export function t(key: MessageKey, params?: TranslateParams): string {
  return translate(key, params);
}

const ERROR_CODE_KEYS: Record<ErrorCode, MessageKey> = {
  UNAUTHENTICATED: "errors.unauthenticated",
  AUTH_CONFIG_MISSING: "errors.authConfigMissing",
  PAYMENT_REQUIRED: "errors.paymentRequired",
  INSUFFICIENT_CREDITS: "errors.insufficientCredits",
  FORBIDDEN: "errors.forbidden",
  NOT_FOUND: "errors.notFound",
  AUDIT_CAPACITY_REACHED: "errors.auditCapacityReached",
  AUDIT_PAGE_LIMIT_EXCEEDED: "errors.auditPageLimitExceeded",
  AUDIT_ALREADY_RUNNING: "errors.auditAlreadyRunning",
  VALIDATION_ERROR: "errors.validation",
  CRAWL_TARGET_BLOCKED: "errors.crawlTargetBlocked",
  BACKLINKS_BILLING_ISSUE: "errors.backlinksBilling",
  AI_SEARCH_BILLING_ISSUE: "errors.aiSearchBilling",
  DATAFORSEO_AUTH_FAILED: "errors.dataforseoAuthFailed",
  RATE_LIMITED: "errors.rateLimited",
  UPSTREAM_UNAVAILABLE: "errors.upstreamUnavailable",
  CONFLICT: "errors.conflict",
  INTERNAL_ERROR: "errors.internal",
};

export function translateErrorCode(
  code: ErrorCode,
  locale: AppLocale = getActiveLocale(),
): string {
  const key = ERROR_CODE_KEYS[code];
  if (code === "AUDIT_PAGE_LIMIT_EXCEEDED") {
    return translate(key, { max: FREE_MAX_AUDIT_PAGES }, locale);
  }
  return translate(key, undefined, locale);
}

function isMessageKey(value: string): value is MessageKey {
  return Object.prototype.hasOwnProperty.call(en, value);
}

export function onboardingOptionKey(value: string): MessageKey | null {
  const key = `onboarding.option.${value}`;
  return isMessageKey(key) ? key : null;
}
