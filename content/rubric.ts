/**
 * content/rubric.ts
 *
 * The published evaluation rubric. Weights must sum to 100 — the section
 * renders the sum, so a wrong total is visible immediately.
 *
 * Drives: "What we're looking for" section.
 */

export interface RubricCriterion {
  id: string;
  title: string;
  /** Percentage weight, integer. */
  weight: number;
  detail: string;
}

export const rubric: RubricCriterion[] = [
  {
    id: "problem",
    title: "Problem definition & clarity",
    weight: 20,
    detail:
      "Is the problem real, specific and clearly stated? Who has it, and how do you know?",
  },
  {
    id: "novelty",
    title: "Novelty & originality",
    weight: 20,
    detail:
      "Is this a fresh angle — a new approach, or a known approach applied somewhere it hasn't been?",
  },
  {
    id: "feasibility",
    title: "Feasibility & implementation plan",
    weight: 25,
    detail:
      "Could a student team actually build this? Is the plan concrete about steps, resources and constraints?",
  },
  {
    id: "impact",
    title: "Impact & scalability",
    weight: 20,
    detail:
      "How many people does this help, how much, and does the benefit grow beyond the first version?",
  },
  {
    id: "presentation",
    title: "Presentation & Q&A handling",
    weight: 15,
    detail:
      "Scored at the finale: how clearly you pitch, and how well you handle questions you didn't script.",
  },
];

export const blindEvaluationNote = {
  title: "Evaluation is blind",
  body: "Evaluators see a Team ID only — never names, years or departments. Two faculty members score each submission independently. Ideas are judged on quality of reasoning, not on domain: a civil engineering idea competes on exactly the same footing as a software one.",
};
