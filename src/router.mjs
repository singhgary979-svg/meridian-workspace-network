/** Deterministic, side-effect-free Meridian native routing. */
export function route(request, entries, { explicitTarget = null } = {}) {
  const text = String(request ?? "").trim().toLowerCase();
  const byKey = new Map(entries.map(e => [e.key, e]));
  const select = (key, reason) => {
    const target = byKey.get(key);
    return target ? { target: key, pluginId: target.plugin_id, status: target.status, reason, invoked: false } : null;
  };
  if (explicitTarget) return select(explicitTarget, "explicit selection") ?? { target: null, reason: "unknown explicit target", invoked: false };
  const named = entries.filter(e => text.includes(e.key.replaceAll("-", " ")));
  if (named.length === 1) return select(named[0].key, "named project");
  if (named.length > 1) return select("meridian-master-workspace", "multiple named projects");
  const rules = [
    [/glenn tape scout|tape watch glenn/, "glenn-tape-scout-evidence"],
    [/\b3-d\b|reflection workspace/, "three-d-reflection-workspace"],
    [/kids[ -]?tv|junior special ops.*episode/, "gary-kids-tv-studio"],
    [/drake.*future|future.*drake/, "drake-future-studio"],
    [/gary.*pmt.*production|double take.*pmt/, "gary-pmt-production-lab"],
    [/parody universe/, "original-parody-universe"],
    [/continuity vault/, "meridian-continuity-vault"]
  ];
  const hits = [...new Set(rules.filter(([re]) => re.test(text)).map(([, key]) => key))];
  if (hits.length === 1) return select(hits[0], "unique project intent");
  if (hits.length > 1) return select("meridian-master-workspace", "cross-project request");
  return { target: null, reason: "ambiguous or unregistered intent", invoked: false };
}
