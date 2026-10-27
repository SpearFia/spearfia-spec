# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Draft production pipeline, run checkpoint and agent report formats for CLI agent
  coordination, output verification, creator gates and interruption recovery.

- Initial repository scaffold.
- `docs/script-directives.md`: where an `:sfx` cue plays: on a spoken word, on the cut into
  or out of a line, on a line of its own, on an on-screen line, or as a section starts.
  What counts as a word, how cues sit next to styled spans, and how labels name catalog
  sounds.
- `examples/script/script.md` shows each sound effect placement.
- Visual Script v1: non-spoken Markdown cues, stable narration anchors, production details, references and review states, with a schema and example.
- Agent editing v1: UTF-8 range replacements and typed visual cue operations, with schemas and examples.
