/**
 * The customer-facing changelog.
 *
 * The engineering record lives in the APP repo's CHANGELOG.md and is written for
 * whoever is maintaining the code — Edge Functions, RLS, migration names. This is a
 * deliberate rewrite of the same releases for makers, in the site's voice.
 *
 * Two files, two audiences, one release. At each verified build, both get an entry.
 * A release with nothing a maker would notice does not need an entry here at all —
 * it is fine for this list to be shorter than CHANGELOG.md.
 *
 * `date` is null until a release is actually in people's hands, so the page can say
 * so honestly rather than carrying a date that has not happened.
 */
export interface ChangelogEntry {
  version: string;
  /** ISO date, or null while the release is still with the App Store. */
  date: string | null;
  headline: string;
  items: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "1.6.0",
    date: null,
    headline: "The first release.",
    items: [
      "Bring a pattern in from a YouTube tutorial, a PDF you bought, a photo of a magazine page, or pasted text. Skeined reads it into rows you can tap through, with the instruction for the row you are on sitting under the count.",
      "Press and hold any abbreviation to see what it means without leaving your project.",
      "Count hands-free. When both hands are busy, say the word and the row goes up.",
      "Your row and your time stay on the Lock Screen while you work, and keep counting offline.",
      "Point your camera at a ball band to add yarn to your stash without typing it out.",
      "Ask the craft assistant when a stitch stops making sense mid-row.",
      "Streaks, levels and badges for the making you already do.",
    ],
  },
];
