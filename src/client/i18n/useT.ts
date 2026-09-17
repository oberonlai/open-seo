import * as React from "react";
import { useLocalePreference } from "./locale";
import {
  translate,
  type TranslateParams,
} from "./translate";
import type { MessageKey } from "./locales/en";

export function useT() {
  const { activeLocale } = useLocalePreference();

  return React.useCallback(
    (key: MessageKey, params?: TranslateParams) =>
      translate(key, params, activeLocale),
    [activeLocale],
  );
}
