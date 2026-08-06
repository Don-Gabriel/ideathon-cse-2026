/**
 * content/rules.ts
 *
 * Eligibility. There is exactly one hard rule: maximum team size is five.
 * Everything else is open — any department, any year, any mix.
 *
 * Drives: the About / eligibility section.
 */

export const theRule = {
  /** Rendered as a code constraint — the whole rulebook in one line. */
  code: "assert team.size <= 5;",
  comment: "// the only rule",
  title: "One rule.",
  body: "Teams can be up to five members — any department, any year, any mix. Cross-department teams are welcome, solo entries are welcome, nothing else is mandatory.",
};
