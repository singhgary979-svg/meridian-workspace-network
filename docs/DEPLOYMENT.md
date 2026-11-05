# Deployment roadmap

## Implemented
- Registered-plugin inventory (not proof of runtime installation)
- Pure native intent router and isolated master handoff contract
- GitHub Actions test workflow
- Private source repository

## Not yet connected
- ChatGPT-to-GitHub automatic invocation of a plugin
- Hosted MCP endpoint and OAuth authorization
- Cloud-synchronized workspace data
- Import of actual saved states from previous Sites projects

## Next implementation gates
1. Confirm ChatGPT plugin runtime/manifest contract and endpoint access.
2. Build and deploy a secure MCP server using approved hosting (not Buildy).
3. Register the endpoint and verify a live tool invocation.
4. Add persistent encrypted storage with access control and migrations.
5. Import each workspace only from a verified export, preserving history.
6. Validate backup, restore, cross-project isolation and permission boundaries.

No deployment is implied by these planning steps.
