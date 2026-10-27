# Visual Script v1

Visual Script is an optional Markdown document at `visuals/visuals.md`. Narration remains
in the project script. Visual directions are never spoken or timed by their word count.
The document begins with `# Visual Script`; each cue is a level-two heading followed by
one single-line `<!-- visual-cue {JSON} -->` record matching `visual-cue.schema.json`.
The heading is the editable title; the JSON ID is stable. Unknown prose and unknown JSON
properties must survive edits to other cues. Invalid/duplicate records are errors, never
permission to replace the document with an empty plan. Limits: 1 MiB/document, 1000 cues.

Cue bodies are ordinary Markdown. Paragraph prefixes are `VISUAL:`, `ACTION:`, `TEXT:`,
`GRAPHIC:`, `PROMPT:`, `CONTINUITY:` and `PRODUCTION NOTE:`. All are non-spoken. `### Shot …`
headings divide ordered shots within a cue. Supporting Markdown documents live next to
`visuals.md`. Comments use the existing document-relative comments file.

An anchor records the exact original script bytes, zero-based starting line, line count,
inherited VO/LIVE label, and up to 80 characters of preceding/following context. Resolve
exact unique passages first; context can disambiguate repeated passages. Never attach an
ambiguous quote silently. Changed/deleted passages remain issues with original text and
a candidate current passage, until an explicit reanchor. A reanchor resets review to draft.

`visual_type` describes the output; `method` describes how it is produced. `asset_state`
(missing/blocked/ready) and `review` (draft/awaiting/accepted/changes) are independent.
`timing` is a user label, not measured timing. Narration-based timings are estimates unless
recording analysis is available. `details` holds method-specific preparation instructions.
References identify role, path, exact revision/shot/frame and use/shared scope. Shared
scope describes intent; changing a reference never edits its external asset or template.

Splitting preserves the first ID and creates a new ID; merging preserves the first ID,
keeps both bodies/references and records the other metadata in `merged_cues`. Neither
operation implies approval. Cue sheet, storyboard, prompt pack and handoff are derived
from this document. Exported handoffs never grant production approval; production exports
must also pass the project's current script/channel approval gate.

```markdown
# Visual Script

## Garden conversation
<!-- visual-cue {"id":"v1","anchor":{"quote":"VO: Maya meets Jess.","line":2,"lines":1,"kind":"VO","before":"","after":""},"visual_type":"Character scene","method":"Remotion template","asset_state":"missing","review":"draft","timing":"","details":{},"references":[]} -->

VISUAL: Maya remains left; Jess remains right.
ACTION: On “bindweed”, show the root insert.
CONTINUITY: Keep clothing, gloves and camera position consistent.
```
