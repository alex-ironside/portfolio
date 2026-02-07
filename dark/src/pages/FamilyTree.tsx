import { GraphCanvas, useSelection, type GraphCanvasRef } from "reagraph";
import { nodes, edges } from "./data";
import { useRef } from "react";

export function FamilyTree() {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const { selections, onNodeClick, onCanvasClick } = useSelection({
    ref: graphRef,
    nodes: nodes,
    edges: edges,
  });

  return (
    <div>
      <h1>Family Tree</h1>
      <GraphCanvas
        layoutType="forceatlas2"
        nodes={nodes}
        edges={edges}
        selections={selections}
        onCanvasClick={onCanvasClick}
        onNodeClick={onNodeClick}
        draggable
      />
    </div>
  );
}
