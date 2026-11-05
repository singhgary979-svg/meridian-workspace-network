# Native Router

Route explicit intent to the narrowest relevant installed plugin. Keep the master as fallback for cross-project orchestration, not a substitute for a dedicated workspace.

## Precedence

1. Explicit @plugin selection
2. Explicit named workspace
3. Unique project match in registry
4. Master plugin for multi-project coordination
5. Ask for disambiguation only when needed

## Output contract

Return: target key, why selected, confirmed installation status, required handoff input, and unknown dependencies. Do not claim tools were called unless a tool invocation succeeded.

## Isolation

No copying personal state across projects. Never silently reuse creative characters, plots, jokes or structure.
