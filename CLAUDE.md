# spearfia-spec

Open formats for Spear Fia: script, asset, project, vision, recipe, analysis, timeline plan.

## Layout

- `schemas/`: one JSON Schema (draft 2020-12) per format. These are the source of truth.
- `examples/<schema>/`: at least one valid example per schema. `.md` examples are
  validated by their front matter.
- `docs/`: `script-directives.md` (script body syntax), `versioning.md` (rules for changes).
- `scripts/validate.mjs`: validates `examples/` against `schemas/`; CI runs it.
- `scripts/check.mjs <schema> <files...>`: validates other repos' files (plugins, starter-pack CI use it).

## Commands

```powershell
pnpm install
pnpm validate
```

Every schema change needs a matching example change, and `pnpm validate` must pass.
Follow `docs/versioning.md`: never break a published version.

## Naming

| Context | Form |
| --- | --- |
| Prose, UI, README titles | Spear Fia |
| GitHub org, URLs, crates, packages, IDs | `spearfia` |
| Rust crates | `spearfia-<name>` |
| npm packages | `@spearfia/<name>` |
| Asset and plugin IDs | `spearfia/<asset>@<semver>`, e.g. `spearfia/focus-loupe@0.1.0` |
| Schema IDs | `https://spearfia.dev/schemas/<name>/v1.json` |

Never write the second word of the name in all capitals.

## Rules

- Never commit media. Media lives on the external drive, not under `C:\dev`.
- The schemas in `spearfia/spearfia-spec` are the source of truth for every format.
  Change the schema there first, then the code or data that uses it.
- `main` is protected: work on `feat/`, `fix/` or `exp/` branches and open a PR.
- New files are dual licensed MIT OR Apache-2.0.
