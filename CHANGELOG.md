# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial repository scaffold.
- `links` v1 (draft): `links.json`, the script-to-media links (quote, line hint, media path,
  role, picture/audio kind, optional in/out), with an example.
- `timeline-plan` v1: items apply in order to a fresh sequence, all or nothing; V tracks
  take picture only, A tracks sound only, missing tracks are created; a transition's
  `params` name the `effect`, the clip it `attach`es to and its `edge`, and
  `duration_frames: 0` means the editor's default. The example adds a VO clip and a
  transition.
