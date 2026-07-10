# Redesign Prompt for Antigravity CLI

Paste this into `agy` (interactive) or run headlessly:
`agy -p "$(cat this-file.md)"`

---

## Task

Redesign my existing portfolio website's visual design to a **terminal / command-line interface aesthetic**, without changing its content or functionality. First, inspect the current codebase (pages, components, and existing CSS/styling approach — Tailwind, CSS modules, plain CSS, etc.) and adapt the system below to fit however the project is actually structured. Do not rewrite content, copy, project data, or routing/logic — this is a styling and motion pass only, plus any small markup changes needed to support the new look (e.g. adding a terminal-style header bar to a card).

## Design System to Apply

**Colors**
- Backgrounds: Tailwind Zinc scale — `zinc-950` (page bg), `zinc-900` (panels/cards), `zinc-800` (raised surfaces/inputs), `zinc-700` (borders/dividers).
- Text: `zinc-100` (primary), `zinc-400` (secondary/meta), `zinc-600` (muted/placeholder).
- Accent: `#00FF85` (terminal green) — use only for buttons, links, active/focus states, the cursor, and success indicators. Never as a large background fill.
- Errors: a desaturated red (e.g. `#FF5C5C`), used as sparingly as the green.
- No pure black or white — stay within the zinc scale for anything currently using `#000`/`#fff`.

**Typography**
- Switch body/UI font to a real monospace: `JetBrains Mono` or `IBM Plex Mono` (fallback `ui-monospace, "Courier New", monospace`).
- Base size ~14-15px, line-height 1.5-1.6. Keep weight mostly regular; use 500/600 sparingly for emphasis instead of large size jumps.
- Where it fits naturally (nav links, section labels, buttons), prefix with CLI-style symbols: `>`, `$`, `~`, `#`.

**Layout**
- Sharp corners (0-4px radius max) — remove rounded-xl/2xl styles.
- Replace box-shadows with thin 1px `zinc-700` borders; only keep a subtle green glow on hover/focus states.
- Section/card headers can adopt a fake terminal title bar (three dots + a path-like label, e.g. `~/portfolio/about`).
- Keep spacing on a tight, consistent 4/8px grid — reduce any oversized "marketing site" whitespace.

**Components**
- Primary buttons: `#00FF85` background, `zinc-950` text, sharp corners, soft green glow on hover.
- Secondary buttons: transparent bg, `zinc-700` border, `zinc-100` text, border shifts to green on hover.
- Inputs (contact form, etc.): `zinc-900` bg, `zinc-700` border, green border/glow on focus, blinking cursor if feasible.
- Tags/status labels styled as bracketed text (`[ AVAILABLE ]`) instead of rounded pill badges.

**Animation**
- Add a cursor blink to any hero/intro text or prompt-style element.
- Typewriter effect for the hero headline or intro line on page load (character-by-character, ~15-30ms/char).
- Buttons/links: soft green glow + 1-2px translate on hover, fast snap-back on click (~120-150ms, no bounce/spring easing).
- Page/section transitions: quick fades or hard cuts (150-200ms ease-out) — nothing slow or bouncy.
- Optional: a thin green scan-line sweep on section load, and ASCII-style loaders (`▓▓▓░░░` or `| / - \`) for any loading states.
- Avoid: confetti/celebration effects, spring/bounce easing, parallax, anything over ~400ms.

## Constraints
- Preserve all existing content, links, project data, and functionality exactly.
- Preserve responsive behavior — check the redesign at mobile widths too.
- Keep accessibility in mind: green-on-zinc-950 should meet reasonable contrast for text use; don't rely on color alone for state (pair with the `[ ]` bracket/label convention).
- Show me a diff/preview before applying broad changes across many files; go file-by-file if the project is large.

## Deliverable
Apply the styling changes directly to the codebase, then summarize which files were touched and flag anything (e.g. a component library) that limits how far the terminal aesthetic could be pushed.