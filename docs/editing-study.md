<!-- SPDX-License-Identifier: MIT OR Apache-2.0 -->
# Editing study v1 draft

`editing-study` describes a complete video of any length and supplied editorial
choices. It is a recommendation-only diagnostic input, separate from an
`editing-recipe`. It authorizes no timeline changes, approval or HQ finalization.
The current John Wick and GTA History projects are excluded.

The [format example](../examples/editing-study/short-study.json) uses invented
demonstration narration and a placeholder media hash. Replace it with an actual
short video's path, SHA-256, duration, narration, current-presentation descriptions
and supplied treatments before running a study. It is not a calibration dataset.
Media stays outside Git. `source_project`, when applicable, identifies the original
project; renaming a media file does not grant permission to use an excluded project.

Each nonoverlapping beat supplies narration and a description of the current
presentation, optional visual intent and observations, and zero or more complete
candidate treatments. Candidate wording, reveal anchors and source lines come
from the creator's material. All motion is `pop`. Reveal times are absolute
milliseconds in the video. Source cards require supplied provenance; code still
checks reading time, timing, IDs and label counts beyond schema validation.

Consumers ask two independent questions:

1. Would a graphic have a useful explanatory role? Options are `graphic-helpful`,
   `footage-sufficient` and `uncertain`. Ask on every beat, without the candidate
   menu or treatment predictions. A useful graphic already present counts as a
   useful role, rather than an instruction to replace it.
2. Which supplied treatment fits? Include `keep` and `none-of-these`, and ask only
   when complete candidates exist. Judge independently of the first answer for
   diagnostic comparison. No candidates means **not asked**, rather than a model
   prediction of keep.

The local model judges supplied text and observations. A video hash identifies
the source; it does not mean the model watched that video. Missing visual evidence
remains missing. No automatic writing, evidence generation or deployment follows.

Assign each whole video to `calibration` or `held-out`, so neighboring beats from
one video do not straddle splits. Freeze criteria before collecting held-out
results. Report each question's agreement separately, exclude failed/unasked
judgments, and bind labels to the study and stage-specific context fingerprints.
These descriptive component results never enable the editing deployment gate.
