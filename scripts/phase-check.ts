/**
 * scripts/phase-check.ts
 * Sanity-checks the phase engine against mock dates.
 * Run: npx --yes tsx scripts/phase-check.ts   (exits 1 on any mismatch)
 */
import { derivePhase, deriveStageStatus, countdownTo } from "../lib/phase";
import { timelineStages } from "../content/timeline";

const cases: Array<[string, string]> = [
  ["2026-08-06T12:00:00+05:30", "BEFORE_OPEN"], // today, before opening
  ["2026-08-10T23:59:59+05:30", "BEFORE_OPEN"], // last second before open
  ["2026-08-11T00:00:00+05:30", "REG_OPEN"], // opening moment
  ["2026-08-18T09:30:00+05:30", "REG_OPEN"], // mid-registration
  ["2026-08-23T23:59:58+05:30", "REG_OPEN"], // just outside 48h window
  ["2026-08-24T00:00:00+05:30", "REG_CLOSING_SOON"], // inside final 48h
  ["2026-08-25T23:59:59+05:30", "REG_CLOSING_SOON"], // deadline second
  ["2026-08-26T00:00:00+05:30", "REG_CLOSED"], // just closed
  ["2026-08-28T18:00:00+05:30", "REG_CLOSED"], // screening window
  ["2026-08-29T00:00:00+05:30", "SHORTLIST_OUT"], // announcement day
  ["2026-09-03T22:00:00+05:30", "SHORTLIST_OUT"], // eve of finale
  ["2026-09-04T10:00:00+05:30", "FINALE_DAY"], // finale
  ["2026-09-05T00:00:00+05:30", "COMPLETE"], // day after
];

let fail = 0;
for (const [iso, expected] of cases) {
  const got = derivePhase(new Date(iso));
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${iso}  ->  ${got}  (want ${expected})`);
}

// Malformed-config fallback
const bad = derivePhase(new Date(), {
  regOpen: "not-a-date",
  regClose: "",
  shortlistAnnounce: "2026-08-29T00:00:00+05:30",
  finaleStart: "2026-09-04T00:00:00+05:30",
  finaleEnd: "2026-09-04T23:59:59+05:30",
});
console.log(`${bad === "UNKNOWN" ? "PASS" : "FAIL"}  malformed config -> ${bad} (want UNKNOWN)`);
if (bad !== "UNKNOWN") fail++;

// Stage statuses at a mid-registration moment
const mid = new Date("2026-08-18T09:30:00+05:30");
const expectedStages = ["LIVE", "QUEUED", "QUEUED", "QUEUED"];
timelineStages.forEach((s, i) => {
  const got = deriveStageStatus(mid, s.start, s.end);
  const ok = got === expectedStages[i];
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  stage ${s.id} @ mid-reg -> ${got} (want ${expectedStages[i]})`);
});

// Stage statuses on shortlist day: submit+screening complete, shortlist live
const slDay = new Date("2026-08-29T12:00:00+05:30");
const expectedSl = ["COMPLETE", "COMPLETE", "LIVE", "QUEUED"];
timelineStages.forEach((s, i) => {
  const got = deriveStageStatus(slDay, s.start, s.end);
  const ok = got === expectedSl[i];
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  stage ${s.id} @ shortlist day -> ${got} (want ${expectedSl[i]})`);
});

// Countdown sanity: 1 day 2h 3m 4s before close
const cd = countdownTo(new Date("2026-08-24T21:56:55+05:30"), "2026-08-25T23:59:59+05:30");
const cdOk = cd && cd.days === 1 && cd.hours === 2 && cd.minutes === 3 && cd.seconds === 4;
console.log(`${cdOk ? "PASS" : "FAIL"}  countdown parts -> ${JSON.stringify(cd)}`);
if (!cdOk) fail++;

// Invalid countdown target degrades to null
const cdBad = countdownTo(new Date(), "nope");
console.log(`${cdBad === null ? "PASS" : "FAIL"}  countdown invalid target -> ${cdBad}`);
if (cdBad !== null) fail++;

console.log(fail === 0 ? "\nALL CHECKS PASSED" : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
