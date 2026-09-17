import { useLocalePreference, type LocalePreference } from "./locale";
import { useT } from "./useT";

const LANGUAGE_OPTIONS: { value: LocalePreference; labelKey: "language.system" | "language.en" | "language.zhTW" }[] = [
  { value: "system", labelKey: "language.system" },
  { value: "en", labelKey: "language.en" },
  { value: "zh-TW", labelKey: "language.zhTW" },
];

/** Compact language picker for account / settings menus. */
export function LanguageMenuItems() {
  const t = useT();
  const { localePreference, setLocalePreference } = useLocalePreference();

  return (
    <>
      <li className="menu-title pt-2">
        <span>{t("language.title")}</span>
      </li>
      <li>
        <div
          role="radiogroup"
          aria-label={t("language.preference")}
          className="flex flex-col gap-0.5"
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = option.value === localePreference;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-base-200 font-medium text-base-content"
                    : "text-base-content/70 hover:bg-base-200/60 hover:text-base-content"
                }`}
                onClick={() => setLocalePreference(option.value)}
              >
                {t(option.labelKey)}
              </button>
            );
          })}
        </div>
      </li>
    </>
  );
}

export function LanguageSettingsRow() {
  const t = useT();
  const { localePreference, setLocalePreference } = useLocalePreference();

  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-sm">{t("language.title")}</span>
      <div
        role="radiogroup"
        aria-label={t("language.preference")}
        className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
      >
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.value === localePreference;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={t(option.labelKey)}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-base-100 text-base-content shadow-sm"
                  : "text-base-content/50 hover:text-base-content/80"
              }`}
              onClick={() => setLocalePreference(option.value)}
            >
              {t(option.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
