import {
  Bookmark,
  Bot,
  ClipboardCheck,
  Globe,
  LayoutDashboard,
  Link2,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { linkOptions } from "@tanstack/react-router";
import { GoogleGlyphMuted } from "@/client/features/gsc/GoogleGlyph";
import type { MessageKey } from "@/client/i18n";

const projectNavItems = [
  {
    to: "/p/$projectId" as const,
    labelKey: "nav.dashboard" satisfies MessageKey,
    icon: LayoutDashboard,
    // Without exact matching, the index path is a prefix of every project
    // route and the Dashboard item would render active everywhere.
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: "/p/$projectId/keywords" as const,
    labelKey: "nav.keywordResearch" satisfies MessageKey,
    icon: Search,
  },
  {
    to: "/p/$projectId/saved" as const,
    labelKey: "nav.savedKeywords" satisfies MessageKey,
    icon: Bookmark,
  },
  {
    to: "/p/$projectId/rank-tracking" as const,
    labelKey: "nav.rankTracking" satisfies MessageKey,
    icon: TrendingUp,
  },
  {
    to: "/p/$projectId/search-performance" as const,
    labelKey: "nav.gscInsights" satisfies MessageKey,
    icon: GoogleGlyphMuted,
  },
  {
    to: "/p/$projectId/domain" as const,
    labelKey: "nav.domainOverview" satisfies MessageKey,
    icon: Globe,
  },
  {
    to: "/p/$projectId/backlinks" as const,
    labelKey: "nav.backlinks" satisfies MessageKey,
    icon: Link2,
  },
  {
    to: "/p/$projectId/audit" as const,
    labelKey: "nav.siteAudit" satisfies MessageKey,
    icon: ClipboardCheck,
  },
  {
    to: "/p/$projectId/brand-lookup" as const,
    labelKey: "nav.brandLookup" satisfies MessageKey,
    icon: Sparkles,
  },
  {
    to: "/p/$projectId/prompt-explorer" as const,
    labelKey: "nav.promptExplorer" satisfies MessageKey,
    icon: MessageSquare,
  },
] as const;

const aiNavItem = linkOptions({
  to: "/ai" as const,
  labelKey: "nav.aiMcp" satisfies MessageKey,
  icon: Bot,
});

// Always-visible sidebar group (not project-scoped, unlike the groups below).
export const connectNavGroup = {
  labelKey: "nav.connect" satisfies MessageKey,
  items: [aiNavItem],
};

function getProjectNavItems(projectId: string) {
  return linkOptions(
    projectNavItems.map((item) => ({
      ...item,
      params: { projectId },
      search: {},
    })),
  );
}

// Grouped by scope: "My Site" is the project's own domain (tracked data),
// "Research" is point-at-anything lookup tools.
export function getProjectNavGroups(projectId: string) {
  const all = getProjectNavItems(projectId);
  const byPath = (path: (typeof projectNavItems)[number]["to"]) =>
    all.find((i) => i.to === path)!;

  return [
    {
      labelKey: "nav.overview" satisfies MessageKey,
      items: [byPath("/p/$projectId")],
    },
    {
      labelKey: "nav.research" satisfies MessageKey,
      items: [
        byPath("/p/$projectId/keywords"),
        byPath("/p/$projectId/domain"),
        byPath("/p/$projectId/backlinks"),
        byPath("/p/$projectId/brand-lookup"),
        byPath("/p/$projectId/prompt-explorer"),
      ],
    },
    {
      labelKey: "nav.mySite" satisfies MessageKey,
      items: [
        byPath("/p/$projectId/search-performance"),
        byPath("/p/$projectId/rank-tracking"),
        byPath("/p/$projectId/saved"),
        byPath("/p/$projectId/audit"),
      ],
    },
  ];
}

export const dataforseoHelpLinkOptions = linkOptions({
  to: "/help/dataforseo-api-key",
});
