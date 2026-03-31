import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("app/page.tsx feedback dialog triggers", () => {
  it("renders dialog and alert dialog triggers with Button render prop instead of nested button elements", () => {
    const filePath = path.join(process.cwd(), "app", "page.tsx");
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /<DialogTrigger>\s*<Button>/);
    assert.doesNotMatch(source, /<AlertDialogTrigger>\s*<Button/);
    assert.match(source, /<DialogTrigger\s+render=\{<Button>打开对话框<\/Button>\}\s*\/>/);
    assert.match(source, /<AlertDialogTrigger\s+render=\{<Button variant="destructive">删除确认<\/Button>\}\s*\/>/);
  });
});
