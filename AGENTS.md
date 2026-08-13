## Development

Bun is the only package manager. Install deps with `bun install`, never npm/pnpm/yarn.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project: Portfolio "dyeye" (Figma replica)

Single-page static Astro portfolio replicating a Figma design, in English. Verify changes with `npm run build`.

### Single source of truth: `src/data/data.json`

- `profile`: name, shortName, aka (brand "dyeye"), role, email, location, school, grade, githubUsername.
- `links`: map of ALL shared links keyed by id (`linkedin`, `github`, `backToTop`). Each has `label`, `href`, optional `icon`/`external`. **Never repeat a URL — reference by id.**
- `navLinks`: array of nav items with `label`, `href`, `dataNav`.
- `socialLinks` / `footerLinks`: ordered arrays of **link ids** (strings). Components resolve them with `data.links[id]` — do not inline hrefs in components.

### Components & conventions

- `src/components/Button.astro`: the ONLY button component (variants `primary|outline|ghost|link|underline|display`, sizes `nav|sm|md|lg|xl`; renders `<a>` with `href` or `<button>` with `type`). Reuse it, never add new button classes.
- `NavLink.astro` uses Button `variant="link"` + `active` class; the scrollspy in `Layout.astro` toggles `.active` (lime underline). It must run once on load and on scroll.
- Sections: `Header`, `Hero`, `Projects`, `About`, `Timeline`, `Interests`, `SkillsMarquee`, `Contact`, `Footer`; assembled in `src/pages/index.astro` inside Layout.
- Projects are fetched from the GitHub API at build time in `Projects.astro` (username from `data.profile.githubUsername`, forks excluded, paginated client-side 4 per page, 2-col grid). Do NOT store projects in data.json.
- `About.astro` fetches the GitHub profile README at build time (`data.profile.readmeRepo`, falls back to `username/username`), renders it with `marked` into a sketchy-styled scrollable frame. If the repo doesn't exist yet, it shows a fallback note.
- Design tokens live in `src/styles/global.css` (`--lime-accent: #C1F100`, `--page-gutter`, fonts: Bricolage Grotesque / Hanken Grotesk / JetBrains Mono). Section styles are scoped in each component.
- Dark theme: `[data-theme="dark"]` block in `global.css` overrides the tokens. The toggle button (`#theme-toggle`) in `Header.astro` + the inline script in `Layout.astro` set `data-theme` on `<html>` (default = `prefers-color-scheme`, user choice persisted in `localStorage`). Use CSS variables / `currentColor` — never hardcode colors.
- Card/form bubbles use organic border-radius (e.g. project cards `128.5px 130px 114px 114px`; contact form `128.5px 130px 114px 14px`).

### Secrets & MCP

- The Figma MCP server is configured globally in `~/.config/opencode/opencode.json` (token via `{env:FIGMA_TOKEN}`). **Never put API tokens in repo files**; `opencode.json`/`opencode.jsonc` are gitignored. GitHub push protection blocks pushes containing secrets.
- Figma file: key `MFiHPbwPRyJNZAjnBY8wpl` (design reference). Use the local `figma-developer-mcp`; the remote Figma MCP returns 403 in opencode.
- Config changes require restarting opencode (not hot-reloaded).
