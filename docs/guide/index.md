# Introduction

concord is an API bindings IR and codegen library. It parses API specifications into a unified intermediate representation, then generates idiomatic bindings for target languages.

## What exists today

| Component | Crate | Description |
|-----------|-------|-------------|
| IR types | `rhi-concord-core` | Structs, enums, annotations, modules — the full type model |
| CLI + codegen | `rhi-concord-codegen` (binary: `concord`) | OpenAPI parser → IR → Rust code generator |

## Repository structure

```
crates/
├── concord-core/      # IR type definitions (rhi-concord-core)
└── concord-codegen/   # CLI binary + OpenAPI parser + Rust generator

schemas/               # Example OpenAPI specs (e.g. petstore.yaml)
```

## Quick start

Parse an OpenAPI schema and generate Rust bindings:

```bash
concord openapi --schema schemas/petstore.yaml --output ./out
```

Inspect the IR for debugging:

```bash
concord dump-ir --schema schemas/petstore.yaml
concord dump-ir --schema schemas/petstore.yaml --format yaml
```

## Design goals

- **Preserve raw info** — don't lose information during parsing; let generators decide how to map
- **Extensible, not hardcoded** — no fixed set of primitives, bounds, or constraints; everything uses extensible `kind: String` annotations
- **Unified via types** — HTTP semantics and FFI semantics expressed as types, not special cases
- **Uniform structure** — same patterns at every level; minimal special cases

## IR overview

The IR is a superset representation for all API surfaces. See the [IR Design](/design/ir) document for the full type reference.

Core types:

- **`Module`** — top-level container with `items` (types, functions, consts) and `submodules`
- **`Type`** — a type with a `TypeKind`, optional name, type parameters, type arguments, annotations, and metadata
- **`Function`** — a named function with parameters, return type, annotations, and metadata
- **`Annotation`** — extensible key-value tag (bound, constraint, HTTP method, calling convention, etc.)
- **`Metadata`** — docs, source location, confidence score, and an escape-hatch `extra` map

## Roadmap

The IR is designed to accommodate sources beyond OpenAPI without changes to the core types. Planned parsers and generators include:

- **FFI parser** — C headers via bindgen or tree-sitter
- **TypeScript generator** — idiomatic TS interfaces and fetch clients
- **Additional parsers** — GraphQL, gRPC/protobuf
