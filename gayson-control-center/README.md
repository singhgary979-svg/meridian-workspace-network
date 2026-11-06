# GAYSON Industries — GitHub hosted control center

This is a privacy-hardened hosted companion to the **GAYSON Industries** ChatGPT plugin (private release 1.0.0) and **Meridian Native Router** (private release 1.1.0).

## Capabilities
- Route nine existing Meridian project lanes in a phone-friendly interface
- Import source JSON **locally in your browser**, hash with SHA-256 and retain original bytes in local browser storage
- Save project notes, named targeted repairs and rollback fields
- Export/import full dashboard backup and individual receipts
- Verify imported JSON against 31 anonymized archived checksums
- Open the actual GAYSON and Meridian Native Router ChatGPT plugin pages

## Security boundary
- Private Library JSON backups, original filenames, full source paths, and reflection content are **not** part of this repository or website
- Hosted site is static. Data is stored **locally in the browser**, **not synchronized between devices**
- Native Sites API and authorized Sites sync credentials are not connected. Automatic Sites sync is **not implemented**. Do not treat manual imports, GitHub deployment, or a saved URL as proof of native Sites sync.
- Avoid importing sensitive JSON on a shared device. Export your state before clearing browser storage.
- Static host does not expose cloud write APIs or require third-party credentials.

## Deployment
`meridian-workspace-network/gayson-control-center/` is a separate static site root, intended for Git-integrated Vercel. Do not modify the existing Meridian MCP or router API.
