import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_LOCALE_PREFERENCE,
  getActiveLocale,
  getLocalePreference,
  matchBrowserLocale,
  resolveLocale,
  setLocalePreference,
} from "./locale";
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

describe("default locale preference", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    try {
      window.localStorage.removeItem("locale-preference");
    } catch {
      // ignore
    }
  });

  it("defaults to zh-TW when localStorage has no preference", () => {
    expect(DEFAULT_LOCALE_PREFERENCE).toBe("zh-TW");
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    });
    vi.stubGlobal("navigator", {
      languages: ["en-US", "zh-TW"],
      language: "en-US",
    });

    expect(getLocalePreference()).toBe("zh-TW");
    expect(getActiveLocale()).toBe("zh-TW");
    // System still follows the browser when chosen explicitly.
    expect(resolveLocale("system")).toBe("en");
  });

  it("persists System distinctly from the first-visit default", () => {
    const store = new Map<string, string>();
    const localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };
    vi.stubGlobal("localStorage", localStorage);
    vi.stubGlobal("window", {
      localStorage,
      dispatchEvent: () => true,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    vi.stubGlobal("navigator", {
      languages: ["en-US"],
      language: "en-US",
    });
    vi.stubGlobal("document", {
      documentElement: { lang: "" },
    });

    setLocalePreference("system");
    expect(store.get("locale-preference")).toBe("system");
    expect(getLocalePreference()).toBe("system");
    expect(getActiveLocale()).toBe("en");

    setLocalePreference("en");
    expect(getActiveLocale()).toBe("en");

    setLocalePreference("zh-TW");
    expect(getActiveLocale()).toBe("zh-TW");
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
