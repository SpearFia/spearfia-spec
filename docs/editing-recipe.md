<!-- SPDX-License-Identifier: MIT OR Apache-2.0 -->
# Editing recipe v1 draft

Current experiment policy: deployment and finalization are disabled, independently
of calibration. Continue with [short recommendation-only studies](editing-study.md)
and pop motion. Existing John Wick, GTA History and large-video trials are archived.

The creator has separately authorized isolated contextual auditions from the frozen
Star 4 v3 snapshot, followed by a separate proxy preview after choosing layouts.
This exception grants no project deployment, new inference or HQ finalization.

Treatment parameters keep body `labels` separate from `source_label` (a supplied
source or context line) and `qualifier` (for example, OUR GUESS). Neither auxiliary
line is a body/comparison item. `reveal_frames` are absolute recipe frames, one per
body label. A source/context card requires an explicit source/context line when
rendered; consumers must not guess one from label order. The optional properties
retain compatibility with earlier draft recipes. A context line is not proof of
independent verification.

Audition variants remain recommendations. Creator selections authorize only the
separate preview; they do not create a model decision or production/HQ approval.

An editing recipe records the editorial decisions against a fingerprinted saved
timeline. Timeline intervals and anchors use the recipe timebase; source
intervals carry their own timebase. Intervals are half-open. Source identifiers
in edits and media bindings refer to entries in `sources`, which retain the
selected native clip and its original source lineage.

The `edits` array contains the same decisions at proxy and final resolution.
Only `media_bindings` changes when a verified higher-resolution source replaces
its proxy. Rendered inserts that include footage must record the source IDs as
dependencies and be rendered again from the corresponding HQ bindings.

The schema checks shape, not editorial correctness. Consumers must validate
interval ordering and bounds, unique IDs and references, media fingerprints,
source handles, crop and retiming support, evidence, decision distributions,
and approval before applying or finalizing. An unsupported mapping or missing
dependency must leave the result incomplete. `creator-approved` is a recorded
state, not proof of an approval by itself; consumers must verify its provenance.
Model recommendations alone do not grant permission to finalize.
