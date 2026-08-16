/**
 * content/guidelines.ts
 *
 * Submission guidance — deliberately minimal: submissions must use the
 * given template, full stop. Download links live in content/event.ts
 * under `assets`.
 *
 * No scoring rubric is published: the rule book states that marks are
 * confidential and that no re-evaluation is entertained, so the site
 * describes how submissions are handled and nothing about how they score.
 *
 * Drives: the "How to submit" section.
 */

export const templateMandate = {
  title: "Submit on the given template. Only.",
  body: "Download the Round 1 idea template below (it's also linked inside the Google Form). Put your idea into it and submit it as a PDF named TeamName_Genesis_Round1. Deviating from the template can mean rejection without evaluation, or evaluation with a deduction — the fixed structure is what makes blind scoring fair.",
};

export const googleSignInNote =
  "The form requires a file upload, so you must be signed in to a Google account to submit. Only the last submission before the deadline counts, and late forms are not accepted for any reason — check your access early, not at 11 PM on deadline night.";

export const blindEvaluationNote = {
  title: "Evaluation is blind",
  body: "Evaluators see a Team ID only — never names, years or departments. Faculty evaluators score each submission independently, and marks are confidential. Ideas are judged on quality of reasoning, not on domain: a civil engineering idea competes on exactly the same footing as a software one.",
};

/**
 * What the panel is looking for. Qualitative only — these are prompts for
 * writing a strong submission, NOT scored criteria and NOT weighted.
 */
export const whatCounts = [
  {
    id: "problem",
    title: "A real, specific problem",
    detail:
      "Who has it, how do you know, and why does it matter enough to solve?",
  },
  {
    id: "novelty",
    title: "A fresh angle",
    detail:
      "A new approach, or a known approach applied somewhere it hasn't been.",
  },
  {
    id: "feasibility",
    title: "Something a student team could build",
    detail: "Concrete about steps, resources and constraints — not hand-waved.",
  },
  {
    id: "impact",
    title: "Impact that grows",
    detail:
      "How many people it helps, how much, and whether the benefit scales beyond version one.",
  },
  {
    id: "presentation",
    title: "A pitch you can defend",
    detail:
      "At the finale: how clearly you explain it, and how you handle questions you didn't script.",
  },
];
