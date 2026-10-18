// Shared by validate.mjs and check.mjs: an Ajv instance and a loader for .json/.yaml/.md files.
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse as parseYaml } from "yaml";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const SCHEMAS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "schemas");

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const compiled = new Map();

export function validator(name, schemasDir = SCHEMAS_DIR) {
  const file = join(schemasDir, `${name}.schema.json`);
  if (!compiled.has(file)) compiled.set(file, ajv.compile(JSON.parse(readFileSync(file, "utf8"))));
  return compiled.get(file);
}

// .json and .yaml files are loaded whole; .md files by their YAML front matter.
export function load(file) {
  const text = readFileSync(file, "utf8");
  if (file.endsWith(".json")) return JSON.parse(text);
  if (file.endsWith(".md")) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) throw new Error(`${file}: no front matter`);
    return parseYaml(m[1]);
  }
  return parseYaml(text);
}

// Returns true when valid; prints the result either way.
export function report(validate, file) {
  if (validate(load(file))) { console.log(`ok   ${file}`); return true; }
  console.error(`FAIL ${file}`);
  for (const e of validate.errors) console.error(`     ${e.instancePath || "/"} ${e.message}`);
  return false;
}
