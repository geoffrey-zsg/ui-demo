import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("app/page.tsx tab state architecture", () => {
  it("keeps tab state outside nested section components", () => {
    const filePath = path.join(process.cwd(), "app", "page.tsx");
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /const\s+General\s*=\s*\(\)\s*=>\s*\{[\s\S]*?const\s+\[tab,\s*setTab\]\s*=\s*useState\(/);
    assert.doesNotMatch(source, /const\s+Form\s*=\s*\(\)\s*=>\s*\{[\s\S]*?const\s+\[tab,\s*setTab\]\s*=\s*useState\(/);
    assert.doesNotMatch(source, /const\s+Feedback\s*=\s*\(\)\s*=>\s*\{[\s\S]*?const\s+\[tab,\s*setTab\]\s*=\s*useState\(/);
    assert.doesNotMatch(source, /const\s+Data\s*=\s*\(\)\s*=>\s*\{[\s\S]*?const\s+\[tab,\s*setTab\]\s*=\s*useState\(/);

    assert.match(source, /const\s+\[generalTab,\s*setGeneralTab\]\s*=\s*useState\(/);
    assert.match(source, /const\s+\[formTab,\s*setFormTab\]\s*=\s*useState\(/);
    assert.match(source, /const\s+\[feedbackTab,\s*setFeedbackTab\]\s*=\s*useState\(/);
    assert.match(source, /const\s+\[dataTab,\s*setDataTab\]\s*=\s*useState\(/);
  });
});
