import { describe, it, expect } from "vitest";
import { generateCodeName } from "@/lib/codename";

describe("generateCodeName", () => {
  it("generates a PascalCase string", () => {
    const codeName = generateCodeName();
    expect(codeName).toMatch(/^[A-Z][a-z]+[A-Z][a-z]+[A-Z][a-z]+$/);
  });

  it("generates a string with exactly 3 words concatenated", () => {
    const codeName = generateCodeName();
    // Count uppercase letters (each word starts with uppercase)
    const uppercaseCount = (codeName.match(/[A-Z]/g) || []).length;
    expect(uppercaseCount).toBe(3);
  });

  it("generates different codenames on multiple calls", () => {
    const codenames = new Set();
    for (let i = 0; i < 20; i++) {
      codenames.add(generateCodeName());
    }
    // With 3 word sets of ~40 words each, probability of 20 identical is negligible
    expect(codenames.size).toBeGreaterThan(1);
  });

  it("generates non-empty strings", () => {
    const codeName = generateCodeName();
    expect(codeName.length).toBeGreaterThan(0);
  });

  it("contains no spaces or special characters", () => {
    const codeName = generateCodeName();
    expect(codeName).not.toContain(" ");
    expect(codeName).not.toContain("-");
    expect(codeName).not.toContain("_");
  });
});
