# Meridian OS — Nano Voice Lab

A mobile-first **research-only** voice/audio verification lab published as a separate path on GitHub Pages. It does **not** connect to, modify, or deploy the existing LIVEWIRE Multi-Voice Studio or its production runtime.

## Scope and evidence

- Active research target: **Nano**, not the separate 1.5 GB full model.
- Historical pause indicated LIVEWIRE production was not modified and exact Nano model/runtime verification remained pending.
- Exact Nano model filenames, checksums, runtime footprint, inference logs and authentic output are **unverified**.
- The gate cannot be interpreted as independently verified solely because a user marks cards as verified.
- **No Apple/system speech substitution** is included, and no successful Nano synthesis is seeded or claimed.

## Workflow

Reopen browser-local checkpoint → inspect model and runtime evidence → separate verified / uncertain / missing → supply exact user-verified remote Gradio endpoint and argument schema for one genuine line, or import a genuine candidate → compare direct and performed wording against listening observations → log unresolved issues → save named revision → create receipt → export Markdown/JSON.

The optional external `@gradio/client` is loaded **only after** explicit user-initiated generation and the verification gate. A reference voice sample may be sent to the selected remote Space; use it only with ownership/permission. No Nano endpoint or voice credential is preconfigured.

## Saving and recovery

Browser localStorage is device- and origin-specific. It is **not** automatic sync with native ChatGPT Sites or other devices. Export a JSON backup before changing browsers. Large audio clips may need to be retained separately. Keep private reference recordings, tokens, and personal transcripts out of this GitHub repository.

## Publishing

The GitHub Pages workflow preserves the previously published GAYSON Control Center at the root and adds this lab only under `/nano-voice-lab/`. The original LIVEWIRE Site and model production deployment are not touched.

**Status:** Site publication and the real Nano model/audio test are separate checkpoints. A live web page does not prove Nano inference works.
