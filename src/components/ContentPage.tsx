import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Markdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getContent, type ContentSlug } from "@/lib/content";
import { markdownToText, splitFaq } from "@/lib/faq-content";
import { frenchSpacing, remarkFrenchSpacing } from "@/lib/french-spacing";
import { remarkPlaceholders } from "@/lib/remark-placeholders";

const LOCALE_PREFIX = /^\/([^/?#]+)(.*)$/;

const TEXT = "text-[16px] font-medium leading-[1.75] text-[#374151]";

const H2 = "mb-2.5 mt-10 text-[24px] font-extrabold leading-tight text-ink";

const h2: Components["h2"] = ({ children }) => (
  <Heading as="h2" className={H2}>
    {children}
  </Heading>
);

const components: Components = {
  // The page title is the only h1; a "# " in the file renders as a section heading.
  h1: h2,
  h2,
  h3: ({ children }) => (
    <Heading as="h3" className="mb-1.5 mt-6 text-[17px] font-bold leading-snug text-ink">
      {children}
    </Heading>
  ),
  p: ({ children }) => <p className={`mb-4 ${TEXT}`}>{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc pl-[22px]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal pl-[22px]">{children}</ol>,
  li: ({ children }) => <li className={`my-1.5 ${TEXT} [&>p]:mb-0`}>{children}</li>,
  a: ({ href = "", children }) => {
    const className = "font-semibold text-green hover:underline";
    if (!href.startsWith("/")) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    }
    // "/terms" follows the page's locale; "/fr/terms" keeps its own instead of becoming "/fr/fr/terms".
    const [, prefix, rest] = href.match(LOCALE_PREFIX) ?? [];
    const locale = routing.locales.find((l) => l === prefix);
    return (
      <Link href={locale ? rest || "/" : href} locale={locale} className={className}>
        {children}
      </Link>
    );
  },
  strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-2xl bg-green-soft px-5 py-[18px] text-[#065F46] [&_p:last-child]:mb-0 [&_p]:text-inherit [&_strong]:text-inherit">
      {children}
    </blockquote>
  ),
  mark: ({ children }) => (
    <mark className="rounded-[4px] bg-[#FEF3C7] px-1 text-[#92400E]">{children}</mark>
  ),
};

// Inside an accordion answer, text takes FaqAccordion's own size and colour.
const answerComponents: Components = {
  ...components,
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  li: ({ children }) => <li className="my-1.5 [&>p]:mb-0">{children}</li>,
};

function MarkdownBody({
  locale,
  components: overrides = components,
  children,
}: {
  locale: string;
  components?: Components;
  children: string;
}) {
  const plugins = [remarkGfm, remarkBreaks, ...(locale === "fr" ? [remarkFrenchSpacing] : []), remarkPlaceholders];
  return (
    <Markdown remarkPlugins={plugins} components={overrides}>
      {children}
    </Markdown>
  );
}

/** Help layout: "On this page" links to each ## section, and each ### question becomes an accordion item. */
async function FaqBody({ locale, body }: { locale: string; body: string }) {
  const t = await getTranslations({ locale, namespace: "pages" });
  const text = locale === "fr" ? frenchSpacing : (value: string) => value;
  const { intro, sections } = splitFaq(body);
  const entries = sections.flatMap((section) => section.entries);

  return (
    <>
      <FaqJsonLd items={entries.map((entry) => ({ q: entry.question, a: markdownToText(entry.answer) }))} />

      {sections.length > 0 && (
        <nav aria-labelledby="on-this-page" className="mb-8">
          <p id="on-this-page" className="text-[14px] font-bold text-ink">
            {t("onThisPage")}
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-[15px] font-semibold text-green hover:underline">
                  {text(section.title)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {intro && <MarkdownBody locale={locale}>{intro}</MarkdownBody>}

      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <Heading as="h2" id={section.id} className={`scroll-mt-24 ${H2}`}>
            {text(section.title)}
          </Heading>
          {section.intro && <MarkdownBody locale={locale}>{section.intro}</MarkdownBody>}
          {section.entries.length > 0 && (
            <FaqAccordion
              defaultOpen={null}
              items={section.entries.map((entry) => ({
                q: text(entry.question),
                a: (
                  <MarkdownBody locale={locale} components={answerComponents}>
                    {entry.answer}
                  </MarkdownBody>
                ),
              }))}
            />
          )}
        </section>
      ))}
    </>
  );
}

async function load(locale: string, slug: ContentSlug) {
  const [content, t] = await Promise.all([
    getContent(locale, slug),
    getTranslations({ locale, namespace: "pages" }),
  ]);
  // Pages without a file yet (or without a frontmatter title) fall back to the title in messages.
  return { content, t, title: content?.title || t(`${slug}.title`) };
}

/** The layout's title template appends " · Under10". */
export async function contentMetadata(locale: string, slug: ContentSlug): Promise<Metadata> {
  const { title } = await load(locale, slug);
  return { title };
}

export async function ContentPage({ slug, faq = false }: { slug: ContentSlug; faq?: boolean }) {
  const locale = await getLocale();
  const { content, t, title } = await load(locale, slug);
  const updated =
    content?.updated &&
    new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(content.updated);

  return (
    <article className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-16">
      <Heading as="h1" className="text-[30px] font-extrabold leading-tight tracking-tight text-ink md:text-[40px]">
        {locale === "fr" ? frenchSpacing(title) : title}
      </Heading>

      {content ? (
        <>
          {updated && (
            <p className="mt-3 text-[14px] font-medium text-muted">{t("lastUpdated", { date: updated })}</p>
          )}
          <div className="mt-8">
            {faq ? (
              <FaqBody locale={locale} body={content.body} />
            ) : (
              <MarkdownBody locale={locale}>{content.body}</MarkdownBody>
            )}
          </div>
        </>
      ) : (
        <p className={`mt-4 ${TEXT}`}>{t("comingSoon")}</p>
      )}
    </article>
  );
}
