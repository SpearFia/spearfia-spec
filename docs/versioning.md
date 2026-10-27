# Versioning

Each schema has an ID of the form `https://spearfia.dev/schemas/<name>/v<N>.json`.

## Rules

1. **Never break a published `vN`.** Once a version is published, files that were valid
   against it stay valid forever.
2. **Breaking changes get a new version.** Add `vN+1` alongside `vN`; do not replace it.
   Tools read every version they support and write the newest.
3. **Additive changes are allowed within a version** while it is a draft: new optional
   fields, new enum values, looser constraints.
4. **Drafts are open.** Draft schemas set `additionalProperties: true` so producers can
   experiment. A schema is published when its `$comment` TODOs are resolved.

## Status

| Schema | Version | Status |
| --- | --- | --- |
| script | v1 | draft |
| asset | v1 | draft |
| project | v1 | draft |
| vision | v1 | draft |
| recipe | v1 | draft |
| analysis | v1 | draft |
| timeline-plan | v1 | draft |
| links | v1 | draft |
