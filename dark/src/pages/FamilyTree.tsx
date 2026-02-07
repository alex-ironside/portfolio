import { GraphCanvas } from "reagraph";
import { nodes, edges } from "./data";

export function FamilyTree() {
  return (
    <div>
      <GraphCanvas nodes={nodes} edges={edges} />
      <h1>Family Tree</h1>
    </div>
  );
}
