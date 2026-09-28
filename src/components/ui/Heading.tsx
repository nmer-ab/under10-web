import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { useLocale } from "next-intl";

// French already puts a non-breaking space before ? ! : so only , and . need tightening there.
const PUNCTUATION: Record<string, RegExp> = {
  fr: /([,.])(?=\s|$)/,
  default: /([,.!?])(?=\s|$)/,
};

function tighten(node: ReactNode, pattern: RegExp): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") {
      return child
        .split(pattern)
        .map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="punct">
              {part}
            </span>
          ) : (
            part
          ),
        );
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children != null) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, undefined, tighten(child.props.children, pattern));
    }
    return child;
  });
}

type HeadingTag = "h1" | "h2" | "h3";

export function Heading({
  as: Tag = "h2",
  id,
  className,
  children,
}: {
  as?: HeadingTag;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  const pattern = PUNCTUATION[locale] ?? PUNCTUATION.default;
  return (
    <Tag id={id} className={className}>
      {tighten(children, pattern)}
    </Tag>
  );
}
