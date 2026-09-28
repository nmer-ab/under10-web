import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

export const CONTENT_SLUGS = ["privacy", "terms", "legal", "help"] as const;
export type ContentSlug = (typeof CONTENT_SLUGS)[number];

export type ContentFile = {
  title: string;
  /** Unset when the frontmatter has no valid YYYY-MM-DD `updated`. */
  updated?: Date;
  body: string;
};

// YAML turns an unquoted 2026-09-28 into a Date (UTC midnight); a quoted one stays a string.
function parseUpdated(value: unknown) {
  const date =
    value instanceof Date
      ? value
      : typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T00:00:00Z`)
        : undefined;
  return date && !Number.isNaN(date.getTime()) ? date : undefined;
}

/** Reads src/content/{locale}/{slug}.md, or returns null when the page isn't written yet. */
export const getContent = cache(async (locale: string, slug: ContentSlug): Promise<ContentFile | null> => {
  let source: string;
  try {
    source = await readFile(path.join(process.cwd(), "src", "content", locale, `${slug}.md`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  const { data, content } = matter(source);
  return {
    title: typeof data.title === "string" ? data.title : "",
    updated: parseUpdated(data.updated),
    body: content,
  };
});
