/**
 * English message catalog (source of truth for keys).
 * Keep brand names (OpenSEO, DataForSEO, Cloudflare, Google, MCP, …) as-is.
 */
export const en = {
  // —— Common ——
  "common.loading": "Loading…",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.create": "Create",
  "common.continue": "Continue",
  "common.back": "Back",
  "common.next": "Next",
  "common.skip": "Skip",
  "common.dismiss": "Dismiss",
  "common.close": "Close",
  "common.search": "Search",
  "common.retry": "Retry",
  "common.signOut": "Sign out",
  "common.signIn": "Sign in",
  "common.version": "Version",
  "common.openMenu": "Open menu",
  "common.closeSidebar": "Close sidebar",
  "common.openAccountMenu": "Open account menu",
  "common.other": "Other",
  "common.yes": "Yes",
  "common.no": "No",

  // —— Nav groups & items ——
  "nav.overview": "Overview",
  "nav.research": "Research",
  "nav.mySite": "My Site",
  "nav.connect": "Connect",
  "nav.dashboard": "Dashboard",
  "nav.keywordResearch": "Keyword Research",
  "nav.savedKeywords": "Saved Keywords",
  "nav.rankTracking": "Rank Tracking",
  "nav.gscInsights": "GSC Insights",
  "nav.domainOverview": "Domain Overview",
  "nav.backlinks": "Backlinks",
  "nav.siteAudit": "Site Audit",
  "nav.brandLookup": "Brand Lookup",
  "nav.promptExplorer": "Prompt Explorer",
  "nav.aiMcp": "AI & MCP",
  "nav.helpCommunity": "Help & Community",
  "nav.settings": "Settings",
  "nav.billing": "Billing",
  "nav.browse": "Browse",
  "nav.chat": "Chat",
  "nav.organization": "Organization",

  // —— Theme ——
  "theme.title": "Theme",
  "theme.preference": "Theme preference",
  "theme.system": "System",
  "theme.light": "Light",
  "theme.dark": "Dark",

  // —— Language ——
  "language.title": "Language",
  "language.preference": "Language preference",
  "language.system": "System",
  "language.en": "English",
  "language.zhTW": "繁體中文",

  // —— Settings ——
  "settings.title": "Settings",
  "settings.personal": "Personal",
  "settings.organization": "Organization",
  "settings.appearance": "Appearance",
  "settings.analytics": "Analytics",
  "settings.analyticsHelp": "Help improve OpenSEO",
  "settings.analyticsDesc": "Share analytics and usage data.",
  "settings.enableAnalytics": "Enable product analytics",
  "settings.analyticsUpdateFailed": "We couldn't update your analytics setting.",
  "settings.analyticsEnabled": "Analytics enabled",
  "settings.analyticsDisabled": "Analytics disabled",
  "settings.about": "About",
  "settings.apiKeys": "API keys",
  "settings.apiKeysLead": "Authenticate MCP clients when OAuth doesn't work",
  "settings.apiKeysDesc":
    "Use this for remote agents like Hermes where the normal login flow doesn't work.",
  "settings.apiKeyCreate": "Create API key",
  "settings.apiKeyName": "Key name",
  "settings.apiKeyNamePlaceholder": "e.g. Hermes laptop",
  "settings.apiKeyCreated": "API key created",
  "settings.apiKeyRevoked": "API key revoked",
  "settings.apiKeyCopy": "Copy key",
  "settings.apiKeyRevoke": "Revoke",
  "settings.apiKeyEmpty": "No API keys yet.",
  "settings.apiKeyLoadFailed": "Failed to load API keys",
  "settings.apiKeyCreateFailed": "Failed to create the key",
  "settings.apiKeyRevokeFailed": "Failed to revoke the key",
  "settings.apiKeyOnceWarning":
    "Copy this key now. You won't be able to see it again.",
  "settings.mcpEndpoint": "MCP endpoint",

  // —— Shell / DataForSEO setup ——
  "shell.seoWarning":
    "Setup needed: add your DataForSEO API key to use OpenSEO features. See the quick steps on the {helpLink}.",
  "shell.seoWarningHelp": "help page",
  "shell.seoStatusError":
    "We could not verify your DataForSEO setup. If features are not working, check the setup steps on the {helpLink}.",
  "shell.setupTitle": "One quick setup step",
  "shell.setupBody": "Add your DataForSEO API key to start using OpenSEO.",
  "shell.openSetupGuide": "Open setup guide",

  // —— Not found / catch ——
  "notFound.body": "The page you are looking for does not exist.",
  "errors.unauthenticated": "Please sign in and try again.",
  "errors.authConfigMissing":
    "OpenSEO auth is not configured. Follow the README setup steps for Cloudflare Access.",
  "errors.paymentRequired":
    "An active hosted subscription is required before you can use OpenSEO.",
  "errors.insufficientCredits":
    "You've run out of credits. Add more credits or upgrade your plan to continue.",
  "errors.forbidden": "You do not have access to this resource.",
  "errors.notFound": "The requested resource was not found.",
  "errors.auditCapacityReached":
    "You've reached audit capacity for your account. Delete old audits from your projects to start a new one.",
  "errors.auditPageLimitExceeded":
    "Free plan audits are limited to {max} pages. Upgrade to run larger audits.",
  "errors.auditAlreadyRunning":
    "You've reached the limit of audits running at once. Wait for one to finish or delete it before starting another.",
  "errors.validation": "Please check your input and try again.",
  "errors.crawlTargetBlocked":
    "This crawl target is blocked by security policy.",
  "errors.backlinksBilling":
    "The connected DataForSEO account has a billing or balance issue.",
  "errors.aiSearchBilling":
    "The connected DataForSEO account has a billing or balance issue.",
  "errors.dataforseoAuthFailed":
    "DataForSEO rejected the API key. Check that DATAFORSEO_API_KEY is the base64 of your DataForSEO login:password.",
  "errors.rateLimited": "Too many requests. Please wait and try again.",
  "errors.upstreamUnavailable":
    "The data provider is temporarily unavailable. Please retry in a moment.",
  "errors.conflict": "This request conflicts with existing data.",
  "errors.internal":
    "An unexpected error occurred. Please check server logs and try again.",

  // —— Auth ——
  "auth.continueWithEmail": "Continue with email",
  "auth.continueWithGoogle": "Continue with Google",
  "auth.openingGoogle": "Opening Google...",
  "auth.signInTitle": "Sign in",
  "auth.signUpTitle": "Create account",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.forgotPassword": "Forgot password?",
  "auth.noAccount": "Don't have an account?",
  "auth.hasAccount": "Already have an account?",
  "auth.signUpLink": "Sign up",
  "auth.signInLink": "Sign in",
  "auth.invalidEmail": "Enter a valid email address.",
  "auth.enterPassword": "Enter your password.",

  // —— Onboarding ——
  "onboarding.stepOf": "Step {step} of {total}",
  "onboarding.interestsTitle": "What brings you here?",
  "onboarding.interestsDesc": "Pick up to three things you want to work on.",
  "onboarding.workForTitle": "Who are you doing SEO for?",
  "onboarding.clientSitesLabel": "About how many client sites do you work on?",
  "onboarding.sourceTitle": "How did you find OpenSEO?",
  "onboarding.finish": "Finish",
  "onboarding.option.AI workflows with Claude or Codex (MCP)":
    "AI Workflows (MCP + Skills)",
  "onboarding.option.Keyword research": "Keyword research",
  "onboarding.option.Competitor research": "Competitor research",
  "onboarding.option.Backlink analysis": "Backlink analysis",
  "onboarding.option.Site audits": "Site audits",
  "onboarding.option.Rank tracking": "Rank tracking",
  "onboarding.option.Other": "Other",
  "onboarding.option.My own startup or business": "My Own Business",
  "onboarding.option.My clients": "My clients",
  "onboarding.option.My employer's website": "My Company's Website",
  "onboarding.option.My own side project": "My own side project",
  "onboarding.option.I'm exploring before choosing a project":
    "I'm exploring before choosing a project",
  "onboarding.option.1–3": "1–3",
  "onboarding.option.4–10": "4–10",
  "onboarding.option.11–25": "11–25",
  "onboarding.option.25+": "25+",
  "onboarding.option.Google": "Google",
  "onboarding.option.X / Twitter": "X / Twitter",
  "onboarding.option.GitHub": "GitHub",
  "onboarding.option.Instagram": "Instagram",
  "onboarding.option.YouTube": "YouTube",
  "onboarding.option.Friend or colleague": "Friend or colleague",
  "onboarding.option.AI (Claude, ChatGPT, etc)": "AI (Claude, ChatGPT, etc)",
  "onboarding.option.Product Hunt": "Product Hunt",

  // —— Dashboard ——
  "dashboard.title": "Dashboard",
  "dashboard.loadError": "Couldn't load dashboard.",

  // —— Projects ——
  "projects.switcher": "Projects",
  "projects.new": "New project",
  "projects.empty": "No projects yet",

  // —— Support ——
  "support.title": "Help & Community",

  "settings.apiKeySetupGuide": "Setup guide",
  "settings.apiKeyLoadError": "We couldn't load your API keys.",
  "settings.apiKeyNameCol": "Name",
  "settings.apiKeyKeyCol": "Key",
  "settings.apiKeyCreatedCol": "Created",
  "settings.apiKeyLastUsedCol": "Last used",
  "settings.apiKeyNever": "Never",
  "settings.apiKeyUnnamed": "Unnamed key",
  "settings.apiKeyRevokeConfirm": "Revoke \"{name}\"? Clients using it will stop working.",
  "settings.apiKeyRevokeAction": "Revoke key",
  "settings.apiKeyCopyTitle": "Copy your new API key",
  "settings.apiKeyCopyHint": "It won't be shown again. Send it as Authorization: Bearer to the MCP endpoint.",
  "settings.apiKeyCopied": "API key copied",
  "settings.apiKeyDone": "Done",
  "settings.apiKeyCreating": "Creating…",
  "settings.apiKeyNameExample": "Claude Code on laptop",
  "onboarding.progress": "Onboarding progress",
} as const;

export type MessageKey = keyof typeof en;
export type MessageCatalog = Record<MessageKey, string>;
