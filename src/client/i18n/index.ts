export { en, type MessageKey, type MessageCatalog } from "./locales/en";
export { zhTW } from "./locales/zh-TW";
export {
  type AppLocale,
  type LocalePreference,
  getActiveLocale,
  getLocalePreference,
  initDocumentLocale,
  matchBrowserLocale,
  resolveLocale,
  setLocalePreference,
  useLocalePreference,
} from "./locale";
export {
  t,
  translate,
  translateErrorCode,
  onboardingOptionKey,
  type TranslateParams,
} from "./translate";
export { useT } from "./useT";
export { LanguageMenuItems, LanguageSettingsRow } from "./LanguageMenuItems";
