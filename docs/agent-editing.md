# Agent editing v1

`document-edit.schema.json` describes a half-open UTF-8 byte range replacement in the
saved narration. `visual-edit.schema.json` describes typed visual cue operations.
Transport envelopes add required opaque `expected_revision` and, for visual edits,
`script_revision` tokens returned by the same server's document reads. The server binds
all operations to one project, compares exact saved bytes before a write, and rejects
unknown fields, invalid boundaries, stale revisions and attempts to write approval files.
Visual updates retain unknown metadata; omitted patch fields remain unchanged. Details
merge by key; an explicit references list replaces the cue's list. Binding adds one reference.
Editing a cue's instructions resets its review to draft unless an explicit review is supplied.
Split offsets are absolute visual-document bytes; narration offsets refer to the saved script.
Undo/redo is bounded, in-memory server-session history and refuses external changes.
The desktop notices clean external changes and puts them into its document undo history.
Production approval is a separate creator action and is never an agent editing operation.
