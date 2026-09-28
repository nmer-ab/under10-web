// Splits a help-style Markdown body into "## Section" groups of "### Question" + answer.
// Answers stay Markdown so they render with the normal content styles.

export type FaqEntry = { question: string; answer: string };
export type FaqSection = { id: string; title: string; intro: string; entries: FaqEntry[] };

const HEADING = /^(#{2,3})\s+(.+?)\s*#*\s*$/;
const FENCE = /^\s*(```|~~~)/;

/** Plain text of inline Markdown, for headings, anchors and JSON-LD. */
export function markdownToText(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|_|`)(.+?)\1/g, "$2")
    .replace(/\\([\\`*_[\]()#+\-.!])/g, "$1")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function slugify(text: string, used: Set<string>) {
  const base =
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  let slug = base;
  for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
  used.add(slug);
  return slug;
}

export function splitFaq(body: string) {
  const intro: string[] = [];
  const sections: (Omit<FaqSection, "intro" | "entries"> & {
    intro: string[];
    entries: { question: string; answer: string[] }[];
  })[] = [];
  const ids = new Set<string>();
  let inFence = false;

  for (const line of body.split(/\r?\n/)) {
    if (FENCE.test(line)) inFence = !inFence;
    const heading = inFence ? null : line.match(HEADING);
    const section = sections.at(-1);

    if (heading?.[1] === "##") {
      const title = markdownToText(heading[2]);
      sections.push({ id: slugify(title, ids), title, intro: [], entries: [] });
    } else if (heading?.[1] === "###" && section) {
      section.entries.push({ question: markdownToText(heading[2]), answer: [] });
    } else {
      (section?.entries.at(-1)?.answer ?? section?.intro ?? intro).push(line);
    }
  }

  return {
    intro: intro.join("\n").trim(),
    sections: sections.map(
      (s): FaqSection => ({
        ...s,
        intro: s.intro.join("\n").trim(),
        entries: s.entries.map((e) => ({ question: e.question, answer: e.answer.join("\n").trim() })),
      }),
    ),
  };
}
