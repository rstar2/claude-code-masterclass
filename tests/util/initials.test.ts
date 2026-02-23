import { describe, it, expect } from "vitest";
import { getInitials } from "@/util/initials";

describe("getInitials", () => {
  it("extracts first letters from two-word name", () => {
    expect(getInitials("Rumen Neshev")).toBe("RN");
  });

  it("extracts first letter from single-word name", () => {
    expect(getInitials("Rumen")).toBe("R");
  });

  it("extracts first and last letters from multi-word name", () => {
    expect(getInitials("John Middle Doe")).toBe("JD");
  });

  it("extracts first and last letters from long name", () => {
    expect(getInitials("Rumen Middle Neshev")).toBe("RN");
  });

  it("converts to uppercase", () => {
    expect(getInitials("alice smith")).toBe("AS");
  });

  it("respects custom maxLength", () => {
    expect(getInitials("John Doe", 1)).toBe("J");
  });

  it("handles empty string", () => {
    expect(getInitials("")).toBe("");
  });
});
