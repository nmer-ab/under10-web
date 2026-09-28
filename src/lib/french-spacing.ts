// French typography: the space before : ; ? ! » and after « is non-breaking, so a line never
// starts with that punctuation. Only plain text is touched; link URLs and code are other nodes.
const NBSP = " ";

export function frenchSpacing(text: string) {
  return text.replace(/ ([:;?!»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);
}

type MdNode = { type: string; value?: string; children?: MdNode[] };

function walk(node: MdNode) {
  if (node.type === "text" && node.value) node.value = frenchSpacing(node.value);
  node.children?.forEach(walk);
}

export function remarkFrenchSpacing() {
  return (tree: MdNode) => walk(tree);
}
