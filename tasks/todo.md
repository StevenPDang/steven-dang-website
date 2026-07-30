# Tasks: Steven Dang Personal Website

Source documents:

- Specification: [`docs/spec.md`](../docs/spec.md)
- Implementation plan: [`tasks/plan.md`](./plan.md)

## Task 1: Establish the executable project contract

**Description:** Define dependency-free project commands and one initial smoke
check that expresses the required page contract before the page exists.

**Acceptance criteria:**

- [x] `package.json` exposes `test`, `lint`, and `build` commands without runtime
  or development dependencies.
- [x] The smoke check covers required identity content, contact destinations,
  document metadata, and semantic landmarks.
- [x] The check fails for the expected reason while `index.html` is absent.

**Verification:**

- [x] Run `npm test` and confirm the expected red check state.
- [x] Run `npm install --package-lock-only --ignore-scripts` and confirm no
  third-party packages are resolved.

**Dependencies:** None

**Files likely touched:**

- `package.json`
- `scripts/check.mjs`

**Estimated scope:** Small (2 files)

## Task 2: Deliver the complete identity-card experience

**Description:** Implement the semantic content and responsive business-card
presentation as one vertical slice, including the supplied contact information,
placeholder biography, print-inspired styling, focus states, and reduced-motion
support.

**Acceptance criteria:**

- [x] The page contains Steven Dang, “Software Engineer,” concise placeholder
  biography copy, email, LinkedIn, and GitHub links with correct destinations.
- [x] Semantic HTML, metadata, visible keyboard focus, mobile-first layout, and
  reduced-motion handling meet the approved specification.
- [x] Styling evokes a restrained 1990s printed business card using local system
  fonts, CSS-only texture, and no runtime JavaScript or remote assets.

**Verification:**

- [x] Run `npm test` and confirm the smoke check passes.
- [ ] Serve with `python3 -m http.server 4173` and manually inspect the unstyled
  content order and styled page at 320 px and 1440 px.
- [ ] Navigate all links using only the keyboard and confirm focus is visible.

**Dependencies:** Task 1

**Files likely touched:**

- `index.html`
- `styles.css`
- `scripts/check.mjs`

**Estimated scope:** Medium (3 files)

## Checkpoint: Core experience

- [x] Required identity and contact flow works end to end.
- [x] The automated smoke check passes.
- [x] The page remains readable without CSS.
- [ ] Mobile and desktop layouts match the approved visual direction.

## Task 3: Add production packaging

**Description:** Implement a clean static build using only Node built-in
modules, relying on the existing smoke check before copying source assets.

**Acceptance criteria:**

- [x] `npm run lint` runs the fast smoke check for missing required content,
  accidental remote assets, prohibited scripts, and key accessibility basics.
- [x] `npm run build` recreates `dist/` from validated source assets and never
  requires hand-editing generated files.

**Verification:**

- [x] Run `npm run lint`.
- [x] Run `npm test`.
- [x] Run `npm run build` and confirm `dist/index.html` and `dist/styles.css`
  exist with source-equivalent content.

**Dependencies:** Task 2

**Files likely touched:**

- `scripts/check.mjs`
- `scripts/build.mjs`

**Estimated scope:** Small (2 files)

## Task 4: Perform real-browser acceptance review

**Description:** Validate the built site in a real browser against responsive,
accessibility, network, and visual acceptance criteria; fix only verified
specification violations.

**Acceptance criteria:**

- [ ] The page has no horizontal overflow at 320 px and remains compositionally
  balanced at tablet and 1440 px desktop widths.
- [ ] There are no console errors, unexpected network requests, inaccessible
  focus states, contrast failures, or motion that ignores user preferences.
- [ ] The production output served from `dist/` satisfies all eight
  project-level success criteria.

**Verification:**

- [x] Serve `dist/` with `python3 -m http.server 4173 --directory dist`.
- [ ] Inspect 320 px, tablet, and 1440 px viewports in a real browser.
- [ ] Test keyboard navigation and emulated `prefers-reduced-motion: reduce`.
- [ ] Run `npm run lint`, `npm test`, and `npm run build` as the final gate.

**Dependencies:** Task 3

**Files likely touched:**

- `index.html` (only if acceptance issues are found)
- `styles.css` (only if acceptance issues are found)
- `scripts/check.mjs` (only for a missed critical invariant)

**Estimated scope:** Medium (up to 3 files)

## Checkpoint: Ready for review

- [ ] Every task acceptance criterion is checked.
- [x] All repository commands succeed.
- [ ] Browser evidence covers responsive layout, keyboard operation, reduced
  motion, console state, and network behavior.
- [x] No third-party dependency, framework, tracker, remote font, or required
  client-side JavaScript is present.
- [x] The result is ready for human review; deployment remains out of scope.
