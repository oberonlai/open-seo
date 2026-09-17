import { Bot, FolderPlus, Globe, Search, Users } from "lucide-react";
import type { MessageKey } from "@/client/i18n";
import type { DashboardActivation } from "@/server/features/dashboard/services/DashboardService";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";

export const setupSteps: {
  id: DashboardSetupStep;
  labelKey: MessageKey;
  detailKey: MessageKey;
  icon: typeof Globe;
}[] = [
  {
    id: "domain",
    labelKey: "dashboard.step.domain.label",
    detailKey: "dashboard.step.domain.detail",
    icon: Globe,
  },
  {
    id: "project",
    labelKey: "dashboard.step.project.label",
    detailKey: "dashboard.step.project.detail",
    icon: FolderPlus,
  },
  {
    id: "competitor",
    labelKey: "dashboard.step.competitor.label",
    detailKey: "dashboard.step.competitor.detail",
    icon: Search,
  },
  {
    id: "mcp",
    labelKey: "dashboard.step.mcp.label",
    detailKey: "dashboard.step.mcp.detail",
    icon: Bot,
  },
  {
    id: "gsc",
    labelKey: "dashboard.step.gsc.label",
    detailKey: "dashboard.step.gsc.detail",
    icon: Search,
  },
  {
    id: "team",
    labelKey: "dashboard.step.team.label",
    detailKey: "dashboard.step.team.detail",
    icon: Users,
  },
];

export function getStepStatus(
  activation: DashboardActivation,
  step: DashboardSetupStep,
): "done" | "skipped" | "todo" {
  const completed: Record<DashboardSetupStep, boolean> = {
    domain: activation.domain !== null,
    project: activation.hasMultipleProjects,
    competitor: activation.competitorClickedAt !== null,
    mcp:
      activation.mcp.authorizedAt !== null ||
      activation.mcp.firstToolCallAt !== null,
    gsc: activation.gsc.connected,
    team: activation.hasTeammate,
  };
  if (completed[step]) return "done";
  // Preserve previous MCP dismissals without treating them as authorization.
  if (
    activation.dismissedSteps.includes(step) ||
    (step === "mcp" && activation.mcp.cardDismissedAt !== null)
  )
    return "skipped";
  return "todo";
}
