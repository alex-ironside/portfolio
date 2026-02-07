import type { GraphEdge } from "reagraph";

// silly way to ensure uniqueness
const familyTree = [
  "jonas",
  "hannah",
  "ulrich",
  "katharina",
  "martha",
  "magnus",
  "mikkel",
  "charlotte",
  "peter",
  "franziska",
  "elisabeth",
  "helge",
  "claudia",
  "regina",
  "aleksander",
  "bartosz",
  "egon",
  "noah",
  "agnes",
  "tronte",
  "jana",
  "silja",
  "doris",
  "unknown",
] as const;

export const nodes = familyTree.map((i) => {
  let family;
  if (i === "hannah") {
    family = "kahnwald";
  }
  return { id: i, label: i, data: { family: "Kahnwald" } };
});

type FamilyMember = (typeof familyTree)[number];

// [parent, child]
const connections: [FamilyMember, FamilyMember][] = [
  ["hannah", "jonas"],
  ["mikkel", "jonas"],

  ["katharina", "mikkel"],
  ["ulrich", "mikkel"],

  ["katharina", "martha"],
  ["ulrich", "martha"],

  ["katharina", "magnus"],
  ["ulrich", "magnus"],

  ["regina", "bartosz"],
  ["aleksander", "bartosz"],

  ["charlotte", "elisabeth"],
  ["peter", "elisabeth"],

  ["elisabeth", "charlotte"],
  ["noah", "charlotte"],

  ["charlotte", "franziska"],
  ["peter", "franziska"],

  ["claudia", "regina"],
  ["tronte", "regina"],

  ["tronte", "ulrich"],
  ["jana", "ulrich"],

  ["egon", "claudia"],
  ["doris", "claudia"],

  ["agnes", "tronte"],

  ["helge", "peter"],

  ["bartosz", "noah"],
  ["silja", "noah"],

  ["bartosz", "agnes"],
  ["silja", "agnes"],

  ["hannah", "silja"],
  ["egon", "silja"],

  ["martha", "unknown"],
  ["jonas", "unknown"],
];
export const edges: GraphEdge[] = connections.map((i) => {
  const parent = i[0];
  const child = i[1];

  return {
    source: parent,
    target: child,
    id: `${parent}-${child}`,
    label: `${parent}-${child}`,
  };
});
