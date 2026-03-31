import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("app/page.tsx section component architecture", () => {
  it("keeps content sections outside Home to preserve interactive component identity", () => {
    const filePath = path.join(process.cwd(), "app", "page.tsx");
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+Overview\s*=\s*\(/);
    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+General\s*=\s*\(/);
    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+Form\s*=\s*\(/);
    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+Feedback\s*=\s*\(/);
    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+Data\s*=\s*\(/);
    assert.doesNotMatch(source, /export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?const\s+Nav\s*=\s*\(/);
  });
});
