import { describe, expect, it } from "vitest";
import { isDataforseoAutoSpendDisabled } from "./dataforseo-auto-spend";

describe("isDataforseoAutoSpendDisabled", () => {
  it("is off when unset", () => {
    expect(isDataforseoAutoSpendDisabled(undefined)).toBe(false);
    expect(isDataforseoAutoSpendDisabled(null)).toBe(false);
    expect(isDataforseoAutoSpendDisabled("")).toBe(false);
  });

  it("disables on typical truthy kill-switch values", () => {
    expect(isDataforseoAutoSpendDisabled("1")).toBe(true);
    expect(isDataforseoAutoSpendDisabled("true")).toBe(true);
    expect(isDataforseoAutoSpendDisabled("yes")).toBe(true);
  });

  it("stays enabled for explicit off strings", () => {
    expect(isDataforseoAutoSpendDisabled("0")).toBe(false);
    expect(isDataforseoAutoSpendDisabled("false")).toBe(false);
    expect(isDataforseoAutoSpendDisabled("no")).toBe(false);
    expect(isDataforseoAutoSpendDisabled("OFF")).toBe(false);
  });
});
