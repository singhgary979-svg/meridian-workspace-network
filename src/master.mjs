/** Registry checks and safe handoff construction. No implicit state access. */
export function validateRegistry(registry) {
  if (!registry || !Array.isArray(registry.entries)) throw new Error("Invalid registry");
  const keys = registry.entries.map(e => e.key);
  if (new Set(keys).size !== keys.length) throw new Error("Duplicate plugin key");
  const master = registry.entries.find(e => e.role === "master");
  const router = registry.entries.find(e => e.role === "router");
  if (!master || !router || master.plugin_id === router.plugin_id) throw new Error("Master/router isolation failed");
  return true;
}
export function handoff({ target, sourceProject, payload = null, approved = false }) {
  if (!target || !sourceProject) throw new Error("Missing project identity");
  if (target !== sourceProject && payload !== null && !approved) throw new Error("Cross-project transfer requires approval");
  return { schemaVersion: "1.0.0", target, sourceProject, payload, approvalRecorded: Boolean(approved), savedStateVerified: false };
}
