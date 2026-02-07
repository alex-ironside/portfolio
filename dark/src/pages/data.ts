import type { GraphEdge } from "reagraph";

const getProxyUrl = (url: string) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

export const nodes = [
  {
    id: "jonas",
    label: "Jonas Kahnwald",
    icon: getProxyUrl(
      "https://static.wikia.nocookie.net/dark-netflix/images/a/a6/Jonas_Kahnwald%E2%80%93Profile.png/revision/latest/scale-to-width-down/1200",
    ),
    size: 25,
  },
  { id: "hannah", label: "Hannah Kahnwald" },
  { id: "ulrich", label: "Ulrich Nielsen" },
  { id: "katharina", label: "Katharina Nielsen" },
  { id: "martha", label: "Martha Nielsen" },
  { id: "magnus", label: "Magnus Nielsen" },
  { id: "mikkel", label: "Mikkel Nielsen" },
  { id: "charlotte", label: "Charlotte Doppler" },
  { id: "peter", label: "Peter Doppler" },
  { id: "franziska", label: "Franziska Doppler" },
  { id: "elisabeth", label: "Elisabeth Doppler" },
  { id: "helge", label: "Helge Doppler" },
  { id: "claudia", label: "Claudia Tiedemann" },
  { id: "regina", label: "Regina Tiedemann" },
  { id: "aleksander", label: "Aleksander Tiedemann" },
  { id: "bartosz", label: "Bartosz Tiedemann" },
  { id: "egon", label: "Egon Tiedemann" },
  { id: "noah", label: "Noah" },
  { id: "agnes", label: "Agnes Nielsen" },
  { id: "tronte", label: "Tronte Nielsen" },
  { id: "jana", label: "Jana Nielsen" },
  { id: "silja", label: "Silja Tiedemann" },
  { id: "doris", label: "Doris Tiedemann" },
  { id: "unknown", label: "The Unknown" },
];

type FamilyMember = (typeof nodes)[number]["id"];

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
