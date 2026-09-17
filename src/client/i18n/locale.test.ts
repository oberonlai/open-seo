import { describe, expect, it } from "vitest";
import { matchBrowserLocale } from "./locale";
import { translate } from "./translate";

describe("matchBrowserLocale", () => {
  it("maps Traditional Chinese tags to zh-TW", () => {
    expect(matchBrowserLocale(["zh-TW"])).toBe("zh-TW");
    expect(matchBrowserLocale(["zh-Hant"])).toBe("zh-TW");
    expect(matchBrowserLocale(["zh-Hant-TW"])).toBe("zh-TW");
    expect(matchBrowserLocale(["zh-HK"])).toBe("zh-TW");
    expect(matchBrowserLocale(["zh"])).toBe("zh-TW");
  });

  it("does not treat Simplified Chinese as zh-TW", () => {
    expect(matchBrowserLocale(["zh-CN"])).toBe("en");
    expect(matchBrowserLocale(["zh-Hans"])).toBe("en");
    expect(matchBrowserLocale(["zh-CN", "en-US"])).toBe("en");
  });

  it("falls back to English", () => {
    expect(matchBrowserLocale(["fr-FR"])).toBe("en");
    expect(matchBrowserLocale([])).toBe("en");
    expect(matchBrowserLocale(undefined)).toBe("en");
  });

  it("prefers earlier matching languages", () => {
    expect(matchBrowserLocale(["en-US", "zh-TW"])).toBe("en");
    expect(matchBrowserLocale(["zh-TW", "en-US"])).toBe("zh-TW");
  });
});

describe("translate", () => {
  it("returns English by default catalog", () => {
    expect(translate("nav.dashboard", undefined, "en")).toBe("Dashboard");
  });

  it("returns Traditional Chinese for zh-TW", () => {
    expect(translate("nav.dashboard", undefined, "zh-TW")).toBe("儀表板");
    expect(translate("nav.settings", undefined, "zh-TW")).toBe("設定");
  });

  it("interpolates params", () => {
    expect(
      translate("onboarding.stepOf", { step: 2, total: 5 }, "zh-TW"),
    ).toBe("第 2 步，共 5 步");
  });

  it("never uses Simplified characters for core chrome", () => {
    // 设定 / 仪表板 would be Simplified; Taiwan uses 設定 / 儀表板.
    expect(translate("nav.settings", undefined, "zh-TW")).not.toContain("设");
    expect(translate("nav.dashboard", undefined, "zh-TW")).not.toContain("仪");
  });
});
