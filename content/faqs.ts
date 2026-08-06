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
        a: "Yes. Any mix of departments and years works — cross-department teams are encouraged, but nothing is mandatory.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. GENESIS judges ideas, not code. The rubric scores problem clarity, originality, feasibility, impact and presentation — a sharp idea from any discipline beats a weak one with an app attached.",
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
        // TODO: confirm policy.
        a: "Tell a coordinator immediately. The rest of the team pitches as planned — a smaller team on stage is fine.",
      },
      {
        q: "How long is the pitch?",
        a: "8 minutes to pitch, followed by 4 minutes of Q&A from the panel. Timekeeping is strict so every team gets the same stage.",
      },
      {
        q: "What should we bring on finale day?",
        // TODO: confirm policy.
        a: "Your college ID cards and your slides. Presentation equipment is provided at the venue; exact reporting time and any extras will be posted in Updates before the day.",
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
        q: "Will I get a certificate?",
        a: "All finalists receive participation certificates, every member of the top 20 teams receives a finalist certificate, and winning teams receive merit certificates and trophies.",
      },
      {
        q: "Where do official announcements happen?",
        a: "The Updates section on this page is the official record. Anything announced anywhere else gets posted there too, so it is always the one source worth checking.",
      },
    ],
  },
];
