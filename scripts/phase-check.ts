/**
 * scripts/phase-check.ts
 * Sanity-checks the phase engine against mock dates.
 * Run: npx --yes tsx scripts/phase-check.ts   (exits 1 on any mismatch)
 */
import { derivePhase, deriveStageStatus, countdownTo } from "../lib/phase";
import { timelineStages } from "../content/timeline";

// Live config: reg 17 Aug -> 3 Sep 2026; shortlist and finale unannounced.
const cases: Array<[string, string]> = [
  ["2026-08-13T12:00:00+05:30", "BEFORE_OPEN"], // today, before opening
  ["2026-08-16T23:59:59+05:30", "BEFORE_OPEN"], // last second before open
  ["2026-08-17T00:00:00+05:30", "REG_OPEN"], // opening moment
  ["2026-08-25T09:30:00+05:30", "REG_OPEN"], // mid-registration
  ["2026-09-01T23:59:58+05:30", "REG_OPEN"], // just outside 48h window
  ["2026-09-02T00:00:00+05:30", "REG_CLOSING_SOON"], // inside final 48h
  ["2026-09-03T23:59:59+05:30", "REG_CLOSING_SOON"], // deadline second
  ["2026-09-04T00:00:00+05:30", "REG_CLOSED"], // just closed
  ["2026-09-20T18:00:00+05:30", "REG_CLOSED"], // stays here while the
  ["2026-12-31T18:00:00+05:30", "REG_CLOSED"], // shortlist date is unannounced
];

let fail = 0;
for (const [iso, expected] of cases) {
  const got = derivePhase(new Date(iso));
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${iso}  ->  ${got}  (want ${expected})`);
}

// Later phases become reachable as soon as the dates are filled in.
const announced = {
  regOpen: "2026-08-17T00:00:00+05:30",
  regClose: "2026-09-03T23:59:59+05:30",
  shortlistAnnounce: "2026-09-10T00:00:00+05:30",
  finaleStart: "2026-09-20T00:00:00+05:30",
  finaleEnd: "2026-09-20T23:59:59+05:30",
};
const announcedCases: Array<[string, string]> = [
  ["2026-09-05T12:00:00+05:30", "REG_CLOSED"],
  ["2026-09-10T09:00:00+05:30", "SHORTLIST_OUT"],
  ["2026-09-20T10:00:00+05:30", "FINALE_DAY"],
  ["2026-09-21T00:00:00+05:30", "COMPLETE"],
];
for (const [iso, expected] of announcedCases) {
  const got = derivePhase(new Date(iso), announced);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  [announced] ${iso}  ->  ${got}  (want ${expected})`
  );
}

// Malformed registration window is the only thing that degrades to UNKNOWN.
const bad = derivePhase(new Date(), {
  regOpen: "not-a-date",
  regClose: "",
});
console.log(`${bad === "UNKNOWN" ? "PASS" : "FAIL"}  malformed config -> ${bad} (want UNKNOWN)`);
if (bad !== "UNKNOWN") fail++;

// Stage statuses at a mid-registration moment: only stage 1 has dates.
const mid = new Date("2026-08-25T09:30:00+05:30");
const expectedStages = ["LIVE", "QUEUED", "QUEUED", "QUEUED"];
timelineStages.forEach((s, i) => {
  const got = deriveStageStatus(mid, s.start, s.end);
  const ok = got === expectedStages[i];
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  stage ${s.id} @ mid-reg -> ${got} (want ${expectedStages[i]})`);
});

// After the deadline: stage 1 complete, unannounced stages stay queued.
const afterClose = new Date("2026-09-05T12:00:00+05:30");
const expectedAfter = ["COMPLETE", "QUEUED", "QUEUED", "QUEUED"];
timelineStages.forEach((s, i) => {
  const got = deriveStageStatus(afterClose, s.start, s.end);
  const ok = got === expectedAfter[i];
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  stage ${s.id} @ after close -> ${got} (want ${expectedAfter[i]})`);
});

// Countdown sanity: 1 day 2h 3m 4s before close
const cd = countdownTo(new Date("2026-09-02T21:56:55+05:30"), "2026-09-03T23:59:59+05:30");
const cdOk = cd && cd.days === 1 && cd.hours === 2 && cd.minutes === 3 && cd.seconds === 4;
console.log(`${cdOk ? "PASS" : "FAIL"}  countdown parts -> ${JSON.stringify(cd)}`);
if (!cdOk) fail++;

// Invalid countdown target degrades to null
const cdBad = countdownTo(new Date(), "nope");
console.log(`${cdBad === null ? "PASS" : "FAIL"}  countdown invalid target -> ${cdBad}`);
if (cdBad !== null) fail++;

console.log(fail === 0 ? "\nALL CHECKS PASSED" : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
