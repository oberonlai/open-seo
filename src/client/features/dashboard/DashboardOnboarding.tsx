import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/client/i18n";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/posthog";
import { getGoogleLinkError } from "@/client/features/integrations/googleLinkError";
import { setDashboardStepDismissed } from "@/serverFunctions/dashboard";
import type { DashboardActivation } from "@/server/features/dashboard/services/DashboardService";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";
import { getStepStatus, setupSteps } from "./dashboardSteps";
import { DashboardSetupAction } from "./DashboardSetupAction";

export function DashboardOnboarding({
  projectId,
  activation,
}: {
  projectId: string;
  activation: DashboardActivation;
}) {
  const t = useT();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<DashboardSetupStep | null>(() =>
    getGoogleLinkError("gsc") ||
    (typeof window !== "undefined" && window.location.hash === "#connect-gsc")
      ? "gsc"
      : null,
  );
  const dismiss = useMutation({
    mutationFn: ({
      step,
      dismissed,
    }: {
      step: DashboardSetupStep;
      dismissed: boolean;
    }) => setDashboardStepDismissed({ data: { projectId, step, dismissed } }),
    onSuccess: async (_, { step, dismissed }) => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboardActivation", projectId],
      });
      setSelected(dismissed ? null : step);
      captureClientEvent("dashboard:setup_step_defer", { step, dismissed });
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(error, t("dashboard.setupSaveError")),
      ),
  });
  const steps = setupSteps.filter(
    (step) => step.id !== "team" || isHostedClientAuthMode(),
  );
  const remaining = steps.filter(
    (step) => getStepStatus(activation, step.id) === "todo",
  );
  const completed = steps.filter(
    (step) => getStepStatus(activation, step.id) === "done",
  );
  const deferred = steps.filter(
    (step) => getStepStatus(activation, step.id) === "skipped",
  );

  if (remaining.length === 0) return null;

  return (
    <section
      aria-label={t("dashboard.setupAriaLabel")}
      className="overflow-hidden rounded-xl border border-base-300 bg-base-100"
    >
      <header className="border-b border-base-300 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold">{t("dashboard.setupTitle")}</h2>
        <p className="mt-1 text-sm text-base-content/65">
          {t("dashboard.setupSubtitle")}
        </p>
      </header>
      {remaining.map((item) => {
        const active = selected === item.id;
        const Icon = item.icon;
        const label = t(item.labelKey);
        const detail = t(item.detailKey);
        return (
          <div key={item.id} className="border-b border-base-300">
            <button
              type="button"
              aria-expanded={active}
              aria-controls={`setup-${item.id}`}
              onClick={() => {
                setSelected(active ? null : item.id);
                if (!active)
                  captureClientEvent("dashboard:next_move_click", {
                    step: item.id,
                  });
              }}
              className={`flex w-full items-center gap-3 px-5 py-4 text-left sm:px-6 ${active ? "bg-primary/5" : "hover:bg-base-200/50"}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-base-200">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{label}</span>
                <span className="mt-1 hidden text-xs text-base-content/65 sm:block">
                  {detail}
                </span>
              </span>
              {item.id === "domain" && (
                <span className="hidden text-xs text-primary sm:block">
                  {t("dashboard.setupStartHere")}
                </span>
              )}
              <ChevronRight
                className={`size-4 shrink-0 text-base-content/60 transition-transform ${active ? "rotate-90" : ""}`}
              />
            </button>
            <div id={`setup-${item.id}`} hidden={!active}>
              {active && (
                <div className="space-y-5 px-5 py-5 sm:px-6">
                  <DashboardSetupAction
                    step={item.id}
                    projectId={projectId}
                    onComplete={() => setSelected(null)}
                  />
                  <div className="border-t border-base-300 pt-3">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-base-content/60"
                      disabled={dismiss.isPending}
                      onClick={() =>
                        dismiss.mutate({ step: item.id, dismissed: true })
                      }
                    >
                      {item.id === "project"
                        ? t("dashboard.setupOnlyOneProject")
                        : t("dashboard.setupSkip")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {deferred.length > 0 && (
        <details className="group border-t border-base-300">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm text-base-content/65 sm:px-6 [&::-webkit-details-marker]:hidden">
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
            {t("dashboard.setupSavedForLater", { count: deferred.length })}
          </summary>
          <ul className="space-y-1 px-5 pb-4 sm:px-6">
            {deferred.map((item) => {
              const label = t(item.labelKey);
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-base-200/40 px-3 py-2"
                >
                  <span className="text-sm">{label}</span>
                  <button
                    type="button"
                    aria-label={t("dashboard.setupRestoreAria", { label })}
                    className="btn btn-ghost btn-sm shrink-0"
                    disabled={dismiss.isPending}
                    onClick={() =>
                      dismiss.mutate({ step: item.id, dismissed: false })
                    }
                  >
                    <RotateCcw className="size-3.5" />{" "}
                    {t("dashboard.setupRestore")}
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {completed.length > 0 && (
        <details className="group border-t border-base-300">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm sm:px-6 [&::-webkit-details-marker]:hidden">
            <Check className="size-4 text-success" />
            {t("dashboard.setupCompleted", { count: completed.length })}
            <ChevronRight className="ml-auto size-4 text-base-content/60 transition-transform group-open:rotate-90" />
          </summary>
          <ul className="space-y-3 px-5 pb-5 sm:px-6">
            {completed.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 text-sm text-base-content/65"
              >
                <Check className="size-4 shrink-0 text-success" />
                {t(item.labelKey)}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
