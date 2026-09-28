// Wraps unfilled placeholders such as [FULL NAME] or [SIRET] in <mark>. Links and resolved
// references are separate mdast nodes, so only literal bracketed text reaches this plugin.
type MdNode = { type: string; value?: string; children?: MdNode[]; data?: Record<string, unknown> };

const PLACEHOLDER = /(\[[^[\]\n]*\S[^[\]\n]*\])/;

function split(value: string): MdNode[] {
  return value
    .split(PLACEHOLDER)
    .filter(Boolean)
    .map((part) =>
      PLACEHOLDER.test(part)
        ?{ type: "placeholder", data: { hName: "mark", hChildren: [{ type: "text", value: part }] } }
        : { type: "text", value: part },
    );
}

function walk(node: MdNode) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    if (child.type === "text" && child.value) return split(child.value);
    walk(child);
    return [child];
  });
}

export function remarkPlaceholders() {
  return (tree: MdNode) => walk(tree);
}
