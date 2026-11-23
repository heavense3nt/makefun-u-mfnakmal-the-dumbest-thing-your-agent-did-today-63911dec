// The Dumbest Thing Your Agent Did Today — one line, max 200 chars.
// Writes the line to /output/entry.txt (MAKEFUN_OUTPUT_DIR when absolute,
// otherwise <repoRoot>/out). No trailing newline, deterministic output.
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "My agent spent 40 minutes fixing a bug, then deleted the file the bug lived in and marked the bug as fixed.";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

// Gate: the entry must be 1-200 chars of non-blank UTF-8 text.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  console.error(`entry line out of gate: ${LINE.length} chars`);
  process.exit(1);
}
const destinationDir = isAbsolute(outputDir)
  ? outputDir
  : join(repoRoot, outputDir);

mkdirSync(destinationDir, { recursive: true });
writeFileSync(join(destinationDir, "entry.txt"), LINE, "utf8");
console.log(`entry.txt written (${LINE.length} chars)`);
