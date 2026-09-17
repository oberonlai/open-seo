import * as React from "react";

export type AppLocale = "en" | "zh-TW";
export type LocalePreference = "system" | AppLocale;

const LOCALE_STORAGE_KEY = "locale-preference";
const LOCALE_CHANGE_EVENT = "locale-preference-change";

function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === "en" || value === "zh-TW";
}

/** Map browser / Accept-Language tags to an app locale. */
export function matchBrowserLocale(
  languages: readonly string[] | undefined,
): AppLocale {
  if (!languages?.length) return "en";

  for (const raw of languages) {
    const tag = raw.trim().toLowerCase().replace(/_/g, "-");
    if (!tag) continue;

    // Explicit Simplified Chinese → English fallback (never zh-CN catalog).
    if (
      tag === "zh-cn" ||
      tag === "zh-sg" ||
      tag === "zh-hans" ||
      tag.startsWith("zh-hans-") ||
      tag.startsWith("zh-cn-") ||
      tag.startsWith("zh-sg-")
    ) {
      continue;
    }

    // Traditional Chinese / Taiwan / Hong Kong / Macau / Hant.
    if (
      tag === "zh-tw" ||
      tag === "zh-hk" ||
      tag === "zh-mo" ||
      tag === "zh-hant" ||
      tag.startsWith("zh-hant") ||
      tag.startsWith("zh-tw") ||
      tag.startsWith("zh-hk") ||
      tag.startsWith("zh-mo")
    ) {
      return "zh-TW";
    }

    // Bare `zh` — prefer Traditional for this Taiwan-focused deployment when
    // the browser does not specify a region/script. English remains the
    // catalog fallback for missing keys either way.
    if (tag === "zh" || tag.startsWith("zh-")) {
      return "zh-TW";
    }

    if (tag === "en" || tag.startsWith("en-")) {
      return "en";
    }
  }

  return "en";
}

function readStoredPreference(): LocalePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isAppLocale(stored)) return stored;
    return "system";
  } catch {
    return "system";
  }
}

function writeStoredPreference(preference: LocalePreference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(LOCALE_STORAGE_KEY);
    } else {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, preference);
    }
  } catch {
    // localStorage can be unavailable in private browsing or strict modes.
  }
}

function browserLanguages(): string[] {
  if (typeof navigator === "undefined") return [];
  if (navigator.languages?.length) return [...navigator.languages];
  if (navigator.language) return [navigator.language];
  return [];
}

export function resolveLocale(preference: LocalePreference): AppLocale {
  if (preference !== "system") return preference;
  return matchBrowserLocale(browserLanguages());
}

function applyDocumentLang(locale: AppLocale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "zh-TW" ? "zh-Hant-TW" : "en";
}

function notifyLocaleChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

export function getLocalePreference(): LocalePreference {
  return readStoredPreference();
}

export function getActiveLocale(): AppLocale {
  return resolveLocale(readStoredPreference());
}

export function setLocalePreference(preference: LocalePreference) {
  writeStoredPreference(preference);
  applyDocumentLang(resolveLocale(preference));
  notifyLocaleChange();
}

function subscribeToLocalePreference(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== LOCALE_STORAGE_KEY) return;
    onStoreChange();
  };

  window.addEventListener(LOCALE_CHANGE_EVENT, handleChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleStorage);
  };
}

/** Sync active locale into <html lang> on first client paint. */
export function initDocumentLocale() {
  applyDocumentLang(getActiveLocale());
}

export function useLocalePreference(): {
  localePreference: LocalePreference;
  activeLocale: AppLocale;
  setLocalePreference: (preference: LocalePreference) => void;
} {
  const localePreference = React.useSyncExternalStore(
    subscribeToLocalePreference,
    readStoredPreference,
    () => "system" as LocalePreference,
  );

  const activeLocale = resolveLocale(localePreference);

  React.useEffect(() => {
    applyDocumentLang(activeLocale);
  }, [activeLocale]);

  return {
    localePreference,
    activeLocale,
    setLocalePreference,
  };
}
