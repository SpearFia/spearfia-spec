# Production execution formats (draft v1)

Licensed under MIT OR Apache-2.0.

These draft schemas extend [stage coordination](production.md). Each has a corresponding
example directory. Structural schema validation is complemented by runtime invariants.

| Schema | Project location | Meaning |
| --- | --- | --- |
| `production-jobs` | `production/jobs.json` | Stable job IDs, stage, dependency DAG, declared inputs, tagged adapter task and output checks |
| `production-jobs-state` | `sync/production/jobs.json` | Attempts, fingerprints, service IDs, seed, progress message, proofs and registration IDs |
| `word-alignment` | `analysis/*.alignment.json` | Exact script revision/audio hash and measured word frame intervals |
| `production-style` | `production/style.json`, or channel `execution.md` fenced `spearfia-style` JSON | Caption grouping/appearance/animation, audio mix and recipes |
| `visual-execution` | JSON string in Visual Script `details.execution` | Timed text, shape/media layers, native effects, recipes and camera move |
| `render-plan` | `sync/render-plans/<plan-id>.json` | Resolved graphics, captions, effect bindings and saved style for a review push |

## Job semantics

Jobs are unique, bounded IDs with dependencies on existing IDs; cycles are invalid.
Adapters are `voiceover`, `comfyui`, `alignment`, `command` and `agent`. Media outputs
include kind, project-relative path and optional paired role/narration anchor. ComfyUI
outputs select a node and zero-based index. `{key}` expands to the request fingerprint
prefix. `job:<id>:<output-index>` inputs require an explicit dependency and select its
verified ordinary artifact; virtual verification proofs cannot be used as filesystem paths.
Keep actual API workflows and executable arguments in the plan, not inferred tool names.

States are `pending`, `waiting`, `submitting`, `running`, `complete`, `failed`, `uncertain`,
`cancelled` and `needs-input`. Complete requires verified artifacts/checks and successful
registration, not merely a provider's success flag. Input/dependency changes invalidate
the request key; changed outputs invalidate reuse. Missing links can be repaired locally.
Verified downloads persist before local registration so a retry need not resubmit work.

Save request identity before submission and provider ID as soon as received. Unexplained
submission outcomes remain uncertain and must be reconciled before another request.
Deleting or changing an unresolved job definition is invalid. ComfyUI request markers and
prompt IDs support recovery; VoiceStudio ordinary synchronous TTS uses a saved seed and
unique retained-history match. A missing record is not proof that a request never ran.
Cancellation may leave an external job running; preserve its identity. Do not send shared
global service interrupts when cancelling one project. Creator review gates remain in
the outer stage run, not in agent assertions.

`production-pipeline` adds `jobs` (with `stage`), `alignment`, and `captions` checks.
Implementations retain stable proof signatures so resumed stage runs invalidate when
the underlying artifacts, alignment or caption style change.

## Timing and executable treatments

Frame intervals are half-open, with rational `num/den` frame rates. Alignment word
`line` is a zero-based source line, while `word` indexes cleaned visible words on that
line. Do not confuse source line numbers with indexes into a heading-free line list.
Source hashes use `sha256:<hex>`. Script revisions use the application's content revision.
Word records must be unique, chronological, within source duration and match saved text.
Transcription is a clock, not the text: words it hears exactly anchor the timing. A
short misheard run (at most 8 consecutive words, and at most 20% of the words) is placed
between its measured neighbours by character length and marked `"estimated": true`.
Filler the audio adds beyond the script is ignored up to 15% of heard words. Larger
divergence, reordering beyond a 12-word resync window, or invalid times fail.

Caption grouping respects line boundaries, punctuation, gap/word/character limits and
words per line. `word` mode produces phrase states with active-word character ranges;
`group` produces phrase spans. Active ranges count Unicode characters, not UTF-8 bytes.
The render plan provides an executable intermediate representation; the FilmCraft adapter
currently emits editable native graphics and keyframes.

Visual treatment offsets are relative to the resolved cue's measured narration interval.
Layer positions and sizes are normalized; text font size is pixels at target resolution;
opacity and camera zoom use percentages. Layers start at V4 to preserve linked V1–V3;
captions use a separate top track. Split picture clips retain source offsets and native
transition attachments. Sample numeric animation curves at split boundaries, rather than
restarting the entire move on each resulting clip.

Recipes retain the existing recipe format. A supported native capability such as
`filmcraft/motion#apply` maps to an actual editor effect. A descriptor file alone does
not establish runtime availability. Missing mappings, unsupported analysis requirements
and unresolved prose graphics/actions must be reported before claiming completed assembly.
Audio values are dB clip gains, fade seconds, duck depth, attack and release; implementations
apply them to actual mixer automation, not just track placement. Keep editorial/listening
review, mastering, plugin installation and publishing outside these format guarantees.
