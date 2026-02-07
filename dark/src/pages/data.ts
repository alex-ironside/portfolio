import type { GraphEdge } from "reagraph";

const familyTree = [
  {
    id: "hannah",
  },
  {
    id: "jonas",
  },
];
export const nodes = familyTree.map((i) => ({ ...i, label: i.id }));
const connections = [
  {
    parent: "hannah",
    child: "jonas",
  },
];
export const edges: GraphEdge[] = connections.map((i) => ({
  source: i.parent,
  target: i.child,
  id: `${i.parent}-${i.child}`,
  label: `${i.parent}-${i.child}`,
}));
