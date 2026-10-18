// Validates the given files against one schema. Used by other repos' CI.
// Usage: node path/to/spearfia-spec/scripts/check.mjs <schema-name> <file>...
import { validator, report } from "./lib.mjs";

const [name, ...files] = process.argv.slice(2);
if (!name || files.length === 0) {
  console.error("usage: check.mjs <schema-name> <file>...");
  process.exit(2);
}
const validate = validator(name);
let failed = 0;
for (const f of files) if (!report(validate, f)) failed++;
process.exit(failed ? 1 : 0);
