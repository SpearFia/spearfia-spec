# CLI production coordination (draft v1)

Licensed under MIT OR Apache-2.0.

`production/pipeline.json` uses `production-pipeline`: an ordered list of stages with
Claude Code or Codex assignments, optional exact model/effort strings, instructions,
timeouts, network access and extra writable folders (`network`, `writable_dirs`; off
and empty by default), production approval requirements, review gates and output checks. Empty model
and executable strings inherit the installed CLI's configuration/discovery. IDs are unique.
File checks name project-relative files, without traversal, aliases outside the project,
or approval/run/config records. Link checks require a minimum count of valid, existing
files of a role and optionally every spoken line covered. Visual checks require at least
one cue and resolved narration attachments. FilmCraft checks require a new review project
with its matching timeline plan and snapshot. These checks establish structural readiness;
they do not certify editorial quality. Creators review content at the configured gates.

`production-report` is the agent's structured final response. `completed` is a claim the
coordinator verifies; `needs_input` pauses the same stage for a creator reply; `blocked`
fails the stage with a visible explanation. A zero exit code alone never completes work.
Provider failures and permission denials take precedence over a claimed completion.

`sync/production/run.json` uses `production-run`. Steps run in order. `review` requires
an explicit creator acknowledgement, `needs-input` requires a reply, and failures and
interruptions require explicit retry. Completed stages are not rerun. Pipeline changes
require a new run; changed verified artifacts invalidate that stage and its successors.
The pipeline revision is a content version of the saved config. Artifact values are
content versions for text or size/modification signatures for large binary files.

Every production stage rechecks the creator's saved script/channel approval before
launch, during execution and before committing a completion. Planning stages cannot be
placed after production stages. Review acknowledgement never grants script approval.
No agent transport exposes creator acknowledgement. Run state is local coordination
metadata, not a security boundary against arbitrary filesystem access.

The coordinator keeps one run lock across an invocation, separate from the short-lived
project edit lock. It captures prompts, stdout/stderr and reports by stage and attempt.
An interrupted `running` checkpoint becomes failed on the next invocation; it is not
silently considered complete or restarted. Resuming launches a fresh agent with prior
reports and the creator's reply; it must inspect existing work before producing assets.

Artifact-level dependency jobs, service recovery, measured word alignment and executable
visual/audio treatments use the additional [production execution](production-execution.md)
formats.
