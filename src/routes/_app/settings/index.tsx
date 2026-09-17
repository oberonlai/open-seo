import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApiKeySettings } from "@/client/features/settings/ApiKeySettings";
import { LanguageSettingsRow, useT } from "@/client/i18n";
import type { MessageKey } from "@/client/i18n";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";
import { authClient, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { version } from "../../../../package.json";

export const Route = createFileRoute("/_app/settings/")({
  component: PersonalSettings,
});

const THEME_OPTIONS: {
  value: ThemePreference;
  labelKey: MessageKey;
  icon: typeof Sun;
}[] = [
  { value: "system", labelKey: "theme.system", icon: Monitor },
  { value: "light", labelKey: "theme.light", icon: Sun },
  { value: "dark", labelKey: "theme.dark", icon: Moon },
];

function PersonalSettings() {
  const t = useT();
  const isHosted = isHostedClientAuthMode();
  const { themePreference, setThemePreference } = useThemePreference();
  const { data: session, isPending: isSessionPending } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const analyticsEnabled = session?.user?.analyticsOptedOut !== true;

  async function updateAnalyticsPreference(enabled: boolean) {
    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        analyticsOptedOut: !enabled,
      });
      if (result.error) {
        toast.error(t("settings.analyticsUpdateFailed"));
      } else {
        toast.success(
          enabled
            ? t("settings.analyticsEnabled")
            : t("settings.analyticsDisabled"),
        );
      }
    } catch {
      toast.error(t("settings.analyticsUpdateFailed"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-base-content/50">
          {t("settings.appearance")}
        </h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">{t("theme.title")}</span>
          <div
            role="radiogroup"
            aria-label={t("theme.preference")}
            className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
          >
            {THEME_OPTIONS.map((option) => {
              const isActive = option.value === themePreference;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={t(option.labelKey)}
                  className={`flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-base-100 text-base-content shadow-sm"
                      : "text-base-content/50 hover:text-base-content/80"
                  }`}
                  onClick={() => setThemePreference(option.value)}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        </div>
        <LanguageSettingsRow />
      </section>

      {isHosted ? (
        <>
          <ApiKeySettings />

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-base-content/50">
              {t("settings.analytics")}
            </h2>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm">{t("settings.analyticsHelp")}</p>
                <p className="mt-1 text-sm text-base-content/60">
                  {t("settings.analyticsDesc")}
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={analyticsEnabled}
                disabled={isSessionPending || isSaving || !session?.user}
                onChange={(event) => {
                  void updateAnalyticsPreference(event.currentTarget.checked);
                }}
                aria-label={t("settings.enableAnalytics")}
              />
            </div>
          </section>
        </>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-base-content/50">
            {t("settings.about")}
          </h2>
          <div className="flex items-center justify-between gap-6">
            <span className="text-sm">{t("common.version")}</span>
            <span className="font-mono text-sm text-base-content/60">
              v{version}
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
