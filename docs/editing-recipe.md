<!-- SPDX-License-Identifier: MIT OR Apache-2.0 -->
# Editing recipe v1 draft

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
