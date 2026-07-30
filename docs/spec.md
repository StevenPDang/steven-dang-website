# Spec: Steven Dang Personal Website

## Objective

Build a lightweight, single-page personal website for Steven Dang, a Software
Engineer. The page should borrow the visual language of a sleek business card
printed in the 1990s—restrained, tactile, professional, and memorable—without
being presented as a literal card object or resembling a retro computer
interface.

The primary audience is recruiters, hiring managers, collaborators, and peers
who want to identify Steven quickly and reach his professional profiles.

The page will present:

- Name: Steven Dang
- Role: Software Engineer
- A short biography using clearly marked placeholder copy
- Portrait: `assets/steven-dang-picture.jpg`
- Email: steven.phihung.dang@gmail.com
- LinkedIn: https://www.linkedin.com/in/stevenpdang
- GitHub: https://github.com/stevenpdang

The visual direction is restrained corporate stationery: a low-glare porcelain
background (`#f7f9f8`), near-black typography, Opaline Azure (`#5fa9dd`)
accents, fine rules, generous spacing, and subtle print-inspired texture. A
pale blue-gray outer canvas (`#e8f1f6`) and fine side rules distinguish the
centered website from surrounding space. The site occupies two-thirds of the
viewport width on tablet and desktop, expanding to the full viewport width on
mobile for legibility. Steven's portrait sits to the right of his name from
tablet widths upward, with a fluid gap that reaches approximately one inch on
wide displays. The portrait is circular, with a diameter approximately 1.5
times the “Steven Dang” type size, and stacks below the identity only on
mobile. A borderless translucent Opaline Azure rectangle matches the name's
rendered width and height, with a visibly imperfect type-relative offset and
clean edges that evoke misregistered print rather than a digital drop shadow.
It must not use a desk backdrop, card-shaped drop shadow, neon cyberpunk, Y2K
chrome, faux operating-system windows, or distracting animation.

## Tech Stack

- Semantic HTML5
- Modern CSS with custom properties and responsive layout
- No runtime framework and no required client-side JavaScript
- Local system font stacks; no remote font dependency
- Node.js built-in APIs for lightweight build and automated checks

## Commands

These commands will be available after implementation:

```sh
# Local development server
python3 -m http.server 4173

# Generate the deployable output in dist/
npm run build

# Run automated checks
npm test

# Run static quality checks
npm run lint
```

## Project Structure

```text
index.html             → Semantic page content and metadata
styles.css             → Responsive visual system and print-card styling
package.json           → Dependency-free project commands
scripts/build.mjs      → Copies site assets into dist/
scripts/check.mjs      → Minimal content and structure smoke checks
docs/spec.md           → Approved product and technical specification
tasks/plan.md          → Phase 2 implementation plan
tasks/todo.md          → Phase 3 implementation task list
dist/                  → Generated deployment output; not edited by hand
```

## Code Style

Use semantic names, two-space indentation, lowercase kebab-case CSS classes,
and design tokens rather than repeated literal values. Prefer progressive
enhancement and content that remains understandable without CSS.

```html
<main class="site-panel">
  <header class="identity">
    <p class="identity__role">Software Engineer</p>
    <h1>Steven Dang</h1>
  </header>
</main>
```

```css
:root {
  --paper: #ffffff;
  --ink: #171714;
  --accent: #5fa9dd;
}

.site-panel {
  color: var(--ink);
  background: var(--paper);
}
```

CSS should respect reduced-motion preferences and use fluid sizing with
`clamp()` where appropriate. JavaScript may not be introduced for effects that
HTML or CSS can provide.

## Testing Strategy

Keep automated testing intentionally small for this low-complexity static site.

- A single smoke-check script verifies the required identity/contact content,
  basic document metadata, semantic landmarks, and absence of prohibited remote
  assets or scripts.
- The build command verifies that required source files exist before copying
  them into `dist/`.
- Manual browser verification covers 320 px mobile, tablet, and wide desktop
  layouts; keyboard navigation; visible focus states; and reduced motion.
- Run `npm test`, `npm run lint`, and `npm run build` before completion.

No coverage target, dedicated test suite, or CI configuration is required.
`npm test` and `npm run lint` may intentionally invoke the same fast smoke
check.

## Boundaries

- Always:
  - Use semantic HTML and keyboard-accessible links.
  - Meet WCAG 2.2 AA color-contrast requirements.
  - Preserve legibility from 320 px wide through large desktop displays.
  - Keep contact details easy to find and use full, secure external URLs.
  - Respect `prefers-reduced-motion`.
  - Run all checks and the production build before marking work complete.
- Ask first:
  - Add third-party dependencies, analytics, tracking, forms, or remote fonts.
  - Replace the supplied identity or contact information.
  - Expand the site beyond the single-page personal-profile scope.
  - Configure or perform a production deployment.
- Never:
  - Commit secrets or expose private contact information beyond the supplied
    email address.
  - Add autoplaying media, intrusive animation, or simulated loading effects.
  - Use external assets whose license or provenance is unclear.
  - Edit generated `dist/` files by hand.

## Success Criteria

1. Opening the page immediately shows Steven Dang, “Software Engineer,” a short
   placeholder biography, and usable email, LinkedIn, and GitHub links.
2. The presentation evokes refined 1990s business stationery through
   typography, paper-like color and texture, fine rules, and restrained
   composition without rendering a literal card object.
3. The site contains no production framework, runtime package dependency,
   remote font request, tracker, or required client-side JavaScript.
4. The centered site is two-thirds of the viewport width on tablet and desktop,
   expands to full width on mobile, has no horizontal overflow at 320 px, and
   remains visually balanced on a 1440 px desktop.
5. All interactive elements are reachable by keyboard and have visible focus
   treatment; text and controls meet WCAG 2.2 AA contrast.
6. The page honors reduced-motion settings and remains usable when styles fail
   to load.
7. `npm test`, `npm run lint`, and `npm run build` complete successfully.
8. The generated `dist/` directory can be served as a static website without
   server-side processing.

## Open Questions

- What final biography should replace the placeholder text?
- Which static hosting provider, if any, should receive a later deployment?
