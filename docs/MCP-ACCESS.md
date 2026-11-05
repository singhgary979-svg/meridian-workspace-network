# MCP access

The HTTPS endpoint is /mcp. GET is a public readiness check. POST is disabled until MCP_ACCESS_TOKEN is configured as an encrypted Vercel environment variable (minimum 32 characters). Bearer token is checked in constant time. Never commit the token to GitHub or paste it into chat.

Available tools: meridian_list_workspaces and meridian_route. These are stateless and cannot invoke registered ChatGPT plugins. They do not read or write private project state.

For ChatGPT connection, prefer OAuth 2.1 / authorization-server discovery over a shared bearer token. This initial authenticated endpoint is an infrastructure milestone, not a fully integrated user-facing connector. Persistent storage and scoped user authorization are not yet configured.
