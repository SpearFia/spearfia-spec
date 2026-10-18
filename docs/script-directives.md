# Script directives

A Spear Fia script is a plain Markdown file (`script/script.md`) with YAML front matter
(validated by `schemas/script.schema.json`) and inline directives in the body. It stays
readable and editable in any text editor; Spear Fia watches it for external edits and
writes it back without disturbing anything it did not change.

## Structure

- `## Heading` starts a section. A section can carry directives on its heading line.
- Plain text is spoken script (voiceover or dialogue).
- Directives follow the [generic directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444)
  syntax used by remark-directive: `:name[label]{attributes}`.

## Directives

| Directive | Meaning | Example |
| --- | --- | --- |
| `:sfx[name]` | Sound effect at this point | `:sfx[record-scratch]{#s1}` |
| `:music{...}` | Music cue from here until the next music cue | `:music{mood=tense #m1}` |
| `:transition[name]` | Transition between the surrounding clips | `:transition[whip-pan]{duration=0.4 #t1}` |
| `:clip[path]` | Use this footage, with optional `in` / `out` timecodes | `:clip[footage/day1.mp4]{in=00:01:12 out=00:01:20 #c1}` |
| `:look[recipe]` | Apply a recipe (look) | `:look[facecam-pip]{position=bottom-left #l1}` |
| `:vision{...}` | Override the vision for this section only | `:vision{pacing.avg_shot_seconds=1.2}` |

## IDs

`{#id}` gives a cue a stable ID. IDs are what make two-way sync with the editor work:
the ID is stored in the timeline item's metadata, so edits in FilmCraft map back to the
right line of the script. Spear Fia adds an ID to any cue that lacks one the first time
it syncs. IDs must be unique within a script and match `^[A-Za-z][A-Za-z0-9_-]*$`.

## Attributes

- `key=value`, with values quoted when they contain spaces: `mood="slow build"`.
- Durations are seconds (`duration=0.4`); timecodes are `HH:MM:SS` or `HH:MM:SS:FF`.

TODO: formal grammar, escaping rules, and the full attribute list per directive.
