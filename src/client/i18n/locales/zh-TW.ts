import type { MessageCatalog } from "./en";

/**
 * Traditional Chinese (Taiwan) — zh-TW / zh-Hant-TW.
 * Brand names left untranslated: OpenSEO, DataForSEO, Cloudflare, Google, MCP, GSC, GA4, Hermes, …
 */
export const zhTW: MessageCatalog = {
  // —— Common ——
  "common.loading": "載入中…",
  "common.save": "儲存",
  "common.cancel": "取消",
  "common.delete": "刪除",
  "common.create": "建立",
  "common.continue": "繼續",
  "common.back": "返回",
  "common.next": "下一步",
  "common.skip": "略過",
  "common.dismiss": "關閉",
  "common.close": "關閉",
  "common.search": "搜尋",
  "common.retry": "重試",
  "common.signOut": "登出",
  "common.signIn": "登入",
  "common.version": "版本",
  "common.openMenu": "開啟選單",
  "common.closeSidebar": "關閉側邊欄",
  "common.openAccountMenu": "開啟帳號選單",
  "common.other": "其他",
  "common.yes": "是",
  "common.no": "否",

  // —— Nav ——
  "nav.overview": "總覽",
  "nav.research": "研究",
  "nav.mySite": "我的網站",
  "nav.connect": "連線",
  "nav.dashboard": "儀表板",
  "nav.keywordResearch": "關鍵字研究",
  "nav.savedKeywords": "已儲存關鍵字",
  "nav.rankTracking": "排名追蹤",
  "nav.gscInsights": "GSC 洞察",
  "nav.domainOverview": "網域總覽",
  "nav.backlinks": "反向連結",
  "nav.siteAudit": "網站稽核",
  "nav.brandLookup": "品牌查詢",
  "nav.promptExplorer": "提示詞探索",
  "nav.aiMcp": "AI 與 MCP",
  "nav.helpCommunity": "說明與社群",
  "nav.settings": "設定",
  "nav.billing": "帳單",
  "nav.browse": "瀏覽",
  "nav.chat": "聊天",
  "nav.organization": "組織",

  // —— Theme ——
  "theme.title": "主題",
  "theme.preference": "主題偏好",
  "theme.system": "系統",
  "theme.light": "淺色",
  "theme.dark": "深色",

  // —— Language ——
  "language.title": "語言",
  "language.preference": "語言偏好",
  "language.system": "系統",
  "language.en": "English",
  "language.zhTW": "繁體中文",

  // —— Settings ——
  "settings.title": "設定",
  "settings.personal": "個人",
  "settings.organization": "組織",
  "settings.appearance": "外觀",
  "settings.analytics": "分析",
  "settings.analyticsHelp": "協助改善 OpenSEO",
  "settings.analyticsDesc": "分享分析與使用資料。",
  "settings.enableAnalytics": "啟用產品分析",
  "settings.analyticsUpdateFailed": "無法更新分析設定。",
  "settings.analyticsEnabled": "已啟用分析",
  "settings.analyticsDisabled": "已停用分析",
  "settings.about": "關於",
  "settings.apiKeys": "API 金鑰",
  "settings.apiKeysLead": "在 OAuth 無法運作時驗證 MCP 用戶端",
  "settings.apiKeysDesc":
    "適用於 Hermes 等遠端代理，一般登入流程無法使用時請用此方式。",
  "settings.apiKeyCreate": "建立 API 金鑰",
  "settings.apiKeyName": "金鑰名稱",
  "settings.apiKeyNamePlaceholder": "例如：Hermes 筆電",
  "settings.apiKeyCreated": "已建立 API 金鑰",
  "settings.apiKeyRevoked": "已撤銷 API 金鑰",
  "settings.apiKeyCopy": "複製金鑰",
  "settings.apiKeyRevoke": "撤銷",
  "settings.apiKeyEmpty": "尚無 API 金鑰。",
  "settings.apiKeyLoadFailed": "無法載入 API 金鑰",
  "settings.apiKeyCreateFailed": "無法建立金鑰",
  "settings.apiKeyRevokeFailed": "無法撤銷金鑰",
  "settings.apiKeyOnceWarning": "請立即複製此金鑰。之後將無法再次查看。",
  "settings.mcpEndpoint": "MCP 端點",

  // —— Shell ——
  "shell.seoWarning":
    "需要設定：請加入 DataForSEO API 金鑰才能使用 OpenSEO 功能。請參閱{helpLink}上的快速步驟。",
  "shell.seoWarningHelp": "說明頁面",
  "shell.seoStatusError":
    "無法驗證你的 DataForSEO 設定。若功能無法使用，請查看{helpLink}上的設定步驟。",
  "shell.setupTitle": "還差一個快速設定步驟",
  "shell.setupBody": "加入 DataForSEO API 金鑰即可開始使用 OpenSEO。",
  "shell.openSetupGuide": "開啟設定指南",

  // —— Not found / errors ——
  "notFound.body": "找不到你要查看的頁面。",
  "errors.unauthenticated": "請先登入後再試一次。",
  "errors.authConfigMissing":
    "尚未設定 OpenSEO 驗證。請依照 README 完成 Cloudflare Access 設定。",
  "errors.paymentRequired": "使用 OpenSEO 前需要有效的託管訂閱。",
  "errors.insufficientCredits":
    "點數已用完。請加購點數或升級方案以繼續使用。",
  "errors.forbidden": "你沒有存取此資源的權限。",
  "errors.notFound": "找不到要求的資源。",
  "errors.auditCapacityReached":
    "已達帳號的稽核容量上限。請從專案中刪除舊的稽核後再開始新的稽核。",
  "errors.auditPageLimitExceeded":
    "免費方案的稽核上限為 {max} 頁。請升級以執行更大的稽核。",
  "errors.auditAlreadyRunning":
    "同時執行的稽核已達上限。請等待現有稽核完成，或刪除後再開始新的。",
  "errors.validation": "請檢查輸入內容後再試一次。",
  "errors.crawlTargetBlocked": "此爬取目標已被安全政策封鎖。",
  "errors.backlinksBilling": "已連線的 DataForSEO 帳號有帳單或餘額問題。",
  "errors.aiSearchBilling": "已連線的 DataForSEO 帳號有帳單或餘額問題。",
  "errors.dataforseoAuthFailed":
    "DataForSEO 拒絕了此 API 金鑰。請確認 DATAFORSEO_API_KEY 是 DataForSEO 登入帳號:密碼 的 base64。",
  "errors.rateLimited": "請求過於頻繁。請稍候再試。",
  "errors.upstreamUnavailable": "資料供應商暫時無法使用。請稍後再試。",
  "errors.conflict": "此請求與現有資料衝突。",
  "errors.internal": "發生未預期的錯誤。請檢查伺服器日誌後再試一次。",

  // —— Auth ——
  "auth.continueWithEmail": "使用電子郵件繼續",
  "auth.continueWithGoogle": "使用 Google 繼續",
  "auth.openingGoogle": "正在開啟 Google…",
  "auth.signInTitle": "登入",
  "auth.signUpTitle": "建立帳號",
  "auth.email": "電子郵件",
  "auth.password": "密碼",
  "auth.forgotPassword": "忘記密碼？",
  "auth.noAccount": "還沒有帳號？",
  "auth.hasAccount": "已經有帳號了？",
  "auth.signUpLink": "註冊",
  "auth.signInLink": "登入",
  "auth.invalidEmail": "請輸入有效的電子郵件地址。",
  "auth.enterPassword": "請輸入密碼。",

  // —— Onboarding ——
  "onboarding.stepOf": "第 {step} 步，共 {total} 步",
  "onboarding.interestsTitle": "你來這裡的目的是？",
  "onboarding.interestsDesc": "最多選擇三項想處理的工作。",
  "onboarding.workForTitle": "你為誰做 SEO？",
  "onboarding.clientSitesLabel": "大約管理幾個客戶網站？",
  "onboarding.sourceTitle": "你是怎麼發現 OpenSEO 的？",
  "onboarding.finish": "完成",
  "onboarding.option.AI workflows with Claude or Codex (MCP)":
    "AI 工作流程（MCP + Skills）",
  "onboarding.option.Keyword research": "關鍵字研究",
  "onboarding.option.Competitor research": "競爭對手研究",
  "onboarding.option.Backlink analysis": "反向連結分析",
  "onboarding.option.Site audits": "網站稽核",
  "onboarding.option.Rank tracking": "排名追蹤",
  "onboarding.option.Other": "其他",
  "onboarding.option.My own startup or business": "自己的事業",
  "onboarding.option.My clients": "我的客戶",
  "onboarding.option.My employer's website": "公司網站",
  "onboarding.option.My own side project": "自己的側邊專案",
  "onboarding.option.I'm exploring before choosing a project":
    "還在探索、尚未選定專案",
  "onboarding.option.1–3": "1–3",
  "onboarding.option.4–10": "4–10",
  "onboarding.option.11–25": "11–25",
  "onboarding.option.25+": "25+",
  "onboarding.option.Google": "Google",
  "onboarding.option.X / Twitter": "X / Twitter",
  "onboarding.option.GitHub": "GitHub",
  "onboarding.option.Instagram": "Instagram",
  "onboarding.option.YouTube": "YouTube",
  "onboarding.option.Friend or colleague": "朋友或同事",
  "onboarding.option.AI (Claude, ChatGPT, etc)": "AI（Claude、ChatGPT 等）",
  "onboarding.option.Product Hunt": "Product Hunt",

  // —— Dashboard ——
  "dashboard.title": "儀表板",
  "dashboard.loadError": "無法載入儀表板。",

  // —— Projects ——
  "projects.switcher": "專案",
  "projects.new": "新增專案",
  "projects.empty": "尚無專案",

  // —— Support ——
  "support.title": "說明與社群",
  "settings.apiKeySetupGuide": "設定指南",
  "settings.apiKeyLoadError": "無法載入 API 金鑰。",
  "settings.apiKeyNameCol": "名稱",
  "settings.apiKeyKeyCol": "金鑰",
  "settings.apiKeyCreatedCol": "建立時間",
  "settings.apiKeyLastUsedCol": "上次使用",
  "settings.apiKeyNever": "從未使用",
  "settings.apiKeyUnnamed": "未命名金鑰",
  "settings.apiKeyRevokeConfirm": "要撤銷「{name}」嗎？使用此金鑰的用戶端將無法繼續運作。",
  "settings.apiKeyRevokeAction": "撤銷金鑰",
  "settings.apiKeyCopyTitle": "複製你的新 API 金鑰",
  "settings.apiKeyCopyHint": "之後不會再顯示。請以 Authorization: Bearer 方式傳送到 MCP 端點。",
  "settings.apiKeyCopied": "已複製 API 金鑰",
  "settings.apiKeyDone": "完成",
  "settings.apiKeyCreating": "建立中…",
  "settings.apiKeyNameExample": "筆電上的 Claude Code",
  "onboarding.progress": "導覽進度",

};
