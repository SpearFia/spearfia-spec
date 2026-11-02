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
| `:sfx[name]` | Sound effect where it is written (see [Sound effects](#sound-effects)) | `:sfx[record-scratch]{#s1}` |
| `:music{...}` | Music cue from here until the next music cue | `:music{mood=tense #m1}` |
| `:transition[name]` | Transition between the surrounding clips | `:transition[whip-pan]{duration=0.4 #t1}` |
| `:clip[path]` | Use this footage, with optional `in` / `out` timecodes | `:clip[footage/day1.mp4]{in=00:01:12 out=00:01:20 #c1}` |
| `:look[recipe]` | Apply a recipe (look) | `:look[facecam-pip]{position=bottom-left #l1}` |
| `:vision{...}` | Override the vision for this section only | `:vision{pacing.avg_shot_seconds=1.2}` |

## Sound effects

An `:sfx` cue is a point in time: it plays where it is written. What that point is depends
on what the cue is written on.

| Written | Plays | Example |
| --- | --- | --- |
| Before a spoken word | On that word | `I spent :sfx[boom]{#s1} eight hours` |
| Before the first word of a spoken line | On the cut into the line | `:sfx[whoosh]{#s2} And then it happened.` |
| After the last word of a spoken line | As the line ends, on the cut out of it | `made me quit. :sfx[record-scratch]{#s3}` |
| On a line of its own | On the cut between the lines around it | `:sfx[whoosh]{#s4}` |
| Anywhere on an on-screen line (`[ON SCREEN: ...]`) | As the on-screen line starts | `[ON SCREEN: title card] :sfx[boom]{#s5}` |
| On a `##` heading | As the section starts | `## Chapter One :sfx[riser]{#s6}` |

Rules:

- **Words.** A word is a run of text without spaces outside directives. Inline marks
  (`**`, `*`, `++`, `~~`), the brackets and attributes of a styled span
  (`[words]{color=red}`), a `LIVE:` or `VO:` prefix and a paragraph override at the end
  of the line (`{align=center}`) are not words and never move a cue.
- **Styled words.** A cue for the first word of a styled span goes before the span's `[`,
  not inside it: `:sfx[boom]{#s1} [eight hours]{color=red}`.
- **On-screen lines.** An on-screen line must start with `[`, so a cue on it is written at
  the end. Where it sits on the line does not change when it plays.
- **Several cues at one point** play together, in the order they are written.
- **Labels** name a sound in the catalog by its asset ID (`spearfia/boom-impact@0.1.0`),
  the ID without the version, the short name (`boom-impact`) or the asset's `name`.
  Case is ignored, and `-`, `_` and a space are the same character, so `tire screech`
  names `tire-screech`. A tool may fall back to an asset whose `tags` include the label
  (`boom` → `boom-impact`), but should then suggest the exact name.
- **Timing.** Until footage is linked and analysed, a spoken line's length is estimated
  from its word count and its words are spread evenly over it; an on-screen line with no
  voice over it is estimated at 2 seconds. Real timings replace these, but the rules above
  stay the same: a cue is tied to its word, cut or section, not to a timestamp.

## IDs

`{#id}` gives a cue a stable ID. IDs are what make two-way sync with the editor work:
the ID is stored in the timeline item's metadata, so edits in FilmCraft map back to the
right line of the script. Spear Fia adds an ID to any cue that lacks one the first time
it syncs. IDs must be unique within a script and match `^[A-Za-z][A-Za-z0-9_-]*$`.

## Attributes

- `key=value`, with values quoted when they contain spaces: `mood="slow build"`.
- Durations are seconds (`duration=0.4`); timecodes are `HH:MM:SS` or `HH:MM:SS:FF`.

TODO: formal grammar, escaping rules, and the full attribute list per directive.
