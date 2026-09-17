import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useT } from "@/client/i18n";

export const Route = createFileRoute("/_project/p/$projectId/rank-tracking")({
  component: RankTrackingLayout,
});

function RankTrackingLayout() {
  const t = useT();
  return (
    <div className="px-4 py-4 pb-24 overflow-auto md:px-6 md:py-6 md:pb-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("rankTracking.title")}</h1>
          <p className="text-sm text-base-content/70">
            {t("rankTracking.subtitle")}
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
