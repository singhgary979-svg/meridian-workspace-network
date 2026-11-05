# Meridian Workspace Network

A clean, independent integration repository for Meridian OS workspace plugins and a two-layer coordination system.

## Architecture

- **Workspace plugins** remain independent, with separate source, state, provenance and revision histories.
- **Master plugin** coordinates projects and their handoffs without merging unrelated continuity.
- **Native router plugin** selects the appropriate plugin from explicit user intent, preserves the user's selected context, and avoids unsupported claims of automatic cross-plugin invocation.
- **Registry** records confirmed plugin identities and capabilities; unknown connections remain unknown.

## Status

Initial repository scaffold. Existing ChatGPT plugins are not automatically installed from GitHub. A plugin package or verified MCP endpoint is required for runtime connection. This repository contains no personal production data or saved-state exports.

## Safety

The repository is currently public. Do not commit private scripts, personal reflections, secrets, JSON backups, or unreleased material until repository visibility and access are reviewed.

## Layout

- `architecture/`: system boundaries and integration contracts
- `registry/`: plugin catalog schema and non-sensitive registry
- `plugins/master/`: master coordination source
- `plugins/router/`: native routing source
- `workspaces/`: per-workspace adapters and templates
- `tests/`: routing and isolation checks
