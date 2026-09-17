import { Link } from "@tanstack/react-router";
import { ScanSearch, Trash2 } from "lucide-react";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { PortalMenu } from "@/client/components/PortalMenu";
import { formatDate, StatusBadge } from "@/client/features/audit/shared";
import { useT } from "@/client/i18n";

export function AuditHistorySection({
  projectId,
  history,
  isLoading,
  onDelete,
}: {
  projectId: string;
  history: Awaited<ReturnType<typeof getAuditHistory>>;
  isLoading: boolean;
  onDelete: (auditId: string) => void;
}) {
  const t = useT();
  if (history.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center text-base-content/40 space-y-3">
          <ScanSearch className="size-12 mx-auto opacity-30" />
          <p className="text-lg font-medium">{t("audit.noAuditsYet")}</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) return null;

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body gap-3">
        <h2 className="card-title text-base">{t("audit.previousAudits")}</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>{t("seo.date")}</th>
                <th>{t("seo.url")}</th>
                <th>{t("seo.status")}</th>
                <th>{t("seo.pages")}</th>
                <th>{t("audit.lighthouse")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map((audit) => (
                <tr key={audit.id} className="hover group">
                  <td className="text-xs text-base-content/70">
                    {formatDate(audit.startedAt)}
                  </td>
                  <td className="max-w-[220px] truncate">{audit.startUrl}</td>
                  <td>
                    <StatusBadge status={audit.status} />
                  </td>
                  <td>{audit.pagesTotal || audit.pagesCrawled}</td>
                  <td>
                    {audit.ranLighthouse ? (
                      <span className="badge badge-ghost badge-xs">{t("common.yes")}</span>
                    ) : null}
                  </td>
                  <td>
                    <HistoryActions
                      projectId={projectId}
                      auditId={audit.id}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HistoryActions({
  projectId,
  auditId,
  onDelete,
}: {
  projectId: string;
  auditId: string;
  onDelete: (auditId: string) => void;
}) {
  const t = useT();
  return (
    <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
      <Link
        to="/p/$projectId/audit"
        params={{ projectId }}
        search={{ auditId, tab: "pages" }}
        className="btn btn-primary btn-xs"
      >
        {t("common.view")}
      </Link>
      <PortalMenu ariaLabel="Audit actions">
        {(close) => (
          <li>
            <button
              className="text-error"
              onClick={() => {
                close();
                onDelete(auditId);
              }}
            >
              <Trash2 className="size-3.5" />
              {t("audit.deleteAudit")}
            </button>
          </li>
        )}
      </PortalMenu>
    </div>
  );
}
