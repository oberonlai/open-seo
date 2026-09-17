import { useState, type ReactNode } from "react";
import { useT } from "@/client/i18n";
import {
  ChevronDown,
  Copy,
  Download,
  FileDown,
  MoreHorizontal,
  Play,
  RefreshCw,
  Sheet,
} from "lucide-react";

function ToolbarMenu({
  label,
  icon,
  title,
  children,
}: {
  label?: string;
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className={`btn btn-ghost btn-sm ${label ? "gap-1" : "btn-square"}`}
        onClick={() => setOpen((c) => !c)}
        title={title}
        aria-label={title ?? label}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {icon}
        {label}
        {label && <ChevronDown className="size-3.5 opacity-60" />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 top-full mt-1 z-50 rounded-lg border border-base-300 bg-base-100 shadow-lg py-1 min-w-[230px]"
            onClick={() => setOpen(false)}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  description,
  onClick,
  disabled,
}: {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className="flex w-full items-start gap-2 px-3 py-2 text-sm hover:bg-base-200 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="flex flex-col items-start text-left">
        <span>{label}</span>
        {description && (
          <span className="text-xs text-base-content/50">{description}</span>
        )}
      </span>
    </button>
  );
}

export function MoreMenu({
  onCheckNow,
  checkBusy,
  checkDisabled,
  onRefreshMetrics,
  metricsRefreshing,
  hasData,
}: {
  onCheckNow: () => void;
  checkBusy: boolean;
  checkDisabled: boolean;
  onRefreshMetrics: () => void;
  metricsRefreshing: boolean;
  hasData: boolean;
}) {
  const t = useT();
  return (
    <ToolbarMenu
      icon={<MoreHorizontal className="size-4" />}
      title={t("rankTracking.moreActions")}
    >
      {!checkDisabled && (
        <MenuItem
          icon={<Play className="size-3.5" />}
          label={checkBusy ? t("common.loading") : t("rankTracking.checkRankings")}
          description={t("rankTracking.fetchPositions")}
          onClick={onCheckNow}
          disabled={checkBusy}
        />
      )}
      <MenuItem
        icon={
          <RefreshCw
            className={`size-3.5 ${metricsRefreshing ? "animate-spin" : ""}`}
          />
        }
        label={metricsRefreshing ? t("common.updating") : t("rankTracking.updateKeywordStats")}
        description={t("rankTracking.updateMetricsHint")}
        onClick={onRefreshMetrics}
        disabled={metricsRefreshing || !hasData}
      />
    </ToolbarMenu>
  );
}

export function ExportMenu({
  onExport,
  onExportToSheets,
  onCopyKeywords,
  hasData,
}: {
  onExport: () => void;
  onExportToSheets: () => void;
  onCopyKeywords: () => void;
  hasData: boolean;
}) {
  const t = useT();
  return (
    <ToolbarMenu label={t("rankTracking.export")} icon={<Download className="size-3.5" />}>
      <MenuItem
        icon={<Sheet className="size-3.5" />}
        label={t("common.exportSheets")}
        onClick={onExportToSheets}
        disabled={!hasData}
      />
      <MenuItem
        icon={<FileDown className="size-3.5" />}
        label={t("common.exportCsv")}
        onClick={onExport}
        disabled={!hasData}
      />
      <MenuItem
        icon={<Copy className="size-3.5" />}
        label={t("rankTracking.copyKeywords")}
        onClick={onCopyKeywords}
        disabled={!hasData}
      />
    </ToolbarMenu>
  );
}
