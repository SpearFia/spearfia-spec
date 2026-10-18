// Validates every file in examples/<schema-name>/ against schemas/<schema-name>.schema.json.
// Usage: node scripts/validate.mjs [schemas-dir] [examples-dir]
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { validator, report, SCHEMAS_DIR } from "./lib.mjs";

const [schemasDir = SCHEMAS_DIR, examplesDir = "examples"] = process.argv.slice(2);
let failed = 0;
for (const name of readdirSync(schemasDir).filter((f) => f.endsWith(".schema.json"))) {
  const kind = name.replace(".schema.json", "");
  const dir = join(examplesDir, kind);
  let files;
  try { files = readdirSync(dir); } catch { console.error(`FAIL no examples for ${kind}`); failed++; continue; }
  for (const f of files) if (!report(validator(kind, schemasDir), join(dir, f))) failed++;
}
process.exit(failed ? 1 : 0);
