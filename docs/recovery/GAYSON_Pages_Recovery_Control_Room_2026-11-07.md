# Meridian OS · GAYSON Pages Recovery Control Room

**Current named checkpoint:** `GAYSON-PAGES-RECOVERY-2026-11-07-LEGACY-SOURCE-BLOCKED`  
**Restored from:** `GAYSON-PAGES-RECOVERY-2026-11-06-LEGACY-SOURCE-BLOCKED`  
**Audit date:** 2026-11-07  
**Repository:** https://github.com/singhgary979-svg/meridian-workspace-network  
**Production branch:** `main` · `f86b4c9e5ed1d4db4b953024c00dd270a74a106d`  
**Control room working branch:** `recovery/gayson-pages-2026-11-07` — deliberately not published or merged

## Current-state cards

| Gate | Status | Evidence |
|---|---|---|
| Repository public | **VERIFIED** | Authenticated GitHub repository metadata on Nov 7 |
| Default branch `main` | **VERIFIED** | Branch API head SHA on Nov 7 |
| GAYSON source root | **VERIFIED as repository source** | `gayson-control-center/index.html`; copied to `_site/index.html` by static workflow |
| Nano | **VERIFIED as repository source** | `nano-voice-lab/index.html`; `/nano-voice-lab/` expected |
| Recovery room | **VERIFIED as repository source** | `deployment-control-room/index.html` |
| Publishing workflows | **VERIFIED as configuration** | `static.yml` primary; `gayson-pages.yml` preserved manual-only; `validate.yml` |
| Pages source = GitHub Actions | **BLOCKED** | `build_type = legacy`; HTTP 403 source-update failure in static #12 |
| Stable current five-route deployment | **UNCERTAIN / NOT VERIFIED** | Curated artifact deployed but browser test #12 failed |
| Independent live browser check on Nov 7 | **MISSING** | Web reader could not access the Pages routes |
| Native ChatGPT Sites publication/sync | **MISSING** | Not performed or claimed |

## One next step

**Owner only:** https://github.com/singhgary979-svg/meridian-workspace-network/settings/pages → **Build and deployment → Source → GitHub Actions**. Save if offered. This is a GitHub Settings action, not an automatically completed task.

Then rerun **Deploy static content to Pages** via https://github.com/singhgary979-svg/meridian-workspace-network/actions/workflows/static.yml on `main`. Do **not** rerun archived GAYSON #10 or change the deployment source on the recovery branch.

## Workflow run history

| Run | Result | Meaning |
|---|---|---|
| [Static #12](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42293550055) | **BLOCKED** | Curated upload and deployment succeeded; final browser test failed |
| [Validation #38](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42293550171) | **VERIFIED** | Tests successful; *not* a successful Pages publication |
| [Generated Jekyll #12](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42293549567) | **VERIFIED (job conclusion)** | Competing legacy publishing job succeeded; content stability unresolved |
| [Static #11](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42293119477) | **BLOCKED** | Previous five-route browser tests also failed |
| [Validation #37](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42293119327) | **VERIFIED** | Tests successful |
| [Historic GAYSON #10](https://github.com/singhgary979-svg/meridian-workspace-network/actions/runs/42283731162) | **BLOCKED** | `Create Pages site failed: Resource not accessible by integration` |

## Expected routes vs verified browser-test results

*Source: static #12, 2026-11-06, desktop and mobile. These are historical results, not a November 7 live retest.*

| Route | Expected | Desktop | Mobile | State |
|---|---|---|---|---|
| `/` | GAYSON root | 200 — WRONG TITLE: Meridian Workspace Network / meridian-workspace-network | 200 — WRONG TITLE: Meridian Workspace Network / meridian-workspace-network | **BLOCKED** |
| `/nano-voice-lab/` | Nano Voice Lab | 200 — expected title and body | 200 — expected title and body; generation gate present | **VERIFIED** |
| `/deployment-control-room/` | Recovery Control Room | 200 — expected title and body | 200 — expected title and body; checkpoint, local storage, JSON import checks passed | **VERIFIED** |
| `/callback-committee/` | Callback Committee | 404 — Page not found · GitHub Pages | 404 — Page not found; Checkpoints button timed out after 30000ms | **BLOCKED** |
| `/gary-knows-stats/` | Gary Knows Stats | 404 — Page not found · GitHub Pages | 404 — Page not found; calculator missing | **BLOCKED** |

**Exact settings failure recorded in static #12:** `Pages source update HTTP: 403` and `Resource not accessible by integration`. The same log read back `Pages build_type: legacy`.

**Exact browser-test failure:** `Process completed with exit code 1.` The 200 response at root had title `Meridian Workspace Network | meridian-workspace-network`, not the expected GAYSON page. Both missing routes returned HTTP 404. The mobile Checkpoints interaction on Callback Committee timed out after 30,000 ms, and the Gary Knows Stats calculator was absent.

## Rollback-safe checkpoints & revisions

- Nov 6: `GAYSON-PAGES-BLOCKED-2026-11-06`
- Nov 6: `GAYSON-PAGES-RECOVERY-2026-11-06-LEGACY-SOURCE-BLOCKED`
- Nov 7: **`GAYSON-PAGES-RECOVERY-2026-11-07-LEGACY-SOURCE-BLOCKED`**, source audit and working branch update, *not* a deployed release.

The HTML control room retains device-local history, revision entries, save/restore with a safety snapshot, one-next-step mode, four evidence states, and Markdown/JSON backup export/import. Do not confuse local state or user-marked status with authenticated GitHub evidence.

## Read Aloud next-step briefing

GAYSON's source files and workflows are present. Validation run thirty-eight passed. Publishing run twelve uploaded and deployed the curated site, but its browser tests still failed. GitHub Pages continues to report legacy publishing, and an attempted source change returned forbidden. Your one next step is to open repository Settings, choose Pages, and set the Source to GitHub Actions. Then rerun the current static workflow on main, test all five routes, and save a new checkpoint only after the results are confirmed.

## Preservation and scope

GAYSON root, Nano, `gayson-control-center`, both workflow configurations, and existing production `main` are left unchanged. This recovery edit exists only on `recovery/gayson-pages-2026-11-07`. The official Pages URL was recorded earlier as https://singhgary979-svg.github.io/meridian-workspace-network/, but correct current five-route publication was **not** verified on Nov 7. No Pages setting change, workflow rerun, GitHub Pages publication, native Sites sync, or new direct browser test is claimed.

**Exports:** `GAYSON_Pages_Recovery_Checkpoint_2026-11-07.json` (compatible recovery state/import) and `GAYSON_Pages_Recovery_Production_Receipt_2026-11-07.md`.
