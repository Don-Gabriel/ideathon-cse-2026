# GENESIS — Ideathon 1.0 · event portal

The official site for GENESIS, the ideathon by the Department of CSE,
Government College of Engineering, Tirunelveli.

This guide is written for committee members who may never have used a
terminal. **You do not need to touch any code to run this site during the
event.** Every fact the site shows — dates, prizes, FAQs, updates, names,
phone numbers — lives in small text files inside the [`content/`](content/)
folder. You edit one file, save, publish, done.

---

## The one idea to understand

The site reads **today's date** and works out for itself what to show:
before 17 Aug it says "registration opens in…", during registration it shows
a live countdown to the deadline, in the final 48 hours it switches to an
urgent red state, after the deadline it says screening is in progress, and
so on through the finale. **You never have to update the site just because
a date passed.** You only edit it when a *fact* changes.

## Where everything lives

| To change… | Edit this file |
|---|---|
| Dates, venue, Google Form link, coordinator contacts | `content/event.ts` |
| Timeline stage descriptions | `content/timeline.ts` |
| Post an announcement | `content/updates.ts` |
| Add/edit an FAQ | `content/faqs.ts` |
| Prize wording (no amounts are published) | `content/prizes.ts` |
| Eligibility (the one rule: max team size 5) | `content/rules.ts` |
| Submission rules, "what counts", blind-evaluation note | `content/guidelines.ts` |
| Student office bearers | `content/team.ts` |

Each file starts with a comment explaining exactly what it drives.

## Before launch — the TODO list

Search the `content/` folder for the word `TODO`. Every one marks something
only the committee can supply. Right now that is:

1. **The shortlist and grand finale dates** — `shortlistAnnounce`,
   `finaleStart` and `finaleEnd` in `content/event.ts`, plus the matching
   `dateLabel` / `start` / `end` in `content/timeline.ts`. They are empty on
   purpose: while empty the site says "to be announced" everywhere instead
   of guessing. Fill them in and the countdowns, timeline and hero all
   start working by themselves.
2. **The deployed site URL** — `siteUrl` in `content/event.ts` (fill in
   after the first deploy; it powers link previews and search listings).
3. **The idea/slide template link** — `assets.pptTemplate` in
   `content/event.ts`. Until it is filled, that download button says
   "publishes before registration opens". (The Round 1 template is also
   provided inside the Google Form itself, per the rule book.)
4. **Prize amounts, when decided** — announce them in `content/updates.ts`.
   The Prizes section deliberately publishes no numbers.

Already filled in: the Google Form URL, the rule book link, and the four
student office bearers' names and numbers.

**Deliberately not on the site — do not add these back without the
committee saying so:** any scoring rubric or marks breakdown (the rule book
says marks are confidential), faculty patron names, and certificates for
anyone beyond the top three teams.

## How to post an update during the event

Open `content/updates.ts`. Copy the block between `{` and `},` and paste it
**above** the existing ones (newest first). Example:

```ts
{
  date: "2026-08-20",
  title: "Rulebook v1.1 published",
  body: "Clarified the team-change policy. Nothing else changed.",
  tag: "RULEBOOK", // optional: RULEBOOK, DEADLINE or RESULT
},
```

Save and publish (below). The newest update also appears automatically in
the announcement bar under the hero for 7 days.

## How to publish a change

The site is hosted on Vercel and redeploys itself whenever the GitHub
repository changes.

**Easiest way (no software needed):** open the repository on github.com,
navigate to the file (e.g. `content/updates.ts`), click the pencil icon,
make the edit, and press **Commit changes**. Vercel picks it up and the
live site updates in about a minute.

**If a date must change** (e.g. the deadline is extended): edit the ISO
date strings in `content/event.ts` *and* the matching stage in
`content/timeline.ts`. Keep the `+05:30` at the end — that pins the time
to IST. Then post an update announcing the change.

## The fun stuff (for the committee to know about)

- The hero has a **working terminal** — students can type `help`, `dates`,
  `prizes`, `rules`, `register` and a few hidden ones. All its answers come
  from the same `content/` files as the rest of the site, so it can never
  disagree with the page.
- Typing `matrix` in the terminal (or the Konami code anywhere) plays a
  5-second amber matrix-rain. Harmless, deliberate, popular with students.
- The bottom-right HUD shows a live IST clock and the event's current phase.
- GEN-0 (the robot) says a different line each time it's clicked.

## For developers

```bash
npm install     # once
npm run dev     # local preview at http://localhost:3000
npm run build   # production build (fully static)
npx --yes tsx scripts/phase-check.ts   # verify the date/phase engine
```

Stack: Next.js (App Router) · TypeScript · Tailwind CSS 4 · lucide-react.
No database, no API routes — `next build` emits a fully static site.

- `lib/phase.ts` — the date-aware phase engine (pure functions; tested by
  `scripts/phase-check.ts` against mock dates for every phase boundary).
- Components never contain event facts; they import from `content/`.
- Hydration safety: the server renders with the build-time date, and every
  date-aware component re-derives from the visitor's clock after mount.
- A malformed date in config degrades gracefully (the site stops making
  time-based claims instead of crashing or lying).
