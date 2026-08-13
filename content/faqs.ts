/**
 * content/faqs.ts
 *
 * The FAQ accordion. Grouped; groups render in array order.
 * To add a question: add an object to the right group's `items` — done.
 *
 * NOTE: answers marked "TODO: confirm policy" state a sensible default the
 * committee should confirm (or edit) before launch.
 *
 * Drives: FAQ section.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "eligibility",
    label: "Eligibility",
    items: [
      {
        q: "How big can a team be?",
        a: "Up to five members. That's the only hard rule — smaller teams, including solo entries, are fine.",
      },
      {
        q: "Can I team up with friends from another department?",
        a: "Yes. Any mix of departments and years works — cross-department teams are encouraged, but nothing is mandatory. GENESIS is intra-college, so every member must be a student of GCE Tirunelveli.",
      },
      {
        q: "Can I be in more than one team?",
        a: "No. A student may join only one team. Duplicate names may cancel every registration containing them, so check with your friends before the team lead submits.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. GENESIS judges ideas, not code. The panel looks at problem clarity, originality, feasibility, impact and how you present it — a sharp idea from any discipline beats a weak one with an app attached.",
      },
      {
        q: "I'm a first-year. Am I eligible?",
        a: "Yes. Every year and every department of the college is eligible. First edition means everyone starts on equal footing.",
      },
    ],
  },
  {
    id: "submission",
    label: "Submission",
    items: [
      {
        q: "Do we need a working prototype?",
        a: "No. Stage 1 is an idea submission on the given template. A sketch or mock-up can help you explain, but nothing needs to be built.",
      },
      {
        q: "Where is the idea template?",
        a: "Inside the Google Form itself. Fill it in and submit it as a PDF named TeamName_Genesis_Round1 — only the last submission before the deadline counts.",
      },
      {
        q: "What if our idea already exists somewhere?",
        a: "An existing product doesn't disqualify you. What matters is the gap you've spotted and your angle on it — novelty is scored, so a fresh take on a known problem can do well; a straight copy of an existing product won't.",
      },
      {
        q: "Can we submit two ideas?",
        a: "No — one submission per team. Pick your strongest idea.",
      },
      {
        q: "Can we use AI tools while preparing our submission?",
        a: "For research, drafting and slide design, yes. The idea and the reasoning must be your own — the finale Q&A very quickly reveals who understands their own idea.",
      },
      {
        q: "Can we change our idea after submitting?",
        // TODO: confirm policy.
        a: "You can sharpen your pitch for the finale, but the core idea you present must be the one you submitted — evaluators shortlisted that idea, not a different one.",
      },
      {
        q: "Why do I need to sign in to Google to submit?",
        a: "The form takes a file upload, and Google requires sign-in for uploads. Any Google account works — it doesn't have to be a college address.",
      },
    ],
  },
  {
    id: "event-day",
    label: "Event day",
    items: [
      {
        q: "Does the whole team need to attend the finale?",
        a: "Yes — the finale is on campus and your team is expected on stage. Q&A questions can go to any member, and certificates are issued to those present.",
      },
      {
        q: "What happens if a member drops out after shortlisting?",
        a: "Tell a coordinator immediately. Team composition is frozen when registration closes, so fewer members may present — but nobody who wasn't registered can take their place.",
      },
      {
        q: "How long is the pitch?",
        a: "10 minutes per team, with a maximum of 10 slides including the first and last. Timekeeping is strict so every team gets the same stage.",
      },
      {
        q: "What should we bring on finale day?",
        a: "A valid college ID card for every member, and your deck named TeamName_Genesis_Finale. Report 30 minutes before the announced start — every member signs in personally.",
      },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    items: [
      {
        q: "Does it cost anything to enter?",
        a: "No. Registration is free — there is no entry fee at any stage.",
      },
      {
        q: "What are the prizes?",
        a: "Cash prizes will be awarded to the winning teams at the grand finale. The amounts are announced through the official channels — watch the Updates section on this page.",
      },
      {
        q: "When is the finale?",
        a: "The date is being finalised. Registration runs from Monday 17 August to Thursday 3 September; the shortlist and finale dates are announced in Updates once fixed.",
      },
      {
        q: "Will I get a certificate?",
        a: "Certificates go to the top three teams, presented at the grand finale.",
      },
      {
        q: "Where do official announcements happen?",
        a: "The Updates section on this page is the official record. Anything announced anywhere else gets posted there too, so it is always the one source worth checking.",
      },
    ],
  },
];
