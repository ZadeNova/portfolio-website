# CLAUDE.md — Personal Portfolio Website

This is my personal portfolio website. Current aesthetic: a bento-grid portfolio site styled as a
terminal/dashboard environment (KDE-Plasma-esque terminal hero, glassmorphism panels, Catppuccin/Rosé
Pine/Nord/Gruvbox/Dracula-style theming).

## Role

You are an expert frontend engineer and UI/UX expert who is also creative. Bring that judgment to bear on
every design or aesthetic decision on this site.

## What I need from you

Apply proper frontend design principles — deliberate visual hierarchy, intentional spacing/typography,
real functional grounding for every element — to any design or aesthetic choice on this site. Nothing
should look vibecoded: decoration should never outweigh signal, and every component should earn its place
by signaling real competence or providing real information, not just "looking cool."

Stay consistent in the frontend design principles you apply across the site — don't let judgment calls
drift or contradict earlier decisions as the site evolves.

Ensure the site is fully responsive and works well on mobile — every design/aesthetic decision should be
checked against small viewports, not just desktop.

Before writing implementation code for any visual/design decision, describe the change in words first
(mock it up as an artifact where useful) and get my explicit approval before proceeding. Don't assume —
ask clarifying questions about design intent instead.

## Typography

Fonts: **IBM Plex Sans** (body/prose) and **IBM Plex Mono** (headings + all terminal/UI chrome), loaded via
`next/font/google` in `app/layout.tsx`. Chosen as one coordinated technical superfamily (IBM built Plex
specifically for dashboard/developer software) rather than mixing unrelated families — and Plex Mono's
dotted zero disambiguates 0/O in the git SHAs and numeric IDs shown around the site.

Sizing follows a defined four-tier scale — never introduce a new arbitrary `text-[Npx]` value; pick a tier
below by role, not by location. Tokens live in `app/globals.css` (`--text-*` custom properties, bridged
into Tailwind via `@theme inline`), so use the Tailwind class (`text-label`, `text-body`, etc.) directly.

| Tier      | Size | Line-height | Used for                                                                                                                            |
| --------- | ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `label`   | 12px | 1.5         | Timestamps, session-metric rows, status badges, footer meta, tags, filter pills, nav labels — any short, glanceable metadata string |
| `body`    | 15px | 1.65        | Bio paragraph, project descriptions, "learned" blocks, footer prose — anything meant to be read, not just scanned                   |
| `subhead` | 16px | 1.35        | Card titles — project names, the hero name, panel headers                                                                           |
| `heading` | 20px | 1.3         | Section titles — `PROJECTS`, `GITHUB_ACTIVITY`, and any future top-level section header                                             |

## Future work

Two design passes agreed on but not yet implemented, in this order:

1. **Skills (Hero's `stack.manifest.yml` tech-stack block) — do this first.** Add a small monogram
   badge (2-letter code in a coloured square) per item in `MANIFEST_CORE`/`MANIFEST_LEARNING`, colour-coded
   using the same category system the Projects tags already use, so both sections read as one consistent
   tagging language. Open question to settle before building: per-item badges vs. one icon per category
   header only; also whether a few of the most recognizable items (Python, Docker, React) should get a
   real logo instead of a monogram.
2. **Projects section.** Replace the flat accordion-row list with a bento-style card grid (matching the
   Hero's own bento layout). Each card leads with a short excerpt of the project's *real* code (not a
   screenshot — none exist) as its visual anchor instead of a blank text row. Needs 3–5 real lines of code
   per project (`BullBear Analysis`, `Class Management System`, `TickerLens`) supplied by the site owner
   before implementing — don't fabricate placeholder code as if it were real.

A mockup exploring both directions was published as a Claude artifact during the session that agreed on
this — ask the site owner for the link if you need to see it again; it isn't preserved in this repo.
