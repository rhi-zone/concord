# TODO

## Workflow

- `bindings` branch exists as worktree (`~/git/concord-bindings`)
- Stabilize core first, then fast-forward bindings to master and add APIs
- Avoid constant rebasing - core should be solid before bindings build on it

## Pending

### Implementation (in order)
- [x] `concord-core`: IR types (Type, TypeKind, Annotation, Module, etc.)
- [x] `concord-codegen`: CLI skeleton
- [x] OpenAPI parser → IR
- [x] Rust generator (IR → Rust code)
- [x] Dogfood: generate bindings for petstore schema

### Known Issues (MVP)
- [x] Array types missing element type in generated code (`Vec` instead of `Vec<Pet>`)
- [x] `ApiError` type not defined (generates basic ApiError struct)
- [x] String enums not handled (OpenAPI enum → Rust enum with serde rename)
- [x] No imports/use statements in generated code

### Remaining Issues
- [ ] Inline/anonymous enums fall back to String (only named schemas become enums)
- [ ] Integer enums not handled
- [ ] Additional response types (201, etc) not used for return type

### Then
- [ ] Multi-language codegen targets (TypeScript, Python, etc.)
- [ ] Fast-forward bindings branch to stable core
- [ ] Add first binding to bindings branch

## Complexity Hotspots (threshold >21)
- [ ] `crates/concord-codegen/src/generator/rust.rs:to_snake_case` (34)

## Future Ideas

- Web APIs: fetch, WebSocket, etc.
- OpenAPI: GitHub, Stripe, etc.
- FFI: SQLite, etc.


### [x] Update CLAUDE.md — corrections as documentation lag (2026-03-29)

Add to the corrections section:
> **Corrections are documentation lag, not model failure.** When the same mistake recurs, the fix is writing the invariant down — not repeating the correction. Every correction that doesn't produce a CLAUDE.md edit will happen again. Exception: during active design, corrections are the work itself — don't prematurely document a design that hasn't settled yet.

Add to the Session Handoff section:
> **Initiate a handoff after a significant mid-session correction.** When a correction happens after substantial wrong-path work, the wrong reasoning is still in context and keeps pulling. Writing down the invariant and starting fresh beats continuing with poisoned context — the next session loads the invariant from turn 1 before any wrong reasoning exists.

Conventional commit: `docs: add corrections-as-documentation-lag + context-poisoning handoff rule`

## Design Notes

### Module splitting
- Don't split by default - let consumers tree-shake
- If needed, split by logical grouping (OpenAPI tags, header files)

### Confidence-based generation
- Score confidence per binding during codegen
- High confidence: generate and trust
- Low confidence: generate but flag for review (comments/metadata)
- Better than refusing to generate complex cases

### Specialcases system
- Overrides on top of generated code (like Nix/portage patches)
- `schemas/<api>/specialcases.toml` - version controlled, auditable
- Supports: type overrides, signature fixes, doc comments, add/remove bindings
- Regeneration preserves and reapplies specialcases

### C namespace conventions → target language idioms
- C uses prefixes: `wlr_output_create()`, `xkb_keymap_new()`
- Target languages have proper namespacing: `Output::create()`, `Keymap::new()`
- Configurable strategies per binding:
  - Prefix stripping rules
  - Method vs static method detection (first arg = self?)
  - Module/namespace mapping
- Binding author specifies strategy in config

### Automation spectrum
- Fully automated: OpenAPI, simple FFI
- Assisted (heuristics + confidence): complex FFI
- 90% → 99% is the hard part, not 0% → 90%
