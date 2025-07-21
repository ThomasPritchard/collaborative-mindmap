'use client';

import { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import Toolbar from './Toolbar';
import { v4 as uuidv4 } from 'uuid';

type Node = {
  id: string;
  text: string;
  position: { x: number; y: number };
  color?: string;
};

type StageSize = {
  width: number;
  height: number;
}

export default function CanvasContainer() {
  const [stageSize, setStageSize] = useState<StageSize>({
    width: 0,
    height: 0,
  });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [nodeCounter, setNodeCounter] = useState(1);
  const [currentSelectNode, setCurrentSelectNode] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const handleAddNode = () => {
  setNodes((prevNodes) => [
    ...prevNodes,
    {
      id: uuidv4(),
      text: `Node ${nodeCounter}`,
      position: {
        x: Math.random() * stageSize.width,
        y: Math.random() * stageSize.height
      },
      color: '#ffcc00',
    },
  ]);
  setNodeCounter((prev) => prev + 1);
};


  const handleRemoveNode = () => {
    if (!currentSelectNode) return;
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== currentSelectNode));
  };

  const handleNodeClick = (nodeId: string) => {
    setCurrentSelectNode(nodeId);
  };

  return (
    <div id="canvas-container" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toolbar onAddNode={handleAddNode} onRemoveNode={handleRemoveNode} />
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          {nodes.map((node) => {
            const isSelected = currentSelectNode === node.id;
            const strokeColor = isSelected ? 'blue' : 'black';
            return (
              <Group key={node.id} x={node.position.x} y={node.position.y} onClick={() => handleNodeClick(node.id)} draggable>
                <Rect
                  width={100}
                  height={50}
                  fill={node.color || '#ffcc00'}
                  stroke={strokeColor}
                />
                <Text
                  text={node.text}
                  fontSize={16}
                  fill="#000"
                  x={10}
                  y={10}
                  width={80}
                  height={30}
                  align="center"
                  verticalAlign='middle'
                />
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
