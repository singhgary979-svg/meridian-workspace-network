# Security and privacy

Keep this repository private. Never commit API tokens, account credentials, personal reflections, private saved-state JSON, unreleased scripts or sensitive evidence. Plugin IDs and architecture descriptions are not authorization credentials.

Use a dedicated encrypted store for any future persistent workspace state. A GitHub repository is a source-code store, not a private application database. Require explicit consent for cross-project state transfers and reversible restore with safety copies.

Report accidental secret exposure immediately and rotate credentials before relying on deletion from git history.
