# Implementation Plan: Steven Dang Personal Website

## Overview

Create a dependency-free, static personal website that presents Steven Dang as
a Software Engineer in the visual language of a refined 1990s business card.
The work will progress in vertical slices so each stage produces a usable,
verifiable site rather than separating all markup, styling, and checks into
isolated batches.

Source of truth: [`docs/spec.md`](../docs/spec.md).

## Architecture Decisions

- Use one semantic `index.html` document and one `styles.css` stylesheet. This
  keeps the runtime surface small, makes failure modes simple, and allows the
  content to remain readable if CSS does not load.
- Use no runtime JavaScript, framework, package dependency, remote font, or
  externally hosted visual asset. The intended experience can be delivered
  entirely with HTML and CSS.
- Create the print texture with layered CSS gradients. This avoids asset
  licensing concerns and an additional network request while retaining the
  tactile business-card character.
- Use Node.js built-in modules for build and validation scripts. The build will
  produce a clean `dist/` directory without introducing a bundler.
- Treat the supplied placeholder biography as content, clearly labeled in the
  source for later replacement without changing the layout.

## Dependency Graph

```text
Approved specification
        │
        ├── Semantic identity card (HTML + baseline tests)
        │           │
        │           └── Responsive visual system (CSS + browser checks)
        │
        └── Project commands and static validation
                    │
                    └── Production build output
                                │
                                └── Final cross-cutting verification
```

The identity card is the central vertical slice. Styling depends on its semantic
structure, while production packaging depends on stable source files and
validation commands.

## Implementation Sequence

### Phase 1: Executable foundation

Establish dependency-free project commands, one fast structural smoke check,
and the minimal build pipeline. Prove early that the chosen no-dependency
architecture can be validated and packaged consistently.

Expected files:

- `package.json`
- `scripts/check.mjs`
- `scripts/build.mjs`

### Checkpoint: Foundation

- Project commands execute without installing packages.
- The smoke check can fail meaningfully before the page is implemented.
- The build script rejects missing required source assets.

### Phase 2: Complete identity-card slice

Build the semantic page and its full responsive visual presentation together:
identity, biography, contact actions, metadata, paper treatment, typography,
layout, keyboard focus, and reduced-motion behavior.

Expected files:

- `index.html`
- `styles.css`

### Checkpoint: Core experience

- Required content and links are present and usable.
- The unstyled document remains understandable.
- The styled card is balanced at 320 px and 1440 px.
- Keyboard focus is visible and contrast meets WCAG 2.2 AA.

### Phase 3: Production packaging and final polish

Run the complete validation suite, generate `dist/`, inspect the page in a real
browser at representative viewport sizes, and correct only issues that conflict
with the approved specification.

Expected files:

- `scripts/build.mjs`
- `scripts/check.mjs`
- Generated `dist/` output

### Checkpoint: Completion

- `npm test`, `npm run lint`, and `npm run build` succeed.
- The generated site works when served directly from `dist/`.
- No horizontal overflow, console errors, remote requests, or accessibility
  blockers are present.
- Every success criterion in the approved specification has evidence.

## Verification Strategy

1. Start with a failing smoke check for the required content and document
   semantics.
2. Implement the smallest complete HTML/CSS experience that satisfies them.
3. Run static validation and tests after each slice.
4. Generate the production output only from validated source files.
5. Perform browser checks at 320 px, a tablet width, and 1440 px, including
   keyboard navigation and reduced-motion emulation.
6. Compare final behavior against all eight project-level success criteria.

No CI workflow, coverage reporting, or extensive script-level test suite will
be added; those would be disproportionate for this static personal page.

## Sequential and Parallel Work

Implementation will remain sequential because the project is small and the core
files are shared:

- Foundation must precede source validation and packaging.
- Semantic HTML must precede final styling and accessibility review.
- Stable source files must precede final production-output verification.

Independent visual exploration could technically run in parallel, but it would
add coordination overhead and risk diverging from the approved single-card
direction, so it is intentionally excluded.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| The retro treatment becomes theatrical or gimmicky | Medium | Limit the palette, texture, and ornament to print-inspired details named in the spec. |
| Placeholder biography feels like finished content | Low | Mark it clearly in source and keep it concise enough to replace without redesign. |
| CSS paper texture reduces contrast or readability | Medium | Keep texture opacity subtle and verify computed contrast on the final background. |
| A custom dependency-free checker becomes brittle | Low | Keep it to a short list of explicit project invariants. |
| Desktop card proportions cause mobile overflow | High | Design mobile-first and verify at 320 px before desktop polish. |
| Generated files drift from source | Low | Recreate `dist/` through the build command and never edit it manually. |

## Open Questions

- The final biography remains intentionally unresolved and does not block the
  first implementation.
- Deployment is outside this plan until a hosting target is selected and
  explicitly approved.
